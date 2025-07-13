import { motion } from "framer-motion";
import clsx from "clsx";
import { HelpCircle } from "lucide-react";

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
 * TimelineItem renders a single experience entry in a vertical timeline.
 * Uses CSS Grid to align the marker and content cleanly without manual offsets.
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
  const isQuestion = title.toLocaleLowerCase() === "what's my next role?";

  const marker = isQuestion ? (
    <div className="timeline-dot-bg">
      <HelpCircle className="timeline-icon" strokeWidth={2} />
    </div>
  ) : (
    <span className="timeline-dot" />
  );

  return (
    <motion.article
      key={id}
      className={clsx("group grid grid-cols-[2rem_1fr] gap-x-6 relative", {
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
      {/* Marker Column */}
      <div className="relative flex justify-center">
        <div className="ms-1">{marker}</div>
      </div>

      {/* Content Column */}
      <div>
        <h3
          id={`${id}-heading`}
          className="subtitle group-hover:text-[var(--color-primary)]"
        >
          {title}
          {company && <span className="font-normal"> @ {company}</span>}
        </h3>

        {dates && (
          <time id={`${id}-date`} className="muted">
            {dates}
          </time>
        )}

        <div id={`${id}-desc`} className="mt-4 space-y-2">
          {children}
        </div>
      </div>
    </motion.article>
  );
}
