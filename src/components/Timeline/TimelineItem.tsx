import { motion } from "framer-motion";
import clsx from "clsx";
import { HelpCircle } from "lucide-react";
import React from "react";
import "./Timeline.css";

export type TimelineItemProps = {
  id: string;
  title: string;
  company?: string;
  dates?: string;
  isFirst?: boolean;
  isHovered?: boolean;
  isDimmed?: boolean;
  onHover: (id: string | null) => void;
  children: React.ReactNode;
};

export default function TimelineItem({
  id,
  title,
  company,
  dates,
  isFirst = false,
  isHovered = false,
  isDimmed = false,
  onHover,
  children,
}: TimelineItemProps) {
  const isQuestion = title.toLowerCase() === "what's my next role?";

  return (
    <motion.article
      className={clsx(
        "timeline-item grid grid-cols-[2rem_1fr] gap-x-8 items-start relative rounded-lg transition-all duration-300",
        {
          "first:mt-0": isFirst,
          "opacity-50": isDimmed,
        }
      )}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      tabIndex={0}
      aria-labelledby={`${id}-heading`}
      aria-describedby={`${id}-date ${id}-desc`}
    >
      <div className="relative flex items-start justify-center pt-1 w-full">
        <div className="ms-1">
          {isQuestion ? (
            <div className="timeline-dot-bg">
              <HelpCircle className="timeline-icon" strokeWidth={2} />
            </div>
          ) : (
            <span
              className={clsx("timeline-dot", {
                "bg-[var(--color-primary)] shadow-[0_0_4px_var(--color-primary)]":
                  isHovered,
                "bg-[var(--color-line)]": !isHovered,
              })}
            />
          )}
        </div>
      </div>

      <div
        className={clsx(
          "rounded-md hover:bg-[var(--color-line)]/10",
          isDimmed && "text-muted"
        )}
      >
        <h3
          id={`${id}-heading`}
          className={clsx("subtitle font-normal", isHovered && "font-bold")}
        >
          {title}
          {company && (
            <span
              className={clsx(
                "font-normal",
                isHovered && "text-[var(--color-primary)]"
              )}
            >
              {" "}
              @ {company}
            </span>
          )}
        </h3>
        {dates && (
          <time id={`${id}-date`} className="text-muted">
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
