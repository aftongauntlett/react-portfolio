import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection.tsx";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </Layout>
  );
}
