import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection.tsx";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </Layout>
  );
}
