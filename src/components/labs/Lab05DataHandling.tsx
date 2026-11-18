import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  FileCode2,
  Lock,
  ShieldAlert,
} from 'lucide-react';
import type { LabProps } from '../../types/training';
import { Callout, FeedbackBox, LabShell, RichTermText } from '../ui';

interface DecisionOption {
  id: string;
  label: string;
  detail: string;
  isSafe: boolean;
  conditionStatus: string;
  fieldImpact: string;
  whyAndNextStep: string;
}

interface WorkflowStep {
  id: string;
  stepNumber: number;
  title: string;
  prompt: string;
  options: DecisionOption[];
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'classify',
    stepNumber: 1,
    title: 'Klasifikasi Sensitivitas Data',
    prompt:
      'File saascore_prod_db_bpr.json berisi host database produksi BPR, port layanan, nama schema, serta username dan password akun layanan SaaSCore. Eksplorasi dampak setiap kategori klasifikasi berikut:',
    options: [
      {
        id: 'publik',
        label: 'Publik (Terbuka)',
        detail: 'Boleh dibagikan bebas tanpa pembatasan akses.',
        isSafe: false,
        conditionStatus: 'Berisiko Kritis',
        fieldImpact:
          'File konfigurasi database produksi BPR diperlakukan seperti brosur produk sehingga rentan diunggah ke repositori terbuka atau grup chat tanpa kontrol.',
        whyAndNextStep:
          'Kredensial produksi BPR tidak pernah bersifat publik. Tetapkan klasifikasi tertinggi (Sangat Rahasia) agar setiap salinan wajib dienkripsi.',
      },
      {
        id: 'internal',
        label: 'Internal (Umum Karyawan)',
        detail: 'Boleh diakses seluruh staf lintas divisi selama berada di kantor.',
        isSafe: false,
        conditionStatus: 'Berisiko Tinggi',
        fieldImpact:
          'Staf non-teknis atau divisi yang tidak menangani BPR tersebut ikut memiliki akses membaca detail koneksi database inti.',
        whyAndNextStep:
          'Kategori Internal hanya cocok untuk memo atau SOP umum. Akses kredensial produksi SaaSCore wajib mengikuti prinsip least privilege.',
      },
      {
        id: 'rahasia',
        label: 'Rahasia (Operasional Terbatas)',
        detail: 'Dokumen kerja proyek tanpa kredensial akses database inti.',
        isSafe: false,
        conditionStatus: 'Kurang Tepat',
        fieldImpact:
          'Kontrolnya lebih longgar dibanding data kredensial inti sehingga sering dikirim hanya dengan password standar tanpa verifikasi saluran terpisah.',
        whyAndNextStep:
          'Karena file memuat password akun layanan produksi BPR, naikkan perlakuan ke kategori Sangat Rahasia dengan enkripsi kuat dan pengiriman kunci terpisah.',
      },
      {
        id: 'sangat-rahasia',
        label: 'Sangat Rahasia (Kredensial & Akses Inti BPR)',
        detail: 'Membutuhkan enkripsi kuat, prinsip least privilege, dan jejak pengiriman terkontrol.',
        isSafe: true,
        conditionStatus: 'Aman / Tepat',
        fieldImpact:
          'Tim langsung menerapkan standar perlindungan tertinggi sehingga kredensial SaaSCore dan data nasabah BPR terlindungi dari akses tidak sah.',
        whyAndNextStep:
          'Selalu klasifikasikan file konfigurasi berisi kredensial produksi sebagai Sangat Rahasia sebelum memilih metode pengemasan dan pengiriman.',
      },
    ],
  },
  {
    id: 'encrypt',
    stepNumber: 2,
    title: 'Metode Pengemasan & Enkripsi Dokumen',
    prompt:
      'Bandingkan kondisi keamanan berbagai cara mengemas saascore_prod_db_bpr.json sebelum dikirim ke rekan tim:',
    options: [
      {
        id: 'raw-json',
        label: 'Lampirkan file .json mentah langsung',
        detail: 'Kirim file asli tanpa arsip agar rekan tim bisa langsung membukanya.',
        isSafe: false,
        conditionStatus: 'Berisiko Kritis',
        fieldImpact:
          'Teks password tersimpan utuh di folder Sent, Inbox, log proxy, dan salinan backup email. Satu akun email yang diretas langsung membuka akses DB BPR.',
        whyAndNextStep:
          'Jangan pernah mengirim file konfigurasi plaintext. Selalu bungkus dalam arsip terenkripsi AES-256 atau gunakan secret manager tim.',
      },
      {
        id: 'plain-zip',
        label: 'Kompres menjadi .zip standar tanpa password (atau password "saas123")',
        detail: 'Gunakan kompresi ZIP bawaan agar ukuran file lebih kecil.',
        isSafe: false,
        conditionStatus: 'Berisiko Tinggi',
        fieldImpact:
          'ZIP tanpa password langsung terbuka saat lampiran bocor, sedangkan password pendek atau ZipCrypto lama dapat dipecahkan dalam hitungan detik.',
        whyAndNextStep:
          'Hindari ZipCrypto dan password tebakan. Gunakan format 7z atau ZIP dengan algoritma AES-256 serta passphrase acak minimal 14 karakter.',
      },
      {
        id: 'aes-256',
        label: 'Enkripsi dengan arsip 7z / ZIP AES-256 dan passphrase acak >= 14 karakter',
        detail: 'Aktifkan enkripsi isi sekaligus enkripsi nama file (Encrypt file names).',
        isSafe: true,
        conditionStatus: 'Aman / Tepat',
        fieldImpact:
          'Isi JSON maupun daftar nama file di dalam arsip tetap teracak meskipun arsip berada di server email atau perangkat perantara.',
        whyAndNextStep:
          'Gunakan 7-Zip atau alat arsip resmi dengan mode AES-256, centang "Encrypt file names", dan buat passphrase acak panjang.',
      },
      {
        id: 'public-drive',
        label: 'Unggah file mentah ke cloud pribadi dengan tautan "Anyone with the link"',
        detail: 'Bagikan tautan publik agar tidak membebani lampiran email.',
        isSafe: false,
        conditionStatus: 'Berisiko Kritis',
        fieldImpact:
          'Siapa saja yang memperoleh URL atau menemukannya di riwayat browser dapat mengunduh kredensial produksi BPR tanpa autentikasi dan di luar audit SaaS.',
        whyAndNextStep:
          'Gunakan media transfer resmi PT. Sigit Adi Aman Siber (SaaS) yang mewajibkan login terverifikasi serta batas waktu akses.',
      },
    ],
  },
  {
    id: 'key-channel',
    stepNumber: 3,
    title: 'Saluran Pengiriman Kunci / Passphrase',
    prompt:
      'Arsip terenkripsi AES-256 akan dikirim lewat email kerja sigitadi.id. Bandingkan dampak setiap pilihan pengiriman passphrase berikut:',
    options: [
      {
        id: 'same-email',
        label: 'Tulis passphrase di badan email yang sama dengan lampiran arsip',
        detail: 'Praktis karena penerima cukup membuka satu email saja.',
        isSafe: false,
        conditionStatus: 'Berisiko Tinggi',
        fieldImpact:
          'Menaruh kunci di email yang sama meniadakan seluruh fungsi enkripsi. Jika email diteruskan atau akun dibobol, arsip dan kuncinya jatuh bersamaan.',
        whyAndNextStep:
          'Pisahkan saluran pengiriman kunci dari saluran file. Jangan pernah menuliskan passphrase pada subjek atau badan email lampiran.',
      },
      {
        id: 'same-wa-group',
        label: 'Kirim file arsip dan passphrase sekaligus di grup WhatsApp proyek',
        detail: 'Supaya anggota grup lain ikut memantau proses troubleshooting.',
        isSafe: false,
        conditionStatus: 'Berisiko Tinggi',
        fieldImpact:
          'Anggota grup yang tidak terkait ikut menerima file dan kunci dalam satu riwayat chat yang mudah tersinkronisasi ke perangkat lain.',
        whyAndNextStep:
          'Kirim file lewat saluran kerja resmi kepada penerima yang berhak saja, lalu kirim passphrase melalui saluran langsung yang terpisah.',
      },
      {
        id: 'oob-channel',
        label: 'Kirim passphrase melalui saluran terpisah (Out-of-Band) yang terverifikasi',
        detail: 'Misalnya pesan langsung terenkripsi atau panggilan suara ke nomor resmi rekan tim.',
        isSafe: true,
        conditionStatus: 'Aman / Tepat',
        fieldImpact:
          'Kompromi pada satu saluran (misalnya email) tidak cukup untuk membuka isi konfigurasi BPR karena kuncinya berada di saluran berbeda.',
        whyAndNextStep:
          'Verifikasi identitas penerima terlebih dahulu, kirim arsip lewat email/portal resmi, lalu serahkan passphrase via jalur Out-of-Band.',
      },
      {
        id: 'readme-attach',
        label: 'Simpan passphrase di file kunci.txt lalu lampirkan bersama arsip',
        detail: 'Agar tidak perlu mengetik ulang passphrase di badan pesan.',
        isSafe: false,
        conditionStatus: 'Berisiko Kritis',
        fieldImpact:
          'Melampirkan file kunci.txt di paket yang sama persis seperti menempelkan kunci brankas di pintu brankas.',
        whyAndNextStep:
          'Hapus file kunci.txt dari lampiran maupun disk lokal dan sampaikan passphrase hanya lewat saluran terpisah.',
      },
    ],
  },
  {
    id: 'cleanup',
    stepNumber: 4,
    title: 'Pembersihan Pasca-Transfer (Cleanup)',
    prompt:
      'Troubleshooting selesai. Di laptop Anda masih ada salinan plaintext saascore_prod_db_bpr.json hasil ekspor sementara. Lihat dampak tiap tindakan berikut:',
    options: [
      {
        id: 'leave-desktop',
        label: 'Biarkan di folder Desktop atau Downloads untuk berjaga-jaga bulan depan',
        detail: 'Memudahkan jika suatu saat butuh konfigurasi yang sama lagi.',
        isSafe: false,
        conditionStatus: 'Berisiko Tinggi',
        fieldImpact:
          'Folder Desktop dan Downloads adalah target pertama malware infostealer maupun pihak lain saat laptop tidak terkunci di ruang kerja.',
        whyAndNextStep:
          'Jangan menyimpan kredensial produksi di folder lokal. Gunakan pengelola rahasia (secret vault) tim bila perlu akses berulang.',
      },
      {
        id: 'recycle-only',
        label: 'Klik Delete saja sehingga file masuk ke Recycle Bin / Trash',
        detail: 'File sudah tidak terlihat di folder Downloads sehingga dianggap hilang.',
        isSafe: false,
        conditionStatus: 'Berisiko Sedang',
        fieldImpact:
          'Salinan plaintext masih tersimpan utuh di Recycle Bin dan dapat dipulihkan dengan satu klik atau diindeks aplikasi pencari file.',
        whyAndNextStep:
          'Lakukan penghapusan permanen (Shift+Delete / Empty Trash) dan bersihkan folder Temp setelah transfer selesai.',
      },
      {
        id: 'secure-cleanup',
        label: 'Hapus permanen salinan plaintext dari Downloads/Temp & Recycle Bin, serta ingatkan penerima',
        detail: 'Pastikan hanya konfigurasi resmi di vault tim yang dipertahankan.',
        isSafe: true,
        conditionStatus: 'Aman / Tepat',
        fieldImpact:
          'Jejak file sensitif di endpoint pengirim maupun penerima tertutup bersih sehingga risiko pencurian kredensial di kemudian hari turun drastis.',
        whyAndNextStep:
          'Biasakan menutup setiap transfer data sensitif dengan checklist cleanup di kedua sisi dan konfirmasi ke rekan tim.',
      },
      {
        id: 'backup-personal',
        label: 'Pindahkan salinan plaintext ke flashdisk pribadi atau cloud pribadi',
        detail: 'Supaya folder Downloads tetap rapi tanpa kehilangan file.',
        isSafe: false,
        conditionStatus: 'Berisiko Kritis',
        fieldImpact:
          'Data rahasia klien BPR berpindah ke media tak terkelola. Jika flashdisk hilang atau akun pribadi bocor, PT. Sigit Adi Aman Siber (SaaS) menghadapi insiden serius.',
        whyAndNextStep:
          'Dilarang keras memindahkan konfigurasi atau data klien ke perangkat maupun cloud pribadi. Simpan hanya di sistem terkendali kantor.',
      },
    ],
  },
];

export function Lab05DataHandling({
  moduleId,
  instructorMode = false,
  onMarkExplored,
}: LabProps) {
  const [selectedByStep, setSelectedByStep] = useState<Record<string, string | null>>({});
  const [exploredSteps, setExploredSteps] = useState<Record<string, boolean>>({});
  const [showAllConditions, setShowAllConditions] = useState(false);
  const [manualDone, setManualDone] = useState(false);

  useEffect(() => {
    if (!instructorMode) {
      setShowAllConditions(false);
    }
  }, [instructorMode]);

  const totalSteps = WORKFLOW_STEPS.length;
  const exploredCount = WORKFLOW_STEPS.filter((step) => exploredSteps[step.id]).length;
  const isExplored = manualDone || exploredCount >= totalSteps;

  const handleSelectOption = (stepId: string, optionId: string) => {
    setSelectedByStep((prev) => ({ ...prev, [stepId]: optionId }));

    if (!exploredSteps[stepId]) {
      const nextExplored = { ...exploredSteps, [stepId]: true };
      setExploredSteps(nextExplored);
      const nextCount = WORKFLOW_STEPS.filter((step) => nextExplored[step.id]).length;
      onMarkExplored(nextCount, totalSteps);
    }
  };

  const handleMarkDone = () => {
    const allExplored: Record<string, boolean> = {};
    for (const step of WORKFLOW_STEPS) {
      allExplored[step.id] = true;
    }
    setExploredSteps(allExplored);
    setManualDone(true);
    onMarkExplored(totalSteps, totalSteps);
  };

  const handleReset = () => {
    setSelectedByStep({});
    setExploredSteps({});
    setShowAllConditions(false);
    setManualDone(false);
    onMarkExplored(0, totalSteps);
  };

  return (
    <LabShell
      moduleId={moduleId}
      session="pagi"
      title="Simulator Pengamanan & Enkripsi Dokumen Klien"
      instructions={
        instructorMode
          ? 'Eksplorasi seluruh opsi aman maupun berisiko di 4 tahap pengiriman file konfigurasi SaaSCore. Klik opsi mana saja secara bebas untuk melihat dampak nyatanya, atau aktifkan mode perbandingan semua kondisi untuk diskusi kelas.'
          : 'Eksplorasi seluruh opsi aman maupun berisiko di 4 tahap pengiriman file konfigurasi SaaSCore. Klik opsi mana saja secara bebas untuk melihat dampak nyatanya serta langkah pengamanan yang tepat.'
      }
      exploredCount={isExplored ? totalSteps : exploredCount}
      totalCount={totalSteps}
      isExplored={isExplored}
      onMarkDone={handleMarkDone}
      onReset={handleReset}
    >
      <div className="space-y-5">
        <Callout
          title="Skenario Operasional PT. Sigit Adi Aman Siber (SaaS) / SaaSCore"
          badge="KONTEKS KASUS"
          variant="navy"
          icon={<FileCode2 className="h-5 w-5 text-[#0B1F3A] dark:text-sky-400" aria-hidden="true" />}
        >
          <p>
            <RichTermText text="Anda sedang menangani troubleshooting darurat layanan aplikasi BPR. Rekan engineer SaaS membutuhkan file ekspor konfigurasi" />{' '}
            <code className="break-all rounded bg-slate-200 px-1.5 py-0.5 font-mono text-xs font-semibold text-slate-900 dark:bg-slate-800 dark:text-emerald-300">
              saascore_prod_db_bpr.json
            </code>{' '}
            <RichTermText text="yang berisi detail koneksi database produksi berikut:" />
          </p>
          <pre className="mt-3 overflow-x-auto rounded-md border border-slate-300 bg-slate-900 p-3 font-mono text-xs leading-relaxed text-emerald-300 dark:border-slate-700">
{`{
  "environment": "production-bpr",
  "db_host": "10.24.8.15",
  "db_port": 5432,
  "database": "saascore_bpr_prod",
  "service_user": "svc_saascore_core",
  "service_password": "[KREDENSIAL_PRODUKSI_RAHASIA]"
}`}
          </pre>
        </Callout>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm text-slate-700 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-slate-100">Mode Eksplorasi Bebas:</strong>{' '}
            {instructorMode
              ? 'Klik opsi mana pun untuk melihat konsekuensinya, atau buka semua penjelasan untuk dibandingkan di layar proyektor.'
              : 'Klik opsi mana pun pada setiap tahap untuk melihat konsekuensinya di lapangan dan langkah pengamanan yang tepat.'}
          </div>
          {instructorMode && (
            <button
              type="button"
              onClick={() => setShowAllConditions((prev) => !prev)}
              aria-pressed={showAllConditions}
              className={`inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                showAllConditions
                  ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white dark:border-emerald-400 dark:bg-emerald-500 dark:text-slate-950'
                  : 'border-slate-300 bg-slate-50 text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {showAllConditions ? (
                <EyeOff className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span>
                {showAllConditions
                  ? 'Tutup Penjelasan Semua Kondisi'
                  : 'Buka Semua Penjelasan Kondisi'}
              </span>
            </button>
          )}
        </div>

        <div className="space-y-5">
          {WORKFLOW_STEPS.map((step) => {
            const activeOptionId = selectedByStep[step.id];
            const activeOption = step.options.find((opt) => opt.id === activeOptionId);
            const stepExplored = Boolean(exploredSteps[step.id]);

            return (
              <section
                key={step.id}
                className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 rounded bg-[#0B1F3A] px-2.5 py-1 font-mono text-xs font-semibold text-white dark:bg-slate-800 dark:text-emerald-300">
                    <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      TAHAP {step.stepNumber} / {totalSteps}
                    </span>
                  </div>
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-xs font-semibold ${
                      stepExplored
                        ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {stepExplored ? 'Sudah Dieksplorasi' : 'Belum Dieksplorasi'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  <RichTermText text={step.title} />
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <RichTermText text={step.prompt} />
                </p>

                <div className="mt-4 grid gap-3" role="group" aria-label={step.title}>
                  {step.options.map((option) => {
                    const isSelected = activeOptionId === option.id;
                    let cardStyle =
                      'border-slate-200 bg-slate-50/70 hover:border-[#0B1F3A] hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-emerald-400 dark:hover:bg-slate-800';

                    if (isSelected && option.isSafe) {
                      cardStyle =
                        'border-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/40';
                    } else if (isSelected && !option.isSafe) {
                      cardStyle =
                        'border-rose-600 bg-rose-50 dark:border-rose-500 dark:bg-rose-950/40';
                    }

                    return (
                      <div key={option.id} className="space-y-2.5">
                        <button
                          type="button"
                          onClick={() => handleSelectOption(step.id, option.id)}
                          aria-pressed={isSelected}
                          className={`min-h-[44px] w-full rounded-lg border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#047857] dark:focus-visible:ring-[#10B981] ${cardStyle}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                {option.label}
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                                {option.detail}
                              </p>
                            </div>
                            {isSelected &&
                              (option.isSafe ? (
                                <CheckCircle2
                                  className="mt-0.5 h-5 w-5 shrink-0 text-[#047857] dark:text-[#10B981]"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ShieldAlert
                                  className="mt-0.5 h-5 w-5 shrink-0 text-rose-700 dark:text-rose-400"
                                  aria-hidden="true"
                                />
                              ))}
                          </div>
                        </button>

                        {showAllConditions && (
                          <FeedbackBox
                            variant={option.isSafe ? 'safe' : 'risk'}
                            label={option.conditionStatus}
                            title={option.label}
                          >
                            <p>
                              <strong>Dampak di Lapangan:</strong>{' '}
                              <RichTermText text={option.fieldImpact} />
                            </p>
                            <p className="mt-1.5">
                              <strong>Mengapa &amp; Langkah Tepat:</strong>{' '}
                              <RichTermText text={option.whyAndNextStep} />
                            </p>
                          </FeedbackBox>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!showAllConditions && activeOption && (
                  <div className="mt-4">
                    <FeedbackBox
                      variant={activeOption.isSafe ? 'safe' : 'risk'}
                      label={activeOption.conditionStatus}
                      title={activeOption.label}
                    >
                      <p>
                        <strong>Dampak di Lapangan:</strong>{' '}
                        <RichTermText text={activeOption.fieldImpact} />
                      </p>
                      <p className="mt-1.5">
                        <strong>Mengapa &amp; Langkah Tepat:</strong>{' '}
                        <RichTermText text={activeOption.whyAndNextStep} />
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

export default Lab05DataHandling;
