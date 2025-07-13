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
 * Adds focus/hover interactivity to highlight one entry while fading others.
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
  const isQuestion = title.toLowerCase() === "what's my next role?";

  return (
    <motion.article
      className={clsx(
        "group grid grid-cols-[2rem_1fr] gap-x-6 relative rounded-lg transition-all duration-300",
        {
          "first:mt-0": isFirst,
        }
      )}
      initial={{ opacity: 0, y: isActive ? -10 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      tabIndex={0}
      aria-labelledby={`${id}-heading`}
      aria-describedby={`${id}-date ${id}-desc`}
    >
      <div className="relative flex justify-center">
        <div className="ms-1">
          {isQuestion ? (
            <div className="timeline-dot-bg">
              <HelpCircle className="timeline-icon" strokeWidth={2} />
            </div>
          ) : (
            <span className="timeline-dot" />
          )}
        </div>
      </div>

      <div className="transition-all duration-300 text-muted group-hover:text-muted hover:text-[var(--color-text)]">
        <h3 id={`${id}-heading`} className="subtitle">
          {title}
          {company && <span className="font-normal"> @ {company}</span>}
        </h3>
        {dates && <time id={`${id}-date`}>{dates}</time>}
        <div id={`${id}-desc`} className="mt-4 space-y-2">
          {children}
        </div>
      </div>
    </motion.article>
  );
}
