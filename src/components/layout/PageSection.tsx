import type { ReactNode } from 'react';
import clsx from 'clsx';
import FadeInSection from '../shared/FadeInSection';
import PaintSplashText from '../shared/PaintSplash/PaintSplashEffect';

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function PageSection({ id, title, children, className }: Props) {
  return (
    <section id={id} data-section={id} className={clsx('section-content', className)}>
      <FadeInSection>
        <div className="w-full space-y-8">
          {title && <PaintSplashText tag="h2">{title}</PaintSplashText>}
          {children}
        </div>
      </FadeInSection>
    </section>
  );
}
