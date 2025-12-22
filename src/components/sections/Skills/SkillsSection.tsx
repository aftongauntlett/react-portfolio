import clsx from 'clsx';
import { m } from 'framer-motion';
import { skills, skillCategories } from '@/data/skills';
import Tag from '@/components/shared/Tag';
import { TYPOGRAPHY } from '@/constants/styles';
import { createMotionVariants } from '@/utils/motionHelpers';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';

export default function SkillsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { fadeInUp } = createMotionVariants(prefersReducedMotion);

  const skillsByCategory = Object.entries(skillCategories).map(([key, label]) => ({
    key,
    label,
    skills: skills.filter((skill) => skill.category === key),
  }));

  return (
    <div>
      <m.ul
        className="space-y-12"
        aria-label="Technical skills by category"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: getMotionDuration(0.08, prefersReducedMotion),
              delayChildren: getMotionDuration(0.05, prefersReducedMotion),
            },
          },
        }}
      >
        {skillsByCategory.map(({ key, label, skills: categorySkills }) => (
          <m.li key={key} variants={fadeInUp}>
            <div className="mb-3">
              <h3
                className={clsx(
                  TYPOGRAPHY.SUBTITLE,
                  'mb-1 text-[var(--color-text)]',
                  'transition-colors duration-300 hover:text-[var(--color-secondary)]',
                )}
              >
                {label}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill) => (
                <Tag key={skill.name} variant="muted" size="small">
                  {skill.name}
                </Tag>
              ))}
            </div>
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}
