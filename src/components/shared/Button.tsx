"use client";

import {
  type ReactNode,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
} from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

// Shared props for all versions
type BaseProps = {
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
  asDiv?: boolean;
  onDivClick?: () => void;
  motionProps?: HTMLMotionProps<"div">;
};

// 1. Button variant (no href)
type ButtonVariant = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
  };

// 2. Anchor variant (uses href)
type AnchorVariant = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "type"> & {
    href: string;
  };

// Union type of both variants
type ButtonProps = ButtonVariant | AnchorVariant;

export default function Button(props: ButtonProps) {
  const {
    children,
    icon,
    className = "",
    asDiv = false,
    onDivClick,
    motionProps,
    href,
    ...rest
  } = props;

  const sharedClass = clsx(
    "inline-flex items-center justify-center gap-2 rounded border border-[var(--color-text)] px-4 py-2 text-[var(--color-text)] transition-all duration-300",
    "hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-[0_0_6px_var(--color-primary)]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed",
    className
  );

  if (asDiv) {
    return (
      <motion.div
        className={sharedClass}
        role="button"
        tabIndex={0}
        onClick={onDivClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onDivClick?.();
        }}
        {...(motionProps ?? {})}
      >
        {icon && <span>{icon}</span>}
        {children && <span>{children}</span>}
      </motion.div>
    );
  }

  if (href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a href={href} className={sharedClass} {...anchorProps}>
        {icon && <span>{icon}</span>}
        {children && <span>{children}</span>}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={sharedClass} {...buttonProps}>
      {icon && <span>{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
}
