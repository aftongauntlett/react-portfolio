import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <ProjectsSection />

      <section id="contact">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-muted">Let’s get in touch soon.</p>
      </section>
    </Layout>
  );
}
