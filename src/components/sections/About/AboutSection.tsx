"use client";

import { Mail } from "lucide-react";
import Button from "@/components/shared/Button/Button";
import { useTheme } from "@/hooks/useTheme";
import type { JSX } from "react";
import PaintSplashText from "@/components/shared/PaintSplash/PaintSplashEffect";

const aboutParagraphs = [
  "I'm a front-end developer with a strong focus on building creative, scalable, and user-centered web applications. With over five years of experience, I've contributed to large-scale redesigns, led the adoption of modern frameworks like React and Vue, and championed clean, maintainable code through component architecture, design systems, and cross-functional collaboration.",
  "My background in both development and design allows me to bridge the gap between usability and implementation. I'm driven by thoughtful problem-solving, mentorship (valuable in both directions, no matter how senior you are!), and a deep respect for clean UI and inclusive experiences. I thrive in team environments where curiosity, empathy, and technical excellence are equally valued.",
  "I didn't take a conventional path into tech - I left high school early and carved out a life through adaptability, persistence, and a refusal to let circumstances define my potential. Every twist in my journey shaped the developer I am today: someone who leads with empathy, speaks up when it counts, and stays grounded in purpose and principle. Whether I'm advocating for my team, untangling legacy code, or helping a city fix a flawed parking policy (true story), I bring the same mindset: listen carefully, act with intention, and don't settle for “good enough.”",
  "Outside of work, I find energy in the quiet things - winter mornings, rainy days, a good book, or a cozy fire. But when it comes to my team, I show up loudly. I care deeply about morale, psychological safety, and making space for others to thrive. People know they can count on me to get things done - with clarity, creativity, and follow-through. Whether I'm debugging merge conflicts or exploring the ethical edges of AI, I'm always asking: how can we do this better - and who are we doing it for?",
];

export default function AboutSection(): JSX.Element | null {
  const { theme } = useTheme();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="space-y-12 text-[var(--color-text)]"
    >
      <h1 id="about-title">
        <PaintSplashText tag="span" className="title">
          {theme === "dark"
            ? "Rise and shine..."
            : "Hello and, again, welcome to the Afton Gauntlett computer-aided enrichment center."}
        </PaintSplashText>
      </h1>

      {/* Main text content */}
      <div className="space-y-6 max-w-3xl">
        {aboutParagraphs.map((text, idx) => (
          <p key={idx} className="text-body">
            {text}
          </p>
        ))}
      </div>

      {/* CTA button */}
      <div className="flex justify-end">
        <Button href="#contact" icon={<Mail />}>
          Let’s Chat!
        </Button>
      </div>
    </section>
  );
}
