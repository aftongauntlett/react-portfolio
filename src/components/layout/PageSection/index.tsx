import type { ReactNode } from 'react';
import clsx from 'clsx';
import MotionSection from '@/components/shared/MotionSection';
import PaintSplashText from '@/components/shared/PaintSplashEffect';
import { FOCUS_STYLES } from '@/constants/styles';

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function PageSection({ id, title, children, className }: Props) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      data-section={id}
      className={clsx('section-content scroll-mt-20', className)}
      aria-labelledby={title ? headingId : undefined}
    >
      <MotionSection>
        <div className="w-full space-y-4 sm:space-y-6">
          {title && (
            <PaintSplashText tag="h2" id={headingId} className={FOCUS_STYLES.COMPACT}>
              {title}
            </PaintSplashText>
          )}
          {children}
        </div>
      </MotionSection>
    </section>
  );
}
