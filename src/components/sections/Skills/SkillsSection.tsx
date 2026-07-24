import { motion } from 'framer-motion';
import {
  siTypescript,
  siJavascript,
  siReact,
  siAstro,
  siVuedotjs,
  siAngular,
  siTailwindcss,
  siStorybook,
  siFramer,
  siGreensock,
  siThreedotjs,
  siFigma,
  siSupabase,
  siPostgresql,
  siGraphql,
  siTanstack,
  siNodedotjs,
  siPython,
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
      { name: 'Vue', iconPath: siVuedotjs.path },
      { name: 'Angular', iconPath: siAngular.path },
    ],
  },
  {
    category: 'Styling & Animation',
    skills: [
      { name: 'Tailwind CSS', iconPath: siTailwindcss.path },
      { name: 'Framer Motion', iconPath: siFramer.path },
      { name: 'GSAP', iconPath: siGreensock.path },
      { name: 'Three.js', iconPath: siThreedotjs.path },
      { name: 'Figma', iconPath: siFigma.path },
    ],
  },
  {
    category: 'Backend & Data',
    skills: [
      { name: 'Node.js', iconPath: siNodedotjs.path },
      { name: 'Python', iconPath: siPython.path },
      { name: 'Supabase', iconPath: siSupabase.path },
      { name: 'PostgreSQL', iconPath: siPostgresql.path },
      { name: 'GraphQL', iconPath: siGraphql.path },
      { name: 'TanStack', iconPath: siTanstack.path },
    ],
  },
  {
    category: 'Tooling & Infrastructure',
    skills: [
      { name: 'Storybook', iconPath: siStorybook.path },
      { name: 'Git', iconPath: siGit.path },
      { name: 'Vercel', iconPath: siVercel.path },
      { name: 'AWS', Icon: FaAws },
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
          className="group/row grid grid-cols-1 gap-y-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-card)] p-4 sm:grid-cols-[7rem_1fr] sm:items-center sm:gap-x-4 sm:p-5"
        >
          <h3 className="text-[13px] font-semibold leading-tight text-[var(--color-muted)] transition-colors duration-300 group-hover/row:text-[var(--color-primary)]">
            {category}
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-5">
            {skills.map(({ name, iconPath, Icon }) => (
              <motion.div
                key={name}
                variants={fadeInUp}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                className="group flex items-center gap-2 sm:gap-2.5"
              >
                <SkillIcon iconPath={iconPath} Icon={Icon} size="h-6 w-6" />
                <span className="whitespace-nowrap text-sm text-[var(--color-text)]">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
