import Hero from "@/components/sections/Hero";
import SideNav from "@/components/layout/SideNav";

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen">
      <SideNav />

      <section className="flex-1 p-8 space-y-32">
        <Hero />

        <div id="projects">
          <h2 className="text-xl font-semibold">Projects</h2>
          <p className="text-muted">Coming soon…</p>
        </div>

        <div id="contact">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="text-muted">Let’s get in touch soon.</p>
        </div>
      </section>
    </main>
  );
}
