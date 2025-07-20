import { Mail } from "lucide-react";
import Button from "@/components/shared/Button/Button";
import PaintSplashText from "@/components/shared/PaintSplash/PaintSplashEffect";

const aboutParagraphs = [
  "I’m a frontend developer with 5+ years of experience building accessible interfaces and scalable design systems using {React}, {TypeScript}, and modern frameworks. I’ve led large-scale migrations, worked closely with designers and engineers, and helped establish frontend architecture that balances usability, maintainability, and performance.",

  "I specialize in simplifying complex systems, improving developer workflows, and designing reusable components that scale across teams. I care about visual polish, accessibility, and writing code that’s easy to build on long-term. I’m often the person who brings order to messy frontends and helps set patterns that others can follow!",

  "Recently, I helped lead a full frontend rebuild of a major government platform at {Booz Allen Hamilton}, supported the launch of a new intelligence product, built a custom LLM chatbot interface using {Claude Sonnet} ({React} + {Python}) and set up {VSCode} scripts for team-wide use with {Continue}, collaborated on a dataset sharing platform similar to {Kaggle}, and volunteered with a retro tech non-profit to build a tech museum website using {Eleventy (11ty)}, producing pure {HTML} and {CSS} that renders on {Pentium 90 hardware} with {Netscape Navigator 4.0}. Each of these projects demonstrates my ability to deliver accessible, high-performance solutions under unique technical and organizational constraints.",

  "Currently exploring frontend roles in commercial, mission-driven, or product-focused teams.",
];

function markBold(str: string) {
  const parts = str.split(/({.*?})/g);
  return parts.map((part, i) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      return (
        <span
          key={i}
          className="font-medium text-[var(--color-primary-lighter)]"
        >
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
}

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-content pt-16 space-y-12 text-[var(--color-text)]"
    >
      <h1 id="about-title" className="mb-8">
        <PaintSplashText tag="span" className="title block">
          Afton Gauntlett
        </PaintSplashText>
      </h1>

      {/* Main text content */}
      <div className="space-y-6 max-w-3xl">
        {aboutParagraphs.map((text, idx) => (
          <p key={idx} className="text-body">
            {markBold(text)}
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
