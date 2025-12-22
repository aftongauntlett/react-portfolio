import type { ReactNode, ElementType, CSSProperties } from 'react';
import { useState } from 'react';
import { m, type Variants } from 'framer-motion';
import clsx from 'clsx';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { useWillChange } from '@/hooks/useWillChange';

export type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  onViewportEnter?: () => void;
  onAnimationComplete?: () => void;
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
  style,
  onViewportEnter,
  onAnimationComplete,
  ...props
}: MotionSectionProps) {
  // Use a type-safe approach for motion components
  const MotionComponent = (Component === 'li' ? m.li : m.div) as typeof m.div;
  const [isAnimating, setIsAnimating] = useState(false);
  const willChangeStyle = useWillChange(['transform', 'opacity'], isAnimating);
  const baseStyle: CSSProperties = {
    ...style,
    ...willChangeStyle,
    contain: 'layout style paint',
  };

  if (disableAnimation) {
    return (
      <Component style={{ ...style, contain: 'layout style paint' }} className={clsx('opacity-100', className)} {...props}>
        {children}
      </Component>
    );
  }

  // If variants are provided, use them (for stagger animations)
  if (variants) {
    return (
      <MotionComponent
        variants={variants}
        className={clsx('opacity-100', className)}
        style={baseStyle}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }

  // Otherwise use the default reveal animation
  return (
    <MotionComponent
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={clsx('opacity-100', className)}
      style={baseStyle}
      onViewportEnter={() => {
        setIsAnimating(true);
        onViewportEnter?.();
      }}
      onAnimationComplete={() => {
        setIsAnimating(false);
        onAnimationComplete?.();
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
