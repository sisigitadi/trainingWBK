import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  HelpCircle,
  Laptop,
  ShieldAlert,
} from 'lucide-react';
import type { LabProps } from '../../types/training';
import { Callout, FeedbackBox, LabShell } from '../ui';

type AuditStatus = 'aman' | 'perbaikan' | 'belum_yakin';

interface ConditionExplanation {
  variant: 'safe' | 'risk' | 'info';
  statusLabel: string;
  fieldImpact: string;
  whyAndNextStep: string;
}

interface AuditItem {
  id: string;
  number: number;
  title: string;
  description: string;
  howToVerify: string;
  conditions: Record<AuditStatus, ConditionExplanation>;
}

const AUDIT_ITEMS: AuditItem[] = [
  {
    id: 'os-browser-patch',
    number: 1,
    title: 'Patch OS & Browser Terbaru',
    description:
      'Sistem operasi (Windows Update / macOS Software Update) dan browser kerja (Chrome / Edge) terpasang pembaruan keamanan terbaru.',
    howToVerify:
      'Cek Windows Settings -> Windows Update (status Up to date) dan buka chrome://settings/help di browser.',
    conditions: {
      aman: {
        variant: 'safe',
        statusLabel: 'Kondisi Aman',
        fieldImpact:
          'Celah keamanan publik pada OS dan browser tertutup sehingga skrip berbahaya dari halaman web tidak mudah mengambil alih sesi login SaaSCore.',
        whyAndNextStep:
          'Pertahankan pembaruan otomatis aktif dan lakukan restart terjadwal setelah patch keamanan terunduh.',
      },
      perbaikan: {
        variant: 'risk',
        statusLabel: 'Kondisi Berisiko',
        fieldImpact:
          'Browser atau OS yang tertinggal beberapa versi memiliki celah yang diketahui penyerang untuk menyusupkan pencuri cookie sesi VPN dan portal BPR.',
        whyAndNextStep:
          'Jalankan Windows Update / macOS Update dan perbarui browser sekarang juga, lalu restart laptop sebelum membuka akses produksi.',
      },
      belum_yakin: {
        variant: 'info',
        statusLabel: 'Perlu Verifikasi',
        fieldImpact:
          'Menunda pembaruan tanpa mengecek statusnya membuat tim tidak menyadari apakah patch kritis bulan ini sudah terpasang.',
        whyAndNextStep:
          'Periksa halaman Update sekarang. Jika tertunda oleh kebijakan jaringan atau error update, segera koordinasikan dengan tim IT SaaS.',
      },
    },
  },
  {
    id: 'no-pirated-software',
    number: 2,
    title: 'Bebas Software & Aktivator Bajakan',
    description:
      'Laptop kerja bersih dari aplikasi bajakan, crack, keygen, atau skrip aktivator KMS ilegal untuk Windows maupun Office.',
    howToVerify:
      'Pastikan lisensi OS dan Office berasal dari IT SaaS, serta tidak ada folder crack atau alat aktivasi pihak ketiga di disk.',
    conditions: {
      aman: {
        variant: 'safe',
        statusLabel: 'Kondisi Aman',
        fieldImpact:
          'Rantai perangkat lunak laptop bebas dari payload infostealer tersembunyi yang biasa disisipkan ke dalam crack dan aktivator KMS.',
        whyAndNextStep:
          'Tetap gunakan aplikasi berlisensi resmi atau alternatif open-source tepercaya yang disetujui tim IT PT. Sigit Adi Aman Siber (SaaS).',
      },
      perbaikan: {
        variant: 'risk',
        statusLabel: 'Kondisi Berisiko Kritis',
        fieldImpact:
          'Aktivator dan software bajakan adalah sumber utama infostealer yang diam-diam mencuri cookie browser, password tersimpan, dan kunci SSH SaaSCore.',
        whyAndNextStep:
          'Hapus segera aplikasi bajakan, lakukan instalasi ulang bersih melalui IT SaaS, dan rotasi seluruh kredensial yang pernah dipakai di laptop.',
      },
      belum_yakin: {
        variant: 'info',
        statusLabel: 'Perlu Verifikasi',
        fieldImpact:
          'Aplikasi utilitas lama yang diinstal di luar kanal resmi berpotensi membawa komponen adware atau pencuri kredensial.',
        whyAndNextStep:
          'Periksa daftar aplikasi terpasang (Installed Apps) dan status aktivasi Windows/Office bersama tim IT jika asal lisensinya tidak jelas.',
      },
    },
  },
  {
    id: 'disk-encryption',
    number: 3,
    title: 'Enkripsi Disk Penuh Aktif (BitLocker / FileVault)',
    description:
      'Drive sistem (C: / Macintosh HD) terenkripsi penuh sehingga data tidak dapat dibaca bila SSD dilepas atau laptop hilang.',
    howToVerify:
      'Buka Control Panel -> BitLocker Drive Encryption atau System Settings -> Privacy & Security -> FileVault di macOS.',
    conditions: {
      aman: {
        variant: 'safe',
        statusLabel: 'Kondisi Aman',
        fieldImpact:
          'Jika laptop tertinggal di perjalanan kunjungan BPR atau dicuri, isi SSD tetap terkunci kriptografis dan tidak bisa dibaca lewat perangkat lain.',
        whyAndNextStep:
          'Pastikan recovery key BitLocker/FileVault tersimpan aman di akun korporat atau pengelola rahasia resmi, bukan di drive yang sama.',
      },
      perbaikan: {
        variant: 'risk',
        statusLabel: 'Kondisi Berisiko Tinggi',
        fieldImpact:
          'Tanpa enkripsi disk, pencuri cukup melepas SSD dan membacanya lewat USB adapter untuk mengambil dump database, dokumen BPR, dan cache token.',
        whyAndNextStep:
          'Aktifkan BitLocker atau FileVault hari ini juga dan cadangkan recovery key ke tempat aman sebelum melakukan restart.',
      },
      belum_yakin: {
        variant: 'info',
        statusLabel: 'Perlu Verifikasi',
        fieldImpact:
          'Banyak pengguna mengira laptop baru otomatis terenkripsi, padahal status BitLocker sering masih "Waiting for activation".',
        whyAndNextStep:
          'Buka BitLocker / FileVault sekarang untuk memastikan statusnya benar-benar aktif penuh dan recovery key sudah tercadangkan.',
      },
    },
  },
  {
    id: 'screen-lock',
    number: 4,
    title: 'Screen Lock Otomatis <= 5 Menit & Kebiasaan Win+L',
    description:
      'Layar mengunci otomatis maksimal 5 menit saat idle dan pengguna rutin menekan Win+L (atau Ctrl+Cmd+Q) sebelum meninggalkan meja.',
    howToVerify:
      'Cek Settings -> Accounts -> Sign-in options serta pengaturan Screen timeout agar terkunci maksimal dalam 5 menit.',
    conditions: {
      aman: {
        variant: 'safe',
        statusLabel: 'Kondisi Aman',
        fieldImpact:
          'Orang lain yang melintas di area kerja atau kantor BPR tidak dapat menyentuh sesi terminal database, chat, atau email kerja yang sedang aktif.',
        whyAndNextStep:
          'Pertahankan refleks menekan Win+L setiap kali beranjak dari kursi, termasuk saat rapat singkat atau mengambil minum.',
      },
      perbaikan: {
        variant: 'risk',
        statusLabel: 'Kondisi Berisiko',
        fieldImpact:
          'Layar yang dibiarkan menyala terbuka memberi kesempatan siapa saja mengekspor file konfigurasi atau membaca data klien dalam hitungan detik.',
        whyAndNextStep:
          'Ubah batas screen timeout menjadi maksimal 5 menit dengan kewajiban login ulang, lalu biasakan Win+L sebelum berdiri.',
      },
      belum_yakin: {
        variant: 'info',
        statusLabel: 'Perlu Verifikasi',
        fieldImpact:
          'Pengaturan daya bawaan saat laptop terhubung ke charger sering disetel Never sleep sehingga layar terbuka berjam-jam.',
        whyAndNextStep:
          'Periksa profil daya "Plugged in" dan "On battery" agar keduanya mengunci layar maksimal dalam 5 menit.',
      },
    },
  },
  {
    id: 'av-edr',
    number: 5,
    title: 'Antivirus / EDR Aktif & Terbarui',
    description:
      'Proteksi real-time (Microsoft Defender atau agen EDR perusahaan) menyala normal tanpa pengecualian folder (exclusion) sembarangan.',
    howToVerify:
      'Buka Windows Security -> Virus & threat protection dan pastikan Real-time protection aktif serta daftar Exclusions bersih.',
    conditions: {
      aman: {
        variant: 'safe',
        statusLabel: 'Kondisi Aman',
        fieldImpact:
          'Skrip berbahaya, lampiran trojan, dan perilaku proses mencurigakan langsung diblokir sebelum sempat mengekstrak kredensial dari memori.',
        whyAndNextStep:
          'Jangan menambahkan folder Downloads atau folder proyek secara sembarangan ke daftar exclusion tanpa persetujuan tim keamanan SaaS.',
      },
      perbaikan: {
        variant: 'risk',
        statusLabel: 'Kondisi Berisiko Tinggi',
        fieldImpact:
          'Mematikan real-time protection atau mengecualikan drive kerja membuat skrip berbahaya berjalan bebas tanpa peringatan sama sekali.',
        whyAndNextStep:
          'Aktifkan kembali proteksi real-time, bersihkan exclusion yang tidak sah, perbarui definisi ancaman, dan jalankan pemindaian penuh.',
      },
      belum_yakin: {
        variant: 'info',
        statusLabel: 'Perlu Verifikasi',
        fieldImpact:
          'Proteksi bisa saja terhenti diam-diam setelah pembaruan gagal atau ada exclusion lama yang tersisa dari proses build sebelumnya.',
        whyAndNextStep:
          'Buka panel keamanan perangkat sekarang dan periksa tanggal definisi terakhir serta daftar pengecualian folder.',
      },
    },
  },
  {
    id: 'non-admin-uac',
    number: 6,
    title: 'Akun Harian Non-Administrator / UAC Aktif',
    description:
      'Pekerjaan harian tidak memakai hak Administrator penuh tanpa kontrol, dan User Account Control (UAC) aktif meminta konfirmasi.',
    howToVerify:
      'Buka menu Start -> ketik "Change User Account Control settings" dan pastikan penggeser tidak berada di posisi paling bawah (Never notify).',
    conditions: {
      aman: {
        variant: 'safe',
        statusLabel: 'Kondisi Aman',
        fieldImpact:
          'Setiap upaya program asing mengubah pengaturan sistem atau memasang layanan latar belakang akan tertahan oleh konfirmasi hak akses.',
        whyAndNextStep:
          'Pertahankan UAC aktif serta gunakan hak elevasi administrator hanya saat memang diperlukan untuk tugas teknis tertentu.',
      },
      perbaikan: {
        variant: 'risk',
        statusLabel: 'Kondisi Berisiko',
        fieldImpact:
          'Menjalankan browser dan email dengan hak Administrator penuh tanpa UAC memberi izin otomatis bagi malware untuk memodifikasi sistem.',
        whyAndNextStep:
          'Naikkan pengaturan UAC minimal ke level default dan pisahkan akun kerja harian dari akun administrator bila kebijakan IT mendukung.',
      },
      belum_yakin: {
        variant: 'info',
        statusLabel: 'Perlu Verifikasi',
        fieldImpact:
          'Sebagian pengguna menonaktifkan UAC saat instalasi driver lalu lupa mengembalikannya ke posisi aman.',
        whyAndNextStep:
          'Cek status UAC dan keanggotaan grup Administrators pada akun Windows Anda hari ini.',
      },
    },
  },
  {
    id: 'usb-policy',
    number: 7,
    title: 'Kebijakan Blokir Media USB Tak Dikenal',
    description:
      'Tidak mencolokkan flashdisk temuan, hadiah acara, atau USB asing yang tidak terverifikasi ke laptop kerja.',
    howToVerify:
      'Pastikan transfer data hanya lewat saluran jaringan terenkripsi resmi SaaS, tanpa memakai flashdisk pribadi atau media eksternal asing.',
    conditions: {
      aman: {
        variant: 'safe',
        statusLabel: 'Kondisi Aman',
        fieldImpact:
          'Risiko infeksi malware melalui media portabel maupun perangkat BadUSB yang menyamar sebagai keyboard dapat dicegah sepenuhnya.',
        whyAndNextStep:
          'Lanjutkan disiplin menolak penggunaan flashdisk asing dan laporkan bila menemukan media USB mencurigakan di area kantor.',
      },
      perbaikan: {
        variant: 'risk',
        statusLabel: 'Kondisi Berisiko',
        fieldImpact:
          'Flashdisk dari sumber tidak tepercaya dapat membawa file jebakan atau menyuntikkan perintah berbahaya otomatis begitu terhubung ke port USB.',
        whyAndNextStep:
          'Hentikan pemakaian flashdisk untuk pertukaran file kerja dan beralih ke portal transfer resmi PT. Sigit Adi Aman Siber (SaaS).',
      },
      belum_yakin: {
        variant: 'info',
        statusLabel: 'Perlu Verifikasi',
        fieldImpact:
          'Saat kunjungan lapangan di BPR, staf sering tergoda meminjam flashdisk klien untuk menyalin log atau installer dengan cepat.',
        whyAndNextStep:
          'Pastikan kebiasaan kerja Anda dan tim lapangan sudah meniadakan pertukaran file lewat flashdisk tak terverifikasi.',
      },
    },
  },
  {
    id: 'password-manager',
    number: 8,
    title: 'Password Manager & Bebas Catatan Plaintext',
    description:
      'Seluruh kredensial disimpan di password manager terenkripsi, bebas dari file .txt, Excel, atau Sticky Notes berisi password di Desktop.',
    howToVerify:
      'Periksa folder Desktop, Documents, dan aplikasi Sticky Notes apakah masih ada catatan akun atau password tanpa enkripsi.',
    conditions: {
      aman: {
        variant: 'safe',
        statusLabel: 'Kondisi Aman',
        fieldImpact:
          'Jika malware pemindai file masuk atau ada orang melihat layar sekilas, tidak ada daftar password plaintext yang langsung terbaca.',
        whyAndNextStep:
          'Kunci vault password manager saat tidak digunakan dan lindungi dengan master passphrase unik serta MFA.',
      },
      perbaikan: {
        variant: 'risk',
        statusLabel: 'Kondisi Berisiko Kritis',
        fieldImpact:
          'File seperti password.txt atau catatan Sticky Notes di Desktop adalah sasaran pertama skrip pencuri data untuk membobol VPN dan database klien.',
        whyAndNextStep:
          'Pindahkan seluruh kredensial ke password manager resmi yang disetujui tim, hapus permanen file plaintext, lalu ganti password yang pernah tercatat.',
      },
      belum_yakin: {
        variant: 'info',
        statusLabel: 'Perlu Verifikasi',
        fieldImpact:
          'Catatan konfigurasi sementara berisi kredensial uji coba sering terlupakan di folder Downloads atau catatan cepat.',
        whyAndNextStep:
          'Lakukan pencarian cepat di folder kerja lokal untuk memastikan tidak ada file catatan password atau token yang tertinggal.',
      },
    },
  },
];

const STATUS_OPTIONS: { value: AuditStatus; label: string }[] = [
  { value: 'aman', label: 'Sudah Aman' },
  { value: 'perbaikan', label: 'Perlu Perbaikan' },
  { value: 'belum_yakin', label: 'Belum Yakin' },
];

export function Lab06EndpointAudit({
  moduleId,
  instructorMode = false,
  onMarkExplored,
}: LabProps) {
  const [statuses, setStatuses] = useState<Record<string, AuditStatus>>({});
  const [showAllConditions, setShowAllConditions] = useState(false);
  const [manualDone, setManualDone] = useState(false);

  useEffect(() => {
    if (!instructorMode) {
      setShowAllConditions(false);
    }
  }, [instructorMode]);

  const totalItems = AUDIT_ITEMS.length;
  const checkedCount = AUDIT_ITEMS.filter((item) => statuses[item.id] !== undefined).length;
  const safeCount = AUDIT_ITEMS.filter((item) => statuses[item.id] === 'aman').length;
  const fixCount = AUDIT_ITEMS.filter((item) => statuses[item.id] === 'perbaikan').length;
  const uncertainCount = AUDIT_ITEMS.filter(
    (item) => statuses[item.id] === 'belum_yakin'
  ).length;

  const isExplored = manualDone || checkedCount >= totalItems;

  const handleSetStatus = (itemId: string, status: AuditStatus) => {
    const nextStatuses = { ...statuses, [itemId]: status };
    setStatuses(nextStatuses);
    const nextChecked = AUDIT_ITEMS.filter((item) => nextStatuses[item.id] !== undefined).length;
    onMarkExplored(nextChecked, totalItems);
  };

  const handleMarkDone = () => {
    setManualDone(true);
    onMarkExplored(totalItems, totalItems);
  };

  const handleReset = () => {
    setStatuses({});
    setShowAllConditions(false);
    setManualDone(false);
    onMarkExplored(0, totalItems);
  };

  const itemsNeedingAction = AUDIT_ITEMS.filter(
    (item) => statuses[item.id] === 'perbaikan' || statuses[item.id] === 'belum_yakin'
  );

  return (
    <LabShell
      moduleId={moduleId}
      session="siang"
      title="Audit Mandiri Kesehatan Laptop Kerja"
      instructions="Periksa kondisi laptop kerja Anda pada 8 poin kontrol keamanan berikut sebagai bahan refleksi teknis harian tanpa penilaian angka. Anda bebas memilih kondisi apa saja untuk melihat risiko di lapangan serta langkah perbaikannya."
      exploredCount={isExplored ? totalItems : checkedCount}
      totalCount={totalItems}
      isExplored={isExplored}
      onMarkDone={handleMarkDone}
      onReset={handleReset}
    >
      <div className="space-y-5">
        <Callout
          title="Ringkasan Kondisi Kesiapan Laptop Kerja"
          badge="RINGKASAN KUALITATIF"
          variant="navy"
          icon={<Laptop className="h-5 w-5 text-[#0B1F3A] dark:text-sky-400" aria-hidden="true" />}
        >
          <p>
            Status pemeriksaan saat ini:{' '}
            <strong className="text-slate-900 dark:text-slate-100">
              {safeCount} poin siap
            </strong>
            ,{' '}
            <strong className="text-rose-700 dark:text-rose-300">
              {fixCount} poin perlu tindak lanjut perbaikan
            </strong>
            , dan{' '}
            <strong className="text-amber-800 dark:text-amber-300">
              {uncertainCount} poin perlu verifikasi
            </strong>{' '}
            ({checkedCount} dari {totalItems} poin sudah diperiksa).
          </p>
        </Callout>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm text-slate-700 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-slate-100">Eksplorasi Kondisi:</strong>{' '}
            {instructorMode
              ? 'Pilih status di tiap poin, atau buka penjelasan seluruh kondisi untuk didiskusikan bersama peserta.'
              : 'Pilih status di tiap poin untuk melihat risiko di lapangan serta langkah perbaikan laptop kerja Anda.'}
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

        <div className="space-y-4">
          {AUDIT_ITEMS.map((item) => {
            const currentValue = statuses[item.id];
            const activeExplanation = currentValue ? item.conditions[currentValue] : undefined;

            return (
              <article
                key={item.id}
                className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#0B1F3A] px-2 py-0.5 font-mono text-xs font-semibold text-white dark:bg-slate-800 dark:text-emerald-300">
                      POIN {String(item.number).padStart(2, '0')}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {item.description}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">Cara cek cepat:</strong>{' '}
                  {item.howToVerify}
                </p>

                <div
                  className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3"
                  role="radiogroup"
                  aria-label={`Status untuk ${item.title}`}
                >
                  {STATUS_OPTIONS.map((opt) => {
                    const active = currentValue === opt.value;
                    let btnStyle =
                      'border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800';

                    if (active && opt.value === 'aman') {
                      btnStyle =
                        'border-emerald-700 bg-emerald-700 text-white dark:border-emerald-500 dark:bg-emerald-500 dark:text-slate-950';
                    } else if (active && opt.value === 'perbaikan') {
                      btnStyle =
                        'border-rose-700 bg-rose-700 text-white dark:border-rose-500 dark:bg-rose-500 dark:text-slate-950';
                    } else if (active && opt.value === 'belum_yakin') {
                      btnStyle =
                        'border-amber-700 bg-amber-600 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-slate-950';
                    }

                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => handleSetStatus(item.id, opt.value)}
                        className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${btnStyle}`}
                      >
                        {opt.value === 'aman' && (
                          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        )}
                        {opt.value === 'perbaikan' && (
                          <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                        )}
                        {opt.value === 'belum_yakin' && (
                          <HelpCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        )}
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {!showAllConditions && activeExplanation && (
                  <div className="mt-4">
                    <FeedbackBox
                      variant={activeExplanation.variant}
                      label={activeExplanation.statusLabel}
                      title={item.title}
                    >
                      <p>
                        <strong>Dampak di Lapangan:</strong> {activeExplanation.fieldImpact}
                      </p>
                      <p className="mt-1.5">
                        <strong>Mengapa &amp; Langkah Tepat:</strong>{' '}
                        {activeExplanation.whyAndNextStep}
                      </p>
                    </FeedbackBox>
                  </div>
                )}

                {showAllConditions && (
                  <div className="mt-4 space-y-2.5">
                    {STATUS_OPTIONS.map((opt) => {
                      const cond = item.conditions[opt.value];
                      return (
                        <FeedbackBox
                          key={opt.value}
                          variant={cond.variant}
                          label={`${opt.label} - ${cond.statusLabel}`}
                        >
                          <p>
                            <strong>Dampak di Lapangan:</strong> {cond.fieldImpact}
                          </p>
                          <p className="mt-1.5">
                            <strong>Mengapa &amp; Langkah Tepat:</strong> {cond.whyAndNextStep}
                          </p>
                        </FeedbackBox>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {itemsNeedingAction.length > 0 && (
          <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Catatan Tindak Lanjut Laptop Kerja ({itemsNeedingAction.length} Poin)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Daftar berikut merangkum poin yang Anda tandai Perlu Perbaikan atau Belum Yakin untuk
              segera diselesaikan setelah sesi bimtek.
            </p>
            <div className="space-y-2.5">
              {itemsNeedingAction.map((item) => {
                const status = statuses[item.id];
                if (!status || status === 'aman') {
                  return null;
                }
                const detail = item.conditions[status];
                return (
                  <FeedbackBox
                    key={item.id}
                    variant={detail.variant}
                    label={`POIN ${String(item.number).padStart(2, '0')} - ${detail.statusLabel}`}
                    title={item.title}
                  >
                    <p>{detail.whyAndNextStep}</p>
                  </FeedbackBox>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </LabShell>
  );
}

export default Lab06EndpointAudit;
