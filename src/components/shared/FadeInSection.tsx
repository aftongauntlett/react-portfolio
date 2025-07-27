import type { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function FadeInSection({ children, className }: Props) {
  return <div className={clsx('opacity-100', className)}>{children}</div>;
}
