import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";
import { navItems } from "../../../types/navItems";
import { useActiveSection } from "@/hooks/useActiveSection";
import { GithubIcon, LinkedinIcon, Sun, Moon } from "lucide-react";
import Button from "../../shared/Button/Button";
import "./SideNav.css";

export default function SideNav() {
  const activeSection = useActiveSection();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      role="complementary"
      aria-labelledby="sidebar-title"
      className="lg:sticky top-0 lg:h-screen w-full lg:w-[320px] pt-16 px-6 py-10 flex flex-col justify-between"
    >
      <div>
        <h1 id="sidebar-title" className="subtitle">
          Afton Gauntlett
        </h1>
        <p className="mt-0.5 mb-3 text-sm text-[var(--color-muted)] leading-tight">
          Front-End Engineer
        </p>
        <div className="pr-6">
          <hr className="border-[var(--color-line)]" />
        </div>
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
        <hr className="border-[var(--color-line)]" />

        <div className="w-full flex items-center justify-between">
          {/* Left: Socials */}
          <div className="flex gap-4">
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

          {/* Right: Theme toggle */}
          <Button
            onClick={toggleTheme}
            icon={theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            aria-label="Toggle dark mode"
          />
        </div>
      </div>
    </aside>
  );
}
