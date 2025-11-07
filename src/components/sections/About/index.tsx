import { useMemo, useState, useRef } from 'react';
import type { MouseEvent } from 'react';
import { m } from 'framer-motion';
import { TYPOGRAPHY, FOCUS_STYLES, TEXT_COMBINATIONS } from '@/constants/styles';
import { fadeInUp, staggerContainer } from '@/constants/animations';
import clsx from 'clsx';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const aboutParagraphs = [
  "I'm {Afton} - a frontend engineer with {5+ years} of experience building scalable, accessible UIs using {React}, {TypeScript}, and {Tailwind}. I've led frontend architecture at {Fortune 500} firms like {Booz Allen Hamilton} and built custom web platforms for clients through my business, {Gauntlet Designs}.",
  "I've shipped large {React} apps, migrated legacy {Angular} and {Node.js} systems, built reusable {component libraries}, and improved {accessibility} and {performance} across distributed teams. I'm known for simplifying complex UI problems and supporting teammates through clear {communication} and {documentation}.",
  'Before web development I worked in places that taught me how to learn fast. I spent time in law offices, a {biohazard lab}, and a vintage shop that ran on {century-old machinery}. I once had to figure out an old {IBM AS/400} system from scratch, translating manuals line by line just to keep it running. That same curiosity and persistence still guide how I build today.',
];

// Move outside component to prevent recreation on every render
const renderHighlightedText = (text: string) => {
  return text.split(/(\{[^}]+\})/).map((part, index) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      const content = part.slice(1, -1);
      return (
        <span key={index} className={clsx('font-semibold', TYPOGRAPHY.TEXT_PRIMARY)}>
          {content}
        </span>
      );
    }
    return part;
  });
};

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Track mouse position relative to image
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Memoize rendered paragraphs since they don't change
  const renderedParagraphs = useMemo(
    () =>
      aboutParagraphs.map((paragraph, index) => (
        <p
          key={index}
          className={clsx(TEXT_COMBINATIONS.BODY_RELAXED, FOCUS_STYLES.PRIMARY)}
          tabIndex={0}
          aria-label={`About paragraph ${index + 1} of ${aboutParagraphs.length}`}
        >
          {renderHighlightedText(paragraph)}
        </p>
      )),
    [],
  );

  return (
    <m.div
      className="w-full pt-8 md:pt-12"
      variants={prefersReducedMotion ? {} : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Hero Banner - Interactive color reveal */}
      <m.div variants={prefersReducedMotion ? {} : fadeInUp} className="space-y-12">
        <div
          ref={imageRef}
          className="relative h-64 md:h-72 overflow-hidden -mx-4 sm:-mx-6 md:mx-0 md:rounded-lg dark:cursor-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Light Mode: Color Image */}
          <img
            src="/afton-headshot.webp"
            alt="Afton Gauntlett - Frontend Engineer"
            className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-50 dark:hidden"
            loading="eager"
            fetchPriority="high"
          />

          {/* Dark Mode: Grayscale Image with Interactive Color Reveal */}
          <div className="hidden dark:block absolute inset-0">
            {/* Base Grayscale Image */}
            <img
              src="/afton-headshot.webp"
              alt="Afton Gauntlett - Frontend Engineer"
              className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-50 grayscale"
              loading="eager"
              fetchPriority="high"
            />

            {/* Color Image with Radial Mask */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: isHovering ? 1 : 0,
              }}
            >
              <img
                src="/afton-headshot.webp"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-50"
                loading="eager"
                style={{
                  maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
                  WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Gradient Overlay - Different for light/dark mode */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/55 to-background/35 dark:from-background/75 dark:via-background/50 dark:to-background/30" />

          {/* Hero Content with Montserrat */}
          <div className="relative h-full flex items-center px-4 sm:px-6 md:px-8">
            <div className="max-w-2xl">
              <m.h2
                variants={prefersReducedMotion ? {} : fadeInUp}
                className={clsx(
                  'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight',
                  'font-[family-name:var(--font-heading)]',
                  'text-[#4a4a4a] dark:text-[#e8e8e8]',
                  'leading-tight',
                )}
                style={{ letterSpacing: '0.01em' }}
              >
                About Me
              </m.h2>
            </div>
          </div>
        </div>

        {/* Bio Content */}
        <div className="space-y-6 max-w-4xl">{renderedParagraphs}</div>
      </m.div>
    </m.div>
  );
}
