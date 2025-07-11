import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";
import { navItems } from "./navItems";
import { useActiveSection } from "@/hooks/useActiveSection";
import { GithubIcon, LinkedinIcon, Sun, Moon } from "lucide-react";
export default function SideNav() {
  const activeSection = useActiveSection();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="lg:sticky top-0 lg:h-screen w-full lg:w-[320px] px-6 py-10 flex flex-col justify-between">
      <div>
        <h1 className="subtitle">Afton Gauntlett</h1>
        <p className="mt-1 mb-3 text-sm text-[var(--color-muted)]">
          Front-End Engineer
        </p>
        <hr className="border-[var(--color-line)]" />
        <nav className="mt-10 space-y-5 navitem" aria-label="Main navigation">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "true" : undefined}
              className={clsx(
                "nav-link block text-base hover:text-[var(--color-primary)]",
                activeSection === id &&
                  "text-[var(--color-primary)] font-semibold"
              )}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-6">
        <div className="border-t border-[var(--color-line)] pt-6 flex gap-4">
          <a
            href="https://github.com/aftongauntlett"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-[var(--color-primary)] transition"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/aftongauntlett/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[var(--color-primary)] transition"
          >
            <LinkedinIcon size={20} />
          </a>
        </div>

        <button
          onClick={toggleTheme}
          className="w-fit text-sm border border-[var(--color-line)] px-3 py-1.5 rounded hover:bg-[var(--color-line)] transition flex items-center gap-2"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? (
            <>
              <Sun size={16} />
              Light
            </>
          ) : (
            <>
              <Moon size={16} />
              Dark
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
