import { useCallback, useRef, useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  const matchesRef = useRef(false);
  const mqlRef = useRef<MediaQueryList | null>(null);
  const queryRef = useRef<string>(query);

  const ensureMql = useCallback((): MediaQueryList | null => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      matchesRef.current = false;
      mqlRef.current = null;
      queryRef.current = query;
      return null;
    }

    if (!mqlRef.current || queryRef.current !== query) {
      queryRef.current = query;
      mqlRef.current = window.matchMedia(query);
      matchesRef.current = mqlRef.current.matches;
    }

    return mqlRef.current;
  }, [query]);

  const getSnapshot = useCallback(() => {
    ensureMql();
    return matchesRef.current;
  }, [ensureMql]);

  const getServerSnapshot = useCallback(() => false, []);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = ensureMql();
      if (!mql) {
        return () => {};
      }

      const handleChange = (event: MediaQueryListEvent) => {
        matchesRef.current = event.matches;
        onStoreChange();
      };

      mql.addEventListener('change', handleChange);

      return () => {
        mql.removeEventListener('change', handleChange);
      };
    },
    [ensureMql],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
