import React from 'react';
import { CheckCircle2, RotateCcw, Terminal } from 'lucide-react';
import type { Session } from '../../types/training';
import { ExplorationBadge } from './ExplorationBadge';
import { RichTermText } from './RichTermText';

export interface LabShellProps {
  moduleId: number;
  session: Exclude<Session, 'penutup'>;
  title: string;
  instructions: string;
  exploredCount?: number;
  totalCount?: number;
  isExplored?: boolean;
  onMarkDone?: () => void;
  onReset?: () => void;
  children: React.ReactNode;
}

export function LabShell({
  moduleId,
  session,
  title,
  instructions,
  exploredCount,
  totalCount,
  isExplored = false,
  onMarkDone,
  onReset,
  children,
}: LabShellProps) {
  const labCode = `LAB ${String(moduleId).padStart(2, '0')}`;
  const sessionLabel = session === 'pagi' ? 'SESI PAGI' : 'SESI SIANG';

  const hasProgress =
    typeof exploredCount === 'number' &&
    typeof totalCount === 'number' &&
    totalCount > 0;
  const clampedExplored = hasProgress
    ? Math.max(0, Math.min(exploredCount, totalCount))
    : 0;
  const progressPct = hasProgress
    ? Math.round((clampedExplored / totalCount) * 100)
    : 0;

  return (
    <section className="space-y-5">
      <header className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 rounded-md bg-[#0B1F3A] px-2.5 py-1 font-mono text-xs font-semibold tracking-wider text-emerald-300 dark:bg-slate-800">
            <Terminal className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>
              {labCode} / {sessionLabel}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ExplorationBadge
              explored={isExplored}
              exploredItems={exploredCount}
              totalItems={totalCount}
            />
          </div>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          <RichTermText text={title} />
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <RichTermText text={instructions} />
        </p>

        {hasProgress && (
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between font-mono text-xs text-slate-600 dark:text-slate-400">
              <span>
                Kondisi Dieksplorasi: {clampedExplored} dari {totalCount}
              </span>
              <span className="tabular-nums">{progressPct}%</span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800"
              role="progressbar"
              aria-label="Progres eksplorasi kondisi insiden"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-[#047857] transition-all duration-300 dark:bg-[#10B981]"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {(onMarkDone || onReset) && (
          <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-slate-200 pt-4 dark:border-slate-800">
            {onMarkDone && !isExplored && (
              <button
                type="button"
                onClick={onMarkDone}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#047857] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#065F46] dark:bg-[#10B981] dark:text-slate-950 dark:hover:bg-emerald-400"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>Tandai Selesai Dipelajari</span>
              </button>
            )}
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>Reset Simulasi</span>
              </button>
            )}
          </div>
        )}
      </header>

      {isExplored && (
        <div
          role="status"
          className="rounded-lg border border-emerald-700/40 bg-emerald-50 p-4 text-emerald-950 dark:border-emerald-500/50 dark:bg-emerald-950/40 dark:text-emerald-50"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-[#047857] dark:text-[#10B981]"
                aria-hidden="true"
              />
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
                  SIMULASI SELESAI DIPELAJARI
                </p>
                <p className="mt-1 text-sm leading-relaxed">
                  Seluruh skenario aman maupun berisiko pada simulasi ini telah Anda eksplorasi. Anda tetap bebas mencoba skenario lain atau mengulang simulasi kapan saja.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>{children}</div>
    </section>
  );
}
