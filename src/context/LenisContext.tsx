import { createContext, useContext, type ReactNode } from 'react';
import { useLenis } from '@/hooks/useLenis';
import type Lenis from 'lenis';

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenis = useLenis();

  return <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>;
}

/**
 * Hook to access Lenis instance for programmatic scrolling
 * Returns null if Lenis is not initialized (e.g., reduced motion preference)
 */
export function useLenisContext() {
  return useContext(LenisContext);
}
