import type { ReactNode, ElementType } from 'react';
import { m, type Variants } from 'framer-motion';
import clsx from 'clsx';

export type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
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
  as: Component = 'div',
  delay = 0,
  duration = 0.4,
  disableAnimation = false,
  variants,
  ...props
}: MotionSectionProps) {
  // Use a type-safe approach for motion components
  const MotionComponent = (Component === 'li' ? m.li : m.div) as typeof m.div;

  if (disableAnimation) {
    return (
      <Component className={clsx('opacity-100', className)} {...props}>
        {children}
      </Component>
    );
  }

  // If variants are provided, use them (for stagger animations)
  if (variants) {
    return (
      <MotionComponent variants={variants} className={clsx('opacity-100', className)} {...props}>
        {children}
      </MotionComponent>
    );
  }

  // Otherwise use the default reveal animation
  return (
    <MotionComponent
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
    </MotionComponent>
  );
}
