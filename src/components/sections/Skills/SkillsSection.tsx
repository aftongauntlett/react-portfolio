import clsx from 'clsx';
import { motion } from 'framer-motion';
import { skills, skillCategories } from '@/data/skills';
import type { Skill } from '@/data/skills';
import { useHoverGroup } from '@/hooks/useHoverGroup';
import { TEXT_PRIMARY_HOVER, TYPOGRAPHY, TEXT_COMBINATIONS } from '@/constants/styles';

const SkillTag = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      className="group cursor-default"
    >
      <div
        className={clsx(
          'px-3 py-2 rounded border transition-all duration-200',
          'border-[var(--color-line)] bg-[var(--color-surface)]',
          'hover:border-[var(--color-primary)]/60 hover:bg-[var(--color-primary)]/5',
          'hover:shadow-sm',
        )}
      >
        <span
          className={clsx(
            TYPOGRAPHY.TEXT_SMALL,
            'text-[var(--color-text)] group-hover:text-[var(--color-secondary)] transition-colors duration-200',
          )}
        >
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

const categoryDescriptions = {
  frontend:
    'Modern frameworks, languages, and methodologies for building exceptional user interfaces',
  backend: 'Server-side technologies, databases, and APIs for robust application architecture',
  tools: 'Development environment, design tools, and productivity software for efficient workflows',
} as const;

export default function SkillsSection() {
  const { setHovered, clearHovered, isDimmed } = useHoverGroup();
  const skillsByCategory = Object.entries(skillCategories).map(([key, label]) => ({
    key,
    label,
    skills: skills.filter((skill) => skill.category === key),
    description: categoryDescriptions[key as keyof typeof categoryDescriptions],
  }));

  return (
    <div className="space-y-12" role="list" aria-label="Technical skills by category">
      {skillsByCategory.map(({ key, label, skills: categorySkills, description }, categoryIdx) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: categoryIdx * 0.1 }}
          viewport={{ once: true }}
          onMouseEnter={() => setHovered(categoryIdx)}
          onMouseLeave={clearHovered}
          className={clsx(
            'transition-opacity duration-300',
            isDimmed(categoryIdx) && '!opacity-40',
          )}
        >
          <div className="mb-6">
            <h3 className={clsx(TYPOGRAPHY.HEADING_3, 'mb-2', TEXT_PRIMARY_HOVER)}>{label}</h3>
            <p className={clsx(TEXT_COMBINATIONS.SMALL_MUTED, 'max-w-2xl leading-relaxed')}>
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {categorySkills.map((skill, index) => (
              <SkillTag key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
