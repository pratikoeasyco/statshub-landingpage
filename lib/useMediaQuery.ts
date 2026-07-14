"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media query SSR-safe. No servidor devolve `false` e o cliente corrige na
 * hidratação, sem mismatch, porque o React re-renderiza com o snapshot real.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
