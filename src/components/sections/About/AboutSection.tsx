import { Mail } from "lucide-react";
import Button from "@/components/shared/Button/Button";
import PaintSplashText from "@/components/shared/PaintSplash/PaintSplashEffect";

const aboutParagraphs = [
  "Hi, I’m Afton. I am a {senior frontend engineer} with {5+ years} of experience building scalable, accessible UIs using {React}, {TypeScript}, and component-driven design systems. I’ve led frontend architecture at companies ranging from a {Fortune 500} firm like {Booz Allen Hamilton} to small businesses generating {$300M+} annually.",

  "As the founder of {Gauntlet Designs}, I built custom platforms from the ground up. This included a complete overhaul of an internal app for the 6th-largest {Applebee’s franchisee}, which still serves thousands of employees and fundraisers across multiple states.",

  "At {Booz Allen}, I led the frontend strategy for 7 React apps, introduced multi-theme systems and reusable component libraries, and built a secure, {LLM-powered} onboarding chatbot using {Claude Sonnet} and custom {VSCode} tooling. I also migrated legacy codebases from {Angular} to modular {React}, integrated collaborative tools like {Figma} and {TanStack Query}, and advocated for {accessibility} and code maintainability across multiple teams.",

  "Outside of my professional work, I’m creating a retro-tech museum {website} for a non-profit using pure {HTML}/{CSS}. This project is designed specifically to run smoothly on vintage hardware ({Pentium 90}) and classic browsers ({Netscape Navigator 4.0}). I enjoy quirky constraints, clean code, and bringing good ideas to life on-screen!",
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
          Contact Me
        </Button>
      </div>
    </section>
  );
}
