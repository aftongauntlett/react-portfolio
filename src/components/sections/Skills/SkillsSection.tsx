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

const SKILLS: Skill[] = [
  { name: 'TypeScript', iconPath: siTypescript.path },
  { name: 'JavaScript', iconPath: siJavascript.path },
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
  { name: 'Claude', iconPath: siClaude.path },
  { name: 'AWS', Icon: FaAws },
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
      className="grid grid-cols-4 gap-y-8 pt-4 sm:grid-cols-6 lg:grid-cols-8"
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
      {SKILLS.map(({ name, iconPath, Icon }) => (
        <motion.div
          key={name}
          variants={fadeInUp}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="group flex flex-col items-center gap-2"
        >
          <SkillIcon iconPath={iconPath} Icon={Icon} size="h-8 w-8" />
          <span className="whitespace-nowrap text-center text-[11px] leading-tight text-[var(--color-text)]">
            {name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
