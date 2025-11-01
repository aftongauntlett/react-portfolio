import type { ReactNode } from 'react';
import { m, type Variants } from 'framer-motion';
import clsx from 'clsx';

export type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  role?: string;
  'aria-labelledby'?: string;
  tabIndex?: number;
  // Animation overrides
  delay?: number;
  duration?: number;
  disableAnimation?: boolean;
  variants?: Variants;
};

export default function MotionSection({
  children,
  className,
  delay = 0,
  duration = 0.4,
  disableAnimation = false,
  variants,
  ...props
}: MotionSectionProps) {
  if (disableAnimation) {
    return (
      <div className={clsx('opacity-100', className)} {...props}>
        {children}
      </div>
    );
  }

  // If variants are provided, use them (for stagger animations)
  if (variants) {
    return (
      <m.div variants={variants} className={clsx('opacity-100', className)} {...props}>
        {children}
      </m.div>
    );
  }

  // Otherwise use the default reveal animation
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={clsx('opacity-100', className)}
      {...props}
    >
      {children}
    </m.div>
  );
}
