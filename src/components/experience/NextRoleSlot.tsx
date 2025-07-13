"use client";

import { useState, type FormEvent, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Job } from "@/data/jobTimeline";

/** Interactive form for proposing a custom new job entry */
export default function NextRoleSlot({
  onNewJob,
}: {
  onNewJob: (job: Job) => void;
}): JSX.Element {
  const [stage, setStage] = useState<"teaser" | "form">("teaser");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (): void => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const dates = `Available: ${formatted}`;
    onNewJob({
      title,
      company,
      dates,
      description: [
        `We both agree, I would make a great ${title} at ${company}. Let’s chat!`,
      ],
    });
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {stage === "teaser" && (
        <motion.div
          className="cursor-pointer text-[var(--color-primary)] hover:opacity-90"
          role="button"
          tabIndex={0}
          onClick={() => setStage("form")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setStage("form");
          }}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
        >
          <span className="italic">Click here to propose my next role</span>
        </motion.div>
      )}

      {stage === "form" && (
        <motion.form
          key="form"
          className="space-y-4 bg-[var(--color-line)]/10 p-4 rounded-lg"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            if (company.trim() && title.trim()) handleSubmit();
          }}
        >
          <label className="block text-[var(--color-text)] text-sm font-medium">
            Company Name
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Acme Inc"
              className="mt-1 w-full rounded-md border border-[var(--color-line)] bg-transparent px-3 py-2 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </label>

          <label className="block text-[var(--color-text)] text-sm font-medium">
            Job Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Front-End Engineer"
              className="mt-1 w-full rounded-md border border-[var(--color-line)] bg-transparent px-3 py-2 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </label>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={!company.trim() || !title.trim()}>
              Button
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
