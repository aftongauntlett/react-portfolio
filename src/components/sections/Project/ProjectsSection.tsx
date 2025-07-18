import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/shared/Button/Button";
import "./Projects.css";
import clsx from "clsx";

const projects = [
  {
    title: "Programming Tutorial",
    description: "TBD...",
    tech: ["React", "Vite", "TailwindCSS"],
    image: "https://placehold.co/480x270/222/fff?text=Project+Screenshot",
    link: "#",
    demo: "#",
  },
  {
    title: "Guess-the-Glass App",
    description:
      "Wine tasting game powered by a public dataset and custom scoring logic. Built with Next.js and TypeScript.",
    tech: ["Next.js", "TypeScript", "Public API"],
    image: "https://placehold.co/480x270/333/eee?text=Project+Screenshot",
    link: "#",
    demo: "#",
  },
];

export default function ProjectsSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map(({ title, description, tech, image, link, demo }) => {
        const isActive = hovered === title || hovered === null;
        return (
          <motion.div
            key={title}
            initial="rest"
            animate={hovered === title ? "hover" : "rest"}
            variants={{
              rest: {
                scale: 1,
                boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
                background: "var(--color-background)",
              },
              hover: {
                scale: 1.018,
                boxShadow: "0 10px 36px rgba(0,0,0,0.16)",
                background: "var(--color-background)",
                transition: { type: "spring", stiffness: 260, damping: 20 },
              },
            }}
            className={clsx(
              "group flex flex-col rounded-2xl relative transition p-6 overflow-hidden project-card-custom h-full justify-between gap-3",
              !isActive && "opacity-60 grayscale"
            )}
            onMouseEnter={() => setHovered(title)}
            onMouseLeave={() => setHovered(null)}
            tabIndex={0}
            role="region"
            aria-label={title}
          >
            {/* Animated right border */}
            <AnimatePresence>
              {hovered === title && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "100%", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.6, 0.05, 0.01, 0.9] }}
                  style={{
                    width: "4px",
                    right: 0,
                    top: 0,
                    borderRadius: "4px",
                  }}
                  className="absolute bg-[var(--color-primary)]"
                />
              )}
            </AnimatePresence>

            {/* Subtle active overlay */}
            <AnimatePresence>
              {hovered === title && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.06 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[var(--color-primary)] pointer-events-none"
                  style={{ zIndex: 1 }}
                />
              )}
            </AnimatePresence>

            {/* Project Image */}
            <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden bg-[var(--color-dark)] flex items-center justify-center relative z-10">
              <img src={image} alt="" className="object-cover w-full h-full" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 justify-between relative gap-3 z-10">
              <div className="flex flex-col gap-3">
                <h3 className="subtitle transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                  {title}
                </h3>
                <p className="text-muted">{description}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {tech.map((t) => (
                    <span key={t} className="project-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-5 mt-4">
                <Button href={link} variant="link">
                  View Repo
                </Button>
                {demo && (
                  <Button href={demo} variant="link">
                    Live Demo
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
