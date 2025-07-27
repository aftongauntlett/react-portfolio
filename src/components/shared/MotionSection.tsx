import type { ReactNode } from 'react';
import clsx from 'clsx';

export type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  role?: string;
  'aria-labelledby'?: string;
  tabIndex?: number;
};

export default function MotionSection({ children, className, ...props }: MotionSectionProps) {
  return (
    <div className={clsx('opacity-100', className)} {...props}>
      {children}
    </div>
  );
}
