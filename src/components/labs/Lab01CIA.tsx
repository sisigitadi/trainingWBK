import { useEffect, useState } from 'react';
import {
  Activity,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  FileCheck2,
  Lock,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import type { LabProps } from '../../types/training';
import { Callout, FeedbackBox, LabShell } from '../ui';

type CiaPillar = 'Confidentiality' | 'Integrity' | 'Availability';

interface PillarFeedback {
  isSafe: boolean;
  impact: string;
  rationale: string;
}

interface MitigationOption {
  id: string;
  label: string;
  isSafe: boolean;
  impact: string;
  rationale: string;
}

interface IncidentScenario {
  id: number;
  code: string;
  title: string;
  scenario: string;
  correctPillar: CiaPillar;
  pillarFeedback: Record<CiaPillar, PillarFeedback>;
  mitigations: MitigationOption[];
}

const PILLAR_OPTIONS: {
  id: CiaPillar;
  label: string;
  shortDesc: string;
  Icon: typeof Lock;
}[] = [
  {
    id: 'Confidentiality',
    label: 'Confidentiality (Kerahasiaan)',
    shortDesc: 'Data sensitif atau akses terbuka ke pihak tidak berwenang',
    Icon: Lock,
  },
  {
    id: 'Integrity',
    label: 'Integrity (Integritas)',
    shortDesc: 'Keaslian berkas, angka pembukuan, atau data berubah tanpa izin',
    Icon: FileCheck2,
  },
  {
    id: 'Availability',
    label: 'Availability (Ketersediaan)',
    shortDesc: 'Layanan atau sistem tidak dapat diakses saat dibutuhkan',
    Icon: Activity,
  },
];

const INCIDENTS: IncidentScenario[] = [
  {
    id: 1,
    code: 'INSIDEN 01',
    title: 'Server Tiket Support Lumpuh 3 Jam Saat Jam Operasional BPR',
    scenario:
      'Pada pukul 09.00 WIB, server portal tiket support PT. Sigit Adi Aman Siber (SaaS) mendadak tidak bisa diakses selama 3 jam ketika BPR mitra sedang melayani nasabah di loket teller SaaSCore. Tidak ada data nasabah yang bocor ataupun berubah, namun antrean laporan kendala terhenti total.',
    correctPillar: 'Availability',
    pillarFeedback: {
      Confidentiality: {
        isSafe: false,
        impact:
          'Fokus penanganan bisa meleset ke investigasi kebocoran data padahal sistem hanya mengalami hambatan ketersediaan layanan.',
        rationale:
          'Kurang tepat untuk insiden ini. Confidentiality berkaitan dengan keterbukaan data ke pihak tidak sah, sedangkan pada kasus ini data tetap aman tetapi sistem tidak bisa diakses.',
      },
      Integrity: {
        isSafe: false,
        impact:
          'Tim berisiko membuang waktu memeriksa ulang seluruh tabel akuntansi padahal tidak ada perubahan atau kerusakan data.',
        rationale:
          'Kurang tepat. Integrity menyangkut keakuratan dan keaslian data. Di skenario ini isi data tidak berubah, masalah utamanya ada pada Availability.',
      },
      Availability: {
        isSafe: true,
        impact:
          'Tim langsung memprioritaskan pemulihan layanan antrean tiket agar kendala operasional teller BPR kembali tertangani tepat waktu.',
        rationale:
          'Tepat! Pilar utama yang terdampak adalah Availability karena sistem layanan tidak tersedia pada jam operasional kritis tanpa disertai kebocoran atau manipulasi data.',
      },
    },
    mitigations: [
      {
        id: 'm1-a',
        label:
          'Aktifkan layanan cadangan (failover) sesuai rencana kesinambungan operasional dan informasikan kanal eskalasi resmi sementara kepada PIC BPR.',
        isSafe: true,
        impact:
          'Operasional dukungan BPR tetap berjalan terkendali, antrean tiket kembali tercatat rapi, dan audit trail terjaga.',
        rationale:
          'Langkah tepat! Jalur failover dan komunikasi resmi menjaga pilar Availability tanpa membuka celah keamanan baru.',
      },
      {
        id: 'm1-b',
        label:
          'Hapus permanen riwayat tiket 6 bulan terakhir agar kapasitas penyimpanan server segera kosong.',
        isSafe: false,
        impact:
          'Jejak riwayat penanganan kendala BPR hilang permanen dan menyulitkan audit maupun penelusuran bug berulang.',
        rationale:
          'Kondisi berisiko karena menghancurkan log operasional yang dibutuhkan untuk akuntabilitas dan integritas historis layanan.',
      },
      {
        id: 'm1-c',
        label:
          'Minta seluruh staf BPR mengirim detail kendala beserta kredensial server ke grup chat terbuka.',
        isSafe: false,
        impact:
          'Gangguan ketersediaan berkembang menjadi kebocoran kredensial dan data nasabah di ruang percakapan tidak terkontrol.',
        rationale:
          'Kondisi berisiko tinggi karena memicu insiden Confidentiality baru demi mengejar kecepatan respons.',
      },
      {
        id: 'm1-d',
        label:
          'Buka akses database utama server tiket ke internet publik supaya semua pengguna bisa mengecek manual.',
        isSafe: false,
        impact:
          'Database tiket dan data teknis BPR terekspos ke pemindai otomatis penyerang di internet dalam hitungan menit.',
        rationale:
          'Sangat berisiko! Membuka port database ke publik melanggar prinsip pertahanan berlapis dan membahayakan seluruh klien.',
      },
    ],
  },
  {
    id: 2,
    code: 'INSIDEN 02',
    title: 'File Dump Database Nasabah BPR Terkirim ke Email Eksternal yang Salah',
    scenario:
      'Seorang petugas implementasi SaaS hendak mengirim salinan tabel transaksi nasabah BPR Mitra Sejahtera (Ilustrasi) untuk analisis bug SLIK. Karena terburu-buru, berkas dump berisi NIK, nomor rekening, dan mutasi terkirim ke alamat email pihak eksternal di luar perusahaan.',
    correctPillar: 'Confidentiality',
    pillarFeedback: {
      Confidentiality: {
        isSafe: true,
        impact:
          'Tim langsung mengaktifkan protokol pelaporan insiden kebocoran data pribadi (UU PDP) dan penarikan akses sesegera mungkin.',
        rationale:
          'Tepat! Informasi pribadi dan finansial nasabah terekspos kepada pihak yang tidak memiliki kewenangan akses sehingga melanggar pilar Confidentiality.',
      },
      Integrity: {
        isSafe: false,
        impact:
          'Fokus hanya tertuju pada kecocokan angka file lokal sementara salinan data sensitif tetap berada di kotak masuk pihak luar.',
        rationale:
          'Kurang tepat. File dump yang keluar tidak mengalami manipulasi isi; risiko utamanya adalah terbukanya kerahasiaan data nasabah.',
      },
      Availability: {
        isSafe: false,
        impact:
          'Masalah kebocoran data tidak tertangani karena sistem di kantor tetap menyala normal tanpa ada yang menyadari paparan informasi.',
        rationale:
          'Kurang tepat. Layanan masih berjalan normal; yang terancam adalah kerahasiaan data pribadi nasabah (Confidentiality).',
      },
    },
    mitigations: [
      {
        id: 'm2-a',
        label:
          'Diamkan saja apabila penerima belum membalas email supaya tidak menimbulkan kepanikan di tim.',
        isSafe: false,
        impact:
          'Perusahaan kehilangan kesempatan membatasi penyebaran data dan melanggar kewajiban pemberitahuan insiden tepat waktu.',
        rationale:
          'Kondisi berisiko! Menyembunyikan kesalahan pengiriman data nasabah memperbesar dampak hukum dan merusak kepercayaan BPR mitra.',
      },
      {
        id: 'm2-b',
        label:
          'Lapor segera ke Koordinator Keamanan SaaS dan PIC BPR, minta konfirmasi penghapusan ke penerima, serta wajibkan enkripsi dan penyamaran data pada prosedur berikutnya.',
        isSafe: true,
        impact:
          'Penanganan insiden berjalan transparan, dampak hukum dan kepatuhan diminimalkan, dan celah alur pengiriman data segera ditutup.',
        rationale:
          'Langkah tepat! Pelaporan cepat tanpa takut disalahkan dikombinasikan dengan enkripsi serta anonimisasi mencegah insiden berulang.',
      },
      {
        id: 'm2-c',
        label:
          'Matikan seluruh server produksi SaaSCore di BPR klien selama 24 jam tanpa pemberitahuan tertulis.',
        isSafe: false,
        impact:
          'Layanan perbankan BPR lumpuh total tanpa dasar teknis karena kebocoran berasal dari pengiriman lampiran email staf, bukan server produksi.',
        rationale:
          'Kondisi berisiko karena memicu insiden Availability baru yang tidak relevan dengan sumber masalah.',
      },
      {
        id: 'm2-d',
        label:
          'Ubah isi file cadangan lokal menjadi angka acak setelah email terlanjur keluar dari kotak terkirim.',
        isSafe: false,
        impact:
          'Lampiran yang sudah diterima pihak eksternal tidak ikut berubah, sementara tim kehilangan bahan analisis yang valid.',
        rationale:
          'Kurang tepat dan berisiko karena tidak mengatasi salinan data yang sudah terlanjur dikirim keluar.',
      },
    ],
  },
  {
    id: 3,
    code: 'INSIDEN 03',
    title: 'Checksum SHA-256 Patch Rilis SaaSCore Berubah dari Mirror Tidak Resmi',
    scenario:
      'Karena portal repositori internal terasa lambat, seorang anggota tim mengunduh paket patch pembaruan modul SaaSCore dari tautan mirror pihak ketiga. Saat dicek sebelum instalasi, nilai hash SHA-256 berkas tersebut tidak cocok dengan checksum resmi yang diterbitkan tim build SaaS.',
    correctPillar: 'Integrity',
    pillarFeedback: {
      Confidentiality: {
        isSafe: false,
        impact:
          'Risiko penyisipan kode berbahaya ke paket aplikasi tidak disadari sebagai kerusakan keaslian rilis perangkat lunak.',
        rationale:
          'Kurang tepat sebagai dampak primer. Meskipun trojan di dalam patch nantinya dapat mencuri data, indikator perubahan hash SHA-256 adalah pelanggaran Integrity.',
      },
      Integrity: {
        isSafe: true,
        impact:
          'Proses instalasi langsung dihentikan sebelum paket yang berpotensi disisipi malware menyentuh lingkungan server BPR.',
        rationale:
          'Tepat! Perubahan nilai checksum SHA-256 membuktikan isi berkas telah berubah atau dimodifikasi pihak luar sehingga keutuhan (Integrity) rilis tidak lagi terjamin.',
      },
      Availability: {
        isSafe: false,
        impact:
          'Tim bisa mengira masalahnya hanya unduhan lambat dan mengabaikan potensi penyisipan skrip berbahaya pada mirror liar.',
        rationale:
          'Kurang tepat. Server belum lumpuh; ancaman nyatanya adalah keaslian dan integritas berkas instalasi.',
      },
    },
    mitigations: [
      {
        id: 'm3-a',
        label:
          'Tetap pasang patch ke server BPR selama ukuran berkas dalam megabita terlihat sama dengan rilis resmi.',
        isSafe: false,
        impact:
          'Kode berbahaya berukuran kecil dapat masuk ke server inti BPR dan menyebar menjadi serangan supply chain.',
        rationale:
          'Sangat berisiko! Perubahan satu byte saja mengubah hash SHA-256 secara total; ukuran file yang mirip tidak pernah menjamin keamanan.',
      },
      {
        id: 'm3-b',
        label:
          'Perbarui catatan nilai SHA-256 di dokumen internal agar sesuai dengan berkas yang baru saja diunduh.',
        isSafe: false,
        impact:
          'Tim lain tertipu menganggap berkas yang sudah dimodifikasi sebagai rilis resmi perusahaan.',
        rationale:
          'Sangat berisiko karena merusak fungsi kontrol verifikasi integritas seluruh tim.',
      },
      {
        id: 'm3-c',
        label:
          'Batalkan penggunaan berkas, hapus segera dari perangkat, unduh ulang hanya dari repositori resmi sigitadi.id, lalu verifikasi ulang hash SHA-256.',
        isSafe: true,
        impact:
          'Rantai distribusi pembaruan SaaSCore tetap bersih dan seluruh server BPR terlindungi dari penyusupan kode asing.',
        rationale:
          'Langkah tepat! Berkas dengan checksum tidak cocok wajib ditolak dan diganti dari kanal distribusi resmi yang terverifikasi.',
      },
      {
        id: 'm3-d',
        label:
          'Bagikan berkas mirror tersebut ke tim support lain untuk diuji langsung di server produksi klien.',
        isSafe: false,
        impact:
          'Jika berkas mengandung ransomware atau backdoor, dampaknya meluas ke banyak BPR secara bersamaan.',
        rationale:
          'Sangat berisiko karena menyebarkan paket yang jelas gagal verifikasi ke lingkungan produksi.',
      },
    ],
  },
  {
    id: 4,
    code: 'INSIDEN 04',
    title: 'Kredensial Admin VPN BPR Tercatat di File Teks Biasa pada Folder Bersama',
    scenario:
      'Dalam peninjauan rutin jaringan kantor, ditemukan berkas bernama daftar_vpn_klien.txt berisi username dan kata sandi akun administrator VPN beberapa BPR mitra tersimpan dalam teks polos di folder jaringan bersama yang dapat dibuka semua divisi.',
    correctPillar: 'Confidentiality',
    pillarFeedback: {
      Confidentiality: {
        isSafe: true,
        impact:
          'Tim segera membatasi paparan kredensial dan memperlakukan seluruh akun di dalam berkas sebagai akses yang berpotensi sudah tersalin.',
        rationale:
          'Tepat! Menyimpan kredensial admin dalam teks terbuka di area bersama melanggar prinsip kerahasiaan (Confidentiality) dan Least Privilege.',
      },
      Integrity: {
        isSafe: false,
        impact:
          'Meskipun penyerang nantinya bisa mengubah data jika login memakai password bocor, akar insiden saat file ditemukan terbuka adalah kebocoran kerahasiaan akses.',
        rationale:
          'Kurang tepat sebagai pilar utama saat temuan audit. Fokus awal adalah mengamankan kerahasiaan kredensial yang terekspos.',
      },
      Availability: {
        isSafe: false,
        impact:
          'Koneksi VPN saat ini memang masih menyala, tetapi risiko penyusupan diam-diam terlewat jika tidak segera ditangani.',
        rationale:
          'Kurang tepat. Layanan tidak sedang mati; masalah utamanya adalah keterbukaan kredensial rahasia.',
      },
    },
    mitigations: [
      {
        id: 'm4-a',
        label:
          'Ubah nama file menjadi arsip_lama_2022.txt agar staf dari divisi lain tidak tertarik membukanya.',
        isSafe: false,
        impact:
          'Isi kredensial tetap tidak terenkripsi dan mudah ditemukan melalui pencarian isi file atau oleh malware infostealer.',
        rationale:
          'Kondisi berisiko! Mengganti nama file (security by obscurity) tidak melindungi data maupun membatalkan salinan yang mungkin sudah dibuat.',
      },
      {
        id: 'm4-b',
        label:
          'Pindahkan isi file teks tersebut ke fitur pesan tersimpan pada aplikasi chat pribadi di ponsel.',
        isSafe: false,
        impact:
          'Kredensial berpindah ke perangkat pribadi tanpa kontrol akses perusahaan dan berisiko sinkronisasi cloud tidak aman.',
        rationale:
          'Kondisi berisiko karena memindahkan rahasia perusahaan ke luar manajemen akses organisasi.',
      },
      {
        id: 'm4-c',
        label:
          'Nonaktifkan seluruh server VPN klien BPR secara sepihak tanpa menyediakan jalur pemeliharaan pengganti.',
        isSafe: false,
        impact:
          'Tim support tidak dapat menangani gangguan darurat operasional BPR sehingga mengganggu kelangsungan layanan.',
        rationale:
          'Kurang tepat dan memicu masalah ketersediaan operasional tanpa rotasi akun yang terstruktur.',
      },
      {
        id: 'm4-d',
        label:
          'Hapus file teks dari folder bersama, pindahkan kredensial ke Password Manager terenkripsi berbasis hak akses minimum, dan rotasi seluruh kata sandi VPN yang sempat terekspos.',
        isSafe: true,
        impact:
          'Kredensial lama tidak lagi berlaku jika sempat disalin pihak lain, sementara akses baru terlindungi enkripsi dan audit trail.',
        rationale:
          'Langkah tepat! Menghapus berkas, memakai Password Manager, dan merotasi password menutup seluruh risiko kebocoran secara tuntas.',
      },
    ],
  },
];

interface ExploredIncidentState {
  activePillar?: CiaPillar;
  activeMitigationId?: string;
  inspectedPillars: CiaPillar[];
  inspectedMitigations: string[];
}

export function Lab01CIA({
  moduleId,
  instructorMode = false,
  onMarkExplored,
}: LabProps) {
  const [exploredMap, setExploredMap] = useState<Record<number, ExploredIncidentState>>({});
  const [showAllExplanations, setShowAllExplanations] = useState(false);
  const [manualDone, setManualDone] = useState(false);

  useEffect(() => {
    if (!instructorMode) {
      setShowAllExplanations(false);
    }
  }, [instructorMode]);

  const exploredCount = INCIDENTS.filter((inc) => {
    const st = exploredMap[inc.id];
    return Boolean(
      st && (st.inspectedPillars.length > 0 || st.inspectedMitigations.length > 0),
    );
  }).length;

  const isExplored = manualDone || exploredCount === INCIDENTS.length;

  const updateAndNotify = (nextMap: Record<number, ExploredIncidentState>) => {
    setExploredMap(nextMap);
    const nextCount = INCIDENTS.filter((inc) => {
      const st = nextMap[inc.id];
      return Boolean(
        st && (st.inspectedPillars.length > 0 || st.inspectedMitigations.length > 0),
      );
    }).length;
    onMarkExplored(nextCount, INCIDENTS.length);
  };

  const handleExplorePillar = (incidentId: number, pillar: CiaPillar) => {
    const current = exploredMap[incidentId] ?? {
      inspectedPillars: [],
      inspectedMitigations: [],
    };
    const nextPillars = current.inspectedPillars.includes(pillar)
      ? current.inspectedPillars
      : [...current.inspectedPillars, pillar];

    updateAndNotify({
      ...exploredMap,
      [incidentId]: {
        ...current,
        activePillar: pillar,
        inspectedPillars: nextPillars,
      },
    });
  };

  const handleExploreMitigation = (incidentId: number, mitigationId: string) => {
    const current = exploredMap[incidentId] ?? {
      inspectedPillars: [],
      inspectedMitigations: [],
    };
    const nextMitigations = current.inspectedMitigations.includes(mitigationId)
      ? current.inspectedMitigations
      : [...current.inspectedMitigations, mitigationId];

    updateAndNotify({
      ...exploredMap,
      [incidentId]: {
        ...current,
        activeMitigationId: mitigationId,
        inspectedMitigations: nextMitigations,
      },
    });
  };

  const handleToggleAll = () => {
    const nextShow = !showAllExplanations;
    setShowAllExplanations(nextShow);
    if (nextShow) {
      const allOpenMap: Record<number, ExploredIncidentState> = {};
      for (const inc of INCIDENTS) {
        allOpenMap[inc.id] = {
          activePillar: exploredMap[inc.id]?.activePillar ?? inc.correctPillar,
          activeMitigationId:
            exploredMap[inc.id]?.activeMitigationId ?? inc.mitigations[0]?.id,
          inspectedPillars: ['Confidentiality', 'Integrity', 'Availability'],
          inspectedMitigations: inc.mitigations.map((m) => m.id),
        };
      }
      setExploredMap(allOpenMap);
      onMarkExplored(INCIDENTS.length, INCIDENTS.length);
    }
  };

  const handleMarkDone = () => {
    setManualDone(true);
    onMarkExplored(INCIDENTS.length, INCIDENTS.length);
  };

  const handleReset = () => {
    setExploredMap({});
    setShowAllExplanations(false);
    setManualDone(false);
    onMarkExplored(0, INCIDENTS.length);
  };

  return (
    <LabShell
      moduleId={moduleId}
      session="pagi"
      title="Klasifikasi Dampak CIA (Simulasi Eksplorasi)"
      instructions="Klik opsi pilar CIA maupun langkah mitigasi mana saja secara bebas untuk mengamati dampak operasionalnya di lingkungan PT. Sigit Adi Aman Siber (SaaS) dan SaaSCore. Anda dapat berpindah dan mencoba kondisi aman maupun berisiko tanpa terkunci."
      exploredCount={exploredCount}
      totalCount={INCIDENTS.length}
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
              {instructorMode
                ? 'Mode Belajar Terbuka: Klik setiap pilihan untuk membandingkan kondisi aman dan risiko di lapangan, atau buka seluruh penjelasan untuk diskusi kelas.'
                : 'Mode Belajar Terbuka: Klik setiap pilihan pilar CIA dan mitigasi untuk mengamati kondisi aman maupun berisiko di lapangan secara langsung.'}
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

        <Callout
          title="Cara Menggunakan Simulasi Ini"
          badge="EKSPLORASI AKTIF"
          variant="navy"
        >
          Tidak ada skor atau batas salah di latihan ini. Cobalah mengklik opsi yang
          terlihat keliru terlebih dahulu agar Anda memahami konsekuensi nyatanya bagi
          layanan BPR sebelum membandingkannya dengan langkah mitigasi yang aman.
        </Callout>

        {INCIDENTS.map((incident) => {
          const state = exploredMap[incident.id];
          const activePillar = state?.activePillar;
          const activeMitigationId = state?.activeMitigationId;
          const inspectedOptionCount =
            (state?.inspectedPillars.length ?? 0) +
            (state?.inspectedMitigations.length ?? 0);
          const activePillarFb = activePillar
            ? incident.pillarFeedback[activePillar]
            : undefined;
          const activeMitigation = incident.mitigations.find(
            (m) => m.id === activeMitigationId,
          );

          return (
            <article
              key={incident.id}
              className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded bg-[#0B1F3A] px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-emerald-300 dark:bg-slate-800">
                  {incident.code}
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {inspectedOptionCount}/7 kondisi ditinjau
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {incident.title}
              </h3>
              <p className="mt-2 rounded-md border border-slate-200 bg-slate-50 p-3.5 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
                {incident.scenario}
              </p>

              <div className="mt-5 space-y-5">
                <div className="space-y-2.5">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    A. Uji Dampak Pilar CIA (Klik setiap pilar untuk melihat analisisnya)
                  </p>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {PILLAR_OPTIONS.map((opt) => {
                      const Icon = opt.Icon;
                      const isSelected = activePillar === opt.id;
                      const isInspected = state?.inspectedPillars.includes(opt.id);
                      const fb = incident.pillarFeedback[opt.id];

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleExplorePillar(incident.id, opt.id)}
                          aria-pressed={isSelected}
                          className={`flex min-h-[44px] flex-col items-start gap-1 rounded-md border p-3 text-left transition-colors ${
                            isSelected
                              ? fb.isSafe
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600 dark:border-emerald-400 dark:bg-emerald-950/50 dark:text-emerald-100 dark:ring-emerald-400'
                                : 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-600 dark:border-amber-400 dark:bg-amber-950/50 dark:text-amber-100 dark:ring-amber-400'
                              : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex w-full items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 text-sm font-bold">
                              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                              <span>{opt.label}</span>
                            </span>
                            {isInspected && (
                              <CheckCircle2
                                className="h-4 w-4 shrink-0 text-[#047857] dark:text-emerald-400"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <span className="text-xs leading-snug text-slate-600 dark:text-slate-300">
                            {opt.shortDesc}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {!showAllExplanations && activePillar && activePillarFb && (
                    <FeedbackBox
                      variant={activePillarFb.isSafe ? 'safe' : 'risk'}
                      label={
                        activePillarFb.isSafe
                          ? `KONDISI AMAN / TEPAT: ${activePillar}`
                          : `KURANG TEPAT: ${activePillar}`
                      }
                    >
                      <p>
                        <strong>Dampak Situasi di Lapangan:</strong>{' '}
                        {activePillarFb.impact}
                      </p>
                      <p className="mt-1.5">
                        <strong>Mengapa &amp; Langkah Tepatnya:</strong>{' '}
                        {activePillarFb.rationale}
                      </p>
                    </FeedbackBox>
                  )}

                  {showAllExplanations && (
                    <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-3">
                      {PILLAR_OPTIONS.map((opt) => {
                        const fb = incident.pillarFeedback[opt.id];
                        return (
                          <FeedbackBox
                            key={opt.id}
                            variant={fb.isSafe ? 'safe' : 'info'}
                            label={fb.isSafe ? `TEPAT: ${opt.id}` : `PEMBANDING: ${opt.id}`}
                          >
                            <p>
                              <strong>Dampak:</strong> {fb.impact}
                            </p>
                            <p className="mt-1">
                              <strong>Penjelasan:</strong> {fb.rationale}
                            </p>
                          </FeedbackBox>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="space-y-2.5">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    B. Uji Skenario Langkah Mitigasi (Klik opsi mana saja untuk melihat
                    dampaknya)
                  </p>
                  <div className="space-y-2.5">
                    {incident.mitigations.map((mit) => {
                      const isSelected = activeMitigationId === mit.id;
                      const isInspected = state?.inspectedMitigations.includes(mit.id);

                      return (
                        <div key={mit.id} className="space-y-2">
                          <button
                            type="button"
                            onClick={() => handleExploreMitigation(incident.id, mit.id)}
                            aria-pressed={isSelected}
                            className={`flex min-h-[44px] w-full items-start justify-between gap-3 rounded-md border px-3.5 py-3 text-left text-sm leading-relaxed transition-colors ${
                              isSelected
                                ? mit.isSafe
                                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600 dark:border-emerald-400 dark:bg-emerald-950/50 dark:text-emerald-100 dark:ring-emerald-400'
                                  : 'border-rose-600 bg-rose-50 text-rose-950 ring-1 ring-rose-600 dark:border-rose-400 dark:bg-rose-950/50 dark:text-rose-100 dark:ring-rose-400'
                                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="mt-0.5 shrink-0">
                                {isInspected ? (
                                  mit.isSafe ? (
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
                              <span>{mit.label}</span>
                            </div>
                          </button>

                          {showAllExplanations && (
                            <FeedbackBox
                              variant={mit.isSafe ? 'safe' : 'risk'}
                              label={
                                mit.isSafe
                                  ? 'KONDISI AMAN / TEPAT'
                                  : 'KONDISI BERISIKO'
                              }
                            >
                              <p>
                                <strong>Dampak Situasi di Lapangan:</strong> {mit.impact}
                              </p>
                              <p className="mt-1">
                                <strong>Mengapa &amp; Langkah Tepatnya:</strong>{' '}
                                {mit.rationale}
                              </p>
                            </FeedbackBox>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {!showAllExplanations && activeMitigation && (
                    <FeedbackBox
                      variant={activeMitigation.isSafe ? 'safe' : 'risk'}
                      label={
                        activeMitigation.isSafe
                          ? 'KONDISI AMAN / TEPAT'
                          : 'KONDISI BERISIKO'
                      }
                    >
                      <p>
                        <strong>Dampak Situasi di Lapangan:</strong>{' '}
                        {activeMitigation.impact}
                      </p>
                      <p className="mt-1.5">
                        <strong>Mengapa &amp; Langkah Tepatnya:</strong>{' '}
                        {activeMitigation.rationale}
                      </p>
                    </FeedbackBox>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </LabShell>
  );
}

export default Lab01CIA;
