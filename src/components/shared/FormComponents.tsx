import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { m } from 'framer-motion';
import clsx from 'clsx';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { TYPOGRAPHY } from '@/constants/typography';

const inputBaseClass = `
  mt-1 block w-full rounded-md
  border-2 border-[var(--color-line)]
  px-3 py-2
  text-[var(--color-text)]
  placeholder-[var(--color-muted)]
  focus:outline-none focus:border-[var(--color-primary)]
  disabled:opacity-50 disabled:cursor-not-allowed
  bg-[var(--color-surface)]
  transition-colors duration-200
`;

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  maxLength?: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  showCounter?: boolean;
  spellCheck?: boolean;
}

export function FormField({
  label,
  name,
  type = 'text',
  required = false,
  optional = false,
  placeholder,
  maxLength,
  value,
  onChange,
  disabled = false,
  error,
  showCounter = true,
  spellCheck = false,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Label animation props
  const labelMotionProps = prefersReducedMotion
    ? {}
    : {
        animate: {
          scale: 1,
          color: isFocused ? 'var(--color-primary)' : 'var(--color-text)',
        },
        transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
      };

  return (
    <div className="space-y-1">
      <m.label
        htmlFor={name}
        className={`block ${TYPOGRAPHY.TEXT_SMALL} font-medium`}
        {...labelMotionProps}
      >
        {label}
        {optional && <span className="text-[var(--color-muted)] font-normal"> (optional)</span>}
      </m.label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        spellCheck={spellCheck}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={clsx(inputBaseClass, error && 'border-red-500 focus:border-red-500')}
      />
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className={`text-red-500 ${TYPOGRAPHY.TEXT_SMALL} mt-1`}
        >
          {error}
        </p>
      )}
      {showCounter && maxLength && (
        <div className="flex justify-end">
          <span className={`${TYPOGRAPHY.TEXT_XS} text-[var(--color-muted)]`}>
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  error?: string;
}

export function TextAreaField({
  label,
  name,
  required = false,
  placeholder,
  maxLength,
  rows = 5,
  value,
  onChange,
  disabled = false,
  error,
}: TextAreaFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Label animation props
  const labelMotionProps = prefersReducedMotion
    ? {}
    : {
        animate: {
          scale: 1,
          color: isFocused ? 'var(--color-primary)' : 'var(--color-text)',
        },
        transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
      };

  return (
    <div className="space-y-1">
      <m.label
        htmlFor={name}
        className={`block ${TYPOGRAPHY.TEXT_SMALL} font-medium`}
        {...labelMotionProps}
      >
        {label}
      </m.label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={clsx(inputBaseClass, error && 'border-red-500 focus:border-red-500')}
      />
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className={`text-red-500 ${TYPOGRAPHY.TEXT_SMALL} mt-1`}
        >
          {error}
        </p>
      )}
      {maxLength && (
        <div className="flex justify-end">
          <span className={`${TYPOGRAPHY.TEXT_XS} text-[var(--color-muted)]`}>
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}
