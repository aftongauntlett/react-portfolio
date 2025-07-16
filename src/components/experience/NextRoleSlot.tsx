import { useState, type FormEvent, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Job } from "@/data/jobTimeline";
import Button from "../shared/Button";

/** Interactive form for proposing a custom new job entry */
export default function NextRoleSlot({
  onNewJob,
}: {
  onNewJob: (job: Job) => void;
}): JSX.Element {
  const [formStage, setFormStage] = useState<"teaser" | "form">("teaser");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (): void => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    onNewJob({
      title,
      company,
      dates: `Available: ${formatted}`,
      description: [
        `We both agree – I would make a great ${title} at ${company}. Let’s chat!`,
      ],
    });

    setFormStage("teaser"); // reset back to teaser
    setCompany("");
    setTitle("");
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {formStage === "teaser" && (
        <Button
          asDiv
          onDivClick={() => setFormStage("form")}
          motionProps={{
            initial: { opacity: 0, y: -4 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -4 },
          }}
        >
          <span className="italic transition-transform duration-300 group-hover:scale-105 group-hover:font-semibold">
            What's my next role?
          </span>
        </Button>
      )}

      {formStage === "form" && (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="w-full space-y-4 rounded-lg bg-[var(--color-line)]/10"
        >
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              if (company.trim() && title.trim()) handleSubmit();
            }}
            className="space-y-4"
          >
            <label className="block text-sm font-medium text-[var(--color-text)]">
              What's the name of your company?
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Inc"
                className="mt-1 w-full rounded-md border border-[var(--color-line)] bg-transparent px-3 py-2 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </label>

            <label className="block text-sm font-medium text-[var(--color-text)]">
              And what would my job title be?
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Front-End Engineer"
                className="mt-1 w-full rounded-md border border-[var(--color-line)] bg-transparent px-3 py-2 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </label>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={!company.trim() || !title.trim()}>
                Submit
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
