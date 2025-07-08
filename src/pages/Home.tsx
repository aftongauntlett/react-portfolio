import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="lg:sticky top-0 lg:h-screen lg:w-1/3  p-8">
        <h1 className="text-3xl font-bold border-2 border-green-300 border-solid">
          Afton Gauntlett
        </h1>
        <p className="text-muted mt-2">Front-End Engineer</p>
        <nav className="mt-8 space-y-4 text-sm">
          <a href="#about" className="block hover:underline">
            About
          </a>
          <a href="#projects" className="block hover:underline">
            Projects
          </a>
          <a href="#contact" className="block hover:underline">
            Contact
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <section className="flex-1 p-8 space-y-32">
        <Hero />
        {/* Placeholder for future components */}
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
