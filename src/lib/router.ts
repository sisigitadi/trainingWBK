import { useEffect, useState } from 'react';

export const TOTAL_MODULES = 10;

export type AppRoute =
  | {
      view: 'modul';
      moduleId: number;
      tab: 'materi' | 'lab';
      hash: string;
    }
  | {
      view: 'penutup';
      hash: string;
    };

const DEFAULT_HASH = '#/modul/1';

export function parseHash(rawHash: string): AppRoute {
  const cleaned = rawHash.replace(/^#/, '').trim();
  const normalized = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;

  if (normalized === '/penutup' || normalized === '/penutup/') {
    return { view: 'penutup', hash: '#/penutup' };
  }

  const modulMatch = /^\/modul\/(\d+)(?:\/(lab))?\/?$/i.exec(normalized);
  if (modulMatch) {
    const id = Number.parseInt(modulMatch[1] ?? '1', 10);
    if (Number.isInteger(id) && id >= 1 && id <= TOTAL_MODULES) {
      const isLab = Boolean(modulMatch[2]);
      return {
        view: 'modul',
        moduleId: id,
        tab: isLab ? 'lab' : 'materi',
        hash: isLab ? `#/modul/${id}/lab` : `#/modul/${id}`,
      };
    }
  }

  return {
    view: 'modul',
    moduleId: 1,
    tab: 'materi',
    hash: DEFAULT_HASH,
  };
}

export function normalizeRouteHash(target: string): string {
  const withHash = target.startsWith('#')
    ? target
    : target.startsWith('/')
      ? `#${target}`
      : `#/${target}`;
  return parseHash(withHash).hash;
}

export function navigateTo(target: string): void {
  if (typeof window === 'undefined') return;
  const canonical = normalizeRouteHash(target);
  if (window.location.hash !== canonical) {
    window.location.hash = canonical;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function useHashRoute(): AppRoute {
  const [route, setRoute] = useState<AppRoute>(() => {
    if (typeof window === 'undefined') {
      return parseHash(DEFAULT_HASH);
    }
    return parseHash(window.location.hash);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.location.hash) {
      window.history.replaceState(null, '', DEFAULT_HASH);
    }

    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
}

export function getProjectorSequence(): string[] {
  const sequence: string[] = [];
  for (let id = 1; id <= TOTAL_MODULES; id += 1) {
    sequence.push(`#/modul/${id}`);
    sequence.push(`#/modul/${id}/lab`);
  }
  sequence.push('#/penutup');
  return sequence;
}

export function getNextRoute(currentHash?: string): string | null {
  const raw =
    currentHash ??
    (typeof window !== 'undefined' ? window.location.hash : DEFAULT_HASH);
  const canonical = parseHash(raw).hash;
  const sequence = getProjectorSequence();
  const idx = sequence.indexOf(canonical);
  if (idx === -1 || idx >= sequence.length - 1) {
    return null;
  }
  return sequence[idx + 1] ?? null;
}

export function getPrevRoute(currentHash?: string): string | null {
  const raw =
    currentHash ??
    (typeof window !== 'undefined' ? window.location.hash : DEFAULT_HASH);
  const canonical = parseHash(raw).hash;
  const sequence = getProjectorSequence();
  const idx = sequence.indexOf(canonical);
  if (idx <= 0) {
    return null;
  }
  return sequence[idx - 1] ?? null;
}
