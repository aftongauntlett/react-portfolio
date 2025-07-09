// src/components/experience/TimelineItem.tsx
import { motion } from "framer-motion";
import clsx from "clsx";
import { type ReactNode } from "react";

type TimelineItemProps = {
  id: string;
  title: string;
  company: string;
  dates: string;
  isFirst?: boolean;
  isActive?: boolean;
  children: ReactNode;
};

/**
 * TimelineItem renders a single job entry with animations, title, dates, and description.
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
      className={clsx("timeline-item group", {
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
      <span
        className={clsx(
          "timeline-dot transition-colors timeline-dot-glow",
          isFirst && !isActive
            ? "bg-[var(--color-primary)]"
            : isActive
            ? "bg-[var(--color-primary)] animate-pulse"
            : "bg-gray-300 group-hover:bg-[var(--color-primary)]"
        )}
        aria-hidden="true"
      />

      <h3
        id={`${id}-heading`}
        className="timeline-title group-hover:text-[var(--color-primary)]"
      >
        {title} <span className="font-normal">@ {company}</span>
      </h3>

      <time
        id={`${id}-date`}
        className="timeline-date block text-sm text-[var(--color-muted)] mt-1"
      >
        {dates}
      </time>

      <div id={`${id}-desc`} className="mt-4 space-y-2">
        {children}
      </div>
    </motion.article>
  );
}
