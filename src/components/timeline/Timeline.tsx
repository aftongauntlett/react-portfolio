import TimelineItem from "./TimelineItem";
import type { Job } from "@/data/jobTimeline";

type TimelineProps = {
  items: Job[];
};

/** Renders a vertical timeline given an array of job items */
export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="timeline-vertical">
      {items.map((job, index) => (
        <TimelineItem
          key={job.title + job.company}
          id={job.title + job.company}
          title={job.title}
          company={job.company}
          dates={job.dates}
          isFirst={index === 0}
          isActive={false}
        >
          <ul className="list-disc pl-5 space-y-2">
            {job.description.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </TimelineItem>
      ))}
    </div>
  );
}
