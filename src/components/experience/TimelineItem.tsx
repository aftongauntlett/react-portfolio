// src/components/experience/TimelineItem.tsx
import { motion } from "framer-motion";
import clsx from "clsx";

export type TimelineItemProps = {
  id: string;
  title: string;
  company?: string;
  dates?: string;
  isFirst?: boolean;
  isActive?: boolean;
  children: React.ReactNode;
};

/**
 * Renders a single job entry with animated dot, heading, and description.
 * Visually aligned and accessible.
 */
export default function TimelineItem({
  id,
  title,
  company,
  dates,
  isFirst = false,
  isActive = false,
  children,
}: TimelineItemProps) {
  return (
    <motion.article
      key={id}
      className={clsx("timeline-item group relative pl-12", {
        "first:mt-0": isFirst,
      })}
      initial={{ opacity: 0, y: isActive ? -10 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      tabIndex={0}
      aria-labelledby={`${id}-heading`}
      aria-describedby={`${id}-date ${id}-desc`}
    >
      {/* Timeline Dot */}
      <span
        className={clsx(
          "timeline-dot transition-all timeline-dot-glow absolute left-0 top-[1.25rem] translate-y-[-50%]",
          isFirst && !isActive
            ? "bg-[var(--color-primary)]"
            : isActive
            ? "bg-[var(--color-primary)] animate-pulse"
            : "bg-gray-300 group-hover:bg-[var(--color-primary)]"
        )}
        aria-hidden="true"
      />

      {/* Title */}
      <h3
        id={`${id}-heading`}
        className="timeline-title group-hover:text-[var(--color-primary)]"
      >
        {title}
        {company && <span className="font-normal"> @ {company}</span>}
      </h3>

      {/* Dates */}
      {dates && (
        <time
          id={`${id}-date`}
          className="timeline-date mt-1 block text-sm text-[var(--color-muted)]"
        >
          {dates}
        </time>
      )}

      {/* Description */}
      <div id={`${id}-desc`} className="mt-4 space-y-2">
        {children}
      </div>
    </motion.article>
  );
}
