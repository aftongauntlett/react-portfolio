import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function FadeInSection({ children, className }: Props) {
  return (
    <motion.div
      className={clsx('opacity-100', className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut', // Simpler easing for better performance
        },
      }}
      viewport={{
        once: true,
        margin: '-80px', // Start animations a bit earlier for titles
        amount: 0.1, // Only trigger when 10% is visible
      }}
      // Performance optimization
      style={{ willChange: 'auto' }}
    >
      {children}
    </motion.div>
  );
}
