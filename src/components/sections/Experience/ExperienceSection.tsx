import { useState } from "react";
import NewJobEntry from "@/components/experience/NewJobEntry";
import NextRoleSlot from "@/components/experience/NextRoleSlot";
import { jobs, type Job } from "@/data/jobTimeline";
import TimelineItem from "@/components/Timeline/TimelineItem";

/** Renders the interactive career timeline with optional new job entry */
export default function ExperienceSection() {
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const entries = [
    ...(currentJob
      ? [
          {
            id: "new-role",
            title: currentJob.title,
            company: currentJob.company,
            dates: currentJob.dates,
            isFirst: true,
            content: <NewJobEntry job={currentJob} />,
          },
        ]
      : []),
    ...jobs.map((job, idx) => ({
      id: `${job.company}-${idx}`,
      title: job.title,
      company: job.company,
      dates: job.dates,
      isFirst: !currentJob && idx === 0,
      content: (
        <ul className="timeline-list">
          {job.description.map((line, j) => (
            <li key={j}>{line}</li>
          ))}
        </ul>
      ),
    })),
  ];

  return (
    <div className="relative">
      {!currentJob && (
        <div className="absolute left-[1.125rem] top-[6px] bottom-0 w-px bg-[var(--color-line)] z-[-1]" />
      )}
      <div className="timeline-vertical space-y-12 transition-all duration-500">
        {!currentJob && (
          <TimelineItem
            id="next-role"
            title="What's my next role?"
            company=""
            dates="TBD"
            isFirst
            isHovered={hoveredId === "next-role"}
            isDimmed={hoveredId !== null && hoveredId !== "next-role"}
            onHover={setHoveredId}
          >
            <NextRoleSlot onNewJob={setCurrentJob} />
          </TimelineItem>
        )}
        {entries.map(({ id, title, company, dates, isFirst, content }) => (
          <TimelineItem
            key={id}
            id={id}
            title={title}
            company={company}
            dates={dates}
            isFirst={isFirst}
            isHovered={hoveredId === id}
            isDimmed={hoveredId !== null && hoveredId !== id}
            onHover={setHoveredId}
          >
            {content}
          </TimelineItem>
        ))}
      </div>
    </div>
  );
}
