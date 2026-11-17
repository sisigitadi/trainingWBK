import { GOLDEN_RULES } from '../data/goldenRules';
import { modules } from '../data/modulesData';

export function PrintableHandout() {
  const pagiModules = modules.filter((m) => m.session === 'pagi');
  const siangModules = modules.filter((m) => m.session === 'siang');

  return (
    <div
      data-print-sheet="handout"
      className="hidden print:block bg-white text-slate-900"
    >
      {/* HALAMAN 01: COVER & RUNDOWN */}
      <section className="border-2 border-[#0B1F3A] p-6 flex min-h-[260mm] flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4 border-b-2 border-[#0B1F3A] pb-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#047857]">
                Handout Materi Presentasi (A4)
              </p>
              <h1 className="mt-1 text-2xl font-bold text-[#0B1F3A]">
                Training IT Security Awareness and Cybersecurity Protection 2026
              </h1>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                Contoh Skenario Operasional: PT. Sigit Adi Aman Siber (SaaS) &amp; Platform SaaSCore
              </p>
            </div>
            <img
              src="./logo.jpg"
              alt="Logo Training"
              className="h-14 w-14 shrink-0 rounded border border-slate-300 object-cover"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 border-b border-slate-300 pb-4 text-xs">
            <div>
              <p className="font-mono uppercase tracking-wide text-slate-500">Narasumber</p>
              <p className="mt-0.5 text-sm font-bold text-[#0B1F3A]">
                Sigit Adi Irianto, S.Kom. -&nbsp;
                <a
                  href="https://sigitadi.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#047857] underline underline-offset-2 hover:text-[#065F46]"
                >
                  sigitadi.id
                </a>
              </p>
            </div>
            <div>
              <p className="font-mono uppercase tracking-wide text-slate-500">Portal Pelatihan</p>
              <p className="mt-0.5 text-sm font-bold text-[#0B1F3A]">
                <a
                  href="https://trainingwbk.sigitadi.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#047857] underline underline-offset-2 hover:text-[#065F46]"
                >
                  trainingwbk.sigitadi.id
                </a>
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1F3A]">
              Ringkasan Rundown Pelatihan (1 Hari Penuh)
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <h3 className="font-bold text-[#0B1F3A]">Sesi Pagi (08.30 - 12.00 WIB)</h3>
                <ul className="mt-1 space-y-1 pl-4">
                  {pagiModules.map((mod) => (
                    <li key={mod.id} className="list-disc">
                      <span className="font-mono font-semibold">{mod.timeSlot}</span> - {mod.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[#0B1F3A]">Sesi Siang (13.00 - 16.00 WIB)</h3>
                <ul className="mt-1 space-y-1 pl-4">
                  {siangModules.map((mod) => (
                    <li key={mod.id} className="list-disc">
                      <span className="font-mono font-semibold">{mod.timeSlot}</span> - {mod.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[#0B1F3A]">Sesi Penutup (16.00 WIB)</h3>
                <p className="mt-1 pl-4">
                  Rangkuman Eksplorasi 10 Modul, Diskusi Tindak Lanjut, dan Kartu Saku 7 Kebiasaan Emas SaaS.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded border border-slate-300 bg-slate-50 p-3 text-[11px] leading-relaxed text-slate-700">
            <p className="font-bold text-[#0B1F3A]">
              Catatan Contoh Studi Kasus (Entitas Rekaan):
            </p>
            <p className="mt-0.5">
              PT. Sigit Adi Aman Siber (SaaS) dan sistem SaaSCore adalah nama perusahaan dan platform rekaan (tidak nyata) yang digunakan semata-mata sebagai contoh agar memudahkan pemahaman serta memberikan pengalaman belajar (user experience) yang selaras dengan pekerjaan nyata.
            </p>
          </div>
        </div>

        <footer className="mt-6 border-t border-slate-300 pt-3 flex items-center justify-between font-mono text-[10px] text-slate-600">
          <div>
            Training IT Security Awareness and Cybersecurity Protection -&nbsp;
            <a
              href="https://sigitadi.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#047857] underline underline-offset-2 hover:text-[#065F46]"
            >
              sigitadi.id
            </a>
          </div>
          <div className="font-semibold text-slate-700">
            Halaman 1 dari 12
          </div>
        </footer>
      </section>

      {/* HALAMAN 02 - 11: MODUL 01 SAMPAI 10 */}
      {modules.map((mod) => {
        const moduleCode = `MODUL ${String(mod.id).padStart(2, '0')}`;
        const sessionLabel = mod.session === 'pagi' ? 'SESI PAGI' : 'SESI SIANG';
        const pageNumber = mod.id + 1;

        return (
          <article
            key={mod.id}
            className="print-page-break flex min-h-[260mm] flex-col justify-between space-y-3 text-xs"
          >
            <div className="space-y-3">
              <header className="border-b-2 border-[#0B1F3A] pb-2">
                <div className="flex items-center justify-between gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#047857]">
                  <span>
                    {moduleCode} / {sessionLabel} ({mod.timeSlot})
                  </span>
                  <span>Durasi Panduan: {mod.instructorGuide.durationMinutes} Menit</span>
                </div>
                <h2 className="mt-1 text-lg font-bold text-[#0B1F3A]">{mod.title}</h2>
                <p className="mt-0.5 text-xs text-slate-700">{mod.tagline}</p>
              </header>

              <section className="print-avoid-break">
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A]">
                  Tujuan Pembelajaran
                </h3>
                <ul className="mt-1 space-y-0.5 pl-4">
                  {mod.objectives.map((obj, idx) => (
                    <li key={idx} className="list-disc leading-snug">
                      {obj}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A]">
                  Ringkasan Materi Inti
                </h3>
                {mod.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="print-avoid-break border-l-2 border-slate-300 pl-2.5">
                    <h4 className="font-bold text-[#0B1F3A]">{sec.heading}</h4>
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="mt-0.5 leading-snug text-slate-800">
                        {p}
                      </p>
                    ))}
                    {sec.bullets && sec.bullets.length > 0 && (
                      <ul className="mt-1 space-y-0.5 pl-4">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="list-disc leading-snug text-slate-800">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>

              <section className="print-avoid-break grid grid-cols-2 gap-2">
                <div className="border border-[#047857]/50 bg-slate-50 p-2">
                  <p className="font-mono text-[10px] font-bold uppercase text-[#047857]">
                    Analogi: {mod.analogy.title}
                  </p>
                  <p className="mt-0.5 leading-snug text-slate-800">{mod.analogy.body}</p>
                </div>
                <div className="border border-slate-300 p-2">
                  <p className="font-mono text-[10px] font-bold uppercase text-[#0B1F3A]">
                    Studi Kasus Operasional SaaSCore
                  </p>
                  {mod.sasCases.slice(0, 1).map((c, cIdx) => (
                    <div key={cIdx} className="mt-0.5 space-y-0.5">
                      <p className="font-bold text-slate-900">{c.title}</p>
                      <p className="leading-snug text-slate-800">{c.whatHappened}</p>
                      <p className="text-[10px] font-semibold text-[#047857]">
                        Pelajaran: {c.lesson}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="print-avoid-break">
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A]">
                  Lakukan (Do&apos;s) vs Hindari (Don&apos;ts)
                </h3>
                <table className="mt-1 w-full border-collapse border border-slate-300 text-left text-[11px]">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 px-2 py-1 font-bold text-[#047857]">
                        Lakukan (Do&apos;s)
                      </th>
                      <th className="border border-slate-300 px-2 py-1 font-bold text-rose-700">
                        Hindari (Don&apos;ts)
                      </th>
                      <th className="border border-slate-300 px-2 py-1 font-bold text-[#0B1F3A]">
                        Alasan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mod.doDont.map((row, rIdx) => (
                      <tr key={rIdx} className="align-top">
                        <td className="border border-slate-300 px-2 py-1">{row.doIt}</td>
                        <td className="border border-slate-300 px-2 py-1">{row.dontIt}</td>
                        <td className="border border-slate-300 px-2 py-1">{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>

            <footer className="mt-4 border-t border-slate-300 pt-2 flex items-center justify-between font-mono text-[10px] text-slate-600">
              <div>
                Training IT Security Awareness and Cybersecurity Protection -&nbsp;
                <a
                  href="https://sigitadi.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#047857] underline underline-offset-2 hover:text-[#065F46]"
                >
                  sigitadi.id
                </a>
              </div>
              <div className="font-semibold text-slate-700">
                Halaman {pageNumber} dari 12
              </div>
            </footer>
          </article>
        );
      })}

      {/* HALAMAN 12: PENUTUP & 7 KEBIASAAN EMAS */}
      <section className="print-page-break flex min-h-[260mm] flex-col justify-between space-y-4">
        <div className="space-y-4">
          <header className="border-b-2 border-[#0B1F3A] pb-2">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#047857]">
              Penutup - Pegangan Harian Tim Operasional
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#0B1F3A]">
              7 Kebiasaan Emas Keamanan Siber PT. Sigit Adi Aman Siber (SaaS)
            </h2>
          </header>

          <ol className="space-y-2.5 text-xs">
            {GOLDEN_RULES.map((rule) => (
              <li key={rule.id} className="print-avoid-break border border-slate-300 p-3">
                <p className="font-bold text-[#0B1F3A]">
                  {rule.id}. {rule.title}
                </p>
                <p className="mt-1 leading-snug text-slate-800">{rule.rule}</p>
                <p className="mt-1 text-[11px] text-slate-600">
                  <span className="font-semibold">Alasan:</span> {rule.reason}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <footer className="border-t border-slate-300 pt-3 flex items-center justify-between font-mono text-[10px] text-slate-600">
          <div>
            Training IT Security Awareness and Cybersecurity Protection -&nbsp;
            <a
              href="https://sigitadi.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#047857] underline underline-offset-2 hover:text-[#065F46]"
            >
              sigitadi.id
            </a>
          </div>
          <div className="font-semibold text-slate-700">
            Halaman 12 dari 12
          </div>
        </footer>
      </section>
    </div>
  );
}
