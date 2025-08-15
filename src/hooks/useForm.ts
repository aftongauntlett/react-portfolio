import { useState, useCallback, useMemo } from 'react';
import type { ChangeEvent } from 'react';

export interface FormField {
  value: string;
  error?: string;
  required?: boolean;
  validation?: (value: string) => string | undefined;
}

export type FormConfig<T extends Record<string, string>> = {
  [K in keyof T]: FormField;
};

export interface UseFormReturn<T extends Record<string, string>> {
  formData: T;
  errors: { [K in keyof T]: string | undefined };
  setField: (name: keyof T, value: string) => void;
  setError: (name: keyof T, error: string | undefined) => void;
  clearErrors: () => void;
  validateField: (name: keyof T) => boolean;
  validateForm: () => boolean;
  isFormValid: boolean;
  resetForm: () => void;
  getFieldProps: (name: keyof T) => {
    value: string;
    error: string | undefined;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  };
}

/**
 * Modern form management hook for React 19
 * Provides type-safe form state management with validation
 */
export function useForm<T extends Record<string, string>>(
  initialConfig: FormConfig<T>,
): UseFormReturn<T> {
  const [config, setConfig] = useState<FormConfig<T>>(initialConfig);

  // Extract form data and errors
  const formData = useMemo(() => {
    const data = {} as T;
    (Object.keys(config) as Array<keyof T>).forEach((key) => {
      data[key] = config[key].value as T[keyof T];
    });
    return data;
  }, [config]);

  const errors = useMemo(() => {
    const errorMap = {} as { [K in keyof T]: string | undefined };
    (Object.keys(config) as Array<keyof T>).forEach((key) => {
      errorMap[key] = config[key].error;
    });
    return errorMap;
  }, [config]);

  // Set individual field value
  const setField = useCallback((name: keyof T, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        error: undefined, // Clear error when user starts typing
      },
    }));
  }, []);

  // Set field error
  const setError = useCallback((name: keyof T, error: string | undefined) => {
    setConfig((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        error,
      },
    }));
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setConfig((prev) => {
      const newConfig = { ...prev };
      (Object.keys(newConfig) as Array<keyof T>).forEach((key) => {
        newConfig[key] = {
          ...newConfig[key],
          error: undefined,
        };
      });
      return newConfig;
    });
  }, []);

  // Validate single field
  const validateField = useCallback(
    (name: keyof T): boolean => {
      const field = config[name];
      let error: string | undefined;

      // Check required
      if (field.required && !field.value.trim()) {
        error = 'This field is required';
      }
      // Run custom validation if provided
      else if (field.validation) {
        error = field.validation(field.value);
      }

      setError(name, error);
      return !error;
    },
    [config, setError],
  );

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    const fieldNames = Object.keys(config) as Array<keyof T>;
    const results = fieldNames.map((name) => validateField(name));
    return results.every(Boolean);
  }, [config, validateField]);

  // Check if form is valid (computed)
  const isFormValid = useMemo(() => {
    return (
      Object.values(errors).every((error) => !error) &&
      (Object.keys(config) as Array<keyof T>).every((key) => {
        const field = config[key];
        return !field.required || field.value.trim();
      })
    );
  }, [errors, config]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setConfig(initialConfig);
  }, [initialConfig]);

  // Get field props for easy integration with input components
  const getFieldProps = useCallback(
    (name: keyof T) => ({
      value: formData[name],
      error: errors[name],
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setField(name, e.target.value);
      },
    }),
    [formData, errors, setField],
  );

  return {
    formData,
    errors,
    setField,
    setError,
    clearErrors,
    validateField,
    validateForm,
    isFormValid,
    resetForm,
    getFieldProps,
  };
}
