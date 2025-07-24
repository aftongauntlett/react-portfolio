import { useEffect, useState } from 'react';

export function useTheme() {
  // Initialize theme: use saved preference or system default
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }

    return 'light'; // Fallback for SSR or non-browser env
  });

  // Apply theme class and fonts
  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';

    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Optional: Add transition class after initial render
  useEffect(() => {
    document.documentElement.classList.add('transition-theme');
  }, []);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
