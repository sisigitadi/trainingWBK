import React from 'react';
import { AlertTriangle, Info, ShieldCheck } from 'lucide-react';

export interface FeedbackBoxProps {
  variant: 'safe' | 'risk' | 'info';
  label?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_CONFIG = {
  safe: {
    container:
      'border-emerald-700/40 bg-emerald-50 text-emerald-950 dark:border-emerald-500/50 dark:bg-emerald-950/50 dark:text-emerald-50',
    badge:
      'bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950',
    iconColor: 'text-emerald-700 dark:text-emerald-400',
    defaultLabel: 'KONDISI AMAN / TEPAT',
    Icon: ShieldCheck,
  },
  risk: {
    container:
      'border-rose-700/40 bg-rose-50 text-rose-950 dark:border-rose-500/50 dark:bg-rose-950/50 dark:text-rose-50',
    badge:
      'bg-rose-700 text-white dark:bg-rose-500 dark:text-slate-950',
    iconColor: 'text-rose-700 dark:text-rose-400',
    defaultLabel: 'KONDISI BERISIKO',
    Icon: AlertTriangle,
  },
  info: {
    container:
      'border-slate-300 bg-slate-100 text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100',
    badge:
      'bg-[#0B1F3A] text-white dark:bg-slate-200 dark:text-slate-950',
    iconColor: 'text-[#0B1F3A] dark:text-sky-400',
    defaultLabel: 'DAMPAK & PENJELASAN',
    Icon: Info,
  },
} as const;

export function FeedbackBox({
  variant,
  label,
  title,
  children,
  className = '',
}: FeedbackBoxProps) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.Icon;
  const statusLabel = label ?? config.defaultLabel;

  return (
    <div
      role="status"
      className={`rounded-lg border p-4 ${config.container} ${className}`.trim()}
    >
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconColor}`} aria-hidden="true" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-wide ${config.badge}`}
            >
              {statusLabel}
            </span>
            {title && <span className="text-sm font-bold leading-snug">{title}</span>}
          </div>
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
