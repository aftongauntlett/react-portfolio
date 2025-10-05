import type { ChangeEvent } from 'react';
import clsx from 'clsx';
import { TYPOGRAPHY } from '@/constants/typography';

const inputBaseClass = `
  mt-1 block w-full rounded-md
  border border-[var(--color-line)]
  px-3 py-2
  text-[var(--color-text)]
  placeholder-[var(--color-muted)]
  focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
  disabled:opacity-50 disabled:cursor-not-allowed
  bg-[var(--color-surface)]
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
  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className={`block ${TYPOGRAPHY.TEXT_SMALL} font-medium text-[var(--color-text)]`}
      >
        {label}
        {optional && <span className="text-[var(--color-muted)] font-normal"> (optional)</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        spellCheck={spellCheck}
        className={clsx(inputBaseClass, error && 'border-red-500 focus:ring-red-500')}
      />
      {error && <p className={`text-red-500 ${TYPOGRAPHY.TEXT_SMALL} mt-1`}>{error}</p>}
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
  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className={`block ${TYPOGRAPHY.TEXT_SMALL} font-medium text-[var(--color-text)]`}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        className={clsx(inputBaseClass, error && 'border-red-500 focus:ring-red-500')}
      />
      {error && <p className={`text-red-500 ${TYPOGRAPHY.TEXT_SMALL} mt-1`}>{error}</p>}
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
