import Layout from '@/components/layout/Layout';
import PageSection from '@/components/layout/PageSection';
import AboutSection from '@/components/sections/About';
import ContactSection from '@/components/sections/Contact';
import EducationSection from '@/components/sections/Education';
import ExperienceSection from '@/components/sections/Experience';
import ProjectsSection from '@/components/sections/Projects';
import SkillsSection from '@/components/sections/Skills';

export default function Home() {
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
      <PageSection id="education" title="Education & Awards">
        <EducationSection />
      </PageSection>
      <PageSection id="contact" title="Get in Touch">
        <ContactSection />
      </PageSection>
    </Layout>
  );
}
