import { motion } from 'framer-motion';
import {
  siTypescript,
  siReact,
  siAstro,
  siTailwindcss,
  siStorybook,
  siFramer,
  siGreensock,
  siThreedotjs,
  siSupabase,
  siPostgresql,
  siVercel,
  siGit,
  siGithubcopilot,
} from 'simple-icons';
import { createMotionVariants } from '@/utils/motionHelpers';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';

interface Skill {
  name: string;
  iconPath?: string;
  abbr?: string;
}

const SKILLS: Skill[] = [
  { name: 'TypeScript', iconPath: siTypescript.path },
  { name: 'React', iconPath: siReact.path },
  { name: 'Astro', iconPath: siAstro.path },
  { name: 'Tailwind CSS', iconPath: siTailwindcss.path },
  { name: 'Framer Motion', iconPath: siFramer.path },
  { name: 'GSAP', iconPath: siGreensock.path },
  { name: 'Three.js', iconPath: siThreedotjs.path },
  { name: 'Storybook', iconPath: siStorybook.path },
  { name: 'Supabase', iconPath: siSupabase.path },
  { name: 'PostgreSQL', iconPath: siPostgresql.path },
  { name: 'Vercel', iconPath: siVercel.path },
  { name: 'Git', iconPath: siGit.path },
  { name: 'GitHub Copilot', iconPath: siGithubcopilot.path },
  { name: 'WCAG 2.2 AA', abbr: 'WCAG' },
  { name: 'Section 508', abbr: '508' },
  { name: 'CSS Animations', abbr: 'CSS' },
  { name: 'Canvas', abbr: 'cnvs' },
  { name: 'Interaction Design', abbr: 'IxD' },
  { name: 'AWS', abbr: 'AWS' },
];

// ── Shared icon/abbr renderer ─────────────────────────────────────────────────

function SkillIcon({ iconPath, abbr, size }: { iconPath?: string; abbr?: string; size: string }) {
  if (iconPath) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${size} text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-primary)]`}
        aria-hidden="true"
      >
        <path d={iconPath} />
      </svg>
    );
  }
  return (
    <span
      className={`flex items-center justify-center font-mono font-bold text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-primary)] ${size}`}
      aria-hidden="true"
    >
      {abbr}
    </span>
  );
}

export default function SkillsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { fadeInUp } = createMotionVariants(prefersReducedMotion);

  return (
    <motion.div
      className="flex flex-wrap justify-start gap-x-8 gap-y-8 pt-4"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: getMotionDuration(0.04, prefersReducedMotion),
            delayChildren: getMotionDuration(0.05, prefersReducedMotion),
          },
        },
      }}
    >
      {SKILLS.map(({ name, iconPath, abbr }) => (
        <motion.div
          key={name}
          variants={fadeInUp}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="group flex w-20 flex-col items-center gap-2"
        >
          <SkillIcon iconPath={iconPath} abbr={abbr} size="h-8 w-8" />
          <span className="text-center text-[11px] leading-tight text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-text)]">
            {name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
