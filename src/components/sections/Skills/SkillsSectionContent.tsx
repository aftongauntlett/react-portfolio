import clsx from 'clsx';
import { skills, skillCategories } from '@/data/skills';
import { TRANSITION_COLORS, TEXT_PRIMARY_HOVER } from '@/constants/styles';
import { TYPOGRAPHY } from '@/constants/typography';

export default function SkillsSectionContent() {
  const skillsByCategory = Object.entries(skillCategories).map(([key, label]) => ({
    key,
    label,
    skills: skills.filter((skill) => skill.category === key),
  }));
  return (
    <ul className="space-y-6" aria-label="Technical skills by category">
      {skillsByCategory.map(({ key, label, skills: categorySkills }, categoryIdx) => (
        <li
          key={key}
          tabIndex={0}
          aria-labelledby={`skills-category-${categoryIdx}`}
          className={clsx(
            'block p-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30 transition-colors duration-300 group',
          )}
        >
          <h3
            id={`skills-category-${categoryIdx}`}
            className={clsx(`${TYPOGRAPHY.TEXT_LARGE} font-semibold mb-4`, TEXT_PRIMARY_HOVER)}
          >
            {label}
          </h3>
          <div className={TYPOGRAPHY.TEXT_SMALL}>
            <ul
              className="hidden md:flex flex-wrap items-center gap-2"
              aria-label={`${label} skills`}
            >
              {categorySkills.map((skill, index) => (
                <li key={skill.name} className="flex items-center">
                  <span
                    tabIndex={0}
                    aria-label={`${skill.name} skill`}
                    className={clsx(
                      'font-medium text-[var(--color-text)]',
                      TRANSITION_COLORS,
                      'group-hover:text-[var(--color-text)]',
                      'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-1',
                      'focus-visible:bg-[var(--color-primary)]/10 rounded px-1',
                    )}
                  >
                    {skill.name}
                  </span>
                  {index < categorySkills.length - 1 && (
                    <span
                      className={clsx(
                        'mx-2 text-[var(--color-muted)]',
                        TRANSITION_COLORS,
                        'text-[var(--color-secondary)]',
                        'md:group-hover:text-[var(--color-secondary)]',
                      )}
                    >
                      •
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <ul className="md:hidden space-y-2" aria-label={`${label} skills`}>
              {categorySkills.map((skill) => (
                <li key={skill.name} className="flex items-center gap-3">
                  <span
                    className={clsx(
                      'w-2 h-0.5 bg-[var(--color-muted)]',
                      TRANSITION_COLORS,
                      'bg-[var(--color-secondary)]',
                      'md:group-hover:bg-[var(--color-secondary)]',
                    )}
                  />
                  <span
                    tabIndex={0}
                    aria-label={`${skill.name} skill`}
                    className={clsx(
                      'font-medium text-[var(--color-text)]',
                      TRANSITION_COLORS,
                      'group-hover:text-[var(--color-text)]',
                      'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-1',
                      'focus-visible:bg-[var(--color-primary)]/10 rounded px-1',
                    )}
                  >
                    {skill.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
