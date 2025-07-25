import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export type MotionSectionProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
};

export default function MotionSection({ children, ...props }: MotionSectionProps) {
  const defaults = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.22 },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <motion.div {...defaults} {...props}>
      {children}
    </motion.div>
  );
}
