import { CheckCircle2, Clock, Compass } from 'lucide-react';

export interface ExplorationBadgeProps {
  explored?: boolean;
  exploredItems?: number;
  totalItems?: number;
  className?: string;
}

export function ExplorationBadge({
  explored = false,
  exploredItems,
  totalItems,
  className = '',
}: ExplorationBadgeProps) {
  const hasCounts =
    typeof exploredItems === 'number' &&
    typeof totalItems === 'number' &&
    totalItems > 0;

  if (explored) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-md border border-emerald-700/30 bg-emerald-50 px-2.5 py-1 font-mono text-xs font-semibold tabular-nums text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-300 ${className}`.trim()}
      >
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>
          {hasCounts
            ? `Dieksplorasi (${Math.min(exploredItems, totalItems)}/${totalItems})`
            : 'Sudah Dieksplorasi'}
        </span>
      </span>
    );
  }

  if (hasCounts && exploredItems > 0) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-md border border-sky-700/30 bg-sky-50 px-2.5 py-1 font-mono text-xs font-semibold tabular-nums text-sky-900 dark:border-sky-500/40 dark:bg-sky-950/60 dark:text-sky-200 ${className}`.trim()}
      >
        <Compass className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>
          Dieksplorasi: {Math.min(exploredItems, totalItems)}/{totalItems}
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-slate-100 px-2.5 py-1 font-mono text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 ${className}`.trim()}
    >
      <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>Belum Dieksplorasi</span>
    </span>
  );
}
