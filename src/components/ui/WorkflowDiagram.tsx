import { ArrowDown, ArrowRight, GitBranch } from 'lucide-react';
import type { WorkflowDiagramSpec } from '../../types/training';
import { RichTermText } from './RichTermText';

export interface WorkflowDiagramProps {
  diagram: WorkflowDiagramSpec;
}

/**
 * Render a module's sequential operational workflow as an equal-height horizontal
 * flow on desktop (lg+) and a stacked vertical flow on mobile/tablet (< lg).
 */
export function WorkflowDiagram({ diagram }: WorkflowDiagramProps) {
  if (!diagram || diagram.steps.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="workflow-diagram-heading"
      className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
    >
      <div className="mb-4 space-y-1">
        <div className="flex items-center gap-2">
          <GitBranch
            className="h-5 w-5 shrink-0 text-[#047857] dark:text-[#10B981]"
            aria-hidden="true"
          />
          <h2
            id="workflow-diagram-heading"
            className="text-lg font-bold text-slate-900 dark:text-slate-100"
          >
            <RichTermText text={diagram.title} />
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <RichTermText text={diagram.subtitle} />
        </p>
      </div>

      <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-6">
        {diagram.steps.map((step, idx) => {
          const hasNext = idx < diagram.steps.length - 1;
          return (
            <li key={step.step} className="relative flex min-w-0 flex-1 flex-col">
              <div className="flex flex-1 flex-col justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50/90 p-3.5 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="inline-flex h-6 min-w-[26px] items-center justify-center rounded bg-[#0B1F3A] px-1.5 font-mono text-xs font-bold tabular-nums text-emerald-300 dark:bg-[#10B981] dark:text-slate-950">
                      {String(step.step).padStart(2, '0')}
                    </span>
                    <span className="rounded bg-slate-200/85 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-800 dark:bg-slate-800 dark:text-emerald-300">
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold leading-snug text-slate-900 dark:text-slate-100">
                    <RichTermText text={step.title} />
                  </h3>
                </div>

                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  <RichTermText text={step.action} />
                </p>
              </div>

              {hasNext && (
                <>
                  <div
                    aria-hidden="true"
                    className="flex items-center justify-center pt-2 text-[#047857] dark:text-[#10B981] lg:hidden"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-5 top-1/2 hidden w-4 -translate-y-1/2 items-center justify-center text-[#047857] dark:text-[#10B981] lg:flex"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
