import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";
import { navItems } from "./navItems";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Github, Linkedin } from "lucide-react";

export default function SideNav() {
  const activeSection = useActiveSection();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="lg:sticky lg:block top-0 lg:h-screen lg:w-1/4 p-8 border-r border-[var(--color-line)] flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold">Afton Gauntlett</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Front-End Engineer
        </p>

        <nav className="mt-8 space-y-4 text-sm" aria-label="Main navigation">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={clsx(
                "block transition-colors hover:underline",
                activeSection === id && "text-[var(--color-primary)] font-bold"
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-10 flex gap-4">
          <a
            href="https://github.com/aftongauntlett"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-[var(--color-primary)] transition"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/aftongauntlett/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[var(--color-primary)] transition"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>

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
