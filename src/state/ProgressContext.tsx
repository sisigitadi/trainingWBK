import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { LearningProgressState, ModuleExploration } from '../types/training';

export const PROGRESS_STORAGE_KEY = 'saas_cybershield_learning_v1';
const TOTAL_MODULES = 10;

function createDefaultState(): LearningProgressState {
  return {
    version: 2,
    modules: {},
    theme: 'light',
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isValidModuleExploration(value: unknown): value is ModuleExploration {
  if (!isPlainObject(value)) return false;
  if (typeof value.explored !== 'boolean') return false;
  if (typeof value.exploredItems !== 'number' || Number.isNaN(value.exploredItems)) return false;
  if (typeof value.totalItems !== 'number' || Number.isNaN(value.totalItems)) return false;
  if (value.lastVisitedAt !== undefined && typeof value.lastVisitedAt !== 'string') return false;
  return true;
}

function loadInitialProgress(): { state: LearningProgressState; error: string | null } {
  if (typeof window === 'undefined') {
    return { state: createDefaultState(), error: null };
  }

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
  } catch {
    return {
      state: createDefaultState(),
      error:
        'Penyimpanan browser (localStorage) tidak dapat diakses. Status eksplorasi hanya disimpan selama sesi aktif.',
    };
  }

  if (raw === null || raw.trim() === '') {
    return { state: createDefaultState(), error: null };
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isPlainObject(parsed) || parsed.version !== 2) {
      return {
        state: createDefaultState(),
        error:
          'Format data eksplorasi di browser tidak sesuai versi portal. Anda dapat mengatur ulang progres atau menutup peringatan ini.',
      };
    }

    if (!isPlainObject(parsed.modules)) {
      return {
        state: createDefaultState(),
        error:
          'Data progres belajar yang tersimpan di browser rusak. Portal menggunakan kondisi awal agar tetap dapat dipakai.',
      };
    }

    const validatedModules: Record<number, ModuleExploration> = {};
    for (const [key, val] of Object.entries(parsed.modules)) {
      const id = Number(key);
      if (!Number.isInteger(id) || id < 1 || id > TOTAL_MODULES || !isValidModuleExploration(val)) {
        return {
          state: createDefaultState(),
          error:
            'Sebagian catatan eksplorasi modul di browser rusak atau tidak valid. Silakan atur ulang progres jika diperlukan.',
        };
      }
      const totalItems = Math.max(0, Math.round(val.totalItems));
      const exploredItems = Math.max(0, Math.round(val.exploredItems));
      validatedModules[id] = {
        explored: val.explored,
        exploredItems: totalItems > 0 ? Math.min(exploredItems, totalItems) : exploredItems,
        totalItems,
        ...(val.lastVisitedAt ? { lastVisitedAt: val.lastVisitedAt } : {}),
      };
    }

    const theme: 'light' | 'dark' = parsed.theme === 'dark' ? 'dark' : 'light';

    return {
      state: {
        version: 2,
        modules: validatedModules,
        theme,
      },
      error: null,
    };
  } catch {
    return {
      state: createDefaultState(),
      error:
        'Data progres tersimpan di browser rusak (JSON tidak valid). Portal berjalan dengan kondisi awal agar tidak macet.',
    };
  }
}

export interface ProgressContextValue {
  state: LearningProgressState;
  exploredCount: number;
  explorationPercent: number;
  recordExploration: (moduleId: number, exploredItems: number, totalItems: number) => void;
  markModuleCompleted: (moduleId: number) => void;
  toggleTheme: () => void;
  resetAll: () => void;
  storageError: string | null;
  dismissStorageError: () => void;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const initial = useMemo(() => loadInitialProgress(), []);
  const [state, setState] = useState<LearningProgressState>(initial.state);
  const [storageError, setStorageError] = useState<string | null>(initial.error);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  const persist = useCallback((nextState: LearningProgressState) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(nextState));
    } catch {
      setStorageError(
        'Gagal menyimpan catatan eksplorasi ke localStorage browser. Periksa izin atau kapasitas penyimpanan browser Anda.'
      );
    }
  }, []);

  const recordExploration = useCallback(
    (moduleId: number, exploredItems: number, totalItems: number) => {
      if (!Number.isInteger(moduleId) || moduleId < 1 || moduleId > TOTAL_MODULES) {
        return;
      }
      const safeTotal = Math.max(0, Math.round(totalItems));
      const rawExplored = Math.max(0, Math.round(exploredItems));
      const safeExplored = safeTotal > 0 ? Math.min(rawExplored, safeTotal) : rawExplored;

      setState((prev) => {
        const existing = prev.modules[moduleId];
        const nextTotal = Math.max(existing?.totalItems ?? 0, safeTotal);
        const nextExploredItems = Math.max(existing?.exploredItems ?? 0, safeExplored);
        const reachedAll = nextTotal > 0 ? nextExploredItems >= nextTotal : nextExploredItems > 0;
        const nextModule: ModuleExploration = {
          explored: Boolean(existing?.explored || reachedAll),
          exploredItems: nextTotal > 0 ? Math.min(nextExploredItems, nextTotal) : nextExploredItems,
          totalItems: nextTotal,
          lastVisitedAt: new Date().toISOString(),
        };
        const nextState: LearningProgressState = {
          ...prev,
          modules: {
            ...prev.modules,
            [moduleId]: nextModule,
          },
        };
        persist(nextState);
        return nextState;
      });
    },
    [persist]
  );

  const markModuleCompleted = useCallback(
    (moduleId: number) => {
      if (!Number.isInteger(moduleId) || moduleId < 1 || moduleId > TOTAL_MODULES) {
        return;
      }
      setState((prev) => {
        const existing = prev.modules[moduleId];
        const total = Math.max(existing?.totalItems ?? 0, 1);
        const nextModule: ModuleExploration = {
          explored: true,
          exploredItems: Math.max(existing?.exploredItems ?? 0, total),
          totalItems: total,
          lastVisitedAt: new Date().toISOString(),
        };
        const nextState: LearningProgressState = {
          ...prev,
          modules: {
            ...prev.modules,
            [moduleId]: nextModule,
          },
        };
        persist(nextState);
        return nextState;
      });
    },
    [persist]
  );

  const toggleTheme = useCallback(() => {
    setState((prev) => {
      const nextTheme: 'light' | 'dark' = prev.theme === 'dark' ? 'light' : 'dark';
      const nextState: LearningProgressState = {
        ...prev,
        theme: nextTheme,
      };
      persist(nextState);
      return nextState;
    });
  }, [persist]);

  const resetAll = useCallback(() => {
    const fresh = createDefaultState();
    setState(fresh);
    setStorageError(null);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(fresh));
      } catch {
        setStorageError('Gagal mengatur ulang data eksplorasi di localStorage.');
      }
    }
  }, []);

  const dismissStorageError = useCallback(() => {
    setStorageError(null);
  }, []);

  const exploredCount = useMemo(() => {
    let count = 0;
    for (let id = 1; id <= TOTAL_MODULES; id += 1) {
      if (state.modules[id]?.explored) {
        count += 1;
      }
    }
    return count;
  }, [state.modules]);

  const explorationPercent = useMemo(
    () => Math.round((exploredCount / TOTAL_MODULES) * 100),
    [exploredCount]
  );

  const value: ProgressContextValue = useMemo(
    () => ({
      state,
      exploredCount,
      explorationPercent,
      recordExploration,
      markModuleCompleted,
      toggleTheme,
      resetAll,
      storageError,
      dismissStorageError,
    }),
    [
      state,
      exploredCount,
      explorationPercent,
      recordExploration,
      markModuleCompleted,
      toggleTheme,
      resetAll,
      storageError,
      dismissStorageError,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress harus digunakan di dalam ProgressProvider.');
  }
  return ctx;
}
