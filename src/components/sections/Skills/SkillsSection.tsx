import clsx from 'clsx';
import { m } from 'framer-motion';
import { skillGroups } from '@/data/skills';
import TechTag from '@/components/shared/TechTag';
import { TYPOGRAPHY } from '@/constants/styles';
import { createMotionVariants } from '@/utils/motionHelpers';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';

export default function SkillsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { fadeInUp } = createMotionVariants(prefersReducedMotion);

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
        {skillGroups.map(({ title, skills }) => (
          <m.li key={title} variants={fadeInUp}>
            <div className="mb-3">
              <h3
                className={clsx(
                  TYPOGRAPHY.SUBTITLE,
                  'mb-1 text-[var(--color-text)]',
                  'transition-colors duration-300 hover:text-[var(--color-secondary)]',
                )}
              >
                {title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <TechTag key={skill} tech={skill} size="small" useBrandStyles={false} />
              ))}
            </div>
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}
