import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';

const LAB_SESSION_STORAGE_PREFIX = 'saas_lab_state_v1_';

function getStorageKey(moduleId: number): string {
  return `${LAB_SESSION_STORAGE_PREFIX}${moduleId}`;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function resolveInitial<T>(initialValue: T | (() => T)): T {
  return typeof initialValue === 'function'
    ? (initialValue as () => T)()
    : initialValue;
}

function readStoredLabState<T>(moduleId: number, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const raw = window.sessionStorage.getItem(getStorageKey(moduleId));
    if (raw === null || raw.trim() === '') {
      return fallback;
    }
    const parsed: unknown = JSON.parse(raw);
    if (isPlainObject(fallback) && isPlainObject(parsed)) {
      return { ...fallback, ...parsed } as T;
    }
    if (Array.isArray(fallback) && Array.isArray(parsed)) {
      return parsed as unknown as T;
    }
    if (typeof parsed === typeof fallback) {
      return parsed as T;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

/**
 * Persist lab interaction state in sessionStorage so switching between
 * Materi and Lab tabs preserves the learner's active exploration state.
 */
export function useLabSessionState<T>(
  moduleId: number,
  initialValue: T | (() => T)
): readonly [T, Dispatch<SetStateAction<T>>, () => void] {
  const initialRef = useRef<T | (() => T)>(initialValue);
  initialRef.current = initialValue;

  const [state, setState] = useState<T>(() =>
    readStoredLabState(moduleId, resolveInitial(initialValue))
  );

  useEffect(() => {
    setState(readStoredLabState(moduleId, resolveInitial(initialRef.current)));
  }, [moduleId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(getStorageKey(moduleId), JSON.stringify(state));
    } catch {
      // Ignore sessionStorage write failures in restricted browsing modes
    }
  }, [moduleId, state]);

  const resetSessionState = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.removeItem(getStorageKey(moduleId));
      } catch {
        // Ignore sessionStorage removal failures in restricted browsing modes
      }
    }
    setState(resolveInitial(initialRef.current));
  }, [moduleId]);

  return [state, setState, resetSessionState] as const;
}

/**
 * Compute consistent LabShell exploration count and completion state,
 * ensuring manual completion reports full item count instead of 0/N.
 */
export function computeLabProgress(
  exploredItems: number,
  totalItems: number,
  manualDone: boolean
): { exploredCount: number; isExplored: boolean } {
  const safeTotal = Math.max(0, Math.round(totalItems));
  const rawExplored = Math.max(0, Math.round(exploredItems));
  const clampedExplored = safeTotal > 0 ? Math.min(rawExplored, safeTotal) : rawExplored;
  const isExplored =
    manualDone || (safeTotal > 0 ? clampedExplored >= safeTotal : clampedExplored > 0);
  const exploredCount = manualDone && safeTotal > 0 ? safeTotal : clampedExplored;

  return {
    exploredCount,
    isExplored,
  };
}
