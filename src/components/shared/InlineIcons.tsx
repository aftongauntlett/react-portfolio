import type { ReactNode, SVGProps } from 'react';

type BaseIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

type SvgProps = BaseIconProps & { children: ReactNode };

function Svg({ size = 20, children, ...props }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      {children}
    </svg>
  );
}

export function IconBars3(props: BaseIconProps) {
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </Svg>
  );
}

export function IconSun(props: BaseIconProps) {
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 19.07l1.41-1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
    </Svg>
  );
}

export function IconMoon(props: BaseIconProps) {
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12.8A8.5 8.5 0 0 1 11.2 3a6.5 6.5 0 1 0 9.8 9.8Z" />
    </Svg>
  );
}

export function IconArrowUp(props: BaseIconProps) {
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </Svg>
  );
}

export function IconLinkedIn(props: BaseIconProps) {
  // Simple LinkedIn mark (approximate); uses currentColor.
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.37V9h3.4v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.23 2.36 4.23 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45Z" />
    </svg>
  );
}
