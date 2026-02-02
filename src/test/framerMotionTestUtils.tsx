import type { PropsWithChildren } from 'react';

const MOTION_PROP_NAMES = new Set([
  // Motion state/variants
  'animate',
  'initial',
  'exit',
  'variants',
  'transition',
  'layout',
  'layoutId',
  // Viewport-driven animation
  'whileInView',
  'viewport',
  'onViewportEnter',
  'onViewportLeave',
  // Gesture props
  'whileHover',
  'whileTap',
  'whileFocus',
  'drag',
  'dragConstraints',
  'dragElastic',
  // Motion-specific event handlers
  'onAnimationStart',
  'onAnimationComplete',
]);

export function stripMotionProps<P extends Record<string, unknown>>(props: P): P {
  const cleaned: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (MOTION_PROP_NAMES.has(key)) continue;
    cleaned[key] = value;
  }

  return cleaned as P;
}

type TagName = 'div' | 'section' | 'button' | 'a' | 'label' | 'ul' | 'li' | 'article' | 'span';

export function createMockComponent(tag: TagName) {
  const MockMotionComponent = ({
    children,
    ...props
  }: PropsWithChildren<Record<string, unknown>>) => {
    const Tag = tag;
    return <Tag {...stripMotionProps(props)}>{children}</Tag>;
  };

  MockMotionComponent.displayName = `MockMotion.${tag}`;
  return MockMotionComponent;
}

export function createMotionProxy(tags: TagName[]) {
  return Object.fromEntries(tags.map((tag) => [tag, createMockComponent(tag)])) as Record<
    TagName,
    ReturnType<typeof createMockComponent>
  >;
}
