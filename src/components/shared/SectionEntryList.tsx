import type { ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { COMPONENT_SPACING } from '@/constants/spacing';
import { getMotionDuration, usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export const SECTION_ENTRY_LIST_CLASS = COMPONENT_SPACING.STACK_STANDARD;
export const SECTION_ENTRY_ITEM_BASE_CLASS =
  'group border-b border-[var(--color-line)] px-3 pb-6 pt-2 transition-colors duration-200 last:border-b-0 last:pb-0';

type SectionEntryListProps<T> = {
  items: readonly T[];
  ariaLabel: string;
  getItemKey: (item: T, idx: number) => string;
  renderItem: (item: T, idx: number) => ReactNode;
  listClassName?: string;
  itemClassName?: string;
  animateOnView?: boolean;
};

export default function SectionEntryList<T>({
  items,
  ariaLabel,
  getItemKey,
  renderItem,
  listClassName,
  itemClassName,
  animateOnView = true,
}: SectionEntryListProps<T>) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const listStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: getMotionDuration(0.06, prefersReducedMotion),
        delayChildren: getMotionDuration(0.03, prefersReducedMotion),
      },
    },
  } as const;

  const listItemFade = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: getMotionDuration(0.36, prefersReducedMotion),
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  } as const;

  const combinedListClassName = clsx(SECTION_ENTRY_LIST_CLASS, listClassName);
  const combinedItemClassName = clsx(SECTION_ENTRY_ITEM_BASE_CLASS, itemClassName);

  if (prefersReducedMotion || !animateOnView) {
    return (
      <ul className={combinedListClassName} aria-label={ariaLabel}>
        {items.map((item, idx) => (
          <li className={combinedItemClassName} key={getItemKey(item, idx)}>
            {renderItem(item, idx)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className={combinedListClassName}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT_CONFIG, amount: 0.05 }}
      variants={listStagger}
    >
      {items.map((item, idx) => (
        <motion.li
          className={combinedItemClassName}
          key={getItemKey(item, idx)}
          variants={listItemFade}
        >
          {renderItem(item, idx)}
        </motion.li>
      ))}
    </motion.ul>
  );
}
