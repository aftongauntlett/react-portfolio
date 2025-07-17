import {
  type ReactNode,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
} from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";
import "./Button.css";

// Shared props for all versions
type BaseProps = {
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
  asDiv?: boolean;
  onDivClick?: () => void;
  motionProps?: HTMLMotionProps<"div">;
  variant?: "primary" | "secondary" | "link";
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
    variant = "primary",
    ...rest
  } = props;

  const rootClass = clsx(
    "btn-root",
    {
      "btn-primary": variant === "primary",
      "btn-secondary": variant === "secondary",
      "btn-link": variant === "link",
    },
    className
  );

  if (asDiv) {
    return (
      <motion.div
        className={rootClass}
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
      <a href={href} className={rootClass} {...anchorProps}>
        {icon && <span>{icon}</span>}
        {children && <span>{children}</span>}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={rootClass} {...buttonProps}>
      {icon && <span>{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
}
