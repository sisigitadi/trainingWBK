import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BellRing,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Compass,
  Heart,
  Info,
  Lock,
  Menu,
  Monitor,
  Moon,
  Printer,
  RotateCcw,
  Sun,
  Utensils,
  X,
} from 'lucide-react';
import { getModuleById, modules } from '../data/modulesData';
import { type AppRoute, getNextRoute, getPrevRoute, navigateTo } from '../lib/router';
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
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [now, setNow] = useState<Date>(() => new Date());
  const [simTimePreset, setSimTimePreset] = useState<SimTimePreset>('realtime');
  const [dismissedWarningKey, setDismissedWarningKey] = useState<string | null>(null);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeDrawerButtonRef = useRef<HTMLButtonElement | null>(null);
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const [topBarHeight, setTopBarHeight] = useState<number>(100);
  const wasDrawerOpenRef = useRef(false);
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  const pagiModules = useMemo(() => modules.filter((m) => m.session === 'pagi'), []);
  const siangModules = useMemo(() => modules.filter((m) => m.session === 'siang'), []);

  const prevRoute = useMemo(() => getPrevRoute(route.hash), [route.hash]);
  const nextRoute = useMemo(() => getNextRoute(route.hash), [route.hash]);
  const slideLabel = useMemo(() => getSlideLabel(route), [route]);

  const effectivePreset: SimTimePreset = instructorMode ? simTimePreset : 'realtime';
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
  }, [instructorMode]);

  useEffect(() => {
    if (projectorMode) {
      setMobileMenuOpen(false);
    }
  }, [projectorMode]);

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
    const focusTimer = window.setTimeout(() => {
      closeDrawerButtonRef.current?.focus();
    }, 10);

    const handleDrawerKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleDrawerKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleDrawerKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!projectorMode) return;

    const handleProjectorKeyDown = (event: KeyboardEvent) => {
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
  }, [projectorMode, prevRoute, nextRoute, onExitProjector]);

  const handleNarasumberClick = () => {
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
                    isActive ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
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
                      : 'text-slate-500 dark:text-slate-400'
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

  const showRundownWarning =
    rundownStatus.isWarningWindow &&
    rundownStatus.warningKey !== null &&
    dismissedWarningKey !== rundownStatus.warningKey &&
    rundownStatus.warningMessage !== null;

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
  }, [showRundownWarning, storageError, instructorMode]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#091322] dark:text-slate-100">
      <div className="no-print">
        <div
          ref={topBarRef}
          className="fixed inset-x-0 top-0 z-30 border-b border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-800/70 dark:bg-[#0B1F3A]/85"
        >
          <header>
            <div className="mx-auto flex max-w-[1440px] flex-col gap-1.5 px-4 py-2 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  {!projectorMode && (
                    <button
                      ref={menuButtonRef}
                      type="button"
                      onClick={() => setMobileMenuOpen(true)}
                      aria-label="Buka menu modul"
                      aria-expanded={mobileMenuOpen}
                      aria-controls="mobile-module-drawer"
                      className="inline-flex min-h-[38px] min-w-[38px] shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 lg:hidden"
                    >
                      <Menu className="h-5 w-5" aria-hidden="true" />
                    </button>
                  )}

                  <img
                    src="./logo.jpg"
                    alt="Logo Training Security Awareness"
                    className="h-9 w-9 shrink-0 rounded-lg border border-slate-300/60 object-cover shadow-sm dark:border-slate-700/60 sm:h-10 sm:w-10"
                  />

                  <div className="min-w-0 space-y-0.5">
                    <span className="block text-sm font-bold leading-snug tracking-tight text-[#0B1F3A] dark:text-white sm:text-base lg:text-lg">
                      Training IT Security Awareness and Cybersecurity Protection 2026
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center text-xs font-semibold text-slate-700 dark:text-slate-200 sm:text-sm">
                        <button
                          type="button"
                          onClick={handleNarasumberClick}
                          className="inline-flex select-none items-center rounded px-1 py-0.5 text-left transition-colors hover:bg-slate-100 dark:hover:bg-white/10"
                          title="Klik 9x untuk membuka fitur narasumber"
                        >
                          <span>Sigit Adi Irianto, S.Kom. -&nbsp;</span>
                        </button>
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
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="inline-flex items-center rounded bg-emerald-100 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wide text-[#047857] dark:bg-emerald-500/20 dark:text-emerald-300">
                            Mode Narasumber Aktif
                          </span>
                          <button
                            type="button"
                            onClick={onLockInstructor}
                            className="inline-flex min-h-[32px] items-center gap-1 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                          >
                            <Lock className="h-3 w-3 shrink-0" aria-hidden="true" />
                            <span>Kunci Mode</span>
                          </button>
                        </div>
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

                  {instructorMode && (
                    <button
                      type="button"
                      onClick={handlePrintHandout}
                      className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                    >
                      <Printer
                        className="h-3.5 w-3.5 shrink-0 text-[#0B1F3A] dark:text-sky-400"
                        aria-hidden="true"
                      />
                      <span>Cetak Handout</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={
                      state.theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'
                    }
                    title={
                      state.theme === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'
                    }
                    className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
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
                      className={`inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                        projectorMode
                          ? 'border-[#047857] bg-[#047857] text-white hover:bg-[#065F46] dark:border-[#10B981] dark:bg-[#10B981] dark:text-slate-950'
                          : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Monitor className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>Mode Proyektor</span>
                    </button>
                  )}
                </div>
              </div>

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

                {instructorMode && (
                  <div className="flex items-center gap-1.5">
                    <select
                      aria-label="Simulasi waktu rundown"
                      value={simTimePreset}
                      onChange={(e) => {
                        setSimTimePreset(e.target.value as SimTimePreset);
                        setDismissedWarningKey(null);
                      }}
                      className="min-h-[32px] rounded-md border border-slate-300 bg-white px-2 py-1 font-mono text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
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
            </div>
          </header>

          {showRundownWarning && (
            <div
              role="status"
              className="border-t border-amber-300 bg-amber-50 px-4 py-2 text-amber-950 dark:border-amber-700/60 dark:bg-amber-950/80 dark:text-amber-100 sm:px-6"
            >
              <div className="mx-auto flex max-w-[1440px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2">
                  <BellRing
                    className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300"
                    aria-hidden="true"
                  />
                  <p className="text-xs sm:text-sm font-semibold leading-snug">
                    {rundownStatus.warningMessage}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {rundownStatus.nextSegment?.route && (
                    <button
                      type="button"
                      onClick={() => navigateTo(rundownStatus.nextSegment!.route!)}
                      className="inline-flex min-h-[32px] items-center gap-1.5 rounded-md bg-[#0B1F3A] px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-[#10B981] dark:text-slate-950"
                    >
                      <span>Buka Sesi Berikutnya</span>
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setDismissedWarningKey(rundownStatus.warningKey)}
                    className="inline-flex min-h-[32px] items-center rounded-md border border-amber-400 bg-white px-2.5 py-1 text-xs font-semibold text-amber-950 transition-colors hover:bg-amber-100 dark:border-amber-700 dark:bg-slate-900 dark:text-amber-100 dark:hover:bg-slate-800"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}

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
                    className="inline-flex min-h-[32px] items-center gap-1.5 rounded-md border border-amber-700 bg-amber-700 px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-amber-800 dark:border-amber-500 dark:bg-amber-500 dark:text-slate-950"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Atur Ulang Progres</span>
                  </button>
                  <button
                    type="button"
                    onClick={dismissStorageError}
                    className="inline-flex min-h-[32px] items-center rounded-md border border-amber-400 bg-white px-2.5 py-1 text-xs font-semibold text-amber-950 transition-colors hover:bg-amber-100 dark:border-amber-700 dark:bg-slate-900 dark:text-amber-100 dark:hover:bg-slate-800"
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
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <div className="relative z-10 flex h-full w-full max-w-xs flex-col border-r border-slate-200 bg-slate-50 shadow-xl dark:border-slate-800 dark:bg-[#091322]">
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

        <div
          style={{ paddingTop: `${topBarHeight + 16}px` }}
          className={`mx-auto w-full px-4 pb-16 sm:px-6 sm:pb-20 ${
            projectorMode ? 'max-w-6xl pb-28' : 'max-w-[1440px]'
          }`}
        >
          <div
            className={
              projectorMode
                ? 'block'
                : 'lg:grid lg:grid-cols-[310px_minmax(0,1fr)] lg:items-start lg:gap-7'
            }
          >
            {!projectorMode && (
              <aside
                style={{
                  top: `${topBarHeight + 16}px`,
                  maxHeight: `calc(100vh - ${topBarHeight + 48}px)`,
                }}
                className="hidden lg:sticky lg:block lg:overflow-y-auto lg:pr-1"
              >
                {renderSidebarContent()}
              </aside>
            )}

            <div className="min-w-0 flex-1">
              {showDisclaimer && (
                <aside
                  aria-label="Catatan Contoh Studi Kasus"
                  className="mb-5 rounded-lg border border-sky-200 border-l-4 border-l-[#0B1F3A] bg-white p-4 text-slate-900 dark:border-slate-700 dark:border-l-sky-400 dark:bg-slate-900 dark:text-slate-100"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-2.5">
                      <Info
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#0B1F3A] dark:text-sky-400"
                        aria-hidden="true"
                      />
                      <div className="space-y-1 text-sm">
                        <h2 className="font-bold text-[#0B1F3A] dark:text-slate-100">
                          Catatan Contoh Studi Kasus (Entitas Rekaan)
                        </h2>
                        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                          PT. Sigit Adi Aman Siber (SaaS) dan sistem SaaSCore adalah nama perusahaan dan platform rekaan (tidak nyata) yang digunakan semata-mata sebagai contoh agar memudahkan pemahaman serta memberikan pengalaman belajar (user experience) yang selaras dengan pekerjaan nyata.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowDisclaimer(false)}
                      className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                      Saya Mengerti
                    </button>
                  </div>
                </aside>
              )}

              <main>{children}</main>
            </div>
          </div>
        </div>

        {!projectorMode && (
          <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200/70 bg-white/80 py-2 text-center text-xs text-slate-600 shadow-sm backdrop-blur-md dark:border-slate-800/70 dark:bg-[#0B1F3A]/85 dark:text-slate-300">
            <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-1.5 px-4 sm:px-6">
              <span>Develop with</span>
              <Heart
                className="inline-block h-3.5 w-3.5 animate-pulse fill-red-600 text-red-600 dark:fill-red-500 dark:text-red-500"
                aria-hidden="true"
              />
              <span className="sr-only">love</span>
              <span>-</span>
              <a
                href="https://sigitadi.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-800 underline underline-offset-2 hover:text-[#047857] dark:text-slate-100 dark:hover:text-emerald-400"
              >
                sigitadi.id
                <sup className="ml-0.5 text-[10px] no-underline">©</sup>
              </a>
              <span>- 2026</span>
            </div>
          </footer>
        )}

        {projectorMode && (
          <div
            role="region"
            aria-label="Kontrol Mode Proyektor"
            className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-300 bg-white/95 px-4 py-3 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-[#0B1F3A]/95 sm:px-6"
          >
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => prevRoute && navigateTo(prevRoute)}
                  disabled={!prevRoute}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Sebelumnya</span>
                </button>
                <button
                  type="button"
                  onClick={() => nextRoute && navigateTo(nextRoute)}
                  disabled={!nextRoute}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[#0B1F3A] bg-[#0B1F3A] px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-45 dark:border-[#10B981] dark:bg-[#10B981] dark:text-slate-950 dark:hover:bg-emerald-400"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="min-w-0 flex-1 text-center">
                <p className="font-mono text-xs font-semibold text-slate-700 dark:text-emerald-300 sm:text-sm">
                  {slideLabel}
                </p>
              </div>

              <button
                type="button"
                onClick={onExitProjector}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-slate-300 bg-slate-100 px-3.5 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                <span>Keluar Mode Proyektor (Esc)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <PrintableHandout />
    </div>
  );
}
