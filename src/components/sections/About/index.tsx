import { useState, useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';
import LottieHello from './LottieHello';

const aboutParagraphs = [
  "I'm {Afton} - a senior frontend engineer with {5+ years} of experience building scalable, accessible UIs using {React}, {TypeScript}, and component-driven design systems. I've led frontend architecture at companies ranging from Fortune 500 firms like {Booz Allen Hamilton} to small businesses generating {$300M+} annually.",
  "As the founder of {Gauntlet Designs}, I built custom platforms from the ground up. This included a complete overhaul of an internal app for the 6th-largest {Applebee's} franchisee, which still serves thousands of employees and fundraisers across multiple states.",
  'At {Booz Allen}, I led the frontend efforts for 7 {React} apps, introduced multi-theme systems and reusable component libraries, migrated legacy codebases from {Angular/Node.js} to modular {React/Flask}, integrated collaborative tools like {Figma} and {TanStack Query}, and advocated for {accessibility} and code maintainability across multiple teams.',
];

// Move outside component to prevent recreation on every render
const renderHighlightedText = (text: string) => {
  return text.split(/(\{[^}]+\})/).map((part, index) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      const content = part.slice(1, -1);
      return (
        <span key={index} className="font-semibold text-[var(--color-primary)]">
          {content}
        </span>
      );
    }
    return part;
  });
};

export default function AboutSection() {
  const [planetColor] = useState<'secondary' | 'muted'>('secondary');
  const { theme } = useTheme();

  // Memoize rendered paragraphs since they don't change
  const renderedParagraphs = useMemo(
    () =>
      aboutParagraphs.map((paragraph, index) => (
        <p key={index} className="text-body leading-relaxed">
          {renderHighlightedText(paragraph)}
        </p>
      )),
    [],
  );

  return (
    <div className="w-full">
      {/* Hero Section with Lottie Animation - Responsive spacing */}
      <div className="relative flex justify-center items-center min-h-[50px] w-full my-16 md:my-32 lg:my-48">
        {theme === 'light' && (
          <>
            {/* Twinkling Sparkles */}
            <div className="absolute inset-0 flex justify-center items-center">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                  style={{
                    left: `${50 + Math.cos((i * 30 * Math.PI) / 180) * (120 + Math.random() * 60)}px`,
                    top: `${50 + Math.sin((i * 30 * Math.PI) / 180) * (120 + Math.random() * 60)}px`,
                    animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Background Lottie Animation */}
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <div className="w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <LottieHello
              opacity={0.15}
              speed={0.3}
              planetColor={planetColor}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Foreground Hello Text */}
        <div className="relative z-20 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold hello-gradient drop-shadow-2xl">
            Hello
          </h1>
        </div>
      </div>

      {/* Story Content Section */}
      <div className="mx-auto">
        <div className="space-y-6 mb-16">{renderedParagraphs}</div>
      </div>
    </div>
  );
}
