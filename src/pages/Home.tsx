import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection.tsx";

export default function Home() {
  return (
    <Layout>
      <section id="about" className="min-h-screen snap-start">
        <HeroSection />
      </section>

      <section id="experience" className="min-h-screen snap-start">
        <ExperienceSection />
      </section>

      <section id="projects" className="min-h-screen snap-start">
        <ProjectsSection />
      </section>

      <section id="contact" className="min-h-screen snap-start">
        <ContactSection />
      </section>
    </Layout>
  );
}
