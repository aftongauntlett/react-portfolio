import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PageSection from '@/components/layout/PageSection';
import AboutSection from '@/components/sections/About';
import ContactSection from '@/components/sections/Contact';
import ExperienceSection from '@/components/sections/Experience';
import ProjectsSection from '@/components/sections/Projects';
import SkillsSection from '@/components/sections/Skills';
import CredentialsSection from '@/components/sections/Credentials';

export default function Home() {
  // Handle scrolling to section when page loads with hash or query parameter
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the #
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get('scrollTo');

    const targetId = hash || scrollTo;

    if (targetId) {
      // Small delay to ensure page is fully rendered
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80; // Offset for better positioning
          const elementPosition = element.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth',
          });

          // Only focus for hash-based navigation (accessibility)
          // Skip focus for query-based navigation to avoid unwanted highlighting
          if (hash) {
            element.focus();
          }

          // Clean up URL if using query parameter
          if (scrollTo) {
            // Remove the scrollTo parameter from URL without page reload
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('scrollTo');
            window.history.replaceState({}, '', newUrl.pathname + newUrl.hash);
          }
        }
      }, 100);
    }
  }, []);
  return (
    <Layout>
      <PageSection id="about">
        <AboutSection />
      </PageSection>
      <PageSection id="skills" title="Technical Skills">
        <SkillsSection />
      </PageSection>
      <PageSection id="experience" title="Experience">
        <ExperienceSection />
      </PageSection>
      <PageSection id="projects" title="Projects">
        <ProjectsSection />
      </PageSection>
      <PageSection id="credentials" title="Credentials">
        <CredentialsSection />
      </PageSection>
      <PageSection id="contact" title="Get in Touch">
        <ContactSection />
      </PageSection>
    </Layout>
  );
}
