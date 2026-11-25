import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FlaskConical,
  Lightbulb,
  MessageSquare,
  Presentation,
  ShieldAlert,
  ShieldCheck,
  Target,
  XCircle,
} from 'lucide-react';
import { GOLDEN_RULES } from '../data/goldenRules';
import type { ModuleContent } from '../types/training';
import { Callout, RichTermText, WorkflowDiagram } from './ui';

export interface MaterialViewProps {
  module: ModuleContent;
  projectorMode?: boolean;
  instructorMode?: boolean;
  onStartLab: () => void;
}

export function MaterialView({
  module,
  projectorMode = false,
  instructorMode = false,
  onStartLab,
}: MaterialViewProps) {
  const [showInstructorGuide, setShowInstructorGuide] = useState(false);

  const isGuideOpen = showInstructorGuide;
  const labCode = `Lab ${String(module.id).padStart(2, '0')}`;
  const ctaLabel = module.lab.title.toLowerCase().startsWith('lab ')
    ? `Lanjut ke ${module.lab.title}`
    : `Lanjut ke ${labCode}: ${module.lab.title}`;

  return (
    <div className="space-y-6">
      {instructorMode && !projectorMode && (
        <section
          aria-labelledby="instructor-guide-heading"
          className="rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-6">
            <div className="flex items-center gap-2.5">
              <Presentation
                className="h-5 w-5 shrink-0 text-[#047857] dark:text-[#10B981]"
                aria-hidden="true"
              />
              <div>
                <h2
                  id="instructor-guide-heading"
                  className="text-base font-bold text-slate-900 dark:text-slate-100"
                >
                  Panduan Narasumber (Sigit Adi Irianto, S.Kom.)
                </h2>
                <p className="flex items-center gap-1.5 font-mono text-xs text-slate-600 dark:text-slate-400">
                  <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Estimasi Durasi: {module.instructorGuide.durationMinutes} Menit</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowInstructorGuide((prev) => !prev)}
              aria-expanded={isGuideOpen}
              aria-controls={`instructor-guide-body-${module.id}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <span>
                {isGuideOpen
                  ? 'Sembunyikan Catatan Narasumber'
                  : 'Tampilkan Catatan Narasumber'}
              </span>
              {isGuideOpen ? (
                <ChevronUp className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
            </button>
          </div>

          {isGuideOpen && (
            <div
              id={`instructor-guide-body-${module.id}`}
              className="space-y-4 border-t border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/40 sm:p-6"
            >
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-emerald-300">
                  Poin Penyampaian Utama
                </h3>
                <ul className="mt-2 space-y-2">
                  {module.instructorGuide.talkingPoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-800 dark:text-slate-200"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0B1F3A] font-mono text-xs font-bold tabular-nums text-emerald-300 dark:bg-slate-800">
                        {idx + 1}
                      </span>
                      <span>
                        <RichTermText text={point} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-md border border-emerald-700/30 bg-emerald-50/80 p-3.5 dark:border-emerald-500/40 dark:bg-emerald-950/30">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wide text-[#047857] dark:text-[#10B981]">
                  <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Pemantik Diskusi Kelas</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  <RichTermText text={module.instructorGuide.discussionPrompt} />
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      <section
        aria-labelledby="objectives-heading"
        className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
      >
        <div className="mb-3 flex items-center gap-2">
          <Target
            className="h-5 w-5 shrink-0 text-[#047857] dark:text-[#10B981]"
            aria-hidden="true"
          />
          <h2 id="objectives-heading" className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Tujuan Pembelajaran
          </h2>
        </div>
        <ul className="space-y-2.5">
          {module.objectives.map((objective, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-[#047857] dark:text-[#10B981]"
                aria-hidden="true"
              />
              <span>
                <RichTermText text={objective} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <WorkflowDiagram diagram={module.workflowDiagram} />

      <section aria-labelledby="material-sections-heading" className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <BookOpen
            className="h-5 w-5 shrink-0 text-[#0B1F3A] dark:text-sky-400"
            aria-hidden="true"
          />
          <h2
            id="material-sections-heading"
            className="text-lg font-bold text-slate-900 dark:text-slate-100"
          >
            Pembahasan Materi
          </h2>
        </div>

        <div className="space-y-4">
          {module.sections.map((sec, index) => (
            <article
              key={index}
              className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
            >
              <div className="mb-3 flex items-baseline gap-2.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold tabular-nums text-[#0B1F3A] dark:bg-slate-800 dark:text-emerald-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-slate-100 sm:text-lg">
                  <RichTermText text={sec.heading} />
                </h3>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
                {sec.paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx}>
                    <RichTermText text={paragraph} />
                  </p>
                ))}
              </div>

              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-3.5 dark:border-slate-800">
                  {sec.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#047857] dark:bg-[#10B981]"
                        aria-hidden="true"
                      />
                      <span>
                        <RichTermText text={bullet} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <Callout
        title={module.analogy.title}
        badge="ANALOGI SEHARI-HARI"
        variant="emerald"
        icon={
          <Lightbulb
            className="h-5 w-5 text-[#047857] dark:text-[#10B981]"
            aria-hidden="true"
          />
        }
      >
        <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 sm:text-base">
          <RichTermText text={module.analogy.body} />
        </p>
      </Callout>

      <section aria-labelledby="saas-cases-heading" className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Briefcase
            className="h-5 w-5 shrink-0 text-[#0B1F3A] dark:text-sky-400"
            aria-hidden="true"
          />
          <h2
            id="saas-cases-heading"
            className="text-lg font-bold text-slate-900 dark:text-slate-100"
          >
            Studi Kasus Operasional SaaS / SaaSCore
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {module.sasCases.map((item, idx) => (
            <article
              key={idx}
              className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#0B1F3A] px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-wide text-emerald-300 dark:bg-slate-800">
                    KASUS {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-slate-100">
                    <RichTermText text={item.title} />
                  </h3>
                </div>

                <div className="space-y-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                      Konteks Operasional
                    </p>
                    <p className="mt-0.5">
                      <RichTermText text={item.context} />
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                      Skenario Kejadian
                    </p>
                    <p className="mt-0.5">
                      <RichTermText text={item.whatHappened} />
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-md border border-emerald-700/25 bg-emerald-50/70 p-3 dark:border-emerald-500/30 dark:bg-emerald-950/30">
                <p className="font-mono text-xs font-semibold uppercase tracking-wide text-[#047857] dark:text-[#10B981]">
                  Pelajaran Utama
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  <RichTermText text={item.lesson} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="dodont-heading" className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <ShieldCheck
            className="h-5 w-5 shrink-0 text-[#047857] dark:text-[#10B981]"
            aria-hidden="true"
          />
          <h2 id="dodont-heading" className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Lakukan (Do&apos;s) vs Hindari (Don&apos;ts)
          </h2>
        </div>

        <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-900 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-100">
                <th scope="col" className="w-1/3 px-4 py-3 font-bold">
                  <span className="inline-flex items-center gap-1.5 text-[#047857] dark:text-[#10B981]">
                    <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Lakukan (Do&apos;s)</span>
                  </span>
                </th>
                <th scope="col" className="w-1/3 px-4 py-3 font-bold">
                  <span className="inline-flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                    <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Hindari (Don&apos;ts)</span>
                  </span>
                </th>
                <th scope="col" className="w-1/3 px-4 py-3 font-bold">
                  Alasan &amp; Dampak
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {module.doDont.map((row, idx) => (
                <tr key={idx} className="align-top">
                  <td className="px-4 py-3.5 leading-relaxed text-slate-800 dark:text-slate-200">
                    <RichTermText text={row.doIt} />
                  </td>
                  <td className="px-4 py-3.5 leading-relaxed text-slate-800 dark:text-slate-200">
                    <RichTermText text={row.dontIt} />
                  </td>
                  <td className="px-4 py-3.5 leading-relaxed text-slate-600 dark:text-slate-300">
                    <RichTermText text={row.why} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {module.doDont.map((row, idx) => (
            <article
              key={idx}
              className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="rounded-md border border-emerald-700/30 bg-emerald-50/70 p-3 dark:border-emerald-500/40 dark:bg-emerald-950/30">
                <div className="mb-1 flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wide text-[#047857] dark:text-[#10B981]">
                  <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Lakukan (Do&apos;s)</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100">
                  <RichTermText text={row.doIt} />
                </p>
              </div>

              <div className="rounded-md border border-rose-700/30 bg-rose-50/70 p-3 dark:border-rose-500/40 dark:bg-rose-950/30">
                <div className="mb-1 flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wide text-rose-700 dark:text-rose-400">
                  <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Hindari (Don&apos;ts)</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100">
                  <RichTermText text={row.dontIt} />
                </p>
              </div>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                <p className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                  Alasan &amp; Dampak
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <RichTermText text={row.why} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {module.id === 10 && (
        <section
          aria-labelledby="golden-rules-heading"
          className="rounded-lg border-2 border-[#0B1F3A] bg-white p-5 dark:border-emerald-500/50 dark:bg-slate-900 sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldAlert
                className="h-5 w-5 shrink-0 text-[#047857] dark:text-[#10B981]"
                aria-hidden="true"
              />
              <h2
                id="golden-rules-heading"
                className="text-lg font-bold text-slate-900 dark:text-slate-100"
              >
                7 Kebiasaan Emas Keamanan Siber PT. Sigit Adi Aman Siber (SaaS)
              </h2>
            </div>
            <span className="rounded bg-[#0B1F3A] px-2.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-wide text-emerald-300 dark:bg-slate-800">
              PANDUAN HARIAN TIM SAAS
            </span>
          </div>

          <ol className="space-y-3">
            {GOLDEN_RULES.map((rule) => (
              <li
                key={rule.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#0B1F3A] font-mono text-xs font-bold tabular-nums text-emerald-300 dark:bg-[#10B981] dark:text-slate-950">
                    {String(rule.id).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      <RichTermText text={rule.title} />
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                      <RichTermText text={rule.rule} />
                    </p>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      <span className="font-semibold">Mengapa penting:</span>{' '}
                      <RichTermText text={rule.reason} />
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section
        aria-labelledby="takeaways-heading"
        className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
      >
        <h2
          id="takeaways-heading"
          className="mb-3 text-lg font-bold text-slate-900 dark:text-slate-100"
        >
          Ringkasan Poin Kunci
        </h2>
        <ul className="space-y-2.5">
          {module.keyTakeaways.map((point, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#047857]/15 font-mono text-xs font-bold text-[#047857] dark:bg-emerald-500/20 dark:text-emerald-300">
                {idx + 1}
              </span>
              <span>
                <RichTermText text={point} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="lab-cta-heading"
        className="rounded-lg border border-[#0B1F3A]/30 bg-[#0B1F3A] p-5 text-white dark:border-emerald-500/40 dark:bg-slate-900 sm:p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded bg-white/10 px-2.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-wide text-emerald-300">
              <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
              <span>SIMULASI EKSPLORATIF INTERAKTIF</span>
            </div>
            <h2 id="lab-cta-heading" className="text-lg font-bold text-white">
              <RichTermText text={module.lab.title} variant="inverse" />
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 dark:text-slate-300">
              <RichTermText text={module.lab.summary} variant="inverse" />
            </p>
          </div>

          <button
            type="button"
            onClick={onStartLab}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md bg-[#10B981] px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-400"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
