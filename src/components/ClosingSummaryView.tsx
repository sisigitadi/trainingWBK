import { useEffect } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckSquare,
  Compass,
  CreditCard,
  FileText,
  FlaskConical,
  Printer,
} from 'lucide-react';
import { GOLDEN_RULES } from '../data/goldenRules';
import { modules } from '../data/modulesData';
import { ENABLE_PRINT_HANDOUT } from '../lib/features';
import { navigateTo } from '../lib/router';
import { useProgress } from '../state/ProgressContext';
import { Callout, ExplorationBadge } from './ui';

const LAPTOP_FOLLOWUP_CHECKLIST = [
  'Sistem operasi (Windows/macOS/Linux) dan browser kerja menggunakan versi terbaru dan patch keamanan rutin aktif.',
  'Bebas dari software bajakan, crack, atau aktivator tidak resmi yang berisiko membawa infostealer.',
  'Enkripsi disk penuh (BitLocker atau FileVault) dalam keadaan aktif di laptop kerja.',
  'Kunci layar otomatis aktif maksimal 5 menit dan terbiasa menekan Win + L saat meninggalkan meja.',
  'Antivirus atau Endpoint Detection and Response (EDR) aktif serta pembaruan definisi berjalan normal.',
  'Akun penggunaan harian di laptop bukan akun Administrator penuh dan kontrol UAC tetap menyala.',
  'Kebijakan kehati-hatian USB diterapkan: tidak mencolokkan flashdisk asing ke laptop operasional SaaSCore.',
  'Kredensial disimpan di password manager resmi, tidak ada catatan password plaintext di Desktop atau chat.',
];

export interface ClosingSummaryViewProps {
  instructorMode?: boolean;
}

export function ClosingSummaryView({ instructorMode = false }: ClosingSummaryViewProps) {
  const { state, exploredCount, explorationPercent, markModuleCompleted } = useProgress();

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

  const handlePrintTarget = (target: 'card' | 'handout') => {
    document.body.dataset.printTarget = target;
    window.print();
  };

  return (
    <div className="space-y-6">
      <section className="no-print rounded-lg border-2 border-[#0B1F3A]/20 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
        <div className="mb-3 inline-flex items-center rounded-md bg-[#0B1F3A] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-300 dark:bg-slate-800">
          SESI PENUTUP / 16.00 WIB
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
          Rangkuman Pembelajaran &amp; Kartu Saku 7 Kebiasaan Emas SaaS
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          {ENABLE_PRINT_HANDOUT
            ? 'Tinjau modul yang sudah dieksplorasi bersama Narasumber Sigit Adi Irianto, S.Kom. (sigitadi.id), cetak Kartu Saku 7 Kebiasaan Emas PT. Sigit Adi Aman Siber (SaaS), atau cetak Handout Materi Presentasi dalam format A4 yang rapi.'
            : 'Tinjau modul yang sudah dieksplorasi bersama Narasumber Sigit Adi Irianto, S.Kom. (sigitadi.id), dan cetak Kartu Saku 7 Kebiasaan Emas PT. Sigit Adi Aman Siber (SaaS) sebagai panduan harian.'}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Modul Dieksplorasi
            </p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#0B1F3A] dark:text-slate-50">
              {exploredCount}/10
            </p>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              Cakupan eksplorasi skenario dan materi
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Progres Eksplorasi
            </p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#047857] dark:text-[#10B981]">
              {explorationPercent}%
            </p>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              Pembelajaran eksploratif tanpa ujian nilai
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Narasumber &amp; Mitra Sistem
            </p>
            <p className="mt-1 text-base font-bold text-[#0B1F3A] dark:text-slate-50">
              Sigit Adi Irianto, S.Kom.
            </p>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              PT. Sigit Adi Aman Siber (SaaSCore)
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="exploration-recap-heading" className="no-print space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Compass
              className="h-5 w-5 shrink-0 text-[#047857] dark:text-[#10B981]"
              aria-hidden="true"
            />
            <h2
              id="exploration-recap-heading"
              className="text-lg font-bold text-slate-900 dark:text-slate-100"
            >
              Ringkasan Eksplorasi 10 Modul
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
            {exploredCount} dari 10 modul selesai dieksplorasi
          </span>
        </div>

        {exploredCount === 0 && (
          <Callout
            title="Mulai Eksplorasi Materi dan Simulasi"
            badge="BELAJAR EKSPLORATIF"
            variant="navy"
            icon={<BookOpen className="h-5 w-5 text-[#0B1F3A] dark:text-sky-400" aria-hidden="true" />}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Setiap modul dilengkapi pembahasan singkat, kamus istilah teknis, studi kasus SaaSCore, dan simulasi bebas untuk mencoba kondisi aman maupun berisiko.
              </p>
              <button
                type="button"
                onClick={() => navigateTo('#/modul/1')}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md bg-[#0B1F3A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-[#10B981] dark:text-slate-950"
              >
                <span>Buka Modul 01</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </Callout>
        )}

        <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-900 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-100">
                <th scope="col" className="px-4 py-3 font-bold">
                  Modul &amp; Simulasi
                </th>
                <th scope="col" className="px-4 py-3 font-bold">
                  Sesi &amp; Jam
                </th>
                <th scope="col" className="px-4 py-3 font-bold">
                  Status Eksplorasi
                </th>
                <th scope="col" className="px-4 py-3 text-right font-bold">
                  Navigasi Cepat
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {modules.map((mod) => {
                const exploration = state.modules[mod.id];
                return (
                  <tr key={mod.id} className="align-middle">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {mod.title}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                        {mod.lab.title}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                      <div>{mod.session === 'pagi' ? 'Sesi Pagi' : 'Sesi Siang'}</div>
                      <div>{mod.timeSlot}</div>
                    </td>
                    <td className="px-4 py-3">
                      <ExplorationBadge
                        explored={exploration?.explored}
                        exploredItems={exploration?.exploredItems}
                        totalItems={exploration?.totalItems}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex flex-wrap justify-end gap-2">
                        {!exploration?.explored && (
                          <button
                            type="button"
                            onClick={() => markModuleCompleted(mod.id)}
                            className="inline-flex min-h-[44px] items-center rounded-md border border-emerald-700/30 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
                          >
                            Tandai Dipelajari
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => navigateTo(`#/modul/${mod.id}`)}
                          className="inline-flex min-h-[44px] items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                        >
                          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Materi</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigateTo(`#/modul/${mod.id}/lab`)}
                          className="inline-flex min-h-[44px] items-center gap-1 rounded-md bg-[#0B1F3A] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-[#10B981] dark:text-slate-950 dark:hover:bg-emerald-400"
                        >
                          <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Simulasi</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {modules.map((mod) => {
            const exploration = state.modules[mod.id];
            return (
              <article
                key={mod.id}
                className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-slate-600 dark:text-slate-400">
                    <span>
                      {mod.session === 'pagi' ? 'Sesi Pagi' : 'Sesi Siang'} ({mod.timeSlot})
                    </span>
                  </div>
                  <h3 className="text-sm font-bold leading-snug text-slate-900 dark:text-slate-100">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{mod.lab.title}</p>
                </div>

                <div>
                  <ExplorationBadge
                    explored={exploration?.explored}
                    exploredItems={exploration?.exploredItems}
                    totalItems={exploration?.totalItems}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => navigateTo(`#/modul/${mod.id}`)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Materi</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo(`#/modul/${mod.id}/lab`)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md bg-[#0B1F3A] px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-[#10B981] dark:text-slate-950"
                  >
                    <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Simulasi</span>
                  </button>
                  {!exploration?.explored && (
                    <button
                      type="button"
                      onClick={() => markModuleCompleted(mod.id)}
                      className="inline-flex min-h-[44px] items-center rounded-md border border-emerald-700/30 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/50 dark:text-emerald-300"
                    >
                      Tandai Dipelajari
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        data-print-sheet="card"
        aria-labelledby="pocket-card-heading"
        className="print-avoid-break rounded-lg border-2 border-[#0B1F3A] bg-white p-5 text-slate-900 shadow-sm dark:border-emerald-500/50 sm:p-7"
      >
        <div className="mb-4 flex flex-col gap-3 border-b-2 border-[#0B1F3A] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2.5">
            <img
              src="./logo.jpg"
              alt="Logo"
              className="mt-0.5 h-10 w-10 shrink-0 rounded-md border border-slate-200 object-cover shadow-sm"
            />
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#047857]">
                Training IT Security Awareness and Cybersecurity Protection 2026
              </p>
              <h2 id="pocket-card-heading" className="text-lg font-bold text-[#0B1F3A] sm:text-xl">
                Kartu Saku 7 Kebiasaan Emas Keamanan Siber (Contoh Kasus SaaS)
              </h2>
              <p className="mt-0.5 text-xs text-slate-600">
                Narasumber: Sigit Adi Irianto, S.Kom. - sigitadi.id - Contoh entitas rekaan PT. Sigit Adi Aman Siber (SaaS) &amp; SaaSCore
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handlePrintTarget('card')}
            className="no-print inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md bg-[#0B1F3A] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800"
          >
            <CreditCard className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Cetak / Simpan PDF Kartu Saku (A4)</span>
          </button>
        </div>

        <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {GOLDEN_RULES.map((rule) => (
            <li key={rule.id} className="rounded border border-slate-300 bg-slate-50 p-3">
              <div className="flex items-start gap-2.5">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#0B1F3A] font-mono text-xs font-bold tabular-nums text-white">
                  {rule.id}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-[#0B1F3A]">
                    {rule.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-800">{rule.rule}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3 font-mono text-[11px] text-slate-600">
          <span>Protokol Insiden 5 Menit Pertama: Isolate - Preserve - Report</span>
          <span className="font-semibold text-[#047857]">sigitadi.id (2026)</span>
        </div>
      </section>

      {ENABLE_PRINT_HANDOUT && instructorMode && (
        <section
          aria-labelledby="handout-print-cta-heading"
          className="no-print rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <FileText
                className="mt-0.5 h-6 w-6 shrink-0 text-[#0B1F3A] dark:text-sky-400"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <h2
                  id="handout-print-cta-heading"
                  className="text-lg font-bold text-slate-900 dark:text-slate-100"
                >
                  Cetak Handout Materi Presentasi (A4)
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Mencetak dokumen handout khusus berukuran A4 yang memuat halaman sampul, ringkasan rundown, seluruh 10 modul materi, kamus istilah teknis, studi kasus SaaSCore, tabel Do&apos;s vs Don&apos;ts, serta 7 Kebiasaan Emas SaaS tanpa tombol interaktif layar.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handlePrintTarget('handout')}
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md bg-[#047857] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#065F46] dark:bg-[#10B981] dark:text-slate-950 dark:hover:bg-emerald-400"
            >
              <Printer className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Cetak / Simpan PDF Materi Presentasi (A4)</span>
            </button>
          </div>
        </section>
      )}

      <section
        aria-labelledby="laptop-checklist-heading"
        className="no-print rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
      >
        <div className="mb-3 flex items-center gap-2">
          <CheckSquare
            className="h-5 w-5 shrink-0 text-[#047857] dark:text-[#10B981]"
            aria-hidden="true"
          />
          <h2
            id="laptop-checklist-heading"
            className="text-lg font-bold text-slate-900 dark:text-slate-100"
          >
            Checklist Tindak Lanjut Laptop Kerja (8 Poin)
          </h2>
        </div>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
          Daftar periksa singkat untuk memastikan perangkat kerja harian peserta siap setelah sesi pelatihan selesai. PT. Sigit Adi Aman Siber (SaaS) dan SaaSCore pada materi adalah contoh perusahaan dan platform rekaan (tidak nyata) untuk menyelaraskan pengalaman belajar dengan pekerjaan nyata.
        </p>
        <ol className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {LAPTOP_FOLLOWUP_CHECKLIST.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-800 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0B1F3A] font-mono text-xs font-bold tabular-nums text-emerald-300 dark:bg-slate-800">
                {idx + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
