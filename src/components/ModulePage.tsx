import React, { Component, Suspense, lazy, useCallback, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import { getModuleById } from '../data/modulesData';
import { navigateTo } from '../lib/router';
import { useProgress } from '../state/ProgressContext';
import type { LabProps } from '../types/training';
import { MaterialView } from './MaterialView';
import { ExplorationBadge, RichTermText } from './ui';

const Lab01CIA = lazy(() => import('./labs/Lab01CIA'));
const Lab02AttackPath = lazy(() => import('./labs/Lab02AttackPath'));
const Lab03PhishingSim = lazy(() => import('./labs/Lab03PhishingSim'));
const Lab04AuthLab = lazy(() => import('./labs/Lab04AuthLab'));
const Lab05DataHandling = lazy(() => import('./labs/Lab05DataHandling'));
const Lab06EndpointAudit = lazy(() => import('./labs/Lab06EndpointAudit'));
const Lab07UrlInspector = lazy(() => import('./labs/Lab07UrlInspector'));
const Lab08IncidentSim = lazy(() => import('./labs/Lab08IncidentSim'));
const Lab09CloudChatAudit = lazy(() => import('./labs/Lab09CloudChatAudit'));
const Lab10CaseReview = lazy(() => import('./labs/Lab10CaseReview'));

const LAB_COMPONENTS: Record<number, React.LazyExoticComponent<React.ComponentType<LabProps>>> = {
  1: Lab01CIA,
  2: Lab02AttackPath,
  3: Lab03PhishingSim,
  4: Lab04AuthLab,
  5: Lab05DataHandling,
  6: Lab06EndpointAudit,
  7: Lab07UrlInspector,
  8: Lab08IncidentSim,
  9: Lab09CloudChatAudit,
  10: Lab10CaseReview,
};

interface LabErrorBoundaryProps {
  onRetry: () => void;
  children: React.ReactNode;
}

interface LabErrorBoundaryState {
  hasError: boolean;
}

class LabErrorBoundary extends Component<LabErrorBoundaryProps, LabErrorBoundaryState> {
  state: LabErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): LabErrorBoundaryState {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    this.props.onRetry();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="rounded-lg border border-rose-300 bg-rose-50 p-6 text-rose-950 dark:border-rose-700/60 dark:bg-rose-950/40 dark:text-rose-100"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              className="mt-0.5 h-6 w-6 shrink-0 text-rose-700 dark:text-rose-400"
              aria-hidden="true"
            />
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-bold">Gagal Memuat Simulasi Interaktif</h3>
                <p className="mt-1 text-sm leading-relaxed">
                  Komponen simulasi mengalami kendala saat dimuat. Silakan coba muat ulang komponen di bawah ini.
                </p>
              </div>
              <button
                type="button"
                onClick={this.handleRetry}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-rose-700 bg-rose-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-800 dark:border-rose-500 dark:bg-rose-500 dark:text-slate-950"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>Coba Muat Ulang</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export interface ModulePageProps {
  moduleId: number;
  tab: 'materi' | 'lab';
  projectorMode?: boolean;
  instructorMode?: boolean;
}

export function ModulePage({
  moduleId,
  tab,
  projectorMode = false,
  instructorMode = false,
}: ModulePageProps) {
  const { state, recordExploration } = useProgress();
  const [labRetryKey, setLabRetryKey] = useState(0);

  const materiTabRef = useRef<HTMLButtonElement | null>(null);
  const labTabRef = useRef<HTMLButtonElement | null>(null);

  const mod = getModuleById(moduleId);
  const exploration = state.modules[moduleId];

  const handleMarkExplored = useCallback(
    (exploredItems: number, totalItems: number) => {
      recordExploration(moduleId, exploredItems, totalItems);
    },
    [moduleId, recordExploration]
  );

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      if (tab === 'materi') {
        navigateTo(`#/modul/${moduleId}/lab`);
        labTabRef.current?.focus();
      } else {
        navigateTo(`#/modul/${moduleId}`);
        materiTabRef.current?.focus();
      }
    }
  };

  if (!mod) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Modul Tidak Ditemukan
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Modul pelatihan yang Anda pilih tidak tersedia. Silakan kembali ke Modul 01.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('#/modul/1')}
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#0B1F3A] px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-[#10B981] dark:text-slate-950"
        >
          <span>Kembali ke Modul 01</span>
        </button>
      </div>
    );
  }

  const moduleCode = `MODUL ${String(mod.id).padStart(2, '0')}`;
  const sessionLabel = mod.session === 'pagi' ? 'SESI PAGI' : 'SESI SIANG';
  const ActiveLab = LAB_COMPONENTS[mod.id];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border-2 border-[#0B1F3A]/20 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center rounded-md bg-[#0B1F3A] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-300 dark:bg-slate-800">
            {moduleCode} / {sessionLabel} {mod.timeSlot}
          </div>

          <ExplorationBadge
            explored={exploration?.explored}
            exploredItems={exploration?.exploredItems}
            totalItems={exploration?.totalItems}
          />
        </div>

        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
          <RichTermText text={mod.title} />
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          <RichTermText text={mod.tagline} />
        </p>

        <div
          role="tablist"
          aria-label="Navigasi tampilan modul"
          className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-4 dark:border-slate-800"
        >
          <button
            ref={materiTabRef}
            type="button"
            role="tab"
            id={`tab-materi-${mod.id}`}
            aria-selected={tab === 'materi'}
            aria-controls={`panel-modul-${mod.id}`}
            tabIndex={tab === 'materi' ? 0 : -1}
            onClick={() => navigateTo(`#/modul/${mod.id}`)}
            onKeyDown={handleTabKeyDown}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${tab === 'materi'
                ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white dark:border-[#10B981] dark:bg-[#10B981] dark:text-slate-950'
                : 'border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
          >
            <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Materi &amp; Studi Kasus</span>
          </button>

          <button
            ref={labTabRef}
            type="button"
            role="tab"
            id={`tab-lab-${mod.id}`}
            aria-selected={tab === 'lab'}
            aria-controls={`panel-modul-${mod.id}`}
            tabIndex={tab === 'lab' ? 0 : -1}
            onClick={() => navigateTo(`#/modul/${mod.id}/lab`)}
            onKeyDown={handleTabKeyDown}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${tab === 'lab'
                ? 'border-[#047857] bg-[#047857] text-white dark:border-[#10B981] dark:bg-[#10B981] dark:text-slate-950'
                : 'border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
          >
            <FlaskConical className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Simulasi &amp; Eksplorasi Interaktif</span>
          </button>
        </div>
      </section>

      <div
        role="tabpanel"
        id={`panel-modul-${mod.id}`}
        aria-labelledby={tab === 'materi' ? `tab-materi-${mod.id}` : `tab-lab-${mod.id}`}
      >
        {tab === 'materi' ? (
          <MaterialView
            module={mod}
            projectorMode={projectorMode}
            instructorMode={instructorMode}
            onStartLab={() => navigateTo(`#/modul/${mod.id}/lab`)}
          />
        ) : (
          <LabErrorBoundary
            key={`${mod.id}-${labRetryKey}`}
            onRetry={() => setLabRetryKey((prev) => prev + 1)}
          >
            <Suspense
              fallback={
                <div
                  role="status"
                  className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900"
                >
                  <Loader2
                    className="h-7 w-7 animate-spin text-[#047857] dark:text-[#10B981]"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Memuat simulasi Lab {String(mod.id).padStart(2, '0')}, mohon tunggu
                  </p>
                </div>
              }
            >
              {ActiveLab ? (
                <ActiveLab
                  moduleId={mod.id}
                  instructorMode={instructorMode}
                  onMarkExplored={handleMarkExplored}
                />
              ) : (
                <div
                  role="alert"
                  className="rounded-lg border border-amber-300 bg-amber-50 p-6 text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100"
                >
                  Simulasi untuk modul ini belum tersedia.
                </div>
              )}
            </Suspense>
          </LabErrorBoundary>
        )}
      </div>

      <nav
        aria-label="Navigasi antar modul"
        className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800"
      >
        {mod.id > 1 ? (
          <button
            type="button"
            onClick={() => navigateTo(`#/modul/${mod.id - 1}`)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Modul {String(mod.id - 1).padStart(2, '0')}</span>
          </button>
        ) : (
          <div />
        )}

        {mod.id < 10 ? (
          <button
            type="button"
            onClick={() => navigateTo(`#/modul/${mod.id + 1}`)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#0B1F3A] bg-[#0B1F3A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <span>Modul {String(mod.id + 1).padStart(2, '0')}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigateTo('#/penutup')}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#047857] bg-[#047857] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#065F46] dark:border-[#10B981] dark:bg-[#10B981] dark:text-slate-950"
          >
            <span>Sesi Penutup: Rangkuman &amp; Kartu Saku</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </nav>
    </div>
  );
}
