import type { ReactNode } from 'react';
import clsx from 'clsx';
import MotionSection from '@/components/shared/MotionSection';
import PaintSplashText from '@/components/shared/PaintSplashEffect';

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function PageSection({ id, title, children, className }: Props) {
  return (
    <section
      id={id}
      data-section={id}
      className={clsx('section-content scroll-mt-20', className)}
      aria-labelledby={title ? `${id}-heading` : undefined}
      tabIndex={-1}
    >
      <MotionSection>
        <div className="w-full space-y-6">
          {title && (
            <PaintSplashText tag="h2" id={`${id}-heading`}>
              {title}
            </PaintSplashText>
          )}
          {children}
        </div>
      </MotionSection>
    </section>
  );
}
