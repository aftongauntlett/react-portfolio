import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ThemePreference = Theme | 'system';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
}

function getStoredThemePreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system';

  const storedPreference = localStorage.getItem('theme-preference') as ThemePreference | null;
  if (storedPreference === 'light' || storedPreference === 'dark' || storedPreference === 'system') {
    return storedPreference;
  }

  // Back-compat: older versions stored a resolved theme in `theme`.
  const legacyStored = localStorage.getItem('theme') as Theme | null;
  if (legacyStored === 'light' || legacyStored === 'dark') {
    return legacyStored;
  }

  // Default to following the OS/browser preference.
  return 'system';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themePreference, setThemePreference] = useState<ThemePreference>(getStoredThemePreference);
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

  const resolvedTheme: Theme = themePreference === 'system' ? systemTheme : themePreference;

  // Keep system theme in sync with OS/browser setting.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = () => setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    updateSystemTheme();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateSystemTheme);
      return () => mediaQuery.removeEventListener('change', updateSystemTheme);
    }

    // Safari < 14
    mediaQuery.addListener(updateSystemTheme);
    return () => mediaQuery.removeListener(updateSystemTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  }, [resolvedTheme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('theme-preference', themePreference);

    // Best-effort cleanup of legacy key so the app doesn't look "forced" on refresh.
    if (localStorage.getItem('theme')) {
      localStorage.removeItem('theme');
    }
  }, [themePreference]);

  const contextValue = useMemo(
    () => ({
      theme: resolvedTheme,
      toggleTheme: () =>
        setThemePreference((prevPreference) => {
          const currentTheme = prevPreference === 'system' ? systemTheme : prevPreference;
          return currentTheme === 'dark' ? 'light' : 'dark';
        }),
    }),
    [resolvedTheme, systemTheme],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
