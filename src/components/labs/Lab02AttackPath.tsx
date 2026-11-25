import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Download,
  Eye,
  EyeOff,
  Inbox,
  Network,
  Send,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import type { LabProps } from '../../types/training';
import { computeLabProgress, useLabSessionState } from '../../lib/useLabExploration';
import { useProgress } from '../../state/ProgressContext';
import { Callout, FeedbackBox, LabShell, RichTermText } from '../ui';

interface DefensiveOption {
  id: string;
  label: string;
  isSafe: boolean;
  impact: string;
  rationale: string;
}

interface AttackStage {
  id: number;
  stepLabel: string;
  title: string;
  normalFlow: string;
  attackTitle: string;
  attackVector: string;
  question: string;
  options: DefensiveOption[];
  Icon: typeof Inbox;
}

const STAGES: AttackStage[] = [
  {
    id: 1,
    stepLabel: 'TAHAP 01',
    title: 'Terima Tiket BPR',
    normalFlow:
      'Staf support SaaS menerima laporan kendala SaaSCore dari PIC BPR melalui portal tiket resmi.',
    attackTitle: 'Pretexting & Permintaan Reset Darurat Tanpa Tiket',
    attackVector:
      'Penyerang mengirim pesan mengaku sebagai kepala operasional BPR Mitra Sejahtera (Ilustrasi) melalui jalur tidak resmi dan mendesak reset akun supervisor SaaSCore dalam 10 menit tanpa nomor tiket.',
    question:
      'Bandingkan respons yang dapat diambil pada tahap penerimaan tiket ini:',
    Icon: Inbox,
    options: [
      {
        id: 's1-a',
        label:
          'Wajibkan pencatatan melalui portal tiket resmi dan verifikasi ulang identitas pemohon ke kontak PIC BPR yang terdaftar sebelum memproses akses.',
        isSafe: true,
        impact:
          'Permintaan palsu langsung terbongkar saat konfirmasi ke kontak resmi BPR, sementara tiket sah tetap diproses dengan audit trail lengkap.',
        rationale:
          'Langkah tepat! Verifikasi kanal resmi dan konfirmasi Out-of-Band memutus upaya penyamaran (pretexting) tanpa mengorbankan layanan BPR.',
      },
      {
        id: 's1-b',
        label:
          'Langsung reset kata sandi supervisor dan kirimkan password barunya lewat balasan chat supaya antrean BPR tidak tertunda.',
        isSafe: false,
        impact:
          'Penyerang menerima kredensial baru akun supervisor SaaSCore dan dapat menyetujui transaksi atau mengubah konfigurasi BPR.',
        rationale:
          'Kondisi berisiko tinggi! Melewati verifikasi demi mengejar kecepatan SLA menyerahkan kendali akun hak tinggi langsung kepada pelaku.',
      },
      {
        id: 's1-c',
        label:
          'Minta pemohon mengirimkan foto kartu nama lewat pesan instan sebagai satu-satunya syarat persetujuan.',
        isSafe: false,
        impact:
          'Pelaku dengan mudah mengirim foto kartu nama editan atau hasil unduhan dari profil publik pegawai bank lalu memperoleh akses.',
        rationale:
          'Kondisi berisiko karena foto kartu nama bukanlah bukti otorisasi resmi dan tidak tercatat pada sistem tiket SaaS.',
      },
    ],
  },
  {
    id: 2,
    stepLabel: 'TAHAP 02',
    title: 'Unduh Lampiran',
    normalFlow:
      'Tim support mengunduh tangkapan layar error atau log diagnostik untuk mereproduksi kendala.',
    attackTitle: 'Lampiran Makro Berbahaya & Utilitas Trojan',
    attackVector:
      'Lampiran tiket berupa berkas Excel bermakro (Rekap_Selisih_GL.xlsm) atau utilitas konversi log dari situs luar menyisipkan skrip PowerShell tersembunyi untuk mencuri token sesi aktif.',
    question:
      'Bandingkan tindakan pada tahap pengunduhan lampiran di laptop kerja:',
    Icon: Download,
    options: [
      {
        id: 's2-a',
        label:
          'Matikan sementara perlindungan real-time antivirus di laptop kerja agar berkas makro cepat terbuka tanpa peringatan.',
        isSafe: false,
        impact:
          'Skrip PowerShell tersembunyi berjalan mulus di latar belakang, mencuri cookie sesi dan kredensial yang tersimpan di browser.',
        rationale:
          'Kondisi berisiko tinggi! Menonaktifkan antivirus menghilangkan lapisan pertahanan utama endpoint terhadap trojan dan infostealer.',
      },
      {
        id: 's2-b',
        label:
          'Pastikan endpoint security aktif memindai berkas, blokir eksekusi makro yang tidak terverifikasi, dan tolak utilitas dari sumber tidak resmi.',
        isSafe: true,
        impact:
          'Skrip berbahaya terisolasi sebelum dieksekusi; tim meminta BPR mengirim ulang data kendala dalam format teks atau CSV bersih.',
        rationale:
          'Langkah tepat! Pemindaian endpoint, pemblokiran makro tidak tepercaya, serta disiplin sumber resmi memutus jalur eksekusi awal trojan.',
      },
      {
        id: 's2-c',
        label:
          'Ubah ekstensi berkas menjadi .zip di laptop kerja lalu buka langsung di server staging BPR.',
        isSafe: false,
        impact:
          'Kode berbahaya tidak berubah menjadi jinak dan kini berpindah ke server staging yang lebih dekat dengan infrastruktur klien.',
        rationale:
          'Kondisi berisiko karena hanya mengubah nama ekstensi serta membawa berkas mencurigakan ke lingkungan server.',
      },
    ],
  },
  {
    id: 3,
    stepLabel: 'TAHAP 03',
    title: 'Koneksi VPN Klien',
    normalFlow:
      'Teknisi terhubung ke jaringan BPR melalui VPN resmi untuk memeriksa layanan SaaSCore.',
    attackTitle: 'Session Hijacking & Akses VPN Berlebih',
    attackVector:
      'Tunnel VPN dibiarkan terbuka seharian penuh dengan akun admin bersama tanpa MFA menuju seluruh segmen jaringan BPR, memungkinkan penyerang melakukan pergerakan lateral ke server produksi.',
    question:
      'Bandingkan pola pengelolaan koneksi VPN ke lingkungan BPR berikut:',
    Icon: Network,
    options: [
      {
        id: 's3-a',
        label:
          'Biarkan koneksi VPN tetap tersambung sepanjang hari kerja agar tidak perlu autentikasi ulang saat ada tiket baru.',
        isSafe: false,
        impact:
          'Jika laptop terkena malware atau ditinggal terbuka sesaat, penyerang memiliki jalur tunnel VPN aktif langsung ke jaringan internal BPR.',
        rationale:
          'Kondisi berisiko! Koneksi VPN yang selalu aktif memperpanjang jendela serangan dan memperbesar dampak kompromi endpoint.',
      },
      {
        id: 's3-b',
        label:
          'Simpan file konfigurasi .ovpn bersama username dan password admin di folder desktop agar rekan piket mudah memakainya.',
        isSafe: false,
        impact:
          'Siapa pun yang mengakses folder atau mencuri profil perangkat dapat login sebagai admin tanpa jejak identitas individu.',
        rationale:
          'Kondisi berisiko karena berbagi akun menghapus akuntabilitas audit trail dan menaruh rahasia akses di teks terbuka.',
      },
      {
        id: 's3-c',
        label:
          'Gunakan akun VPN individual ber-MFA dengan hak akses minimum hanya ke host tujuan, lalu putus tunnel segera setelah tugas selesai.',
        isSafe: true,
        impact:
          'Paparan jaringan klien dibatasi hanya beberapa menit saat perbaikan berlangsung dan hanya ke server tertentu yang disetujui.',
        rationale:
          'Langkah tepat! MFA, akun individual, prinsip Least Privilege, dan disiplin memutus koneksi menutup jalur pergerakan lateral.',
      },
    ],
  },
  {
    id: 4,
    stepLabel: 'TAHAP 04',
    title: 'Kirim Balasan',
    normalFlow:
      'Staf menyampaikan hasil analisis dan langkah tindak lanjut kepada tim IT BPR.',
    attackTitle: 'Spoofing Balasan & Kebocoran Kredensial di Lampiran Log',
    attackVector:
      'Balasan dikirim memakai akun email pribadi atau menyertakan file log mentah berisi string koneksi database, alamat IP internal, dan data CIF nasabah dalam plaintext (tanpa enkripsi).',
    question:
      'Bandingkan cara pengiriman hasil analisis kembali ke tim BPR:',
    Icon: Send,
    options: [
      {
        id: 's4-a',
        label:
          'Gunakan portal tiket atau email resmi berdomain @sigitadi.id setelah menyamarkan data sensitif dan membersihkan kredensial dari lampiran log.',
        isSafe: true,
        impact:
          'Pihak BPR yakin balasan asli dari PT. Sigit Adi Aman Siber (SaaS), sekaligus tidak ada data CIF atau password koneksi yang ikut keluar.',
        rationale:
          'Langkah tepat! Saluran resmi mencegah spoofing pengirim, sementara sanitasi log menjaga kepatuhan UU PDP dan kerahasiaan infrastruktur.',
      },
      {
        id: 's4-b',
        label:
          'Lampirkan ekspor tabel CIF nasabah utuh tanpa enkripsi agar pihak BPR langsung bisa mencocokkan NIK nasabah terkait.',
        isSafe: false,
        impact:
          'Data identitas dan finansial ribuan nasabah berada di kotak masuk email tanpa enkripsi dan rentan bocor apabila akun penerima diretas.',
        rationale:
          'Kondisi berisiko tinggi karena menyalurkan data pribadi utuh lewat kanal yang tidak terenkripsi end-to-end.',
      },
      {
        id: 's4-c',
        label:
          'Kirim balasan lewat email pribadi gratis apabila server webmail kantor sedang terasa lambat.',
        isSafe: false,
        impact:
          'Klien terbiasa menerima instruksi dari alamat tidak resmi sehingga mudah tertipu oleh email spoofing dari penyerang di kemudian hari.',
        rationale:
          'Kondisi berisiko karena keluar dari domain resmi sigitadi.id dan menghilangkan jejak pengawasan DLP perusahaan.',
      },
    ],
  },
];

interface StageExplorationState {
  activeOptionId?: string;
  inspectedOptionIds: string[];
}

interface Lab02SessionState {
  activeStageId: number;
  exploredByStage: Record<number, StageExplorationState>;
  manualDone: boolean;
}

const INITIAL_LAB02_STATE: Lab02SessionState = {
  activeStageId: 1,
  exploredByStage: {},
  manualDone: false,
};

export function Lab02AttackPath({
  moduleId,
  instructorMode = false,
  onMarkExplored,
}: LabProps) {
  const { resetModuleExploration } = useProgress();
  const [sessionState, setSessionState, resetSessionState] =
    useLabSessionState<Lab02SessionState>(moduleId, INITIAL_LAB02_STATE);
  const { activeStageId, exploredByStage, manualDone } = sessionState;
  const [showAllExplanations, setShowAllExplanations] = useState(false);

  useEffect(() => {
    if (!instructorMode) {
      setShowAllExplanations(false);
    }
  }, [instructorMode]);

  const rawExploredCount = STAGES.filter(
    (s) => (exploredByStage[s.id]?.inspectedOptionIds.length ?? 0) > 0,
  ).length;
  const { exploredCount, isExplored } = computeLabProgress(
    rawExploredCount,
    STAGES.length,
    manualDone,
  );
  const activeStage = STAGES.find((s) => s.id === activeStageId) ?? STAGES[0];

  const handleSelectStage = (stageId: number) => {
    setSessionState((prev) => ({ ...prev, activeStageId: stageId }));
    if (showAllExplanations && typeof document !== 'undefined') {
      document
        .getElementById(`lab02-stage-${stageId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleExploreOption = (stageId: number, optionId: string) => {
    const current = exploredByStage[stageId] ?? { inspectedOptionIds: [] };
    const nextIds = current.inspectedOptionIds.includes(optionId)
      ? current.inspectedOptionIds
      : [...current.inspectedOptionIds, optionId];

    const nextState: Record<number, StageExplorationState> = {
      ...exploredByStage,
      [stageId]: {
        activeOptionId: optionId,
        inspectedOptionIds: nextIds,
      },
    };
    setSessionState((prev) => ({ ...prev, exploredByStage: nextState }));

    const nextCount = STAGES.filter(
      (s) => (nextState[s.id]?.inspectedOptionIds.length ?? 0) > 0,
    ).length;
    onMarkExplored(manualDone ? STAGES.length : nextCount, STAGES.length);
  };

  const handleToggleAll = () => {
    const nextShow = !showAllExplanations;
    setShowAllExplanations(nextShow);
    if (nextShow) {
      const allMap: Record<number, StageExplorationState> = {};
      for (const stage of STAGES) {
        allMap[stage.id] = {
          activeOptionId:
            exploredByStage[stage.id]?.activeOptionId ?? stage.options[0]?.id,
          inspectedOptionIds: stage.options.map((o) => o.id),
        };
      }
      setSessionState((prev) => ({ ...prev, exploredByStage: allMap }));
      onMarkExplored(STAGES.length, STAGES.length);
    }
  };

  const handleMarkDone = () => {
    setSessionState((prev) => ({ ...prev, manualDone: true }));
    onMarkExplored(STAGES.length, STAGES.length);
  };

  const handleReset = () => {
    resetSessionState();
    setShowAllExplanations(false);
    resetModuleExploration(moduleId);
  };

  if (!activeStage) return null;

  const stagesToRender = showAllExplanations ? STAGES : [activeStage];

  return (
    <LabShell
      moduleId={moduleId}
      session="pagi"
      title="Pemetaan Jalur Serangan (Simulasi Eksplorasi)"
      instructions="Telusuri 4 tahapan alur kerja harian tim support PT. Sigit Adi Aman Siber (SaaS). Klik setiap titik pemeriksaan dan uji berbagai pilihan respons secara bebas untuk melihat jalur mana yang memutus atau meloloskan serangan."
      exploredCount={exploredCount}
      totalCount={STAGES.length}
      isExplored={isExplored}
      onMarkDone={handleMarkDone}
      onReset={handleReset}
    >
      <div className="space-y-5">
        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
            <BookOpen
              className="mt-0.5 h-4 w-4 shrink-0 text-[#047857] dark:text-emerald-400"
              aria-hidden="true"
            />
            <span>
              <RichTermText
                text={
                  instructorMode
                    ? 'Klik bebas seluruh pilihan pada tiap tahap, atau buka semua penjelasan untuk membandingkan 4 tahap sekaligus di layar proyektor.'
                    : 'Klik titik pemeriksaan pada tiap tahap dan uji seluruh pilihan respons secara bebas untuk melihat jalur yang memutus atau meloloskan serangan.'
                }
              />
            </span>
          </div>
          {instructorMode && (
            <button
              type="button"
              onClick={handleToggleAll}
              aria-pressed={showAllExplanations}
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md border border-[#0B1F3A] bg-[#0B1F3A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:border-emerald-400 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
            >
              {showAllExplanations ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
              <span>
                {showAllExplanations
                  ? 'Tutup Semua Penjelasan'
                  : 'Buka Semua Penjelasan Kondisi'}
              </span>
            </button>
          )}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
              Diagram Alur Kerja Support SaaS (Pilih Titik Pemeriksaan)
            </h3>
            <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
              {exploredCount}/{STAGES.length} tahap telah dieksplorasi
            </span>
          </div>

          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
            role="list"
            aria-label="Tahapan alur kerja support SaaS"
          >
            {STAGES.map((stage, idx) => {
              const Icon = stage.Icon;
              const stageState = exploredByStage[stage.id];
              const inspectedCount = stageState?.inspectedOptionIds.length ?? 0;
              const isActive = stage.id === activeStage.id;

              return (
                <div key={stage.id} role="listitem" className="flex items-stretch gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectStage(stage.id)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`flex min-h-[44px] w-full flex-col justify-between gap-2 rounded-lg border p-3.5 text-left transition-colors ${isActive
                        ? 'border-[#047857] bg-emerald-50/80 ring-2 ring-[#047857]/40 dark:border-emerald-400 dark:bg-emerald-950/40 dark:ring-emerald-400/40'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:bg-slate-800'
                      }`}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="rounded bg-[#0B1F3A] px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-300 dark:bg-slate-950">
                        {stage.stepLabel}
                      </span>
                      {inspectedCount > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-700 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-white dark:bg-emerald-500 dark:text-slate-950">
                          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                          <span>{inspectedCount}/3 Opsi</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded border border-amber-600/40 bg-amber-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-amber-900 dark:border-amber-400/40 dark:bg-amber-950/70 dark:text-amber-300">
                          <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                          <span>Perlu Dicek</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                      <Icon
                        className="h-4 w-4 shrink-0 text-[#047857] dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-bold leading-snug">
                        {stage.id}. {stage.title}
                      </span>
                    </div>
                  </button>

                  {idx < STAGES.length - 1 && (
                    <div
                      className="hidden items-center text-slate-400 lg:flex dark:text-slate-600"
                      aria-hidden="true"
                    >
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-5" aria-live="polite">
          {stagesToRender.map((stage) => {
            const stageState = exploredByStage[stage.id];
            const activeOpt = stage.options.find(
              (o) => o.id === stageState?.activeOptionId,
            );

            return (
              <section
                key={stage.id}
                id={`lab02-stage-${stage.id}`}
                className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded bg-[#0B1F3A] px-2.5 py-1 font-mono text-xs font-semibold text-emerald-300 dark:bg-slate-800">
                    {stage.stepLabel}: {stage.title.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    <RichTermText text={stage.normalFlow} />
                  </span>
                </div>

                <Callout
                  title={`Vektor Serangan: ${stage.attackTitle}`}
                  variant="amber"
                  badge="VEKTOR ANCAMAN"
                  icon={
                    <AlertTriangle
                      className="h-4 w-4 text-amber-700 dark:text-amber-400"
                      aria-hidden="true"
                    />
                  }
                >
                  <p>
                    <RichTermText text={stage.attackVector} />
                  </p>
                </Callout>

                <div className="mt-5 space-y-3">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    <RichTermText text={stage.question} />
                  </p>

                  <div className="space-y-2.5">
                    {stage.options.map((opt) => {
                      const isSelected = stageState?.activeOptionId === opt.id;
                      const isInspected = stageState?.inspectedOptionIds.includes(opt.id);

                      return (
                        <div key={opt.id} className="space-y-2">
                          <button
                            type="button"
                            onClick={() => handleExploreOption(stage.id, opt.id)}
                            aria-pressed={isSelected}
                            className={`flex min-h-[44px] w-full items-start gap-3 rounded-md border px-4 py-3 text-left text-sm leading-relaxed transition-colors ${isSelected
                                ? opt.isSafe
                                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600 dark:border-emerald-400 dark:bg-emerald-950/50 dark:text-emerald-100 dark:ring-emerald-400'
                                  : 'border-rose-600 bg-rose-50 text-rose-950 ring-1 ring-rose-600 dark:border-rose-400 dark:bg-rose-950/50 dark:text-rose-100 dark:ring-rose-400'
                                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                              }`}
                          >
                            <span className="mt-0.5 shrink-0">
                              {isInspected ? (
                                opt.isSafe ? (
                                  <ShieldCheck
                                    className="h-4 w-4 text-emerald-700 dark:text-emerald-400"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <ShieldAlert
                                    className="h-4 w-4 text-rose-700 dark:text-rose-400"
                                    aria-hidden="true"
                                  />
                                )
                              ) : (
                                <span
                                  className="inline-block h-4 w-4 rounded-full border border-slate-400 dark:border-slate-600"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                            <span>{opt.label}</span>
                          </button>

                          {showAllExplanations && (
                            <FeedbackBox
                              variant={opt.isSafe ? 'safe' : 'risk'}
                              label={
                                opt.isSafe
                                  ? 'KONDISI AMAN / MEMUTUS SERANGAN'
                                  : 'KONDISI BERISIKO / SERANGAN LOLOS'
                              }
                            >
                              <p>
                                <strong>Dampak Situasi di Lapangan:</strong>{' '}
                                <RichTermText text={opt.impact} />
                              </p>
                              <p className="mt-1">
                                <strong>Mengapa &amp; Langkah Tepatnya:</strong>{' '}
                                <RichTermText text={opt.rationale} />
                              </p>
                            </FeedbackBox>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {!showAllExplanations && activeOpt && (
                  <div className="mt-4">
                    <FeedbackBox
                      variant={activeOpt.isSafe ? 'safe' : 'risk'}
                      label={
                        activeOpt.isSafe
                          ? 'KONDISI AMAN / MEMUTUS SERANGAN'
                          : 'KONDISI BERISIKO / SERANGAN LOLOS'
                      }
                    >
                      <p>
                        <strong>Dampak Situasi di Lapangan:</strong>{' '}
                        <RichTermText text={activeOpt.impact} />
                      </p>
                      <p className="mt-1.5">
                        <strong>Mengapa &amp; Langkah Tepatnya:</strong>{' '}
                        <RichTermText text={activeOpt.rationale} />
                      </p>
                    </FeedbackBox>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </LabShell>
  );
}

export default Lab02AttackPath;
