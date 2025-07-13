"use client";

import type { Job } from "@/data/jobTimeline";
import { type JSX } from "react";

/** Renders a single-line description for a dynamic job entry */
export default function NewJobEntry({ job }: { job: Job }): JSX.Element | null {
  const nonEmptyLines = job.description.filter((line) => line.trim() !== "");

  if (nonEmptyLines.length === 0) return null;

  return (
    <ul className="list-none space-y-2 mt-4 pl-6" role="list">
      {nonEmptyLines.map((line, idx) => (
        <li key={idx} className="text-body pl-2">
          {line}
        </li>
      ))}
    </ul>
  );
}
