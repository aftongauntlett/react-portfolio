import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import PageSection from "@/components/layout/PageSection";
import ExperienceSection from "@/components/sections/ExperienceSection";

export default function Home() {
  return (
    <Layout>
      <PageSection id="about" className="pt-24 lg:pt-32 justify-start">
        <HeroSection />
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
