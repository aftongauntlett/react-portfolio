import { useEffect, Suspense, lazy } from 'react';
import PageSection from '@/components/layout/PageSection';
import DetailView from '@/components/shared/DetailView';
import BlogPostContent from '@/components/blog/BlogPostContent';
import { useDetailView } from '@/context/DetailViewContext';
import { useLenisContext } from '@/context/LenisContext';
import { smoothScrollTo } from '@/utils/scroll';
import { blogPosts } from '@/data/blog/posts';

// Lazy load sections for better code splitting
const AboutSection = lazy(() => import('@/components/sections/About'));
const ContactSection = lazy(() => import('@/components/sections/Contact'));
const ExperienceSection = lazy(() => import('@/components/sections/Experience'));
const ProjectsSection = lazy(() => import('@/components/sections/Projects'));
const SkillsSection = lazy(() => import('@/components/sections/Skills'));
const CredentialsSection = lazy(() => import('@/components/sections/Credentials'));

// Loading component for sections
function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-4 w-4"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  // Use context to share detail view state with sidebar
  const { detailView, setDetailView } = useDetailView();
  const { lenis } = useLenisContext();

  // Parse hash to determine what to show
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #

      // Check for nested routes like #projects/game-dev/js13k-2025-post-mortem
      if (hash.startsWith('projects/game-dev/')) {
        const parts = hash.split('/');

        if (parts.length === 3) {
          // Post-mortem: #projects/game-dev/js13k-2025-post-mortem
          setDetailView({
            type: 'post-mortem',
            slug: parts[2],
            title: parts[2], // We'll get the real title from blog posts data
          });
        }
      } else {
        // Normal section navigation
        setDetailView(null);

        // Handle scrolling to section with retry
        if (hash) {
          let attempts = 0;
          const maxAttempts = 20; // 20 attempts * 50ms = 1 second

          const tryScroll = () => {
            // Try to find the heading first, fallback to section
            const headingElement = document.getElementById(`${hash}-heading`);
            const sectionElement = document.getElementById(hash);
            const element = headingElement || sectionElement;

            if (element) {
              smoothScrollTo({ target: hash, offset: 80 }, lenis);
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
      }
    };

    // Run on mount and when hash changes
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setDetailView, lenis]);

  // Close detail view and return to projects section
  const closeDetailView = () => {
    window.location.hash = 'projects';
    setDetailView(null);
  };

  // Handle scrolling to section when page loads with query parameter (legacy support)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get('scrollTo');

    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          smoothScrollTo({ target: scrollTo, offset: 80 }, lenis);

          // Clean up URL
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('scrollTo');
          window.history.replaceState({}, '', newUrl.pathname + newUrl.hash);
        }
      }, 100);
    }
  }, [lenis]);

  return (
    <>
      {detailView ? (
        // Show detail view (post-mortem)
        <DetailView isOpen={true} onClose={closeDetailView} title={detailView.title}>
          {/* Load post-mortem content from blog posts data */}
          {(() => {
            const blogPost = blogPosts.find((post) => post.metadata.slug === detailView.slug);
            if (!blogPost) {
              return (
                <div>
                  <h1 className="text-3xl font-bold mb-4">Post-Mortem Not Found</h1>
                  <p className="text-[var(--color-muted)]">
                    Could not find post-mortem for slug: {detailView.slug}
                  </p>
                </div>
              );
            }

            return (
              <BlogPostContent
                sections={blogPost.sections}
                metadata={{
                  title: blogPost.metadata.title,
                  subtitle: blogPost.metadata.subtitle,
                  tags: blogPost.metadata.tags,
                  description: blogPost.metadata.description,
                  author: blogPost.metadata.author,
                  publishDate: blogPost.metadata.publishDate,
                  readTime: blogPost.metadata.readTime,
                }}
              />
            );
          })()}
        </DetailView>
      ) : (
        // Show normal portfolio sections
        <>
          <PageSection id="about">
            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
            </Suspense>
          </PageSection>
          <PageSection id="skills" title="Technical Skills">
            <Suspense fallback={<SectionLoader />}>
              <SkillsSection />
            </Suspense>
          </PageSection>
          <PageSection id="experience" title="Experience">
            <Suspense fallback={<SectionLoader />}>
              <ExperienceSection />
            </Suspense>
          </PageSection>
          <PageSection id="projects" title="Projects">
            <Suspense fallback={<SectionLoader />}>
              <ProjectsSection />
            </Suspense>
          </PageSection>
          <PageSection id="credentials" title="Credentials">
            <Suspense fallback={<SectionLoader />}>
              <CredentialsSection />
            </Suspense>
          </PageSection>
          <PageSection id="contact" title="Get in Touch">
            <Suspense fallback={<SectionLoader />}>
              <ContactSection />
            </Suspense>
          </PageSection>
        </>
      )}
    </>
  );
}
