import { useState, useEffect } from 'react';

/**
 * useState that survives reloads via localStorage.
 * Safe during build-time prerendering (no localStorage in Node) and
 * against corrupt stored values — both fall back to initialValue.
 * Pass a function as initialValue for lazy initialisation.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
    } catch { /* unavailable or corrupt — use the default */ }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch { /* storage full or unavailable — keep working in memory */ }
  }, [key, value]);

  return [value, setValue];
}
