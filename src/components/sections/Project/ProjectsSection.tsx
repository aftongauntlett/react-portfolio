import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Button from '@/components/shared/Button/Button';
import './projects.css';
import { projects } from '@/data/projectItem';

export default function ProjectsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-0 group-projects">
      {projects.map(({ title, description, tech, link, demo }, idx) => {
        const isHovered = hoveredIdx === idx;
        const isDimmed = hoveredIdx !== null && !isHovered;
        return (
          <motion.div
            key={title}
            tabIndex={0}
            className={clsx('project-row', isDimmed && 'opacity-50')}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* Right: Buttons */}
            <div className="flex flex-col gap-3 ml-4 min-w-[120px]">
              {link && (
                <Button
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className={clsx('transition-colors min-w-[112px]', isHovered && 'btn-primary')}
                >
                  View Repo
                </Button>
              )}
              {demo && (
                <Button
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className={clsx('transition-colors min-w-[112px]', isHovered && 'btn-primary')}
                >
                  Live Demo
                </Button>
              )}
            </div>
            {/* Main Info Left */}
            <div className="flex-1 min-w-0 pr-2">
              <h3
                className={clsx(
                  'subtitle font-normal text-[var(--color-text-muted)] transition-colors',
                  isHovered && 'text-[var(--color-primary)]',
                )}
              >
                {title}
              </h3>
              <div className="mt-1 text-body text-[var(--color-text-muted)]">{description}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tech.map((t) => (
                  <motion.span
                    key={t}
                    className={clsx(
                      'project-chip',
                      isHovered && 'border-[var(--color-primary)] text-[var(--color-primary)]',
                    )}
                    transition={{ duration: 0.18 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
