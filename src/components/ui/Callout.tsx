import React from 'react';

export interface CalloutProps {
  title: string;
  variant?: 'navy' | 'emerald' | 'amber' | 'slate';
  badge?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_STYLES = {
  navy: 'border-slate-200 border-l-[#0B1F3A] bg-slate-50 text-slate-900 dark:border-slate-700 dark:border-l-sky-400 dark:bg-slate-900/90 dark:text-slate-100',
  emerald:
    'border-emerald-200 border-l-[#047857] bg-emerald-50/70 text-slate-900 dark:border-emerald-800/60 dark:border-l-emerald-400 dark:bg-emerald-950/30 dark:text-slate-100',
  amber:
    'border-amber-200 border-l-amber-600 bg-amber-50/70 text-slate-900 dark:border-amber-800/60 dark:border-l-amber-400 dark:bg-amber-950/30 dark:text-slate-100',
  slate:
    'border-slate-200 border-l-slate-500 bg-white text-slate-900 dark:border-slate-700 dark:border-l-slate-400 dark:bg-slate-900 dark:text-slate-100',
} as const;

export function Callout({
  title,
  variant = 'navy',
  badge,
  icon,
  children,
  className = '',
}: CalloutProps) {
  return (
    <aside
      className={`rounded-lg border border-l-4 p-4 sm:p-5 ${VARIANT_STYLES[variant]} ${className}`.trim()}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {icon && <span className="shrink-0">{icon}</span>}
        {badge && (
          <span className="rounded bg-[#0B1F3A] px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-wide text-white dark:bg-slate-800 dark:text-emerald-300">
            {badge}
          </span>
        )}
        <h3 className="text-base font-bold leading-snug">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </aside>
  );
}
