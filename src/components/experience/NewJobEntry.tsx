import type { Job } from '@/data/jobTimeline';

/** Renders a single-line description for a dynamic job entry */
export default function NewJobEntry({ job }: { job: Job }) {
  const nonEmptyLines = job.description.filter((line) => line.trim() !== '');
  if (nonEmptyLines.length === 0) return null;

  return (
    <ul className="timeline-list">
      {nonEmptyLines.map((line, idx) => (
        <li key={idx}>{line}</li>
      ))}
    </ul>
  );
}
