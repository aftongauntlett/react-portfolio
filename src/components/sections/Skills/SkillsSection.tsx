import clsx from 'clsx';
import { skills, skillCategories } from '@/data/skills';
import Tag from '@/components/shared/Tag';
import { TEXT_PRIMARY_HOVER, TYPOGRAPHY, TEXT_COMBINATIONS } from '@/constants/styles';

const categoryDescriptions = {
  frontend:
    'Modern frameworks, languages, and methodologies for building exceptional user interfaces',
  backend: 'Server-side technologies, databases, and APIs for robust application architecture',
  tools: 'Development environment, design tools, and productivity software for efficient workflows',
} as const;

export default function SkillsSection() {
  const skillsByCategory = Object.entries(skillCategories).map(([key, label]) => ({
    key,
    label,
    skills: skills.filter((skill) => skill.category === key),
    description: categoryDescriptions[key as keyof typeof categoryDescriptions],
  }));

  return (
    <ul className="space-y-12" aria-label="Technical skills by category">
      {skillsByCategory.map(({ key, label, skills: categorySkills, description }) => (
        <li key={key}>
          <div className="mb-6">
            <h3 className={clsx(TYPOGRAPHY.HEADING_3, 'mb-2', TEXT_PRIMARY_HOVER)}>{label}</h3>
            <p className={clsx(TEXT_COMBINATIONS.SMALL_MUTED, 'max-w-2xl leading-relaxed')}>
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {categorySkills.map((skill) => (
              <Tag key={skill.name} variant="muted" size="medium">
                {skill.name}
              </Tag>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
