import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection.tsx";
import FadeInSection from "@/components/shared/FadeInSection";

export default function Home() {
  return (
    <Layout>
      <section id="about" data-section="about" className="min-h-screen">
        <FadeInSection>
          <HeroSection />
        </FadeInSection>
      </section>

      <section
        id="experience"
        data-section="experience"
        className="min-h-screen"
      >
        <FadeInSection>
          <ExperienceSection />
        </FadeInSection>
      </section>

      <section id="projects" data-section="projects" className="min-h-screen">
        <FadeInSection>
          <ProjectsSection />
        </FadeInSection>
      </section>

      <section id="contact" data-section="contact" className="min-h-screen">
        <FadeInSection>
          <ContactSection />
        </FadeInSection>
      </section>
    </Layout>
  );
}
