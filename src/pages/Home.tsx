import Hero from "@/components/sections/Hero";
import Layout from "@/components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Hero />

      <div id="projects">
        <h2 className="text-xl font-semibold">Projects</h2>
        <p className="text-muted">Coming soon…</p>
      </div>

      <div id="contact">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-muted">Let’s get in touch soon.</p>
      </div>
    </Layout>
  );
}
