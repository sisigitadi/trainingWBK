import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Globe,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import type { LabProps } from '../../types/training';
import { computeLabProgress, useLabSessionState } from '../../lib/useLabExploration';
import { useProgress } from '../../state/ProgressContext';
import { Callout, FeedbackBox, LabShell, RichTermText } from '../ui';

type UrlClassification = 'safe' | 'risk';

interface DomainTokenInfo {
  token: string;
  isRegistrableDomain: boolean;
  roleLabel: string;
  explanation: string;
}

interface ClassificationFeedback {
  matchesReality: boolean;
  statusLabel: string;
  fieldImpact: string;
  whyAndNextStep: string;
}

interface UrlChallenge {
  id: string;
  url: string;
  context: string;
  actualStatus: UrlClassification;
  tokens: DomainTokenInfo[];
  anatomy: {
    protocol: string;
    subdomain: string;
    registrableDomain: string;
    portAndPath: string;
  };
  classifications: Record<UrlClassification, ClassificationFeedback>;
}

const URL_CHALLENGES: UrlChallenge[] = [
  {
    id: 'url-1',
    url: 'https://portal.sigitadi.id/login',
    context: 'Tautan masuk portal internal PT. Sigit Adi Aman Siber (SaaS) dari bookmark resmi.',
    actualStatus: 'safe',
    tokens: [
      {
        token: 'portal',
        isRegistrableDomain: false,
        roleLabel: 'Subdomain Resmi',
        explanation:
          '"portal" hanyalah nama subdomain di bawah domain utama sigitadi.id yang dikelola oleh tim infrastruktur SaaS.',
      },
      {
        token: 'sigitadi.id',
        isRegistrableDomain: true,
        roleLabel: 'Domain Utama (Registrable Domain)',
        explanation:
          'Tepat! "sigitadi.id" berada persis di sebelah kiri tanda "/" pertama dan merupakan domain resmi PT. Sigit Adi Aman Siber (SaaS).',
      },
      {
        token: '.id',
        isRegistrableDomain: false,
        roleLabel: 'Top-Level Domain (TLD)',
        explanation:
          '".id" adalah ekstensi negara Indonesia (ccTLD), bukan nama domain lengkap yang menunjukkan pemilik tunggal situs.',
      },
      {
        token: '/login',
        isRegistrableDomain: false,
        roleLabel: 'Path Halaman',
        explanation:
          '"/login" hanya menunjukkan rute halaman di server setelah domain utama.',
      },
    ],
    anatomy: {
      protocol: 'https:// (terenkripsi TLS)',
      subdomain: 'portal',
      registrableDomain: 'sigitadi.id (domain resmi PT. Sigit Adi Aman Siber)',
      portAndPath: 'Port 443 (standar HTTPS) | /login',
    },
    classifications: {
      safe: {
        matchesReality: true,
        statusLabel: 'Tepat: Resmi & Aman',
        fieldImpact:
          'Kredensial login dan token sesi SaaSCore terenkripsi saat transit menuju server resmi milik PT. Sigit Adi Aman Siber.',
        whyAndNextStep:
          'Domain utama sigitadi.id terverifikasi dan protokolnya HTTPS. Akses portal lewat bookmark resmi agar terhindar dari salah ketik.',
      },
      risk: {
        matchesReality: false,
        statusLabel: 'Perbandingan: Mengapa Ini Sebenarnya Aman',
        fieldImpact:
          'Jika staf ragu padahal domainnya sudah sigitadi.id dengan HTTPS, pekerjaan bisa tertunda atau staf malah mencari tautan lain lewat mesin pencari yang rawan iklan phishing.',
        whyAndNextStep:
          'Cek bagian sebelum "/" pertama: host-nya adalah portal.sigitadi.id (domain utama sigitadi.id) dan protokolnya https:// sehingga aman digunakan.',
      },
    },
  },
  {
    id: 'url-2',
    url: 'https://portal.sigitadi.id.auth-check.net/login',
    context: 'Email bertema "Verifikasi Ulang Akun SaaSCore Anda Sebelum Kedaluwarsa".',
    actualStatus: 'risk',
    tokens: [
      {
        token: 'portal',
        isRegistrableDomain: false,
        roleLabel: 'Subdomain Tingkat 3',
        explanation:
          'Bagian paling kiri ini hanya label subdomain untuk membuat tampilan awal URL terlihat akrab bagi staf SaaS.',
      },
      {
        token: 'sigitadi.id',
        isRegistrableDomain: false,
        roleLabel: 'Subdomain Jebakan (Subdomain Trap)',
        explanation:
          'Hati-hati! Di posisi ini "sigitadi.id" BUKAN domain utama karena masih ada titik dan domain lain di sebelah kanannya sebelum "/".',
      },
      {
        token: 'auth-check.net',
        isRegistrableDomain: true,
        roleLabel: 'Domain Utama (Pemilik Sebenarnya)',
        explanation:
          'Tepat! "auth-check.net" berada persis sebelum "/login". Artinya server ini sepenuhnya dimiliki oleh pengelola auth-check.net, bukan PT. Sigit Adi Aman Siber.',
      },
      {
        token: '/login',
        isRegistrableDomain: false,
        roleLabel: 'Path Halaman',
        explanation:
          '"/login" hanya nama halaman pada server milik auth-check.net.',
      },
    ],
    anatomy: {
      protocol: 'https:// (sertifikat TLS milik domain penyerang)',
      subdomain: 'portal.sigitadi.id (jebakan subdomain)',
      registrableDomain: 'auth-check.net (domain eksternal bukan milik SaaS)',
      portAndPath: 'Port 443 | /login',
    },
    classifications: {
      safe: {
        matchesReality: false,
        statusLabel: 'Berisiko: Terjebak Subdomain & Gembok HTTPS',
        fieldImpact:
          'Jika staf menganggap aman karena melihat "sigitadi.id" dan ikon gembok HTTPS, username, password, dan kode OTP SaaSCore akan terkirim langsung ke server penyerang.',
        whyAndNextStep:
          'Ikon gembok HTTPS hanya menjamin jalur terenkripsi ke auth-check.net, bukan keaslian pemilik situs. Selalu baca domain paling kanan sebelum "/" pertama.',
      },
      risk: {
        matchesReality: true,
        statusLabel: 'Tepat: Palsu / Berisiko (Subdomain Spoofing)',
        fieldImpact:
          'Penyerang memanfaatkan kebiasaan membaca URL dari kiri ke kanan untuk mengelabui staf agar login ke portal tiruan.',
        whyAndNextStep:
          'Tutup tab tanpa mengisi apa pun, laporkan email ke tim keamanan SaaS, dan verifikasi pemberitahuan hanya melalui kanal resmi.',
      },
    },
  },
  {
    id: 'url-3',
    url: 'https://login-saascore.sigitadi-support.com/auth',
    context: 'Pesan chat mengaku dari helpdesk yang meminta aktivasi ulang token SaaSCore.',
    actualStatus: 'risk',
    tokens: [
      {
        token: 'login-saascore',
        isRegistrableDomain: false,
        roleLabel: 'Subdomain Pengecoh',
        explanation:
          'Penyerang menaruh nama aplikasi "saascore" di subdomain karena siapa pun bebas membuat nama subdomain pada domain yang mereka beli.',
      },
      {
        token: 'sigitadi-support.com',
        isRegistrableDomain: true,
        roleLabel: 'Domain Utama (Lookalike Domain)',
        explanation:
          'Tepat! Domain pemilik sebenarnya adalah "sigitadi-support.com" (ekstensi .com dengan tambahan "-support"), bukan sigitadi.id.',
      },
      {
        token: '.com',
        isRegistrableDomain: false,
        roleLabel: 'Top-Level Domain (TLD)',
        explanation:
          '".com" hanyalah ekstensi domain umum, bukan nama domain lengkap.',
      },
      {
        token: '/auth',
        isRegistrableDomain: false,
        roleLabel: 'Path Halaman',
        explanation:
          '"/auth" adalah jalur halaman di server milik sigitadi-support.com.',
      },
    ],
    anatomy: {
      protocol: 'https://',
      subdomain: 'login-saascore',
      registrableDomain: 'sigitadi-support.com (domain tiruan / lookalike domain)',
      portAndPath: 'Port 443 | /auth',
    },
    classifications: {
      safe: {
        matchesReality: false,
        statusLabel: 'Berisiko: Tertipu Kata "saascore" dan "-support"',
        fieldImpact:
          'Jika staf masuk melalui URL ini, penyerang memperoleh akses akun SaaSCore sekaligus menangkap kode OTP secara real-time (adversary-in-the-middle).',
        whyAndNextStep:
          'Domain resmi perusahaan adalah sigitadi.id, bukan sigitadi-support.com. Jangan percaya tautan hanya karena mengandung nama produk atau kata "support".',
      },
      risk: {
        matchesReality: true,
        statusLabel: 'Tepat: Palsu / Berisiko (Lookalike Domain)',
        fieldImpact:
          'Mendeteksi domain tiruan sejak awal mencegah pengambilalihan akun operasional BPR dan penyebaran phishing lanjutan.',
        whyAndNextStep:
          'Jangan klik atau masukkan kredensial. Konfirmasikan kebenaran permintaan bantuan langsung ke kanal helpdesk resmi SaaS.',
      },
    },
  },
  {
    id: 'url-4',
    url: 'https://vpn.sigitadi.id:8443/bpr',
    context: 'Tautan akses SSL VPN resmi untuk sesi maintenance malam aplikasi BPR mitra.',
    actualStatus: 'safe',
    tokens: [
      {
        token: 'vpn',
        isRegistrableDomain: false,
        roleLabel: 'Subdomain Layanan VPN',
        explanation:
          '"vpn" adalah subdomain resmi di bawah sigitadi.id untuk gerbang koneksi jarak jauh.',
      },
      {
        token: 'sigitadi.id',
        isRegistrableDomain: true,
        roleLabel: 'Domain Utama (Registrable Domain)',
        explanation:
          'Tepat! "sigitadi.id" berada tepat sebelum tanda titik dua port ":8443", membuktikan pemilik server ini adalah PT. Sigit Adi Aman Siber.',
      },
      {
        token: ':8443',
        isRegistrableDomain: false,
        roleLabel: 'Nomor Port Jaringan',
        explanation:
          'Port 8443 adalah port HTTPS alternatif yang umum dipakai perangkat SSL VPN agar tidak bentrok dengan port web 443.',
      },
      {
        token: '/bpr',
        isRegistrableDomain: false,
        roleLabel: 'Path Portal',
        explanation:
          '"/bpr" adalah rute grup portal VPN untuk akses lingkungan mitra BPR.',
      },
    ],
    anatomy: {
      protocol: 'https:// (terenkripsi TLS)',
      subdomain: 'vpn',
      registrableDomain: 'sigitadi.id (domain resmi SaaS)',
      portAndPath: 'Port 8443 (port SSL VPN resmi) | /bpr',
    },
    classifications: {
      safe: {
        matchesReality: true,
        statusLabel: 'Tepat: Resmi & Aman',
        fieldImpact:
          'Koneksi SSL VPN menuju infrastruktur resmi sigitadi.id berjalan terenkripsi dengan tepat selama sertifikat TLS valid tanpa peringatan browser.',
        whyAndNextStep:
          'Port :8443 tidak membuat URL berbahaya selama domain sebelum ":" tetap sigitadi.id dan protokolnya https://.',
      },
      risk: {
        matchesReality: false,
        statusLabel: 'Perbandingan: Port Non-Standar Tidak Otomatis Berbahaya',
        fieldImpact:
          'Menolak akses hanya karena melihat ":8443" dapat menghambat pekerjaan maintenance BPR padahal alamat tersebut sah.',
        whyAndNextStep:
          'Cara memastikannya adalah memisahkan port ":8443" dan membaca domain tepat di sebelah kirinya: sigitadi.id, dengan protokol https://.',
      },
    },
  },
  {
    id: 'url-5',
    url: 'http://portal.sigitadi.id/reset-password',
    context: 'Tautan reset password yang dibuka saat terhubung ke Wi-Fi publik hotel.',
    actualStatus: 'risk',
    tokens: [
      {
        token: 'http://',
        isRegistrableDomain: false,
        roleLabel: 'Protokol Tanpa Enkripsi (Plaintext)',
        explanation:
          'Ini titik risikonya! "http://" tanpa huruf "s" mengirim seluruh data form termasuk password baru dalam bentuk teks terbuka di jaringan.',
      },
      {
        token: 'portal',
        isRegistrableDomain: false,
        roleLabel: 'Subdomain',
        explanation:
          '"portal" merupakan subdomain di bawah sigitadi.id.',
      },
      {
        token: 'sigitadi.id',
        isRegistrableDomain: true,
        roleLabel: 'Domain Utama (Tetap Benar, Namun Jalurnya Tidak Aman)',
        explanation:
          'Benar, domain utamanya adalah "sigitadi.id". Namun memiliki domain benar tidak cukup jika protokolnya masih http:// tanpa TLS.',
      },
      {
        token: '/reset-password',
        isRegistrableDomain: false,
        roleLabel: 'Path Halaman Sensitif',
        explanation:
          'Halaman reset password menangani data paling sensitif dan wajib berjalan di atas https://.',
      },
    ],
    anatomy: {
      protocol: 'http:// (TIDAK terenkripsi / plaintext)',
      subdomain: 'portal',
      registrableDomain: 'sigitadi.id',
      portAndPath: 'Port 80 (tanpa TLS) | /reset-password',
    },
    classifications: {
      safe: {
        matchesReality: false,
        statusLabel: 'Berisiko: Domain Benar Tetapi Tanpa Enkripsi HTTPS',
        fieldImpact:
          'Di Wi-Fi publik hotel atau jaringan Evil Twin, penyerang yang berada di jaringan yang sama dapat menyadap password baru maupun menyisipkan halaman palsu (Man-in-the-Middle).',
        whyAndNextStep:
          'Jangan pernah mengirim password atau data BPR di halaman http://. Pastikan URL beralih ke https:// yang valid atau gunakan VPN resmi.',
      },
      risk: {
        matchesReality: true,
        statusLabel: 'Tepat: Berisiko (Protokol HTTP Plaintext)',
        fieldImpact:
          'Menolak memasukkan kredensial pada halaman http:// mencegah penyadapan lalu lintas di Wi-Fi publik.',
        whyAndNextStep:
          'Tutup halaman, aktifkan koneksi aman/tethering pribadi, akses manual lewat https://portal.sigitadi.id, dan laporkan ke IT jika layanan belum memaksa redirect HTTPS.',
      },
    },
  },
  {
    id: 'url-6',
    url: 'https://sigitad1.id/sso',
    context: 'Tautan dari pesan singkat bertuliskan "Login SSO SaaS untuk pembaruan data cuti".',
    actualStatus: 'risk',
    tokens: [
      {
        token: 'https://',
        isRegistrableDomain: false,
        roleLabel: 'Protokol HTTPS',
        explanation:
          'Protokol HTTPS hanya mengenkripsi koneksi ke server tujuan; penyerang juga bisa membuat sertifikat HTTPS gratis untuk domain palsu.',
      },
      {
        token: 'sigitad1.id',
        isRegistrableDomain: true,
        roleLabel: 'Domain Utama (Typosquatting / Homoglyph)',
        explanation:
          'Tepat! Domain utama di sini adalah "sigitad1.id" yang memakai angka satu "1" untuk meniru huruf "i" pada sigitadi.id.',
      },
      {
        token: '.id',
        isRegistrableDomain: false,
        roleLabel: 'Top-Level Domain (TLD)',
        explanation:
          '".id" adalah ekstensi negara Indonesia. Penyerang mendaftarkan domain .id yang ejaannya mirip dengan domain resmi perusahaan.',
      },
      {
        token: '/sso',
        isRegistrableDomain: false,
        roleLabel: 'Path Halaman',
        explanation:
          '"/sso" dipakai agar terlihat seperti portal Single Sign-On resmi perusahaan.',
      },
    ],
    anatomy: {
      protocol: 'https://',
      subdomain: '(tidak ada subdomain)',
      registrableDomain: 'sigitad1.id (typosquatting: angka "1" menggantikan huruf "i")',
      portAndPath: 'Port 443 | /sso',
    },
    classifications: {
      safe: {
        matchesReality: false,
        statusLabel: 'Berisiko: Terkecoh Kemiripan Visual Karakter ("1" vs "i")',
        fieldImpact:
          'Begitu login di halaman SSO palsu, penyerang memperoleh akses menyeluruh ke akun kerja yang terhubung dengan Single Sign-On PT. Sigit Adi Aman Siber.',
        whyAndNextStep:
          'Periksa ejaan karakter satu per satu. Gunakan bookmark atau password manager yang hanya mengisi kredensial otomatis pada domain sigitadi.id asli.',
      },
      risk: {
        matchesReality: true,
        statusLabel: 'Tepat: Palsu / Berisiko (Typosquatting)',
        fieldImpact:
          'Kewaspadaan terhadap substitusi karakter mirip (homoglyph) melindungi akun SSO perusahaan dari pencurian kredensial massal.',
        whyAndNextStep:
          'Jangan berinteraksi dengan tautan tersebut dan segera laporkan domain sigitad1.id ke tim keamanan agar dapat diblokir di DNS/proxy kantor.',
      },
    },
  },
];

interface Lab07SessionState {
  currentIdx: number;
  selectedTokenByUrl: Record<string, string | null>;
  selectedClassByUrl: Record<string, UrlClassification | null>;
  exploredUrls: Record<string, boolean>;
  manualDone: boolean;
}

const INITIAL_LAB07_STATE: Lab07SessionState = {
  currentIdx: 0,
  selectedTokenByUrl: {},
  selectedClassByUrl: {},
  exploredUrls: {},
  manualDone: false,
};

export function Lab07UrlInspector({
  moduleId,
  instructorMode = false,
  onMarkExplored,
}: LabProps) {
  const { resetModuleExploration } = useProgress();
  const [sessionState, setSessionState, resetSessionState] =
    useLabSessionState<Lab07SessionState>(moduleId, INITIAL_LAB07_STATE);
  const {
    currentIdx,
    selectedTokenByUrl,
    selectedClassByUrl,
    exploredUrls,
    manualDone,
  } = sessionState;
  const [showAllConditions, setShowAllConditions] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!instructorMode) {
      setShowAllConditions(false);
    }
  }, [instructorMode]);

  const totalUrls = URL_CHALLENGES.length;
  const currentChallenge = URL_CHALLENGES[currentIdx];

  const rawExploredCount = URL_CHALLENGES.filter((item) => exploredUrls[item.id]).length;
  const { exploredCount, isExplored } = computeLabProgress(
    rawExploredCount,
    totalUrls,
    manualDone,
  );

  const setCurrentIdx = (updater: number | ((prev: number) => number)) => {
    setSessionState((prev) => ({
      ...prev,
      currentIdx:
        typeof updater === 'function' ? updater(prev.currentIdx) : updater,
    }));
  };

  const handleSelectToken = (urlId: string, token: string) => {
    const nextExplored = exploredUrls[urlId]
      ? exploredUrls
      : { ...exploredUrls, [urlId]: true };
    setSessionState((prev) => ({
      ...prev,
      selectedTokenByUrl: { ...prev.selectedTokenByUrl, [urlId]: token },
      exploredUrls: nextExplored,
    }));
    if (!exploredUrls[urlId]) {
      const nextCount = URL_CHALLENGES.filter((item) => nextExplored[item.id]).length;
      onMarkExplored(manualDone ? totalUrls : nextCount, totalUrls);
    }
  };

  const handleSelectClassification = (urlId: string, classification: UrlClassification) => {
    const nextExplored = exploredUrls[urlId]
      ? exploredUrls
      : { ...exploredUrls, [urlId]: true };
    setSessionState((prev) => ({
      ...prev,
      selectedClassByUrl: { ...prev.selectedClassByUrl, [urlId]: classification },
      exploredUrls: nextExplored,
    }));
    if (!exploredUrls[urlId]) {
      const nextCount = URL_CHALLENGES.filter((item) => nextExplored[item.id]).length;
      onMarkExplored(manualDone ? totalUrls : nextCount, totalUrls);
    }
  };

  const handleToggleAllConditions = () => {
    const nextShow = !showAllConditions;
    setShowAllConditions(nextShow);
    if (nextShow) {
      const allExplored: Record<string, boolean> = {};
      for (const item of URL_CHALLENGES) {
        allExplored[item.id] = true;
      }
      setSessionState((prev) => ({ ...prev, exploredUrls: allExplored }));
      onMarkExplored(totalUrls, totalUrls);
    }
  };

  const handleMarkDone = () => {
    const allExplored: Record<string, boolean> = {};
    for (const item of URL_CHALLENGES) {
      allExplored[item.id] = true;
    }
    setSessionState((prev) => ({
      ...prev,
      exploredUrls: allExplored,
      manualDone: true,
    }));
    onMarkExplored(totalUrls, totalUrls);
  };

  const handleReset = () => {
    resetSessionState();
    setShowAllConditions(false);
    resetModuleExploration(moduleId);
  };

  const activeTokenName = currentChallenge ? selectedTokenByUrl[currentChallenge.id] : null;
  const activeTokenInfo = currentChallenge?.tokens.find((t) => t.token === activeTokenName);
  const activeClassification = currentChallenge
    ? selectedClassByUrl[currentChallenge.id]
    : null;
  const activeClassFeedback =
    currentChallenge && activeClassification
      ? currentChallenge.classifications[activeClassification]
      : null;

  return (
    <LabShell
      moduleId={moduleId}
      session="siang"
      title="Inspeksi URL & Struktur Domain"
      instructions="Eksplorasi 6 URL portal login PT. Sigit Adi Aman Siber (SaaS) berikut secara bebas. Klik bagian URL mana pun untuk memahami fungsinya, lalu coba klasifikasi Resmi & Aman maupun Palsu / Berisiko untuk melihat dampaknya."
      exploredCount={exploredCount}
      totalCount={totalUrls}
      isExplored={isExplored}
      onMarkDone={handleMarkDone}
      onReset={handleReset}
    >
      <div className="space-y-5">
        <Callout
          title="Aturan Cepat Membaca Struktur URL"
          badge="PANDUAN INSPEKSI"
          variant="navy"
          icon={<Globe className="h-5 w-5 text-[#0B1F3A] dark:text-sky-400" aria-hidden="true" />}
        >
          <p>
            <RichTermText text="Baca host tepat sebelum tanda garis miring tunggal" />{' '}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-xs font-semibold dark:bg-slate-800">
              /
            </code>{' '}
            <RichTermText text="atau tanda titik dua port" />{' '}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-xs font-semibold dark:bg-slate-800">
              :
            </code>{' '}
            <RichTermText text="pertama. Domain pemilik sebenarnya berada paling kanan sebelum path (contoh: pada" />{' '}
            <code className="break-all rounded bg-slate-200 px-1.5 py-0.5 font-mono text-xs font-semibold dark:bg-slate-800">
              portal.sigitadi.id.auth-check.net/login
            </code>
            <RichTermText text=", domain pemilik aslinya adalah" />{' '}
            <strong className="font-mono">auth-check.net</strong>).{' '}
            <RichTermText text="Pastikan juga protokolnya" />{' '}
            <strong className="font-mono">https://</strong>.
          </p>
        </Callout>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pilih URL untuk diinspeksi">
            {URL_CHALLENGES.map((item, idx) => {
              const isCurrent = idx === currentIdx;
              const isDone = Boolean(exploredUrls[item.id]);
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`url-tab-${idx}`}
                  aria-selected={isCurrent}
                  aria-controls="url-inspector-panel"
                  tabIndex={isCurrent ? 0 : -1}
                  onClick={() => setCurrentIdx(idx)}
                  onKeyDown={(e) => {
                    let targetIdx: number | null = null;
                    if (e.key === 'ArrowRight') {
                      targetIdx = (idx + 1) % URL_CHALLENGES.length;
                    } else if (e.key === 'ArrowLeft') {
                      targetIdx = (idx - 1 + URL_CHALLENGES.length) % URL_CHALLENGES.length;
                    } else if (e.key === 'Home') {
                      targetIdx = 0;
                    } else if (e.key === 'End') {
                      targetIdx = URL_CHALLENGES.length - 1;
                    }
                    if (targetIdx === null) return;
                    e.preventDefault();
                    setCurrentIdx(targetIdx);
                    tabRefs.current[targetIdx]?.focus();
                  }}
                  className={`min-h-[44px] rounded-md border px-3 py-1.5 font-mono text-xs font-semibold transition-colors ${isCurrent
                      ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white dark:border-emerald-400 dark:bg-emerald-500 dark:text-slate-950'
                      : isDone
                        ? 'border-emerald-600/40 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200'
                        : 'border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                >
                  URL {idx + 1}
                </button>
              );
            })}
          </div>

          {instructorMode && (
            <button
              type="button"
              onClick={handleToggleAllConditions}
              aria-pressed={showAllConditions}
              className={`inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${showAllConditions
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

        {!showAllConditions && currentChallenge && (
          <div
            id="url-inspector-panel"
            role="tabpanel"
            aria-labelledby={`url-tab-${currentIdx}`}
            className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="rounded bg-[#0B1F3A] px-2.5 py-1 font-mono text-xs font-semibold text-white dark:bg-slate-800 dark:text-emerald-300">
                URL {currentIdx + 1} / {totalUrls}
              </span>
              <span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-400">
                {exploredUrls[currentChallenge.id] ? 'Sudah Dieksplorasi' : 'Belum Dieksplorasi'}
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-slate-100">Konteks pesan:</strong>{' '}
              <RichTermText text={currentChallenge.context} />
            </p>

            <div className="mt-3 rounded-md border border-slate-300 bg-slate-950 p-4 dark:border-slate-700">
              <div className="mb-1 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                Target URL Inspeksi
              </div>
              <div className="break-all font-mono text-sm font-semibold text-emerald-300 sm:text-base">
                {currentChallenge.url}
              </div>
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  <RichTermText text="a) Klik bagian URL di bawah untuk memeriksa perannya dan menemukan domain utama:" />
                </div>
                <div
                  className="mt-2.5 flex flex-wrap gap-2.5"
                  role="group"
                  aria-label="Bagian struktur URL"
                >
                  {currentChallenge.tokens.map((item) => {
                    const isSelected = activeTokenName === item.token;
                    return (
                      <button
                        key={item.token}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => handleSelectToken(currentChallenge.id, item.token)}
                        className={`min-h-[44px] rounded-md border px-3.5 py-2 font-mono text-sm font-semibold transition-colors ${isSelected
                            ? item.isRegistrableDomain
                              ? 'border-emerald-700 bg-emerald-700 text-white dark:border-emerald-400 dark:bg-emerald-500 dark:text-slate-950'
                              : 'border-[#0B1F3A] bg-[#0B1F3A] text-white dark:border-sky-400 dark:bg-sky-400 dark:text-slate-950'
                            : 'border-slate-300 bg-slate-50 text-slate-900 hover:border-[#0B1F3A] hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-emerald-400'
                          }`}
                      >
                        {item.token}
                      </button>
                    );
                  })}
                </div>

                {activeTokenInfo && (
                  <div className="mt-3">
                    <FeedbackBox
                      variant={activeTokenInfo.isRegistrableDomain ? 'safe' : 'info'}
                      label={activeTokenInfo.roleLabel}
                      title={activeTokenInfo.token}
                    >
                      <p>
                        <RichTermText text={activeTokenInfo.explanation} />
                      </p>
                    </FeedbackBox>
                  </div>
                )}
              </div>

              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  <RichTermText text="b) Uji klasifikasi URL ini untuk membandingkan kondisi aman dan berisiko:" />
                </div>
                <div
                  className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2"
                  role="group"
                  aria-label="Uji klasifikasi keamanan URL"
                >
                  <button
                    type="button"
                    aria-pressed={activeClassification === 'safe'}
                    onClick={() => handleSelectClassification(currentChallenge.id, 'safe')}
                    className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors ${activeClassification === 'safe'
                        ? 'border-[#047857] bg-[#047857] text-white dark:border-[#10B981] dark:bg-[#10B981] dark:text-slate-950'
                        : 'border-slate-300 bg-slate-50 text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                      }`}
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Resmi &amp; Aman</span>
                  </button>

                  <button
                    type="button"
                    aria-pressed={activeClassification === 'risk'}
                    onClick={() => handleSelectClassification(currentChallenge.id, 'risk')}
                    className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors ${activeClassification === 'risk'
                        ? 'border-rose-700 bg-rose-700 text-white dark:border-rose-500 dark:bg-rose-500 dark:text-slate-950'
                        : 'border-slate-300 bg-slate-50 text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                      }`}
                  >
                    <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Palsu / Berisiko</span>
                  </button>
                </div>

                {activeClassFeedback && (
                  <div className="mt-3">
                    <FeedbackBox
                      variant={
                        currentChallenge.actualStatus === 'safe' && activeClassification === 'safe'
                          ? 'safe'
                          : currentChallenge.actualStatus === 'risk' &&
                            activeClassification === 'risk'
                            ? 'safe'
                            : 'risk'
                      }
                      label={activeClassFeedback.statusLabel}
                      title={`Anatomi URL: ${currentChallenge.actualStatus === 'safe' ? 'Resmi & Aman' : 'Palsu / Berisiko'}`}
                    >
                      <dl className="mt-1 grid grid-cols-1 gap-1.5 rounded border border-current/20 bg-white/60 p-3 font-mono text-xs dark:bg-slate-950/50">
                        <div>
                          <dt className="inline font-bold">Protokol: </dt>
                          <dd className="inline break-words">
                            {currentChallenge.anatomy.protocol}
                          </dd>
                        </div>
                        <div>
                          <dt className="inline font-bold">Subdomain: </dt>
                          <dd className="inline break-words">
                            {currentChallenge.anatomy.subdomain}
                          </dd>
                        </div>
                        <div>
                          <dt className="inline font-bold">Domain Utama: </dt>
                          <dd className="inline break-words">
                            {currentChallenge.anatomy.registrableDomain}
                          </dd>
                        </div>
                        <div>
                          <dt className="inline font-bold">Port &amp; Path: </dt>
                          <dd className="inline break-words">
                            {currentChallenge.anatomy.portAndPath}
                          </dd>
                        </div>
                      </dl>
                      <p className="mt-2.5">
                        <strong>Dampak di Lapangan:</strong>{' '}
                        <RichTermText text={activeClassFeedback.fieldImpact} />
                      </p>
                      <p className="mt-1.5">
                        <strong>Mengapa &amp; Langkah Tepat:</strong>{' '}
                        <RichTermText text={activeClassFeedback.whyAndNextStep} />
                      </p>
                    </FeedbackBox>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>URL Sebelumnya</span>
              </button>

              <button
                type="button"
                disabled={currentIdx === totalUrls - 1}
                onClick={() => setCurrentIdx((prev) => Math.min(totalUrls - 1, prev + 1))}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#0B1F3A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
              >
                <span>URL Berikutnya</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {showAllConditions && (
          <div className="space-y-4">
            {URL_CHALLENGES.map((challenge, idx) => (
              <section
                key={challenge.id}
                className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded bg-[#0B1F3A] px-2.5 py-1 font-mono text-xs font-semibold text-white dark:bg-slate-800 dark:text-emerald-300">
                    URL {idx + 1} / {totalUrls}
                  </span>
                  <span
                    className={`rounded px-2.5 py-1 font-mono text-xs font-semibold ${challenge.actualStatus === 'safe'
                        ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-900 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}
                  >
                    {challenge.actualStatus === 'safe' ? 'Resmi & Aman' : 'Palsu / Berisiko'}
                  </span>
                </div>

                <div className="break-all rounded-md border border-slate-300 bg-slate-950 p-3 font-mono text-sm font-semibold text-emerald-300 dark:border-slate-700">
                  {challenge.url}
                </div>

                <dl className="mt-3 grid grid-cols-1 gap-1.5 rounded border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                  <div>
                    <dt className="inline font-bold">Protokol: </dt>
                    <dd className="inline break-words">{challenge.anatomy.protocol}</dd>
                  </div>
                  <div>
                    <dt className="inline font-bold">Subdomain: </dt>
                    <dd className="inline break-words">{challenge.anatomy.subdomain}</dd>
                  </div>
                  <div>
                    <dt className="inline font-bold">Domain Utama: </dt>
                    <dd className="inline break-words">{challenge.anatomy.registrableDomain}</dd>
                  </div>
                  <div>
                    <dt className="inline font-bold">Port &amp; Path: </dt>
                    <dd className="inline break-words">{challenge.anatomy.portAndPath}</dd>
                  </div>
                </dl>

                <div className="mt-3 space-y-1.5 rounded border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                  <div className="font-mono text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                    Rincian Bagian URL
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {challenge.tokens.map((tok) => (
                      <li key={tok.token} className="flex flex-wrap items-baseline gap-1.5">
                        <code
                          className={`rounded px-1.5 py-0.5 font-mono font-semibold ${
                            tok.isRegistrableDomain
                              ? 'bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950'
                              : 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                          }`}
                        >
                          {tok.token}
                        </code>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          ({tok.roleLabel}):
                        </span>
                        <span>
                          <RichTermText text={tok.explanation} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 space-y-2.5">
                  <FeedbackBox
                    variant={challenge.actualStatus === 'safe' ? 'safe' : 'info'}
                    label={challenge.classifications.safe.statusLabel}
                  >
                    <p>
                      <strong>Dampak di Lapangan:</strong>{' '}
                      <RichTermText text={challenge.classifications.safe.fieldImpact} />
                    </p>
                    <p className="mt-1">
                      <strong>Mengapa &amp; Langkah Tepat:</strong>{' '}
                      <RichTermText text={challenge.classifications.safe.whyAndNextStep} />
                    </p>
                  </FeedbackBox>

                  <FeedbackBox
                    variant={challenge.actualStatus === 'risk' ? 'risk' : 'info'}
                    label={challenge.classifications.risk.statusLabel}
                  >
                    <p>
                      <strong>Dampak di Lapangan:</strong>{' '}
                      <RichTermText text={challenge.classifications.risk.fieldImpact} />
                    </p>
                    <p className="mt-1">
                      <strong>Mengapa &amp; Langkah Tepat:</strong>{' '}
                      <RichTermText text={challenge.classifications.risk.whyAndNextStep} />
                    </p>
                  </FeedbackBox>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </LabShell>
  );
}

export default Lab07UrlInspector;
