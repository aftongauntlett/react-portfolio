import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
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
      <motion.div variants={variants} className={clsx('opacity-100', className)} {...props}>
        {children}
      </motion.div>
    );
  }

  // Otherwise use the default reveal animation
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration,
          delay,
          ease: 'easeOut', // Simpler easing for better performance
        },
      }}
      viewport={{
        once: true,
        margin: '-50px',
        amount: 0.1, // Only trigger when 10% is visible for better performance
      }}
      // Performance optimizations
      style={{ willChange: 'auto' }} // Let browser optimize
      className={clsx('opacity-100', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
