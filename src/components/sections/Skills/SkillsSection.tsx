import { motion } from 'framer-motion';
import {
  siTypescript,
  siJavascript,
  siReact,
  siAstro,
  siTailwindcss,
  siStorybook,
  siFramer,
  siGreensock,
  siThreedotjs,
  siSupabase,
  siPostgresql,
  siGraphql,
  siReactquery,
  siVercel,
  siGit,
  siGithubcopilot,
  siClaude,
} from 'simple-icons';
import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa';
import { createMotionVariants } from '@/utils/motionHelpers';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';

type Skill =
  | {
      name: string;
      iconPath: string;
      Icon?: never;
    }
  | {
      name: string;
      Icon: IconType;
      iconPath?: never;
    };

type SkillGroup = {
  category: string;
  skills: Skill[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages & Frameworks',
    skills: [
      { name: 'TypeScript', iconPath: siTypescript.path },
      { name: 'JavaScript', iconPath: siJavascript.path },
      { name: 'React', iconPath: siReact.path },
      { name: 'Astro', iconPath: siAstro.path },
    ],
  },
  {
    category: 'Styling & Animation',
    skills: [
      { name: 'Tailwind CSS', iconPath: siTailwindcss.path },
      { name: 'Framer Motion', iconPath: siFramer.path },
      { name: 'GSAP', iconPath: siGreensock.path },
      { name: 'Three.js', iconPath: siThreedotjs.path },
    ],
  },
  {
    category: 'Data & Backend',
    skills: [
      { name: 'Supabase', iconPath: siSupabase.path },
      { name: 'PostgreSQL', iconPath: siPostgresql.path },
      { name: 'GraphQL', iconPath: siGraphql.path },
      { name: 'TanStack Query', iconPath: siReactquery.path },
    ],
  },
  {
    category: 'Tooling & Infrastructure',
    skills: [
      { name: 'Storybook', iconPath: siStorybook.path },
      { name: 'Git', iconPath: siGit.path },
      { name: 'Vercel', iconPath: siVercel.path },
      { name: 'AWS', Icon: FaAws },
    ],
  },
  {
    category: 'AI-Assisted Workflow',
    skills: [
      { name: 'GitHub Copilot', iconPath: siGithubcopilot.path },
      { name: 'Claude', iconPath: siClaude.path },
    ],
  },
];

function SkillIcon({ iconPath, Icon, size }: { iconPath?: string; Icon?: IconType; size: string }) {
  const iconClassName = `${size} text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-secondary)] dark:group-hover:text-[var(--color-primary)]`;

  if (Icon) {
    return <Icon className={iconClassName} aria-hidden="true" />;
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={iconClassName} aria-hidden="true">
      <path d={iconPath} />
    </svg>
  );
}

export default function SkillsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { fadeInUp } = createMotionVariants(prefersReducedMotion);

  return (
    <motion.div
      className="space-y-6"
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
      {SKILL_GROUPS.map(({ category, skills }) => (
        <div
          key={category}
          role="group"
          aria-label={category}
          className="grid grid-cols-1 gap-y-3 border-b border-[var(--color-line)] pb-6 last:border-b-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-x-6"
        >
          <h3 className="text-[13px] font-semibold leading-tight text-[var(--color-muted)] sm:pt-2">
            {category}
          </h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(2.5rem,1fr))] gap-x-2 gap-y-6 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-5">
            {skills.map(({ name, iconPath, Icon }) => (
              <motion.div
                key={name}
                variants={fadeInUp}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                className="group flex items-center justify-center gap-2.5 sm:justify-start"
              >
                <SkillIcon iconPath={iconPath} Icon={Icon} size="h-9 w-9 sm:h-6 sm:w-6" />
                <span className="sr-only whitespace-nowrap text-sm text-[var(--color-text)] sm:not-sr-only">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
