"use client";

import { useState, type JSX } from "react";
import NewJobEntry from "@/components/experience/NewJobEntry";
import NextRoleSlot from "@/components/experience/NextRoleSlot";
import { jobs, type Job } from "@/data/jobTimeline";
import TimelineItem from "../experience/TimelineItem";

/** Renders the interactive career timeline with optional new job entry */
export default function ExperienceSection(): JSX.Element {
  const [currentJob, setCurrentJob] = useState<Job | null>(null);

  const entries = [
    ...(currentJob
      ? [
          {
            id: "new-role",
            title: currentJob.title,
            company: currentJob.company,
            dates: currentJob.dates,
            isFirst: true, // this should always be first
            isActive: true,
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
      isActive: !currentJob && idx === 0,
      content: (
        <ul className="list-none space-y-2 mt-4" role="list">
          {job.description.map((line, j) => (
            <li key={j} className="text-body">
              {line}
            </li>
          ))}
        </ul>
      ),
    })),
  ];

  return (
    <div className="relative">
      <div className="absolute left-[1.125rem] top-0 bottom-0 w-px bg-[var(--color-line)] z-[-1]" />
      <div className="timeline-vertical space-y-12 transition-all duration-500 group">
        {!currentJob && (
          <TimelineItem
            id="next-role"
            title="What's my next role?"
            company="To Be Determined"
            dates="Coming Soon"
            isFirst={true}
            isActive={false}
          >
            <NextRoleSlot onNewJob={setCurrentJob} />
          </TimelineItem>
        )}
        {entries.map(
          ({ id, title, company, dates, isFirst, isActive, content }) => (
            <TimelineItem
              key={id}
              id={id}
              title={title}
              company={company}
              dates={dates}
              isFirst={isFirst}
              isActive={isActive}
            >
              {content}
            </TimelineItem>
          )
        )}
      </div>
    </div>
  );
}
