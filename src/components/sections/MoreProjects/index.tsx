import { externalNavItems } from '@/constants/navigation';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function MoreProjectsSection() {
  return (
    <div className="space-y-8">
      <p className="text-[var(--color-muted)] text-lg leading-relaxed">
        Alongside my professional projects, I pursue personal creative endeavors in game development
        and technical writing to explore new ideas and share insights.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {externalNavItems.map(({ id, label, href, description }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-lg hover:border-[var(--color-secondary)]/50 hover:bg-[var(--color-secondary)]/5 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                {label}
              </h3>
              <FaExternalLinkAlt className="w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-secondary)] transition-colors mt-1" />
            </div>
            <p className="text-[var(--color-muted)] group-hover:text-[var(--color-text)] transition-colors">
              {description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
