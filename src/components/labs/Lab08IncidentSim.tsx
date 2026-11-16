import { useEffect, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Laptop,
  ShieldAlert,
  WifiOff,
} from 'lucide-react';
import type { LabProps } from '../../types/training';
import { Callout, FeedbackBox, LabShell } from '../ui';

interface StageOption {
  id: string;
  label: string;
  detail: string;
  status: 'safe' | 'risk';
  fieldImpact: string;
  whyAndAction: string;
}

interface CrisisStage {
  id: number;
  phaseCode: string;
  phaseName: string;
  elapsed: string;
  prompt: string;
  systemState: string;
  options: StageOption[];
}

const CRISIS_STAGES: CrisisStage[] = [
  {
    id: 1,
    phaseCode: 'TAHAP 1: ISOLATE',
    phaseName: 'Isolasi Awal (Immediate Containment)',
    elapsed: 'Menit 00:30',
    prompt:
      'Anda tidak sengaja membuka lampiran Rekap_Selisih_GL.xlsm dari email masuk. Jendela PowerShell berkedip singkat lalu hilang, aktivitas disk dan kipas laptop melonjak, sementara tunnel VPN ke server SaaSCore BPR Mitra Sejahtera (Ilustrasi) sedang aktif. Eksplorasi setiap opsi di bawah untuk melihat dampaknya:',
    systemState: 'STATUS VPN: CONNECTED (BPR Mitra Sejahtera) | DISK: TINGGI | WI-FI: ON',
    options: [
      {
        id: '1a',
        label: 'Putuskan koneksi VPN BPR Mitra Sejahtera, matikan Wi-Fi, dan cabut kabel LAN seketika',
        detail: 'Memutus seluruh jalur jaringan keluar-masuk dari laptop dalam hitungan detik.',
        status: 'safe',
        fieldImpact:
          'Tunnel VPN ke server SaaSCore BPR Mitra Sejahtera dan akses internet terhenti seketika. Skrip berbahaya tidak bisa menghubungi server pengendali maupun berpindah ke jaringan BPR.',
        whyAndAction:
          'Langkah Isolate paling tepat pada detik pertama. Setelah jaringan putus total, lanjutkan ke tahap Preserve tanpa mematikan laptop.',
      },
      {
        id: '1b',
        label: 'Restart laptop secepatnya agar proses PowerShell berhenti',
        detail: 'Melakukan boot ulang sistem operasi sebelum memutus koneksi VPN.',
        status: 'risk',
        fieldImpact:
          'Restart melenyapkan isi memori RAM yang berisi jejak perintah PowerShell dan alamat IP penyerang. Selain itu, skrip persistence yang sudah terpasang dapat menyala kembali saat sistem hidup.',
        whyAndAction:
          'Mengapa berisiko: bukti volatil di RAM langsung hilang sebelum sempat diperiksa tim forensic triage. Langkah tepat: putus Wi-Fi/LAN/VPN terlebih dahulu, jangan di-restart.',
      },
      {
        id: '1c',
        label: 'Hapus file Rekap_Selisih_GL.xlsm diam-diam dan lanjutkan pekerjaan',
        detail: 'Menghapus file Excel dari folder Downloads dan mengosongkan Recycle Bin.',
        status: 'risk',
        fieldImpact:
          'Menghapus berkas sumber tidak menghentikan payload yang sudah berjalan di memori. Karena VPN BPR Mitra Sejahtera masih tersambung, token sesi dan kredensial SaaSCore tetap berisiko dicuri.',
        whyAndAction:
          'Mengapa berisiko: proses aktif di memori tetap berjalan dan berpotensi melakukan lateral movement ke server klien. Langkah tepat: isolasi jaringan seketika dan lapor resmi.',
      },
    ],
  },
  {
    id: 2,
    phaseCode: 'TAHAP 2: PRESERVE',
    phaseName: 'Pengamanan Bukti Digital (Evidence Preservation)',
    elapsed: 'Menit 02:00',
    prompt:
      'Koneksi jaringan dan VPN sudah terputus total. Laptop masih dalam keadaan menyala secara offline. Klik setiap pilihan berikut untuk membandingkan dampaknya terhadap investigasi insiden:',
    systemState: 'STATUS VPN: DISCONNECTED | WI-FI: OFF | LAPTOP: POWER ON (OFFLINE)',
    options: [
      {
        id: '2a',
        label: 'Jalankan aplikasi pembersih registry, disk cleaner, atau format ulang drive',
        detail: 'Membersihkan file sementara agar laptop kembali terasa normal sebelum diserahkan.',
        status: 'risk',
        fieldImpact:
          'Log sistem, riwayat proses, dan artefak forensik musnah seluruhnya. Tim IT Security kehilangan jejak untuk memastikan apakah data nasabah BPR sempat tersentuh.',
        whyAndAction:
          'Mengapa berisiko: tanpa bukti awal, tim kesulitan menentukan cakupan kebocoran. Langkah tepat: biarkan sistem apa adanya dalam kondisi terisolasi jaringan.',
      },
      {
        id: '2b',
        label: 'Biarkan laptop tetap menyala secara offline, foto layar dengan ponsel, dan catat jam kejadian',
        detail: 'Menjaga jejak RAM, log lokal, dan dokumentasi kronologi untuk forensic triage.',
        status: 'safe',
        fieldImpact:
          'Isi memori RAM dan log lokal tetap utuh tanpa terkontaminasi. Foto layar dari ponsel dan catatan waktu mempercepat analisis jenis malware serta akses yang sempat terbuka.',
        whyAndAction:
          'Langkah Preserve yang tepat. Jaga kondisi laptop tetap offline sambil bersiap masuk ke tahap pelaporan dalam 5 menit pertama.',
      },
      {
        id: '2c',
        label: 'Matikan paksa laptop dengan menahan tombol power lalu hapus riwayat browser nanti',
        detail: 'Mematikan daya seketika dan berencana membersihkan jejak saat dinyalakan ulang.',
        status: 'risk',
        fieldImpact:
          'Mematikan daya paksa menghilangkan isi Volatile Memory (RAM), sementara menghapus riwayat browser memutus jejak URL atau lampiran pemicu insiden.',
        whyAndAction:
          'Mengapa berisiko: proses tanpa berkas (fileless malware) hanya bisa dilihat dari RAM. Langkah tepat: biarkan menyala dalam mode offline hingga diperiksa tim keamanan.',
      },
    ],
  },
  {
    id: 3,
    phaseCode: 'TAHAP 3: REPORT',
    phaseName: 'Protokol Pelaporan Cepat (No-Blame Reporting)',
    elapsed: 'Menit 04:00',
    prompt:
      'Bukti awal pada perangkat sudah aman dalam mode offline. Bandingkan konsekuensi dari tiga pilihan waktu dan saluran pelaporan berikut:',
    systemState: 'STATUS PERANGKAT: OFFLINE | BUKTI RAM & LOG: UTUH | WAKTU: < 5 MENIT',
    options: [
      {
        id: '3a',
        label: 'Lapor dalam 5 menit pertama ke Koordinator Insiden SaaS dan PIC BPR melalui jalur resmi no-blame',
        detail: 'Menggunakan ponsel yang bersih untuk menyampaikan kronologi jujur dan daftar akses terbuka.',
        status: 'safe',
        fieldImpact:
          'Tim IT Security SaaS segera membekukan akun terdampak dan berkoordinasi dengan PIC BPR Mitra Sejahtera sebelum token sesi disalahgunakan.',
        whyAndAction:
          'Langkah Report tepat. Budaya no-blame reporting di PT. Sigit Adi Aman Siber (SaaS) melindungi staf yang melapor cepat dan jujur demi mencegah eskalasi ke klien.',
      },
      {
        id: '3b',
        label: 'Tunggu 2 jam untuk memantau apakah muncul keanehan lanjutan sebelum melapor',
        detail: 'Menahan laporan agar tidak dianggap panik jika ternyata bukan masalah serius.',
        status: 'risk',
        fieldImpact:
          'Penyerang hanya butuh hitungan menit untuk menyalahgunakan kredensial atau token sesi yang telanjur terekam. Penundaan 2 jam menghilangkan jendela emas pemblokiran akun.',
        whyAndAction:
          'Mengapa berisiko: setiap menit penundaan memperlebar peluang penyalahgunaan akses. Langkah tepat: lapor segera dalam 5 menit pertama meskipun masih berupa kecurigaan.',
      },
      {
        id: '3c',
        label: 'Kirim tangkapan layar ke grup WhatsApp umum kantor agar semua rekan ikut menganalisis',
        detail: 'Membahas dugaan infeksi di grup obrolan harian bersama seluruh divisi.',
        status: 'risk',
        fieldImpact:
          'Informasi insiden yang belum terverifikasi memicu kepanikan dan berisiko membocorkan detail kelemahan maupun nama klien BPR ke pihak yang tidak berkepentingan.',
        whyAndAction:
          'Mengapa berisiko: koordinasi insiden wajib terpusat dan rahasia. Langkah tepat: gunakan jalur darurat resmi tim IT Security SaaS.',
      },
    ],
  },
  {
    id: 4,
    phaseCode: 'TAHAP 4: ROTASI KREDENSIAL',
    phaseName: 'Rotasi Kredensial & Pencabutan Sesi',
    elapsed: 'Menit 10:00',
    prompt:
      'Tim IT Security telah menerima laporan dan memeriksa laptop terisolasi tersebut. Eksplorasi langkah tindak lanjut terkait akun VPN, SaaSCore, dan email sigitadi.id:',
    systemState: 'TINDAK LANJUT: KREDENSIAL VPN, SAASCORE & EMAIL SIGITADI.ID',
    options: [
      {
        id: '4a',
        label: 'Ganti password langsung dari browser laptop yang dicurigai terinfeksi tersebut',
        detail: 'Menyambungkan Wi-Fi sebentar untuk mengganti seluruh kata sandi dari perangkat yang sama.',
        status: 'risk',
        fieldImpact:
          'Menyambungkan kembali jaringan dan mengetikkan password baru di perangkat terkompromi membuat keylogger atau pencuri sesi langsung merekam kata sandi baru tersebut.',
        whyAndAction:
          'Mengapa berisiko: laptop belum dinyatakan bersih dari skrip pemantau. Langkah tepat: lakukan pergantian password hanya dari perangkat lain yang bersih.',
      },
      {
        id: '4b',
        label: 'Tetap gunakan kredensial yang sama setelah menjalankan pemindaian cepat antivirus lokal',
        detail: 'Menganggap seluruh akun aman apabila pemindaian cepat tidak menemukan file mencurigakan.',
        status: 'risk',
        fieldImpact:
          'Pemindaian antivirus lokal tidak memulihkan kata sandi atau cookie sesi yang mungkin sudah keluar sebelum isolasi dilakukan. Akun lama tetap berisiko dipakai ulang penyerang.',
        whyAndAction:
          'Mengapa berisiko: kebocoran token atau password bersifat permanen sampai dirotasi. Langkah tepat: anggap semua kredensial yang aktif saat kejadian harus segera diganti.',
      },
      {
        id: '4c',
        label: 'Rotasi seluruh password (VPN, SaaSCore, email sigitadi.id) dan cabut semua sesi aktif dari perangkat bersih',
        detail: 'Mengganti kredensial dan menghentikan seluruh token sesi melalui perangkat terpercaya.',
        status: 'safe',
        fieldImpact:
          'Seluruh token sesi lama langsung tidak berlaku dan kredensial baru aman dari penyadapan lokal. Tim dapat memantau log akses server SaaSCore BPR Mitra Sejahtera dengan kondisi terkendali.',
        whyAndAction:
          'Langkah tindak lanjut yang lengkap dan aman. Jangan lupa aktifkan kembali pemeriksaan MFA aplikasi pada perangkat bersih.',
      },
    ],
  },
];

const TOTAL_STAGES = CRISIS_STAGES.length;

export function Lab08IncidentSim({
  moduleId,
  instructorMode = false,
  onMarkExplored,
}: LabProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [clickedOptionsByStage, setClickedOptionsByStage] = useState<Record<number, string[]>>({});
  const [showAllExplanations, setShowAllExplanations] = useState(false);
  const [isMarkedDone, setIsMarkedDone] = useState(false);

  useEffect(() => {
    if (!instructorMode) {
      setShowAllExplanations(false);
    }
  }, [instructorMode]);

  const currentStage = CRISIS_STAGES[stageIndex];
  const clickedInCurrent = currentStage ? (clickedOptionsByStage[currentStage.id] ?? []) : [];

  const exploredStagesCount = CRISIS_STAGES.filter(
    (stage) => (clickedOptionsByStage[stage.id]?.length ?? 0) > 0
  ).length;

  const effectiveExploredCount = isMarkedDone ? TOTAL_STAGES : exploredStagesCount;

  const handleToggleOption = (stageId: number, optionId: string) => {
    const existing = clickedOptionsByStage[stageId] ?? [];
    const nextList = existing.includes(optionId) ? existing : [...existing, optionId];
    const nextMap = { ...clickedOptionsByStage, [stageId]: nextList };
    setClickedOptionsByStage(nextMap);

    const nextExplored = CRISIS_STAGES.filter(
      (stage) => (nextMap[stage.id]?.length ?? 0) > 0
    ).length;
    onMarkExplored(isMarkedDone ? TOTAL_STAGES : nextExplored, TOTAL_STAGES);
  };

  const handleToggleShowAll = () => {
    const nextShow = !showAllExplanations;
    setShowAllExplanations(nextShow);
    if (nextShow && currentStage) {
      const allIds = currentStage.options.map((o) => o.id);
      const nextMap = { ...clickedOptionsByStage, [currentStage.id]: allIds };
      setClickedOptionsByStage(nextMap);
      const nextExplored = CRISIS_STAGES.filter(
        (stage) => (nextMap[stage.id]?.length ?? 0) > 0
      ).length;
      onMarkExplored(isMarkedDone ? TOTAL_STAGES : nextExplored, TOTAL_STAGES);
    }
  };

  const handleMarkDone = () => {
    const fullMap: Record<number, string[]> = {};
    for (const stage of CRISIS_STAGES) {
      fullMap[stage.id] = stage.options.map((o) => o.id);
    }
    setClickedOptionsByStage(fullMap);
    setShowAllExplanations(true);
    setIsMarkedDone(true);
    onMarkExplored(TOTAL_STAGES, TOTAL_STAGES);
  };

  const handleReset = () => {
    setStageIndex(0);
    setClickedOptionsByStage({});
    setShowAllExplanations(false);
    setIsMarkedDone(false);
  };

  return (
    <LabShell
      moduleId={moduleId}
      session="siang"
      title="Simulator Krisis Tanggap Darurat"
      instructions={
        instructorMode
          ? 'Eksplorasi seluruh 4 tahap protokol insiden (Isolate, Preserve, Report, Rotasi Kredensial). Klik setiap opsi aman maupun berisiko untuk melihat dampak nyatanya di lapangan, atau aktifkan Buka Semua Penjelasan Kondisi untuk perbandingan langsung di kelas.'
          : 'Eksplorasi seluruh 4 tahap protokol insiden (Isolate, Preserve, Report, Rotasi Kredensial). Klik setiap opsi aman maupun berisiko untuk melihat dampak nyatanya di lapangan.'
      }
      exploredCount={effectiveExploredCount}
      totalCount={TOTAL_STAGES}
      isExplored={isMarkedDone || exploredStagesCount === TOTAL_STAGES}
      onMarkDone={handleMarkDone}
      onReset={handleReset}
    >
      <div className="space-y-5">
        <Callout
          title="Skenario Kelas: Laptop Implementor Terhubung VPN BPR Mitra Sejahtera (Ilustrasi)"
          variant="amber"
          badge="SIMULASI KRISIS"
          icon={<ShieldAlert className="h-5 w-5 text-amber-700 dark:text-amber-400" aria-hidden="true" />}
        >
          <p>
            Saat bersiap melakukan pengecekan harian SaaSCore untuk{' '}
            <strong>BPR Mitra Sejahtera (Ilustrasi)</strong>, staf tidak sengaja membuka lampiran{' '}
            <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs dark:bg-amber-900/60">
              Rekap_Selisih_GL.xlsm
            </code>
            . Seketika terlihat jendela PowerShell berkedip singkat dan kipas laptop berputar kencang.
          </p>
        </Callout>

        {/* Stage Stepper (Free Navigation) */}
        <nav aria-label="Tahapan simulasi insiden" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CRISIS_STAGES.map((stage, idx) => {
            const isActive = idx === stageIndex;
            const stageClickedCount = clickedOptionsByStage[stage.id]?.length ?? 0;
            const isStageExplored = stageClickedCount > 0;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setStageIndex(idx)}
                aria-current={isActive ? 'step' : undefined}
                className={`min-h-[44px] rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  isActive
                    ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white dark:border-emerald-500 dark:bg-slate-800'
                    : isStageExplored
                      ? 'border-emerald-700/40 bg-emerald-50 text-emerald-950 hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-950/30 dark:text-emerald-100 dark:hover:bg-emerald-950/50'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-1 font-mono text-[11px] font-semibold uppercase">
                  <span>{stage.phaseCode}</span>
                  {isStageExplored && (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  )}
                </div>
                <p className="mt-1 text-xs font-semibold leading-snug">
                  {stage.elapsed} ({stageClickedCount}/{stage.options.length} opsi)
                </p>
              </button>
            );
          })}
        </nav>

        {currentStage && (
          <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-emerald-300">
              <span className="inline-flex items-center gap-2">
                {stageIndex === 0 ? (
                  <Activity className="h-4 w-4 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                ) : stageIndex === 1 ? (
                  <WifiOff className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                ) : (
                  <Laptop className="h-4 w-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                )}
                <span>{currentStage.systemState}</span>
              </span>
              <span className="font-semibold">{currentStage.elapsed}</span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <span className="inline-block rounded bg-[#0B1F3A] px-2 py-0.5 font-mono text-xs font-semibold text-white dark:bg-slate-800 dark:text-emerald-300">
                  {currentStage.phaseCode}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {currentStage.phaseName}
                </h3>
              </div>

              {instructorMode && (
                <button
                  type="button"
                  aria-pressed={showAllExplanations}
                  onClick={handleToggleShowAll}
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                >
                  {showAllExplanations ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>
                    {showAllExplanations
                      ? 'Tutup Penjelasan Terbuka'
                      : 'Buka Semua Penjelasan Kondisi'}
                  </span>
                </button>
              )}
            </div>

            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {currentStage.prompt}
            </p>

            <div className="mt-5 space-y-3">
              {currentStage.options.map((option, idx) => {
                const isInspected = showAllExplanations || clickedInCurrent.includes(option.id);
                const letter = String.fromCharCode(65 + idx);
                return (
                  <div key={option.id} className="space-y-2">
                    <button
                      type="button"
                      aria-expanded={isInspected}
                      onClick={() => handleToggleOption(currentStage.id, option.id)}
                      className={`flex min-h-[44px] w-full items-start gap-3 rounded-lg border p-3.5 text-left transition-colors ${
                        isInspected
                          ? option.status === 'safe'
                            ? 'border-emerald-700/60 bg-emerald-50/70 text-slate-950 dark:border-emerald-500/60 dark:bg-emerald-950/30 dark:text-slate-50'
                            : 'border-rose-700/60 bg-rose-50/70 text-slate-950 dark:border-rose-500/60 dark:bg-rose-950/30 dark:text-slate-50'
                          : 'border-slate-200 bg-slate-50/70 text-slate-900 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold ${
                          isInspected
                            ? option.status === 'safe'
                              ? 'bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950'
                              : 'bg-rose-700 text-white dark:bg-rose-500 dark:text-slate-950'
                            : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {letter}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-snug">{option.label}</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                          {option.detail}
                        </p>
                      </div>
                    </button>

                    {isInspected && (
                      <FeedbackBox
                        variant={option.status === 'safe' ? 'safe' : 'risk'}
                        label={option.status === 'safe' ? 'KONDISI AMAN / TEPAT' : 'KONDISI BERISIKO'}
                      >
                        <p>
                          <strong>Dampak di Lapangan:</strong> {option.fieldImpact}
                        </p>
                        <p className="mt-1.5">
                          <strong>Mengapa & Langkah Tepat:</strong> {option.whyAndAction}
                        </p>
                      </FeedbackBox>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <button
                type="button"
                disabled={stageIndex === 0}
                onClick={() => setStageIndex((prev) => Math.max(0, prev - 1))}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Tahap Sebelumnya</span>
              </button>

              <button
                type="button"
                disabled={stageIndex >= CRISIS_STAGES.length - 1}
                onClick={() => setStageIndex((prev) => Math.min(CRISIS_STAGES.length - 1, prev + 1))}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#0B1F3A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
              >
                <span>Tahap Berikutnya</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </LabShell>
  );
}

export default Lab08IncidentSim;
