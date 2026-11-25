import { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  Link2,
  Mail,
  MessageSquare,
  Paperclip,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import type { LabProps } from '../../types/training';
import { computeLabProgress, useLabSessionState } from '../../lib/useLabExploration';
import { useProgress } from '../../state/ProgressContext';
import { FeedbackBox, LabShell, RichTermText } from '../ui';

type ChannelType = 'webmail' | 'whatsapp';
type ActionKind = 'process' | 'report';
type ChannelFilter = 'all' | ChannelType;

interface ActionOutcome {
  isSafe: boolean;
  impact: string;
  rationale: string;
}

interface SimMessage {
  id: number;
  channel: ChannelType;
  channelLabel: string;
  senderName: string;
  senderAddress: string;
  timestamp: string;
  subject: string;
  bodyParagraphs: string[];
  link?: {
    displayText: string;
    actualUrl: string;
  };
  attachment?: {
    filename: string;
    sizeLabel: string;
  };
  truthCategory: 'phish' | 'safe';
  outcomes: Record<ActionKind, ActionOutcome>;
}

const MESSAGES: SimMessage[] = [
  {
    id: 1,
    channel: 'webmail',
    channelLabel: 'Webmail SaaS',
    senderName: 'IT Helpdesk Keamanan SaaS',
    senderAddress: 'admin-security@sigitadi-support-update.com',
    timestamp: '08.42 WIB',
    subject: '[URGENT] Masa Berlaku Akun VPN Support Habis Pukul 17.00 WIB',
    bodyParagraphs: [
      'Kepada Staf Support SaaSCore,',
      'Sistem mendeteksi token akses akun VPN Anda akan kedaluwarsa hari ini pukul 17.00 WIB. Jika tidak segera diperbarui, seluruh akses pemeliharaan ke server BPR klien akan diblokir otomatis.',
      'Silakan masuk menggunakan username dan kata sandi VPN Anda melalui tautan pembaruan darurat di bawah ini.',
    ],
    link: {
      displayText: 'Perbarui Kredensial VPN SaaS Sekarang',
      actualUrl: 'https://sigitadi-support-update.com/vpn-renew/login',
    },
    truthCategory: 'phish',
    outcomes: {
      process: {
        isSafe: false,
        impact:
          'Username, kata sandi VPN, dan token sesi Anda langsung terkirim ke server penyerang di domain sigitadi-support-update.com.',
        rationale:
          'Kondisi berisiko tinggi! Ini email phishing pencurian kredensial. Domain pengirim dan URL memakai nama tiruan sigitadi-support-update.com, bukan domain resmi sigitadi.id, disertai tekanan tenggat waktu pukul 17.00 WIB.',
      },
      report: {
        isSafe: true,
        impact:
          'Domain palsu segera diblokir di gateway email dan rekan tim lain diperingatkan agar tidak ikut tertipu.',
        rationale:
          'Langkah tepat! Memeriksa alamat domain utama sebelum mengeklik mencegah kebocoran akses VPN ke infrastruktur BPR mitra.',
      },
    },
  },
  {
    id: 2,
    channel: 'webmail',
    channelLabel: 'Webmail SaaS',
    senderName: 'Tim Infrastruktur Internal SaaS',
    senderAddress: 'infra@sigitadi.id',
    timestamp: '09.15 WIB',
    subject: 'Jadwal Pemeliharaan Portal Tiket & Repositori Patch SaaSCore',
    bodyParagraphs: [
      'Selamat pagi rekan tim PT. Sigit Adi Aman Siber,',
      'Kami informasikan jendela pemeliharaan rutin untuk portal tiket internal dan repositori build SaaSCore pada Sabtu pukul 22.00 sampai 23.30 WIB. Tidak ada permintaan reset kata sandi maupun pengisian kode OTP dalam agenda ini.',
      'Jadwal lengkap tersedia pada lampiran PDF dan halaman status resmi internal di bawah ini.',
    ],
    link: {
      displayText: 'Buka Halaman Status Pemeliharaan Resmi',
      actualUrl: 'https://support.sigitadi.id/status/maintenance-2026',
    },
    attachment: {
      filename: 'Jadwal_Maintenance_Q4.pdf',
      sizeLabel: '184 KB',
    },
    truthCategory: 'safe',
    outcomes: {
      process: {
        isSafe: true,
        impact:
          'Tim piket mencatat jadwal maintenance dengan benar tanpa terhambat alarm palsu dan tetap dapat memantau status di portal resmi.',
        rationale:
          'Langkah tepat! Pengirim berasal dari alamat resmi @sigitadi.id, pratinjau tautan mengarah ke subdomain resmi support.sigitadi.id, lampiran berformat .pdf wajar, dan tidak ada permintaan kredensial.',
      },
      report: {
        isSafe: true,
        impact:
          'Tim IT mengonfirmasi pesan ini sah; sikap waspada tetap positif meski pengumuman internal seperti ini aman ditindaklanjuti setelah verifikasi domain.',
        rationale:
          'Melaporkan saat ragu tidak pernah salah, namun Anda bisa mengenali keasliannya secara mandiri dari domain utama sigitadi.id dan tidak adanya unsur desakan maupun permintaan OTP.',
      },
    },
  },
  {
    id: 3,
    channel: 'webmail',
    channelLabel: 'Webmail SaaS',
    senderName: 'Divisi TI BPR Sejahtera',
    senderAddress: 'it-support@bpr-sejahtera-id.com',
    timestamp: '10.08 WIB',
    subject: 'Tolong Jalankan Patch Koreksi EOD SaaSCore Ini Segera',
    bodyParagraphs: [
      'Halo tim support SaaS,',
      'Proses tutup buku EOD di tempat kami gagal sejak pagi. Vendor sebelumnya mengirimkan berkas perbaikan cepat yang katanya harus langsung dijalankan dari laptop support yang tersambung ke server kami.',
      'Mohon unduh dan jalankan lampiran terlampir atau ambil salinannya lewat portal kami di bawah ini tanpa menunggu nomor tiket.',
    ],
    link: {
      displayText: 'Portal Unduhan Patch BPR Sejahtera',
      actualUrl: 'https://bpr-sejahtera-id.com/portal/download-patch',
    },
    attachment: {
      filename: 'Patch_SaaSCore_Urgent.pdf.exe',
      sizeLabel: '2.4 MB',
    },
    truthCategory: 'phish',
    outcomes: {
      process: {
        isSafe: false,
        impact:
          'Berkas eksekusi berbahaya (.exe) langsung berjalan di laptop kerja saat VPN tersambung, membuka jalan ransomware atau pencurian sesi menuju server BPR.',
        rationale:
          'Sangat berisiko! Perhatikan ekstensi ganda Patch_SaaSCore_Urgent.pdf.exe yang menyamar sebagai dokumen PDF, domain luar bpr-sejahtera-id.com yang tidak terverifikasi, serta desakan pemasangan patch di luar repositori resmi sigitadi.id.',
      },
      report: {
        isSafe: true,
        impact:
          'Lampiran malware tidak pernah dieksekusi; tim IT menyelidiki apakah email berasal dari akun BPR yang diretas atau domain tiruan.',
        rationale:
          'Langkah tepat! Mengenali ekstensi ganda .pdf.exe dan menolak eksekusi patch tanpa tiket serta checksum resmi melindungi seluruh lingkungan klien.',
      },
    },
  },
  {
    id: 4,
    channel: 'whatsapp',
    channelLabel: 'WhatsApp Kerja',
    senderName: 'Pak Hendra (Direktur Operasional SaaS)',
    senderAddress: '+62 813-9012-7741 (Nomor Baru)',
    timestamp: '11.20 WIB',
    subject: 'Permintaan Darurat Kredensial VPN & Kode OTP',
    bodyParagraphs: [
      'Halo, ini saya Hendra pakai nomor cadangan karena ponsel utama sedang diisi daya. Saya sedang rapat mendadak bersama tim auditor BPR Mitra Sejahtera (Ilustrasi).',
      'Tolong kirimkan konfigurasi login VPN BPR tersebut dan kode OTP 6 digit yang barusan masuk ke aplikasi autentikator kamu sekarang juga. Jangan dibahas di grup kantor dulu supaya tidak gaduh.',
    ],
    truthCategory: 'phish',
    outcomes: {
      process: {
        isSafe: false,
        impact:
          'Penyerang yang menyamar sebagai pimpinan memperoleh akses VPN penuh dan kode OTP 6 digit untuk mengambil alih akun Anda saat itu juga.',
        rationale:
          'Sangat berisiko! Ini teknik Social Engineering (Pretexting / Executive Fraud): memakai nomor baru, menekan lewat skenario auditor, melarang konfirmasi di grup resmi, serta meminta kredensial dan OTP.',
      },
      report: {
        isSafe: true,
        impact:
          'Nomor penipu segera diblokir, tim diperingatkan melalui kanal resmi, dan tidak ada kredensial maupun OTP yang berpindah tangan.',
        rationale:
          'Langkah tepat! Kode OTP, passphrase, dan profil VPN tidak boleh diberikan kepada siapa pun lewat chat, bahkan jika pengirim mengaku sebagai atasan.',
      },
    },
  },
  {
    id: 5,
    channel: 'whatsapp',
    channelLabel: 'WhatsApp Kerja',
    senderName: 'Raka Pratama (Support L2 SaaS)',
    senderAddress: '+62 812-3300-4410 (Kontak Terverifikasi)',
    timestamp: '13.05 WIB',
    subject: 'Pembaruan Catatan Tiket #SAAS-4821 BPR Harmoni',
    bodyParagraphs: [
      'Halo tim piket siang, catatan uji coba staging untuk tiket #SAAS-4821 milik BPR Harmoni Mandiri (Ilustrasi) sudah saya perbarui di portal support.',
      'Silakan tinjau ringkasan pengecekan di tautan tiket resmi internal di bawah ini sebelum sesi pemeliharaan sore dimulai.',
    ],
    link: {
      displayText: 'Lihat Tiket Resmi #SAAS-4821',
      actualUrl: 'https://support.sigitadi.id/tickets/SAAS-4821',
    },
    truthCategory: 'safe',
    outcomes: {
      process: {
        isSafe: true,
        impact:
          'Koordinasi serah terima tiket antar shift berjalan lancar langsung melalui portal tiket resmi tanpa kebocoran data sensitif di ruang chat.',
        rationale:
          'Langkah tepat! Pengirim adalah kontak internal terverifikasi, merujuk pada nomor tiket resmi, tidak meminta OTP atau data nasabah di chat, dan tautan mengarah benar ke support.sigitadi.id.',
      },
      report: {
        isSafe: true,
        impact:
          'Tim memastikan pesan sah; kebiasaan selalu memeriksa URL di bilah pratinjau sebelum mengeklik tautan tetap patut dipertahankan.',
        rationale:
          'Anda tetap aman saat memverifikasi ulang, dan di pesan ini seluruh indikator keaslian (kontak dikenal, nomor tiket valid, domain support.sigitadi.id) terpenuhi.',
      },
    },
  },
];

interface MessageExplorationState {
  activeAction?: ActionKind;
  inspectedActions: ActionKind[];
}

interface Lab03SessionState {
  filter: ChannelFilter;
  activeMessageId: number;
  exploredByMsg: Record<number, MessageExplorationState>;
  manualDone: boolean;
}

const INITIAL_LAB03_STATE: Lab03SessionState = {
  filter: 'all',
  activeMessageId: 1,
  exploredByMsg: {},
  manualDone: false,
};

export function Lab03PhishingSim({
  moduleId,
  instructorMode = false,
  onMarkExplored,
}: LabProps) {
  const { resetModuleExploration } = useProgress();
  const [sessionState, setSessionState, resetSessionState] =
    useLabSessionState<Lab03SessionState>(moduleId, INITIAL_LAB03_STATE);
  const { filter, activeMessageId, exploredByMsg, manualDone } = sessionState;
  const [inspectedUrl, setInspectedUrl] = useState<string | null>(null);
  const [showAllExplanations, setShowAllExplanations] = useState(false);
  const tabRefs = useRef<Record<ChannelFilter, HTMLButtonElement | null>>({
    all: null,
    webmail: null,
    whatsapp: null,
  });

  useEffect(() => {
    if (!instructorMode) {
      setShowAllExplanations(false);
    }
  }, [instructorMode]);

  const visibleMessages = MESSAGES.filter((m) =>
    filter === 'all' ? true : m.channel === filter,
  );
  const activeMessage =
    MESSAGES.find((m) => m.id === activeMessageId) ?? MESSAGES[0];

  const rawExploredCount = MESSAGES.filter(
    (m) => (exploredByMsg[m.id]?.inspectedActions.length ?? 0) > 0,
  ).length;
  const { exploredCount, isExplored } = computeLabProgress(
    rawExploredCount,
    MESSAGES.length,
    manualDone,
  );

  const handleSelectMessage = (id: number) => {
    setSessionState((prev) => ({ ...prev, activeMessageId: id }));
    setInspectedUrl(null);
  };

  const handleChangeFilter = (nextFilter: ChannelFilter) => {
    const firstInFilter = MESSAGES.find((m) =>
      nextFilter === 'all' ? true : m.channel === nextFilter,
    );
    const shouldSwitch =
      Boolean(firstInFilter) &&
      activeMessage?.channel !== nextFilter &&
      nextFilter !== 'all';

    setSessionState((prev) => ({
      ...prev,
      filter: nextFilter,
      activeMessageId:
        shouldSwitch && firstInFilter ? firstInFilter.id : prev.activeMessageId,
    }));
    if (shouldSwitch) {
      setInspectedUrl(null);
    }
  };

  const handleExploreAction = (messageId: number, action: ActionKind) => {
    const current = exploredByMsg[messageId] ?? { inspectedActions: [] };
    const nextActions = current.inspectedActions.includes(action)
      ? current.inspectedActions
      : [...current.inspectedActions, action];

    const nextMap: Record<number, MessageExplorationState> = {
      ...exploredByMsg,
      [messageId]: {
        activeAction: action,
        inspectedActions: nextActions,
      },
    };
    setSessionState((prev) => ({ ...prev, exploredByMsg: nextMap }));

    const nextCount = MESSAGES.filter(
      (m) => (nextMap[m.id]?.inspectedActions.length ?? 0) > 0,
    ).length;
    onMarkExplored(manualDone ? MESSAGES.length : nextCount, MESSAGES.length);
  };

  const handleToggleAll = () => {
    const nextShow = !showAllExplanations;
    setShowAllExplanations(nextShow);
    if (nextShow) {
      const allMap: Record<number, MessageExplorationState> = {};
      for (const msg of MESSAGES) {
        allMap[msg.id] = {
          activeAction: exploredByMsg[msg.id]?.activeAction ?? 'report',
          inspectedActions: ['process', 'report'],
        };
      }
      setSessionState((prev) => ({ ...prev, exploredByMsg: allMap }));
      onMarkExplored(MESSAGES.length, MESSAGES.length);
    }
  };

  const handleMarkDone = () => {
    setSessionState((prev) => ({ ...prev, manualDone: true }));
    onMarkExplored(MESSAGES.length, MESSAGES.length);
  };

  const handleReset = () => {
    resetSessionState();
    setInspectedUrl(null);
    setShowAllExplanations(false);
    resetModuleExploration(moduleId);
  };

  if (!activeMessage) return null;

  const activeMsgState = exploredByMsg[activeMessage.id];
  const activeAction = activeMsgState?.activeAction;
  const activeOutcome = activeAction
    ? activeMessage.outcomes[activeAction]
    : undefined;

  return (
    <LabShell
      moduleId={moduleId}
      session="pagi"
      title="Simulator Kotak Masuk & WhatsApp Jebakan (Simulasi Eksplorasi)"
      instructions="Periksa 5 pesan simulasi Webmail dan WhatsApp di bawah ini. Arahkan kursor, fokuskan via Tab, atau ketuk tautan untuk menginspeksi URL tujuan asli di bilah pratinjau, cermati ekstensi lampiran, lalu uji kedua tindakan secara bebas untuk mengamati dampaknya."
      exploredCount={exploredCount}
      totalCount={MESSAGES.length}
      isExplored={isExplored}
      onMarkDone={handleMarkDone}
      onReset={handleReset}
    >
      <div className="space-y-4">
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
                    ? 'Uji bebas skenario "Jika Diproses" maupun "Jika Dilaporkan ke Tim IT" pada setiap pesan, atau buka seluruh analisis pesan untuk perbandingan kelas.'
                    : 'Uji bebas skenario "Jika Diproses" maupun "Jika Dilaporkan ke Tim IT" pada setiap pesan untuk membandingkan ciri pesan sah dan jebakan.'
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

        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter saluran pesan"
        >
          {(
            [
              { id: 'all', label: 'Semua Pesan (5)' },
              { id: 'webmail', label: 'Webmail SaaS (3)' },
              { id: 'whatsapp', label: 'WhatsApp Kerja (2)' },
            ] as const
          ).map((tab, idx, allTabs) => {
            const isSelected = filter === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                type="button"
                role="tab"
                id={`phishing-tab-${tab.id}`}
                aria-selected={isSelected}
                aria-controls="phishing-tab-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleChangeFilter(tab.id)}
                onKeyDown={(e) => {
                  let targetIdx: number | null = null;
                  if (e.key === 'ArrowRight') {
                    targetIdx = (idx + 1) % allTabs.length;
                  } else if (e.key === 'ArrowLeft') {
                    targetIdx = (idx - 1 + allTabs.length) % allTabs.length;
                  } else if (e.key === 'Home') {
                    targetIdx = 0;
                  } else if (e.key === 'End') {
                    targetIdx = allTabs.length - 1;
                  }
                  if (targetIdx === null) return;
                  e.preventDefault();
                  const nextTab = allTabs[targetIdx];
                  if (!nextTab) return;
                  handleChangeFilter(nextTab.id);
                  tabRefs.current[nextTab.id]?.focus();
                }}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isSelected
                    ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white dark:border-emerald-400 dark:bg-emerald-500 dark:text-slate-950'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {tab.id === 'webmail' && <Mail className="h-4 w-4" aria-hidden="true" />}
                {tab.id === 'whatsapp' && (
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div
          id="phishing-tab-panel"
          role="tabpanel"
          aria-labelledby={`phishing-tab-${filter}`}
          className="grid grid-cols-1 gap-4 lg:grid-cols-12"
        >
          <div
            className="space-y-2 lg:col-span-5"
            role="list"
            aria-label="Daftar pesan simulasi"
          >
            {visibleMessages.map((msg) => {
              const msgState = exploredByMsg[msg.id];
              const inspectedCount = msgState?.inspectedActions.length ?? 0;
              const isSelected = msg.id === activeMessage.id;

              return (
                <div key={msg.id} role="listitem">
                  <button
                    type="button"
                    onClick={() => handleSelectMessage(msg.id)}
                    aria-current={isSelected ? 'true' : undefined}
                    className={`flex min-h-[44px] w-full flex-col gap-1.5 rounded-lg border p-3.5 text-left transition-colors ${
                      isSelected
                        ? 'border-[#047857] bg-emerald-50/70 ring-1 ring-[#047857] dark:border-emerald-400 dark:bg-emerald-950/40 dark:ring-emerald-400'
                        : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {msg.channel === 'webmail' ? (
                          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        <span>{msg.channelLabel}</span>
                      </span>

                      {inspectedCount > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-700 px-2 py-0.5 font-mono text-[11px] font-semibold text-white dark:bg-emerald-500 dark:text-slate-950">
                          <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                          <span>{inspectedCount}/2 Skenario</span>
                        </span>
                      ) : (
                        <span className="rounded border border-slate-300 bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          Belum Dicek
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {msg.senderName}
                    </div>
                    <div className="text-xs leading-snug text-slate-600 dark:text-slate-300">
                      {msg.subject}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          <article
            aria-live="polite"
            className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 lg:col-span-7 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded bg-[#0B1F3A] px-2 py-0.5 font-mono text-xs font-semibold text-emerald-300 dark:bg-slate-800">
                    {activeMessage.channel === 'webmail' ? (
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>
                      PESAN 0{activeMessage.id} / {activeMessage.channelLabel.toUpperCase()}
                    </span>
                  </span>
                  <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                    {activeMessage.timestamp}
                  </span>
                </div>

                <h3 className="mt-2.5 text-base font-bold text-slate-900 dark:text-slate-100">
                  <RichTermText text={activeMessage.subject} />
                </h3>

                <div className="mt-2 space-y-0.5 text-xs text-slate-600 dark:text-slate-300">
                  <div>
                    <span className="font-semibold">Pengirim:</span>{' '}
                    {activeMessage.senderName}
                  </div>
                  <div className="break-all font-mono text-slate-800 dark:text-slate-200">
                    {activeMessage.senderAddress}
                  </div>
                </div>
              </div>

              <div
                className={`space-y-2.5 rounded-lg border p-4 text-sm leading-relaxed ${
                  activeMessage.channel === 'whatsapp'
                    ? 'border-emerald-200 bg-emerald-50/50 text-slate-900 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-slate-100'
                    : 'border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200'
                }`}
              >
                {activeMessage.bodyParagraphs.map((para, idx) => (
                  <p key={idx}>
                    <RichTermText text={para} />
                  </p>
                ))}
              </div>

              {activeMessage.link && (
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-950/70">
                  <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Tautan di dalam pesan (hover, fokus Tab, atau klik untuk memeriksa URL
                    asli):
                  </span>

                  <button
                    type="button"
                    onMouseEnter={() =>
                      setInspectedUrl(activeMessage.link?.actualUrl ?? null)
                    }
                    onFocus={() =>
                      setInspectedUrl(activeMessage.link?.actualUrl ?? null)
                    }
                    onClick={() =>
                      setInspectedUrl(activeMessage.link?.actualUrl ?? null)
                    }
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-sky-700/40 bg-white px-3.5 py-2 text-left text-sm font-semibold text-sky-800 underline decoration-sky-600/60 underline-offset-2 transition-colors hover:bg-sky-50 dark:border-sky-500/50 dark:bg-slate-900 dark:text-sky-300 dark:hover:bg-slate-800"
                  >
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{activeMessage.link.displayText}</span>
                  </button>

                  <div
                    role="status"
                    aria-live="polite"
                    className="flex items-start gap-2 rounded border border-slate-300 bg-white px-3 py-2 font-mono text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <Link2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#047857] dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 break-all">
                      <span className="font-semibold text-slate-600 dark:text-slate-400">
                        Pratinjau URL Asli:{' '}
                      </span>
                      <span>
                        {inspectedUrl ??
                          'Belum diinspeksi. Arahkan kursor, fokus, atau klik tombol tautan di atas.'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeMessage.attachment && (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-300 bg-white p-3 dark:border-slate-700 dark:bg-slate-950/60">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <Paperclip
                      className="h-4 w-4 shrink-0 text-slate-600 dark:text-slate-300"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <div className="break-all font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
                        {activeMessage.attachment.filename}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Lampiran berkas ({activeMessage.attachment.sizeLabel})
                      </div>
                    </div>
                  </div>
                  <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    Pratinjau Nama Berkas
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Uji Dampak Keputusan pada Pesan 0{activeMessage.id} (Klik Keduanya untuk
                Membandingkan):
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleExploreAction(activeMessage.id, 'process')}
                  aria-pressed={activeAction === 'process'}
                  className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    activeAction === 'process'
                      ? activeMessage.outcomes.process.isSafe
                        ? 'border-emerald-600 bg-emerald-700 text-white dark:border-emerald-400 dark:bg-emerald-500 dark:text-slate-950'
                        : 'border-rose-600 bg-rose-700 text-white dark:border-rose-400 dark:bg-rose-500 dark:text-slate-950'
                      : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Jika Diproses / Dianggap Aman</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleExploreAction(activeMessage.id, 'report')}
                  aria-pressed={activeAction === 'report'}
                  className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    activeAction === 'report'
                      ? 'border-emerald-600 bg-emerald-700 text-white dark:border-emerald-400 dark:bg-emerald-500 dark:text-slate-950'
                      : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Jika Dilaporkan ke Tim IT</span>
                </button>
              </div>

              {!showAllExplanations && activeOutcome && (
                <FeedbackBox
                  variant={activeOutcome.isSafe ? 'safe' : 'risk'}
                  label={
                    activeOutcome.isSafe
                      ? 'KONDISI AMAN / TEPAT'
                      : 'KONDISI BERISIKO'
                  }
                  title={
                    activeMessage.truthCategory === 'phish'
                      ? 'Karakter Pesan: Jebakan Phishing / Rekayasa Sosial'
                      : 'Karakter Pesan: Pesan Operasional Sah'
                  }
                >
                  <p>
                    <strong>Dampak Situasi di Lapangan:</strong>{' '}
                    <RichTermText text={activeOutcome.impact} />
                  </p>
                  <p className="mt-1.5">
                    <strong>Mengapa &amp; Langkah Tepatnya:</strong>{' '}
                    <RichTermText text={activeOutcome.rationale} />
                  </p>
                </FeedbackBox>
              )}

              {showAllExplanations && (
                <div className="space-y-2.5">
                  <FeedbackBox
                    variant={activeMessage.outcomes.process.isSafe ? 'safe' : 'risk'}
                    label="JIKA DIPROSES / DIANGGAP AMAN"
                  >
                    <p>
                      <strong>Dampak:</strong>{' '}
                      <RichTermText text={activeMessage.outcomes.process.impact} />
                    </p>
                    <p className="mt-1">
                      <strong>Penjelasan:</strong>{' '}
                      <RichTermText text={activeMessage.outcomes.process.rationale} />
                    </p>
                  </FeedbackBox>

                  <FeedbackBox
                    variant={activeMessage.outcomes.report.isSafe ? 'safe' : 'risk'}
                    label="JIKA DILAPORKAN KE TIM IT"
                  >
                    <p>
                      <strong>Dampak:</strong>{' '}
                      <RichTermText text={activeMessage.outcomes.report.impact} />
                    </p>
                    <p className="mt-1">
                      <strong>Penjelasan:</strong>{' '}
                      <RichTermText text={activeMessage.outcomes.report.rationale} />
                    </p>
                  </FeedbackBox>
                </div>
              )}
            </div>
          </article>
        </div>

        {showAllExplanations && (
          <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Ringkasan Analisis Seluruh 5 Pesan (Referensi Diskusi Kelas)
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-md border border-slate-200 bg-slate-50 p-3.5 text-xs leading-relaxed dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                      PESAN 0{msg.id} ({msg.channelLabel})
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 font-mono font-semibold ${
                        msg.truthCategory === 'phish'
                          ? 'bg-rose-700 text-white dark:bg-rose-500 dark:text-slate-950'
                          : 'bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950'
                      }`}
                    >
                      {msg.truthCategory === 'phish' ? 'JEBAKAN' : 'PESAN SAH'}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    <RichTermText text={msg.subject} />
                  </p>
                  <p className="mt-1 text-slate-700 dark:text-slate-300">
                    <strong className="font-semibold">
                      {msg.truthCategory === 'phish'
                        ? 'Alasan Jebakan: '
                        : 'Indikator Sah: '}
                    </strong>
                    <RichTermText text={msg.outcomes.process.rationale} />
                  </p>
                  {msg.truthCategory === 'safe' && (
                    <p className="mt-1 text-slate-600 dark:text-slate-300">
                      <strong className="font-semibold">Jika Dilaporkan: </strong>
                      <RichTermText text={msg.outcomes.report.rationale} />
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </LabShell>
  );
}

export default Lab03PhishingSim;
