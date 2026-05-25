import { useCallback, useEffect, Suspense, lazy, useState } from 'react';
import PageSection from '@/components/layout/PageSection';
import { SECTION_SPACING } from '@/constants/spacing';
import { useLenisContext } from '@/context/LenisContext';
import { smoothScrollTo } from '@/utils/domScroll';

// Eager load above-the-fold sections to avoid placeholder reflow (CLS).
import AboutSection from '@/components/sections/About';
import SkillsSection from '@/components/sections/Skills';
import ExperienceSection from '@/components/sections/Experience';

// Lazy load below-the-fold sections for better code splitting.
const loadContactSection = () => import('@/components/sections/Contact');
const loadProjectsSection = () => import('@/components/sections/Projects');
const loadCredentialsSection = () => import('@/components/sections/Credentials');
const loadTestimonialsSection = () => import('@/components/sections/Testimonials');

const ContactSection = lazy(loadContactSection);
const ProjectsSection = lazy(loadProjectsSection);
const CredentialsSection = lazy(loadCredentialsSection);
const TestimonialsSection = lazy(loadTestimonialsSection);

const LAZY_SECTION_IDS = ['projects', 'credentials', 'testimonials', 'contact'] as const;

type LazySectionId = (typeof LAZY_SECTION_IDS)[number];

const SECTION_ID_ALIASES: Record<string, string> = {
  education: 'credentials',
  reviews: 'testimonials',
};

const normalizeSectionId = (id: string) => SECTION_ID_ALIASES[id] ?? id;

const isLazySectionId = (id: string): id is LazySectionId =>
  LAZY_SECTION_IDS.includes(id as LazySectionId);

const createInitialLoadedSections = (): Record<LazySectionId, boolean> => {
  const initialState: Record<LazySectionId, boolean> = {
    projects: false,
    credentials: false,
    testimonials: false,
    contact: false,
  };

  if (typeof window === 'undefined') {
    return initialState;
  }

  const initialHash = normalizeSectionId(window.location.hash.replace('#', ''));
  if (isLazySectionId(initialHash)) {
    initialState[initialHash] = true;
  }

  const scrollToParam = new URLSearchParams(window.location.search).get('scrollTo');
  const normalizedScrollTo = scrollToParam ? normalizeSectionId(scrollToParam) : '';
  if (isLazySectionId(normalizedScrollTo)) {
    initialState[normalizedScrollTo] = true;
  }

  return initialState;
};

// Loading component for sections
function SectionLoader() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center py-8">
      <div className="flex space-x-4" aria-hidden="true">
        <div className="rounded-full h-4 w-4 bg-[var(--color-skeleton)]"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 rounded w-3/4 bg-[var(--color-skeleton)]"></div>
          <div className="h-4 rounded w-1/2 bg-[var(--color-skeleton)]"></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { lenis } = useLenisContext();
  const sectionSpacingClass = SECTION_SPACING.TOP_PADDING;
  const [loadedSections, setLoadedSections] = useState<Record<LazySectionId, boolean>>(
    createInitialLoadedSections,
  );

  const markSectionLoaded = useCallback((id: string) => {
    if (!isLazySectionId(id)) {
      return;
    }

    setLoadedSections((prev) => {
      if (prev[id]) {
        return prev;
      }

      return {
        ...prev,
        [id]: true,
      };
    });
  }, []);

  useEffect(() => {
    const hasIntersectionObserver = 'IntersectionObserver' in window;

    if (!hasIntersectionObserver) {
      setLoadedSections({
        projects: true,
        credentials: true,
        testimonials: true,
        contact: true,
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          markSectionLoaded(entry.target.id);
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: '480px 0px',
        threshold: 0.01,
      },
    );

    LAZY_SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [markSectionLoaded]);

  // Parse hash to determine what section to scroll to
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.slice(1); // Remove the #
      const hash = normalizeSectionId(rawHash);

      // Handle scrolling to section with retry
      if (hash) {
        markSectionLoaded(hash);

        let attempts = 0;
        const maxAttempts = 20; // 20 attempts * 50ms = 1 second

        const tryScroll = () => {
          // Try to find the heading first, fallback to section
          const headingElement = document.getElementById(`${hash}-heading`);
          const sectionElement = document.getElementById(hash);
          const element = headingElement || sectionElement;

          if (element) {
            smoothScrollTo({ target: hash, offset: 80 }, lenis);

            if (rawHash !== hash) {
              window.history.replaceState(null, '', `#${hash}`);
            }

            // Focus the heading if it exists and is focusable
            if (headingElement && headingElement.tabIndex === -1) {
              headingElement.focus();
            } else if (element) {
              element.focus();
            }
          } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(tryScroll, 50);
          }
        };

        tryScroll();
      }
    };

    // Run on mount and when hash changes
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [lenis, markSectionLoaded]);

  // Handle scrolling to section when page loads with query parameter (legacy support)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get('scrollTo');
    const targetSection = scrollTo ? normalizeSectionId(scrollTo) : null;

    if (targetSection) {
      markSectionLoaded(targetSection);

      setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          smoothScrollTo({ target: targetSection, offset: 80 }, lenis);

          // Clean up URL
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('scrollTo');
          window.history.replaceState({}, '', newUrl.pathname + newUrl.hash);
        }
      }, 100);
    }
  }, [lenis, markSectionLoaded]);

  return (
    <>
      <PageSection
        id="about"
        title="About"
        hideTitle={true}
        className="section-content--critical !pb-0 sm:!pb-0"
      >
        <AboutSection />
      </PageSection>
      <PageSection id="skills" title="Skills" className={sectionSpacingClass}>
        <SkillsSection />
      </PageSection>
      <PageSection id="experience" title="Experience" className={sectionSpacingClass}>
        <ExperienceSection />
      </PageSection>
      <PageSection id="projects" title="Projects" className={sectionSpacingClass}>
        {loadedSections.projects ? (
          <Suspense fallback={<SectionLoader />}>
            <ProjectsSection />
          </Suspense>
        ) : (
          <SectionLoader />
        )}
      </PageSection>
      <PageSection id="credentials" title="Credentials" className={sectionSpacingClass}>
        {loadedSections.credentials ? (
          <Suspense fallback={<SectionLoader />}>
            <CredentialsSection />
          </Suspense>
        ) : (
          <SectionLoader />
        )}
      </PageSection>
      <PageSection id="testimonials" title="Testimonials" className={sectionSpacingClass}>
        {loadedSections.testimonials ? (
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        ) : (
          <SectionLoader />
        )}
      </PageSection>
      <PageSection id="contact" title="Get in Touch" className={sectionSpacingClass}>
        {loadedSections.contact ? (
          <Suspense fallback={<SectionLoader />}>
            <ContactSection />
          </Suspense>
        ) : (
          <SectionLoader />
        )}
      </PageSection>
    </>
  );
}
