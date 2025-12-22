import type { ElementType, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { TYPOGRAPHY } from '@/constants/typography';

type TextVariant = 'body' | 'description' | 'large' | 'small' | 'xs';
type TextTone = 'default' | 'muted' | 'primary' | 'secondary';

type TextOwnProps<TAs extends ElementType> = {
  as?: TAs;
  variant?: TextVariant;
  tone?: TextTone;
  className?: string;
};

export type TextProps<TAs extends ElementType = 'p'> = TextOwnProps<TAs> &
  Omit<ComponentPropsWithoutRef<TAs>, keyof TextOwnProps<TAs>>;

const VARIANT_CLASSES: Record<TextVariant, string> = {
  body: TYPOGRAPHY.TEXT_BODY,
  description: TYPOGRAPHY.TEXT_DESCRIPTION,
  large: TYPOGRAPHY.TEXT_LARGE,
  small: TYPOGRAPHY.TEXT_SMALL,
  xs: TYPOGRAPHY.TEXT_XS,
};

const TONE_CLASSES: Record<TextTone, string> = {
  default: '',
  muted: TYPOGRAPHY.TEXT_MUTED,
  primary: TYPOGRAPHY.TEXT_PRIMARY,
  secondary: TYPOGRAPHY.TEXT_SECONDARY,
};

export function Text<TAs extends ElementType = 'p'>(props: TextProps<TAs>) {
  const { as, variant = 'body', tone = 'default', className, ...rest } = props;
  const Component = (as ?? 'p') as ElementType;

  return (
    <Component
      className={clsx(VARIANT_CLASSES[variant], TONE_CLASSES[tone], className)}
      {...rest}
    />
  );
}

export default Text;
