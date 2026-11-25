import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Compass,
  Info,
  LockOpen,
  LogOut,
  Maximize2,
  Menu,
  Minimize2,
  Monitor,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Printer,
  RotateCcw,
  Sun,
  Utensils,
  X,
} from 'lucide-react';
import { getModuleById, modules } from '../data/modulesData';
import { ENABLE_PRINT_HANDOUT, ENABLE_TIME_SIMULATION } from '../lib/features';
import {
  type AppRoute,
  getNextRoute,
  getPrevRoute,
  getProjectorSequence,
  navigateTo,
  parseHash,
} from '../lib/router';
import { formatHeaderClock, formatHeaderDate, getRundownStatus } from '../lib/rundown';
import { useProgress } from '../state/ProgressContext';
import { PrintableHandout } from './PrintableHandout';

export interface LayoutProps {
  route: AppRoute;
  projectorMode: boolean;
  instructorMode: boolean;
  onToggleProjector: () => void;
  onExitProjector: () => void;
  onUnlockInstructor: () => void;
  onLockInstructor: () => void;
  children: React.ReactNode;
}

type SimTimePreset = 'realtime' | '09:40' | '11:50' | '13:30' | '15:50';

const DESKTOP_SIDEBAR_STORAGE_KEY = 'saas_desktop_sidebar_open_v1';

function readInitialDesktopSidebarOpen(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return window.localStorage.getItem(DESKTOP_SIDEBAR_STORAGE_KEY) !== '0';
  } catch {
    return true;
  }
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector =
    'a[href], button:not([disabled]), select:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
  );
}

function formatShortModuleTitle(title: string): string {
  return title.replace(/^Modul\s+\d+\s*:\s*/i, '').trim();
}

function getSlideLabel(route: AppRoute): string {
  if (route.view === 'penutup') {
    return 'Sesi Penutup (16.00) - Rangkuman & Kartu Saku';
  }
  const mod = getModuleById(route.moduleId);
  const code = `Modul ${String(route.moduleId).padStart(2, '0')}`;
  const tabLabel = route.tab === 'lab' ? 'Simulasi Interaktif' : 'Materi & Studi Kasus';
  if (!mod) {
    return `${code} - ${tabLabel}`;
  }
  return `${code}: ${formatShortModuleTitle(mod.title)} (${tabLabel})`;
}

function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (target.isContentEditable) return true;
  return false;
}

function getEffectiveDate(now: Date, preset: SimTimePreset): Date {
  if (preset === 'realtime') return now;
  const simulated = new Date(now.getTime());
  const [hhStr, mmStr] = preset.split(':');
  const hh = Number.parseInt(hhStr ?? '0', 10);
  const mm = Number.parseInt(mmStr ?? '0', 10);
  simulated.setHours(hh, mm, now.getSeconds(), 0);
  return simulated;
}

export function Layout({
  route,
  projectorMode,
  instructorMode,
  onToggleProjector,
  onExitProjector,
  onUnlockInstructor,
  onLockInstructor,
  children,
}: LayoutProps) {
  const {
    state,
    exploredCount,
    explorationPercent,
    toggleTheme,
    resetAll,
    storageError,
    dismissStorageError,
  } = useProgress();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState<boolean>(
    readInitialDesktopSidebarOpen
  );
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());
  const [simTimePreset, setSimTimePreset] = useState<SimTimePreset>('realtime');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeDrawerButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerContainerRef = useRef<HTMLDivElement | null>(null);
  const disclaimerButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeDisclaimerButtonRef = useRef<HTMLButtonElement | null>(null);
  const disclaimerModalRef = useRef<HTMLDivElement | null>(null);
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const [topBarHeight, setTopBarHeight] = useState<number>(100);
  const wasDrawerOpenRef = useRef(false);
  const wasDisclaimerOpenRef = useRef(false);
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  const pagiModules = useMemo(() => modules.filter((m) => m.session === 'pagi'), []);
  const siangModules = useMemo(() => modules.filter((m) => m.session === 'siang'), []);

  const prevRoute = useMemo(() => getPrevRoute(route.hash), [route.hash]);
  const nextRoute = useMemo(() => getNextRoute(route.hash), [route.hash]);
  const projectorSlides = useMemo(() => {
    const seq = getProjectorSequence();
    const total = String(seq.length).padStart(2, '0');
    return seq.map((hash, index) => ({
      hash,
      label: `${String(index + 1).padStart(2, '0')}/${total} - ${getSlideLabel(parseHash(hash))}`,
    }));
  }, []);
  const fullscreenSupported =
    typeof document !== 'undefined' && Boolean(document.fullscreenEnabled);

  const effectivePreset: SimTimePreset =
    ENABLE_TIME_SIMULATION && instructorMode ? simTimePreset : 'realtime';
  const effectiveNow = useMemo(
    () => getEffectiveDate(now, effectivePreset),
    [now, effectivePreset]
  );
  const formattedDate = useMemo(() => formatHeaderDate(effectiveNow), [effectiveNow]);
  const formattedClock = useMemo(() => formatHeaderClock(effectiveNow), [effectiveNow]);
  const rundownStatus = useMemo(() => getRundownStatus(effectiveNow), [effectiveNow]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleDesktopSidebar = useCallback(() => {
    setDesktopSidebarOpen((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(DESKTOP_SIDEBAR_STORAGE_KEY, next ? '1' : '0');
        } catch {
          // Ignore localStorage write errors in restricted browsing modes
        }
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!instructorMode) {
      setSimTimePreset('realtime');
    }
    clickCountRef.current = 0;
    lastClickTimeRef.current = 0;
  }, [instructorMode]);

  useEffect(() => {
    if (projectorMode) {
      setMobileMenuOpen(false);
    } else if (typeof document !== 'undefined' && document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {
        // Ignore exitFullscreen errors when not triggered by user gesture
      });
    }
  }, [projectorMode]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (typeof document === 'undefined' || !document.fullscreenEnabled) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
    } else {
      void document.documentElement.requestFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const clearPrintTarget = () => {
      delete document.body.dataset.printTarget;
    };
    window.addEventListener('afterprint', clearPrintTarget);
    return () => {
      window.removeEventListener('afterprint', clearPrintTarget);
      clearPrintTarget();
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      if (wasDrawerOpenRef.current) {
        wasDrawerOpenRef.current = false;
        menuButtonRef.current?.focus();
      }
      return;
    }

    wasDrawerOpenRef.current = true;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeDrawerButtonRef.current?.focus();
    }, 10);

    const handleDrawerKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
        return;
      }

      if (event.key === 'Tab' && drawerContainerRef.current) {
        const focusables = getFocusableElements(drawerContainerRef.current);
        if (focusables.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        const active = document.activeElement as HTMLElement | null;

        if (event.shiftKey) {
          if (!active || active === first || !drawerContainerRef.current.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else if (!active || active === last || !drawerContainerRef.current.contains(active)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleDrawerKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleDrawerKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!disclaimerOpen) {
      if (wasDisclaimerOpenRef.current) {
        wasDisclaimerOpenRef.current = false;
        disclaimerButtonRef.current?.focus();
      }
      return;
    }

    wasDisclaimerOpenRef.current = true;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeDisclaimerButtonRef.current?.focus();
    }, 10);

    const handleDisclaimerKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setDisclaimerOpen(false);
        return;
      }

      if (event.key === 'Tab' && disclaimerModalRef.current) {
        const focusables = getFocusableElements(disclaimerModalRef.current);
        if (focusables.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        const active = document.activeElement as HTMLElement | null;

        if (event.shiftKey) {
          if (!active || active === first || !disclaimerModalRef.current.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else if (!active || active === last || !disclaimerModalRef.current.contains(active)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleDisclaimerKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleDisclaimerKeyDown);
    };
  }, [disclaimerOpen]);

  useEffect(() => {
    if (projectorMode) return;

    const handleSidebarShortcut = (event: KeyboardEvent) => {
      if (mobileMenuOpen || disclaimerOpen) return;
      if (isEditableElement(event.target)) return;

      const isAltB =
        event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        event.key.toLowerCase() === 'b';
      const isBracket =
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        event.key === '[';

      if (isAltB || isBracket) {
        event.preventDefault();
        toggleDesktopSidebar();
      }
    };

    window.addEventListener('keydown', handleSidebarShortcut);
    return () => window.removeEventListener('keydown', handleSidebarShortcut);
  }, [projectorMode, mobileMenuOpen, disclaimerOpen, toggleDesktopSidebar]);

  useEffect(() => {
    if (!projectorMode) return;

    const handleProjectorKeyDown = (event: KeyboardEvent) => {
      if (disclaimerOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        onExitProjector();
        return;
      }

      if (isEditableElement(event.target)) return;

      if (event.key === 'ArrowLeft' && prevRoute) {
        event.preventDefault();
        navigateTo(prevRoute);
      } else if (event.key === 'ArrowRight' && nextRoute) {
        event.preventDefault();
        navigateTo(nextRoute);
      }
    };

    window.addEventListener('keydown', handleProjectorKeyDown);
    return () => window.removeEventListener('keydown', handleProjectorKeyDown);
  }, [projectorMode, disclaimerOpen, prevRoute, nextRoute, onExitProjector]);

  const handleLogoClick = () => {
    if (instructorMode) return;
    const currentMs = Date.now();
    if (currentMs - lastClickTimeRef.current > 2500) {
      clickCountRef.current = 1;
    } else {
      clickCountRef.current += 1;
    }
    lastClickTimeRef.current = currentMs;

    if (clickCountRef.current >= 9) {
      clickCountRef.current = 0;
      lastClickTimeRef.current = 0;
      onUnlockInstructor();
    }
  };

  const handleSelectNav = (hash: string) => {
    navigateTo(hash);
    setMobileMenuOpen(false);
  };

  const handlePrintHandout = () => {
    if (!instructorMode) return;
    document.body.dataset.printTarget = 'handout';
    window.print();
  };

  const renderModuleButton = (mod: (typeof modules)[number]) => {
    const progress = state.modules[mod.id];
    const isActive = route.view === 'modul' && route.moduleId === mod.id;
    const isExplored = Boolean(progress?.explored);
    const hasPartial = Boolean(
      !isExplored && progress && progress.exploredItems > 0 && progress.totalItems > 0
    );

    return (
      <li key={mod.id}>
        <button
          type="button"
          onClick={() => handleSelectNav(`#/modul/${mod.id}`)}
          aria-current={isActive ? 'page' : undefined}
          className={`w-full min-h-[44px] rounded-lg border px-3 py-2.5 text-left transition-colors ${
            isActive
              ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white dark:border-emerald-500/60 dark:bg-slate-800 dark:text-slate-50'
              : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-800/80'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 inline-flex shrink-0 items-center justify-center rounded px-1.5 py-0.5 font-mono text-xs font-bold tabular-nums ${
                isActive
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-100 text-[#0B1F3A] dark:bg-slate-800 dark:text-emerald-300'
              }`}
            >
              {String(mod.id).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold leading-snug whitespace-normal break-words">
                  {formatShortModuleTitle(mod.title)}
                </span>
                {isExplored && (
                  <CheckCircle2
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      isActive ? 'text-emerald-300' : 'text-[#047857] dark:text-[#10B981]'
                    }`}
                    aria-label="Dieksplorasi"
                  />
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-1.5 font-mono text-xs">
                <span
                  className={
                    isActive ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
                  }
                >
                  {mod.timeSlot}
                </span>
                {isExplored && (
                  <span
                    className={`rounded px-1.5 py-0.5 font-semibold ${
                      isActive
                        ? 'bg-white/15 text-emerald-200'
                        : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    }`}
                  >
                    Dieksplorasi
                  </span>
                )}
                {hasPartial && progress && (
                  <span
                    className={`rounded px-1.5 py-0.5 tabular-nums font-semibold ${
                      isActive
                        ? 'bg-white/15 text-sky-200'
                        : 'bg-sky-50 text-sky-900 dark:bg-sky-950/60 dark:text-sky-200'
                    }`}
                  >
                    {progress.exploredItems}/{progress.totalItems}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      </li>
    );
  };

  const renderSidebarContent = () => (
    <nav aria-label="Daftar Modul Pelatihan" className="space-y-6">
      <section aria-labelledby="nav-sesi-pagi">
        <div className="mb-2 flex items-center justify-between gap-2 px-1">
          <h2
            id="nav-sesi-pagi"
            className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
          >
            Sesi Pagi (08.30 - 12.00)
          </h2>
        </div>
        <ul className="space-y-1.5">
          {pagiModules.map((mod) => (
            <React.Fragment key={mod.id}>
              {renderModuleButton(mod)}
              {mod.id === 2 && (
                <li
                  aria-label="Jadwal jeda: Rehat Kopi Pagi pukul 09.50 sampai 10.05"
                  className="rounded-lg border border-dashed border-amber-400/70 bg-amber-50/70 px-3 py-2 text-xs text-amber-950 dark:border-amber-600/50 dark:bg-amber-950/30 dark:text-amber-200"
                >
                  <div className="flex items-center justify-between gap-2 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Coffee className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>Rehat Kopi Pagi</span>
                    </span>
                    <span className="font-mono text-[11px] tabular-nums">09.50 - 10.05</span>
                  </div>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </section>

      <div
        aria-label="Jadwal jeda: ISHOMA pukul 12.00 sampai 13.00"
        className="rounded-lg border border-dashed border-slate-300 bg-slate-100 px-3 py-2.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200"
      >
        <div className="flex items-center justify-between gap-2 font-semibold">
          <span className="inline-flex items-center gap-1.5">
            <Utensils className="h-3.5 w-3.5 shrink-0 text-[#047857] dark:text-[#10B981]" aria-hidden="true" />
            <span>ISHOMA</span>
          </span>
          <span className="font-mono text-[11px] tabular-nums">12.00 - 13.00</span>
        </div>
        <p className="mt-0.5 text-[11px] text-slate-600 dark:text-slate-400">
          Istirahat, Sholat, dan Makan Siang
        </p>
      </div>

      <section aria-labelledby="nav-sesi-siang">
        <div className="mb-2 flex items-center justify-between gap-2 px-1">
          <h2
            id="nav-sesi-siang"
            className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
          >
            Sesi Siang (13.00 - 16.00)
          </h2>
        </div>
        <ul className="space-y-1.5">
          {siangModules.map((mod) => (
            <React.Fragment key={mod.id}>{renderModuleButton(mod)}</React.Fragment>
          ))}
        </ul>
      </section>

      <section aria-labelledby="nav-sesi-penutup">
        <div className="mb-2 flex items-center justify-between gap-2 px-1">
          <h2
            id="nav-sesi-penutup"
            className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
          >
            Sesi Penutup (16.00)
          </h2>
        </div>
        <button
          type="button"
          onClick={() => handleSelectNav('#/penutup')}
          aria-current={route.view === 'penutup' ? 'page' : undefined}
          className={`w-full min-h-[44px] rounded-lg border px-3 py-2.5 text-left transition-colors ${
            route.view === 'penutup'
              ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white dark:border-emerald-500/60 dark:bg-slate-800 dark:text-slate-50'
              : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-800/80'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <Compass
              className={`mt-0.5 h-5 w-5 shrink-0 ${
                route.view === 'penutup'
                  ? 'text-emerald-300'
                  : 'text-[#047857] dark:text-[#10B981]'
              }`}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1 space-y-1">
              <div className="text-sm font-semibold leading-snug whitespace-normal break-words">
                Rangkuman &amp; Kartu Saku
              </div>
              <div className="flex flex-wrap items-center justify-between gap-1.5 font-mono text-xs">
                <span
                  className={
                    route.view === 'penutup'
                      ? 'text-slate-300'
                      : 'text-slate-600 dark:text-slate-400'
                  }
                >
                  16.00 - 16.15
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 font-semibold ${
                    route.view === 'penutup'
                      ? 'bg-white/15 text-emerald-200'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {exploredCount}/10 Modul
                </span>
              </div>
            </div>
          </div>
        </button>
      </section>
    </nav>
  );

  useEffect(() => {
    const element = topBarRef.current;
    if (!element) return;

    const updateHeight = () => {
      if (topBarRef.current) {
        setTopBarHeight(topBarRef.current.offsetHeight);
      }
    };

    updateHeight();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        updateHeight();
      });
      observer.observe(element);
      return () => observer.disconnect();
    } else {
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [storageError, instructorMode, projectorMode]);

  const activeModule = route.view === 'modul' ? getModuleById(route.moduleId) : undefined;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#091322] dark:text-slate-100">
      <div className="no-print">
        <div
          ref={topBarRef}
          className="fixed inset-x-0 top-0 z-30 border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-md dark:border-slate-800/70 dark:bg-[#0B1F3A]/95"
        >
          <header>
            <div className="mx-auto flex max-w-[1440px] flex-col gap-1.5 px-4 py-2 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  {!projectorMode && (
                    <>
                      <button
                        ref={menuButtonRef}
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Buka menu modul"
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-module-drawer"
                        className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 lg:hidden"
                      >
                        <Menu className="h-5 w-5" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={toggleDesktopSidebar}
                        aria-expanded={desktopSidebarOpen}
                        aria-controls="desktop-module-sidebar"
                        aria-label={
                          desktopSidebarOpen
                            ? 'Sembunyikan daftar modul (Alt+B atau [)'
                            : 'Tampilkan daftar modul (Alt+B atau [)'
                        }
                        title={
                          desktopSidebarOpen
                            ? 'Sembunyikan daftar modul (Alt+B atau [)'
                            : 'Tampilkan daftar modul (Alt+B atau [)'
                        }
                        className="hidden min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 lg:inline-flex"
                      >
                        {desktopSidebarOpen ? (
                          <PanelLeftClose className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <PanelLeftOpen className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    </>
                  )}

                  {instructorMode ? (
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg p-0.5">
                      <img
                        src="./logo.jpg"
                        alt="Logo Training Security Awareness"
                        draggable={false}
                        className="h-10 w-10 select-none rounded-lg border-2 border-[#047857] object-cover shadow-sm dark:border-[#10B981]"
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleLogoClick}
                      aria-label="Logo Training IT Security Awareness"
                      className="inline-flex h-11 w-11 shrink-0 touch-manipulation select-none items-center justify-center rounded-lg p-0.5 transition-transform active:scale-95"
                    >
                      <img
                        src="./logo.jpg"
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        className="h-10 w-10 rounded-lg border border-slate-300/80 object-cover shadow-sm dark:border-slate-600/80"
                      />
                    </button>
                  )}

                  <div className="min-w-0 space-y-0.5">
                    <span className="block text-sm font-bold leading-snug tracking-tight text-[#0B1F3A] dark:text-white sm:text-base lg:text-lg">
                      Training IT Security Awareness and Cybersecurity Protection 2026
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex flex-wrap items-center gap-x-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 sm:text-sm">
                        <span>Sigit Adi Irianto, S.Kom.</span>
                        <span aria-hidden="true" className="text-slate-600 dark:text-slate-400">
                          -
                        </span>
                        <a
                          href="https://sigitadi.id/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded px-1 py-0.5 font-bold text-[#047857] underline underline-offset-2 transition-colors hover:text-[#065F46] dark:text-[#10B981] dark:hover:text-emerald-300"
                        >
                          sigitadi.id
                        </a>
                      </div>

                      {instructorMode && (
                        <button
                          type="button"
                          onClick={onLockInstructor}
                          aria-label="Mode Narasumber aktif. Klik untuk keluar dan kunci kembali"
                          title="Mode Narasumber aktif. Klik untuk keluar"
                          className="group inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center gap-1.5 rounded-md border border-[#047857]/60 bg-emerald-50 px-2.5 py-1 text-[#047857] transition-colors hover:border-[#047857] hover:bg-emerald-100 active:scale-95 dark:border-[#10B981]/60 dark:bg-emerald-500/20 dark:text-emerald-300 dark:hover:border-[#10B981] dark:hover:bg-emerald-500/30 sm:px-2"
                        >
                          <LockOpen className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span
                            aria-hidden="true"
                            className="h-3.5 w-px bg-[#047857]/35 dark:bg-emerald-300/35"
                          />
                          <LogOut
                            className="h-3.5 w-3.5 shrink-0 text-slate-700 transition-colors group-hover:text-red-700 dark:text-slate-200 dark:group-hover:text-red-300"
                            aria-hidden="true"
                          />
                          <span className="sr-only">
                            Mode Narasumber aktif. Keluar dan kunci kembali
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex min-w-[150px] flex-col gap-0.5 rounded-md border border-slate-200 bg-slate-50/80 px-2.5 py-1 dark:border-slate-700 dark:bg-slate-900/80">
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Eksplorasi: {exploredCount}/10
                      </span>
                      <span className="font-bold tabular-nums text-[#047857] dark:text-[#10B981]">
                        {explorationPercent}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 w-full overflow-hidden rounded bg-slate-200 dark:bg-slate-800"
                      role="progressbar"
                      aria-label="Progres eksplorasi modul pembelajaran"
                      aria-valuenow={explorationPercent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full bg-[#047857] transition-all duration-300 dark:bg-[#10B981]"
                        style={{ width: `${explorationPercent}%` }}
                      />
                    </div>
                  </div>

                  {ENABLE_PRINT_HANDOUT && instructorMode && (
                    <button
                      type="button"
                      onClick={handlePrintHandout}
                      className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                    >
                      <Printer
                        className="h-3.5 w-3.5 shrink-0 text-[#0B1F3A] dark:text-sky-400"
                        aria-hidden="true"
                      />
                      <span>Cetak Handout</span>
                    </button>
                  )}

                  <button
                    ref={disclaimerButtonRef}
                    type="button"
                    onClick={() => setDisclaimerOpen((prev) => !prev)}
                    aria-label="Catatan Contoh Studi Kasus (Entitas Rekaan)"
                    aria-haspopup="dialog"
                    aria-expanded={disclaimerOpen}
                    title="Catatan Contoh Studi Kasus"
                    className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-md border border-slate-300 bg-white p-2 text-slate-800 transition-colors hover:bg-slate-100 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    <Info
                      className="h-4 w-4 shrink-0 text-[#0B1F3A] dark:text-sky-400"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Catatan Contoh Studi Kasus (Entitas Rekaan)</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={
                      state.theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'
                    }
                    title={
                      state.theme === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'
                    }
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    {state.theme === 'dark' ? (
                      <>
                        <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
                        <span className="hidden xl:inline">Mode Terang</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4 text-[#0B1F3A]" aria-hidden="true" />
                        <span className="hidden xl:inline">Mode Gelap</span>
                      </>
                    )}
                  </button>

                  {instructorMode && (
                    <button
                      type="button"
                      onClick={onToggleProjector}
                      aria-pressed={projectorMode}
                      aria-label={
                        projectorMode ? 'Keluar Mode Proyektor' : 'Aktifkan Mode Proyektor'
                      }
                      title={projectorMode ? 'Keluar Mode Proyektor' : 'Aktifkan Mode Proyektor'}
                      className={`inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-md border p-2 transition-colors active:scale-95 ${
                        projectorMode
                          ? 'border-[#047857] bg-[#047857] text-white hover:bg-[#065F46] dark:border-[#10B981] dark:bg-[#10B981] dark:text-slate-950 dark:hover:bg-emerald-400'
                          : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Monitor className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="sr-only">
                        {projectorMode ? 'Keluar Mode Proyektor' : 'Aktifkan Mode Proyektor'}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {!projectorMode && (
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60 pt-1 text-[11px] sm:text-xs dark:border-slate-700/60">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 font-mono text-slate-700 dark:text-slate-300">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <CalendarClock
                        className="h-3.5 w-3.5 shrink-0 text-[#047857] dark:text-[#10B981]"
                        aria-hidden="true"
                      />
                      <span>{formattedDate}</span>
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 font-bold tabular-nums text-[#0B1F3A] dark:bg-slate-800 dark:text-emerald-300">
                      {formattedClock}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">
                      Rundown: <strong className="font-semibold">{rundownStatus.statusSummary}</strong>
                    </span>
                  </div>

                  {ENABLE_TIME_SIMULATION && instructorMode && (
                    <div className="flex items-center gap-1.5">
                      <select
                        aria-label="Simulasi waktu rundown"
                        value={simTimePreset}
                        onChange={(e) => {
                          setSimTimePreset(e.target.value as SimTimePreset);
                        }}
                        className="min-h-[44px] rounded-md border border-slate-300 bg-white px-2 py-1 font-mono text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      >
                        <option value="realtime">Waktu Nyata</option>
                        <option value="09:40">09:40 (Jelang Rehat)</option>
                        <option value="11:50">11:50 (Jelang ISHOMA)</option>
                        <option value="13:30">13:30 (Jelang Modul 07)</option>
                        <option value="15:50">15:50 (Jelang Penutup)</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          </header>

          {storageError && (
            <div
              role="alert"
              className="border-t border-amber-300 bg-amber-50 px-4 py-2 text-amber-950 dark:border-amber-700/60 dark:bg-amber-950/80 dark:text-amber-100 sm:px-6"
            >
              <div className="mx-auto flex max-w-[1440px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs sm:text-sm font-medium leading-relaxed">{storageError}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={resetAll}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-amber-700 bg-amber-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-amber-800 dark:border-amber-500 dark:bg-amber-500 dark:text-slate-950"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Atur Ulang Progres</span>
                  </button>
                  <button
                    type="button"
                    onClick={dismissStorageError}
                    className="inline-flex min-h-[44px] items-center rounded-md border border-amber-400 bg-white px-3 py-2 text-xs font-semibold text-amber-950 transition-colors hover:bg-amber-100 dark:border-amber-700 dark:bg-slate-900 dark:text-amber-100 dark:hover:bg-slate-800"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {!projectorMode && mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 flex lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi Modul Bimtek"
            id="mobile-module-drawer"
          >
            <div
              className="fixed inset-0 bg-slate-950/75"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <div
              ref={drawerContainerRef}
              className="relative z-10 flex h-full w-full max-w-xs flex-col border-r border-slate-200 bg-slate-50 shadow-xl dark:border-slate-800 dark:bg-[#091322]"
            >
              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-[#0B1F3A]">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-emerald-300">
                  Rundown &amp; Modul Bimtek
                </span>
                <button
                  ref={closeDrawerButtonRef}
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Tutup menu modul"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">{renderSidebarContent()}</div>
            </div>
          </div>
        )}

        {disclaimerOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="disclaimer-modal-title"
          >
            <div
              className="fixed inset-0 bg-slate-950/75"
              onClick={() => setDisclaimerOpen(false)}
              aria-hidden="true"
            />
            <div
              ref={disclaimerModalRef}
              className="relative z-10 w-full max-w-lg rounded-lg border border-sky-200 border-l-4 border-l-[#0B1F3A] bg-white p-5 text-slate-900 shadow-2xl dark:border-slate-700 dark:border-l-sky-400 dark:bg-slate-900 dark:text-slate-100 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Info
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#0B1F3A] dark:text-sky-400"
                    aria-hidden="true"
                  />
                  <h2
                    id="disclaimer-modal-title"
                    className="text-base font-bold leading-snug text-[#0B1F3A] dark:text-slate-100"
                  >
                    Catatan Contoh Studi Kasus (Entitas Rekaan)
                  </h2>
                </div>
                <button
                  ref={closeDisclaimerButtonRef}
                  type="button"
                  onClick={() => setDisclaimerOpen(false)}
                  aria-label="Tutup catatan contoh studi kasus"
                  className="inline-flex min-h-[44px] min-w-[44px] shrink-0 touch-manipulation items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 transition-colors hover:bg-slate-100 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                PT. Sigit Adi Aman Siber (SaaS) dan sistem SaaSCore adalah nama perusahaan dan platform rekaan (tidak nyata) yang digunakan semata-mata sebagai contoh agar memudahkan pemahaman serta memberikan pengalaman belajar (user experience) yang selaras dengan pekerjaan nyata.
              </p>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setDisclaimerOpen(false)}
                  className="inline-flex min-h-[44px] touch-manipulation items-center justify-center rounded-md bg-[#0B1F3A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 active:scale-95 dark:bg-[#10B981] dark:text-slate-950 dark:hover:bg-emerald-400"
                >
                  Saya Mengerti
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          style={{ paddingTop: `${topBarHeight + 16}px` }}
          className={`mx-auto w-full px-4 sm:px-6 ${
            projectorMode ? 'max-w-6xl pb-36 sm:pb-28' : 'max-w-[1440px] pb-8 sm:pb-12'
          }`}
        >
          <div
            className={
              projectorMode || !desktopSidebarOpen
                ? 'block'
                : 'lg:grid lg:grid-cols-[310px_minmax(0,1fr)] lg:items-start lg:gap-7'
            }
          >
            {!projectorMode && desktopSidebarOpen && (
              <aside
                id="desktop-module-sidebar"
                style={{
                  top: `${topBarHeight + 16}px`,
                  maxHeight: `calc(100vh - ${topBarHeight + 32}px)`,
                }}
                className="hidden lg:sticky lg:block lg:overflow-y-auto lg:pr-1"
              >
                <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-emerald-300">
                    Daftar Modul
                  </span>
                  <button
                    type="button"
                    onClick={toggleDesktopSidebar}
                    aria-label="Tutup daftar modul"
                    title="Tutup daftar modul (Alt+B atau [)"
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                {renderSidebarContent()}
              </aside>
            )}

            <div className="min-w-0 flex-1">
              {!projectorMode && !desktopSidebarOpen && route.view === 'modul' && activeModule && (
                <div className="mb-4 hidden items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-900 lg:flex">
                  <div className="flex min-w-0 items-center gap-2 font-mono text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-semibold text-[#047857] dark:text-[#10B981]">
                      {activeModule.session === 'pagi' ? 'Sesi Pagi' : 'Sesi Siang'}
                    </span>
                    <span aria-hidden="true">/</span>
                    <span className="truncate font-semibold text-slate-900 dark:text-slate-100">
                      {activeModule.title}
                    </span>
                    <span aria-hidden="true">/</span>
                    <span className="shrink-0">
                      {route.tab === 'lab' ? 'Simulasi' : 'Materi'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleDesktopSidebar}
                    aria-expanded={desktopSidebarOpen}
                    aria-controls="desktop-module-sidebar"
                    className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
                    <span>Tampilkan Daftar Modul</span>
                  </button>
                </div>
              )}
              <main>{children}</main>
            </div>
          </div>
        </div>

        {projectorMode && (
          <div
            role="region"
            aria-label="Kontrol Mode Proyektor"
            className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-300 bg-white/95 px-4 py-2.5 shadow-lg dark:border-slate-700 dark:bg-[#0B1F3A]/95 sm:px-6"
          >
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => prevRoute && navigateTo(prevRoute)}
                  disabled={!prevRoute}
                  aria-label="Slide sebelumnya"
                  title="Slide sebelumnya (Panah Kiri)"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline">Sebelumnya</span>
                </button>
                <button
                  type="button"
                  onClick={() => nextRoute && navigateTo(nextRoute)}
                  disabled={!nextRoute}
                  aria-label="Slide berikutnya"
                  title="Slide berikutnya (Panah Kanan)"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-md border border-[#0B1F3A] bg-[#0B1F3A] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-45 dark:border-[#10B981] dark:bg-[#10B981] dark:text-slate-950 dark:hover:bg-emerald-400"
                >
                  <span className="hidden sm:inline">Berikutnya</span>
                  <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </button>
              </div>

              <div className="min-w-[180px] flex-1">
                <select
                  aria-label="Pilih slide atau modul presentasi"
                  value={route.hash}
                  onChange={(e) => navigateTo(e.target.value)}
                  className="min-h-[44px] w-full truncate rounded-md border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-xs font-semibold text-slate-800 transition-colors hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-300 dark:hover:bg-slate-800"
                >
                  {projectorSlides.map((slide) => (
                    <option key={slide.hash} value={slide.hash}>
                      {slide.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                {fullscreenSupported && (
                  <button
                    type="button"
                    onClick={handleToggleFullscreen}
                    aria-pressed={isFullscreen}
                    aria-label={isFullscreen ? 'Keluar layar penuh' : 'Tampilkan layar penuh'}
                    title={isFullscreen ? 'Keluar layar penuh' : 'Tampilkan layar penuh'}
                    className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-md border border-slate-300 bg-white p-2 text-slate-900 transition-colors hover:bg-slate-100 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <Maximize2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {isFullscreen ? 'Keluar layar penuh' : 'Tampilkan layar penuh'}
                    </span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onExitProjector}
                  aria-label="Keluar Mode Proyektor (Esc)"
                  title="Keluar Mode Proyektor (Esc)"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                >
                  <X className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="hidden md:inline">Keluar (Esc)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {ENABLE_PRINT_HANDOUT && <PrintableHandout />}
    </div>
  );
}
