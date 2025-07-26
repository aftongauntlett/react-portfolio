import clsx from 'clsx';
import MotionSection from '@/components/shared/MotionSection';
import { skills, skillCategories } from '@/data/skills';
import { useHoverGroup } from '@/hooks/useHoverGroup';

export default function SkillsSection() {
  const { setHovered, clearHovered, isDimmed } = useHoverGroup();

  const skillsByCategory = Object.entries(skillCategories).map(([key, label]) => ({
    key,
    label,
    skills: skills.filter((skill) => skill.category === key),
  }));

  return (
    <MotionSection className="space-y-6">
      {skillsByCategory.map(({ key, label, skills: categorySkills }, categoryIdx) => (
        <div
          key={key}
          onMouseEnter={() => setHovered(categoryIdx)}
          onMouseLeave={clearHovered}
          className={clsx(
            'group p-6 rounded-lg border border-[var(--color-line)]',
            'transition-all duration-300',
            'hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5',
            'hover:shadow-lg hover:shadow-[var(--color-primary)]/10',
            isDimmed(categoryIdx) && '!opacity-50',
          )}
        >
          <h3 className="subtitle text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors mb-4">
            {label}
          </h3>

          <div className="text-sm">
            <div className="hidden md:flex flex-wrap items-center gap-2">
              {categorySkills.map((skill, index) => (
                <span key={skill.name} className="flex items-center">
                  <span
                    className={clsx(
                      'font-medium text-[var(--color-text)]',
                      'transition-colors duration-300',
                      'group-hover:text-[var(--color-text)]',
                    )}
                  >
                    {skill.name}
                  </span>
                  {index < categorySkills.length - 1 && (
                    <span
                      className={clsx(
                        'mx-2 text-[var(--color-muted)]',
                        'transition-colors duration-300',
                        'group-hover:text-[var(--color-secondary)]',
                      )}
                    >
                      •
                    </span>
                  )}
                </span>
              ))}
            </div>

            <div className="md:hidden space-y-2">
              {categorySkills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <span
                    className={clsx(
                      'w-2 h-0.5 bg-[var(--color-muted)]',
                      'transition-colors duration-300',
                      'group-hover:bg-[var(--color-secondary)]',
                    )}
                  />
                  <span
                    className={clsx(
                      'font-medium text-[var(--color-text)]',
                      'transition-colors duration-300',
                      'group-hover:text-[var(--color-text)]',
                    )}
                  >
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </MotionSection>
  );
}
