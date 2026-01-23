import clsx from 'clsx';
import Tag from '@/components/shared/Tag';
import { getTechChipClassName } from '@/constants/techChips';

type TechTagSize = 'xs' | 'small' | 'medium';

interface TechTagProps {
  tech: string;
  size?: TechTagSize;
  className?: string;
}

export default function TechTag({ tech, size = 'small', className }: TechTagProps) {
  const techClasses = getTechChipClassName(tech);

  if (!techClasses) {
    return (
      <Tag variant="muted" size={size} className={className}>
        {tech}
      </Tag>
    );
  }

  return (
    <Tag
      variant="neutral"
      size={size}
      className={clsx(
        techClasses,
        'text-[var(--color-text)] hover:text-[var(--color-text)]',
        'transform-gpu hover:-translate-y-px',
        'hover:shadow-sm hover:shadow-black/5 dark:hover:shadow-black/30',
        'transition-[background-color,border-color,box-shadow,transform] duration-200',
        className,
      )}
    >
      {tech}
    </Tag>
  );
}
