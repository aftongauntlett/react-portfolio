import type { ReactNode } from 'react';
import clsx from 'clsx';
import PaintSplashText from '@/components/shared/PaintSplashEffect';
import { FOCUS_STYLES } from '@/constants/styles';
import { SECTION_SPACING } from '@/constants/spacing';

type Props = {
  id: string;
  title?: string;
  hideTitle?: boolean;
  children: ReactNode;
  className?: string;
};

export default function PageSection({ id, title, hideTitle = false, children, className }: Props) {
  const headingId = `${id}-heading`;

  const shouldRenderDecorativeTitle = Boolean(title) && !hideTitle;
  const shouldRenderHiddenHeading = Boolean(title) && hideTitle;
  const titleText = title ?? '';

  return (
    <section
      id={id}
      data-section={id}
      className={clsx('section-content scroll-mt-20', SECTION_SPACING.BOTTOM_PADDING, className)}
      aria-labelledby={title ? headingId : undefined}
    >
      <div className={clsx('w-full', SECTION_SPACING.CONTENT_STACK)}>
        {shouldRenderHiddenHeading && (
          <h2 id={headingId} tabIndex={-1} className={clsx(FOCUS_STYLES.COMPACT, 'sr-only')}>
            {titleText}
          </h2>
        )}
        {shouldRenderDecorativeTitle && (
          <PaintSplashText
            tag="h2"
            id={headingId}
            className={clsx(
              FOCUS_STYLES.COMPACT,
              'px-0 text-[clamp(1.5rem,2.8vw,1.875rem)] leading-[1.2] tracking-[-0.012em] text-[var(--color-nameplate)] dark:text-[var(--color-text)]',
            )}
          >
            {titleText}
          </PaintSplashText>
        )}
        {children}
      </div>
    </section>
  );
}
