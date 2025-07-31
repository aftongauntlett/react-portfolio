import Layout from '@/components/layout/Layout';
import PageSection from '@/components/layout/PageSection';
import AboutSection from '@/components/sections/About';
import ContactSection from '@/components/sections/Contact';
import ExperienceSection from '@/components/sections/Experience';
import ProjectsSection from '@/components/sections/Projects';
import SkillsSection from '@/components/sections/Skills';

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
      <PageSection id="skills" title="Skills & Tools">
        <SkillsSection />
      </PageSection>
      <PageSection id="contact" title="Get in Touch">
        <ContactSection />
      </PageSection>
    </Layout>
  );
}
