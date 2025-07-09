import { useTheme } from "@/hooks/useTheme";

export default function SideNav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="lg:sticky top-0 lg:h-screen lg:w-1/3 p-8 border-r border-[var(--color-line)]">
      <h1 className="text-3xl font-bold">Afton Gauntlett</h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Front-End Engineer
      </p>

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

      <button
        onClick={toggleTheme}
        className="mt-8 px-4 py-2 rounded border border-[var(--color-line)] text-sm hover:bg-[var(--color-line)] transition"
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </aside>
  );
}
