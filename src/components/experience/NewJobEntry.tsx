"use client";

import type { Job } from "@/data/jobTimeline";
import { type JSX } from "react";

/** Renders a single-line description for a dynamic job entry */
export default function NewJobEntry({ job }: { job: Job }): JSX.Element {
  return (
    <ul className="list-none space-y-2 mt-4" role="list">
      {job.description.map((line, idx) => (
        <li
          key={idx}
          className="text-[var(--color-text)] text-base leading-snug"
        >
          {line}
        </li>
      ))}
    </ul>
  );
}
