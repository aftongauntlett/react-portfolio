import Layout from '@/components/layout/Layout';
import PageSection from '@/components/layout/PageSection';
import AboutSection from '@/components/sections/About';
import ContactSection from '@/components/sections/Contact';
import ExperienceSection from '@/components/sections/Experience';
import ProjectsSection from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import EducationSection from '@/components/sections/Education';

export default function Home() {
  return (
    <Layout>
      <PageSection id="about">
        <AboutSection />
      </PageSection>
      <PageSection id="skills" title="Skills">
        <Skills />
      </PageSection>
      <PageSection id="experience" title="Experience">
        <ExperienceSection />
      </PageSection>
      <PageSection id="projects" title="Projects">
        <ProjectsSection />
      </PageSection>
      <PageSection id="education" title="Education & Certifications">
        <EducationSection />
      </PageSection>
      <PageSection id="contact" title="Get in Touch">
        <ContactSection />
      </PageSection>
    </Layout>
  );
}
