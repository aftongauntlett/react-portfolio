import Layout from '@/components/layout/Layout';
import PageSection from '@/components/layout/PageSection';
import AboutSection from '@/components/sections/About/AboutSection';
import ContactSection from '@/components/sections/Contact/ContactSection';
import ExperienceSection from '@/components/sections/Experience/ExperienceSection';
import ProjectsSection from '@/components/sections/Project/ProjectsSection';

export default function Home() {
  return (
    <Layout>
      <PageSection id="about">
        <AboutSection />
      </PageSection>
      <PageSection id="experience" title="Experience">
        <ExperienceSection />
      </PageSection>
      <PageSection id="projects" title="Projects">
        <ProjectsSection />
      </PageSection>
      <PageSection id="contact" title="Get in Touch">
        <ContactSection />
      </PageSection>
    </Layout>
  );
}
