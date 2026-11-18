import { useEffect, useState } from 'react';
import {
  Cloud,
  Eye,
  EyeOff,
  FileWarning,
  Lock,
  MessageSquareWarning,
  ShieldCheck,
} from 'lucide-react';
import type { LabProps } from '../../types/training';
import { Callout, FeedbackBox, LabShell, RichTermText } from '../ui';

interface CloudOption {
  id: string;
  label: string;
  status: 'safe' | 'risk';
  fieldImpact: string;
  whyAndAction: string;
}

interface CloudConfigItem {
  id: string;
  resourceName: string;
  platform: string;
  currentRiskSetting: string;
  context: string;
  options: CloudOption[];
}

interface ChatMessageItem {
  id: string;
  time: string;
  sender: string;
  role: string;
  attachment?: string;
  text: string;
  status: 'safe' | 'risk';
  fieldImpact: string;
  whyAndAction: string;
}

const CLOUD_CONFIGS: CloudConfigItem[] = [
  {
    id: 'cloud-1',
    resourceName: 'SaaSCore_Patch_v4.8_Backup',
    platform: 'Google Drive Kerja',
    currentRiskSetting: 'Anyone with the link - Editor',
    context:
      'Berisi paket patch aplikasi SaaSCore, skrip migrasi tabel, dan catatan konfigurasi rilis.',
    options: [
      {
        id: 'c1-a',
        label:
          'Restricted hanya untuk email tim Rilis SaaS (sigitadi.id) tertentu, izin Viewer (atau Editor khusus 2 Lead Rilis), dan nonaktifkan download publik',
        status: 'safe',
        fieldImpact:
          'Hanya akun resmi SaaS yang terautentikasi MFA yang bisa mengakses paket patch. Pihak eksternal tidak dapat mengunduh atau menyisipkan kode berbahaya.',
        whyAndAction:
          'Menerapkan prinsip least privilege dan melindungi rantai distribusi pembaruan SaaSCore.',
      },
      {
        id: 'c1-b',
        label:
          'Ubah menjadi Anyone with the link - Viewer agar tautan tetap praktis namun tidak bisa diubah',
        status: 'risk',
        fieldImpact:
          'Tautan publik tetap memungkinkan siapa pun yang menemukan URL membaca dan menyalin paket patch SaaSCore tanpa login.',
        whyAndAction:
          'Mengapa berisiko: tautan publik tidak memiliki jejak audit identitas pengakses. Langkah tepat: wajib setel mode Restricted.',
      },
      {
        id: 'c1-c',
        label:
          'Biarkan Anyone with the link - Editor tetapi tambahkan tulisan "Khusus Internal SaaS" di nama folder',
        status: 'risk',
        fieldImpact:
          'Label teks pada nama folder tidak mencegah orang luar membuka atau mengubah isi skrip patch apabila tautan bocor.',
        whyAndAction:
          'Mengapa berisiko: kontrol keamanan harus bersifat teknis (autentikasi akun), bukan sekadar imbauan teks.',
      },
    ],
  },
  {
    id: 'cloud-2',
    resourceName: 'Topologi_Jaringan_BPR_Mitra_2026.pdf',
    platform: 'OneDrive Proyek',
    currentRiskSetting: 'Anyone with the link - Viewer',
    context:
      'Memuat peta segmen jaringan internal, daftar port server SaaSCore, dan gateway VPN BPR Mitra Sejahtera (Ilustrasi).',
    options: [
      {
        id: 'c2-a',
        label:
          'Biarkan Anyone with the link - Viewer lalu tulis password PDF di kolom komentar dokumen',
        status: 'risk',
        fieldImpact:
          'Setiap orang yang membuka tautan publik langsung dapat melihat password pembuka PDF di kolom komentar folder yang sama.',
        whyAndAction:
          'Mengapa berisiko: kunci dan brankas berada di tempat yang sama. Langkah tepat: gunakan izin email spesifik serta kirim password via jalur terpisah (Out-of-Band).',
      },
      {
        id: 'c2-b',
        label:
          'Restricted ke email PIC Teknis BPR & Implementor SaaS terkait, nonaktifkan download/print/copy, dan pasang kedaluwarsa 7 hari',
        status: 'safe',
        fieldImpact:
          'Peta jaringan BPR hanya dapat dibaca pihak berwenang selama fase proyek aktif dan otomatis tertutup setelah 7 hari.',
        whyAndAction:
          'Menggabungkan pembatasan akun spesifik, pembatasan salin dokumen, dan masa berlaku terbatas.',
      },
      {
        id: 'c2-c',
        label: 'Bagikan ke seluruh akun Gmail pribadi anggota tim agar mudah dibuka dari ponsel',
        status: 'risk',
        fieldImpact:
          'Dokumen arsitektur sensitif klien keluar dari pengawasan akun korporat sigitadi.id ke akun pribadi yang tidak terpantau.',
        whyAndAction:
          'Mengapa berisiko: sulit mencabut akses saat staf pindah divisi atau offboarding. Langkah tepat: selalu gunakan akun email kerja resmi.',
      },
    ],
  },
  {
    id: 'cloud-3',
    resourceName: 'Log_EOD_BPR_Sementara',
    platform: 'Google Drive Support',
    currentRiskSetting: 'Tautan publik tanpa batas waktu kedaluwarsa (No Expiry)',
    context:
      'Folder sementara untuk menampung log error End-of-Day yang dikirim saat investigasi tiket support.',
    options: [
      {
        id: 'c3-a',
        label: 'Pertahankan tautan publik tanpa batas waktu tetapi ubah nama folder menjadi kode acak',
        status: 'risk',
        fieldImpact:
          'Penyamaran nama folder tidak melindungi tautan yang sudah terlanjur tersimpan di riwayat browser atau catatan tiket lama.',
        whyAndAction:
          'Mengapa berisiko: tautan tetap terbuka selamanya tanpa autentikasi. Langkah tepat: pindahkan ke repositori tiket internal atau pakai akses terbatas dengan kedaluwarsa.',
      },
      {
        id: 'c3-b',
        label:
          'Simpan di repositori tiket internal terautentikasi atau setel Restricted ke email Support SaaS dengan batas kedaluwarsa 48 jam lalu hapus setelah tiket selesai',
        status: 'safe',
        fieldImpact:
          'Log error BPR terlindungi autentikasi akun kerja dan otomatis bersih begitu penanganan tiket selesai.',
        whyAndAction:
          'Mencegah penumpukan sisa log operasional dan mematuhi prinsip minimalisasi penyimpanan data sesuai UU PDP.',
      },
      {
        id: 'c3-c',
        label: 'Setel menjadi Anyone with the link - Viewer dan jadwalkan pengecekan setahun sekali',
        status: 'risk',
        fieldImpact:
          'Tautan publik yang dibiarkan terbuka selama satu tahun membuka celah kebocoran log transaksi maupun struktur tabel SaaSCore.',
        whyAndAction:
          'Mengapa berisiko: jangka waktu setahun terlalu lama untuk file sementara. Langkah tepat: hapus segera setelah tiket tuntas.',
      },
    ],
  },
];

const CHAT_MESSAGES: ChatMessageItem[] = [
  {
    id: 'msg-1',
    time: '09:12',
    sender: 'Andi',
    role: 'Implementor',
    text: 'Pagi tim, jadwal sinkronisasi patch EOD untuk BPR Mitra dimulai pukul 13.30 WIB. Mohon pastikan daftar periksa tiket #SAAS-412 sudah ditinjau sebelum jam makan siang.',
    status: 'safe',
    fieldImpact:
      'Koordinasi tim tetap berjalan cepat tanpa meninggalkan informasi sensitif di riwayat percakapan grup.',
    whyAndAction:
      'Kondisi aman: hanya memuat jadwal kerja dan nomor referensi tiket internal tanpa IP server, kredensial, ataupun data pribadi nasabah.',
  },
  {
    id: 'msg-2',
    time: '09:15',
    sender: 'Rian',
    role: 'Support',
    text: 'Biar cepat masuk ke server staging BPR Mitra, ini akses SSH-nya: IP 103.210.44.18 port 2222 user root pass SaasBpr#2026!',
    status: 'risk',
    fieldImpact:
      'Alamat IP, port, akun root, dan kata sandi plaintext langsung tersimpan di ponsel seluruh anggota grup serta berisiko ikut tercadangkan ke cloud pribadi.',
    whyAndAction:
      'Melanggar aturan keamanan perbankan dan kebijakan SaaS. Langkah tepat: simpan kredensial di brankas secret resmi terautentikasi MFA dan segera rotasi password yang telanjur terkirim di chat.',
  },
  {
    id: 'msg-3',
    time: '09:18',
    sender: 'Sinta',
    role: 'QA Engineer',
    text: 'Untuk bug perhitungan bunga deposito, silakan cek langkah reproduksi pada tautan tiket internal (tanpa kredensial): https://tiket.sigitadi.id/issues/SAAS-418',
    status: 'safe',
    fieldImpact:
      'Anggota tim hanya bisa melihat detail bug setelah login ke portal tiket resmi sigitadi.id dengan akun masing-masing.',
    whyAndAction:
      'Kondisi aman: mengarahkan tim ke sistem tiket terautentikasi dan bebas dari kata sandi maupun data nasabah.',
  },
  {
    id: 'msg-4',
    time: '09:22',
    sender: 'Dimas',
    role: 'Implementor',
    attachment:
      'Lampiran Gambar: tabel_cif_error.png (tampak kolom NIK, Nama Nasabah, dan Saldo Tabungan)',
    text: 'Layar SaaSCore muncul error waktu membuka data NIK 3273014508900002 atas nama Budi Santoso dengan saldo Rp 185.400.000, mohon bantu cek.',
    status: 'risk',
    fieldImpact:
      'Data pribadi nasabah (NIK, nama lengkap, dan saldo tabungan) tersebar di aplikasi chat pribadi dan galeri ponsel peserta grup.',
    whyAndAction:
      'Melanggar ketentuan kerahasiaan data pribadi (UU PDP) dan perjanjian kerahasiaan BPR. Langkah tepat: selalu lakukan redaction (blur/sensor) pada seluruh identitas nasabah sebelum berbagi tangkapan layar.',
  },
  {
    id: 'msg-5',
    time: '09:26',
    sender: 'Rian',
    role: 'Support',
    attachment: 'Lampiran Berkas: BPR_Mitra_Client.ovpn',
    text: 'Sekalian saya kirim file profil .ovpn beserta password sertifikatnya (MitraVPN!998) di sini untuk anggota tim yang baru bergabung.',
    status: 'risk',
    fieldImpact:
      'Siapa pun yang memegang ponsel atau sesi WhatsApp Web salah satu anggota grup langsung memiliki berkas konfigurasi VPN beserta kuncinya sekaligus.',
    whyAndAction:
      'Melanggar aturan distribusi akses Out-of-Band. Langkah tepat: distribusikan profil VPN lewat portal terautentikasi dan kirim passphrase lewat jalur terpisah.',
  },
  {
    id: 'msg-6',
    time: '09:30',
    sender: 'Maya',
    role: 'Lead Security',
    text: 'Rekan-rekan, mohon ingat untuk tidak menaruh kredensial atau data nasabah di grup ini. Ambil token akses sementara dari brankas secret internal setelah login MFA.',
    status: 'safe',
    fieldImpact:
      'Menghentikan kebiasaan berisiko secara konstruktif dan mengarahkan tim ke jalur distribusi kredensial yang aman.',
    whyAndAction:
      'Kondisi aman: contoh nyata budaya saling mengingatkan yang sehat di lingkungan kerja PT. Sigit Adi Aman Siber (SaaS).',
  },
];

const TOTAL_ITEMS = CLOUD_CONFIGS.length + CHAT_MESSAGES.length;

export function Lab09CloudChatAudit({
  moduleId,
  instructorMode = false,
  onMarkExplored,
}: LabProps) {
  const [clickedCloudOptions, setClickedCloudOptions] = useState<Record<string, string[]>>({});
  const [openedChatMessages, setOpenedChatMessages] = useState<Record<string, boolean>>({});
  const [showAllExplanations, setShowAllExplanations] = useState(false);
  const [isMarkedDone, setIsMarkedDone] = useState(false);

  useEffect(() => {
    if (!instructorMode) {
      setShowAllExplanations(false);
    }
  }, [instructorMode]);

  const countExplored = (
    cloudMap: Record<string, string[]>,
    chatMap: Record<string, boolean>
  ) => {
    const cloudCount = CLOUD_CONFIGS.filter(
      (item) => (cloudMap[item.id]?.length ?? 0) > 0
    ).length;
    const chatCount = CHAT_MESSAGES.filter((msg) => Boolean(chatMap[msg.id])).length;
    return cloudCount + chatCount;
  };

  const exploredCount = isMarkedDone
    ? TOTAL_ITEMS
    : countExplored(clickedCloudOptions, openedChatMessages);

  const handleClickCloudOption = (cloudId: string, optionId: string) => {
    const existing = clickedCloudOptions[cloudId] ?? [];
    const nextList = existing.includes(optionId) ? existing : [...existing, optionId];
    const nextCloudMap = { ...clickedCloudOptions, [cloudId]: nextList };
    setClickedCloudOptions(nextCloudMap);

    const nextTotal = isMarkedDone
      ? TOTAL_ITEMS
      : countExplored(nextCloudMap, openedChatMessages);
    onMarkExplored(nextTotal, TOTAL_ITEMS);
  };

  const handleToggleChatLine = (msgId: string) => {
    const nextChatMap = { ...openedChatMessages, [msgId]: !openedChatMessages[msgId] };
    setOpenedChatMessages(nextChatMap);

    const nextTotal = isMarkedDone
      ? TOTAL_ITEMS
      : countExplored(clickedCloudOptions, nextChatMap);
    onMarkExplored(nextTotal, TOTAL_ITEMS);
  };

  const handleToggleShowAll = () => {
    const nextShow = !showAllExplanations;
    setShowAllExplanations(nextShow);
    if (nextShow) {
      const allCloud: Record<string, string[]> = {};
      for (const item of CLOUD_CONFIGS) {
        allCloud[item.id] = item.options.map((o) => o.id);
      }
      const allChat: Record<string, boolean> = {};
      for (const msg of CHAT_MESSAGES) {
        allChat[msg.id] = true;
      }
      setClickedCloudOptions(allCloud);
      setOpenedChatMessages(allChat);
      onMarkExplored(TOTAL_ITEMS, TOTAL_ITEMS);
    }
  };

  const handleMarkDone = () => {
    const allCloud: Record<string, string[]> = {};
    for (const item of CLOUD_CONFIGS) {
      allCloud[item.id] = item.options.map((o) => o.id);
    }
    const allChat: Record<string, boolean> = {};
    for (const msg of CHAT_MESSAGES) {
      allChat[msg.id] = true;
    }
    setClickedCloudOptions(allCloud);
    setOpenedChatMessages(allChat);
    setShowAllExplanations(true);
    setIsMarkedDone(true);
    onMarkExplored(TOTAL_ITEMS, TOTAL_ITEMS);
  };

  const handleReset = () => {
    setClickedCloudOptions({});
    setOpenedChatMessages({});
    setShowAllExplanations(false);
    setIsMarkedDone(false);
  };

  return (
    <LabShell
      moduleId={moduleId}
      session="siang"
      title="Konfigurasi Hak Akses Cloud & Audit Percakapan Grup"
      instructions="Eksplorasi 3 pengaturan berbagi cloud dan 6 baris percakapan grup WhatsApp/Telegram di bawah ini. Klik opsi atau baris pesan mana saja untuk melihat mengapa kondisi tersebut aman atau berisiko menurut UU PDP dan standar perbankan."
      exploredCount={exploredCount}
      totalCount={TOTAL_ITEMS}
      isExplored={isMarkedDone || exploredCount === TOTAL_ITEMS}
      onMarkDone={handleMarkDone}
      onReset={handleReset}
    >
      <div className="space-y-6">
        {instructorMode && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <RichTermText text="Gunakan mode perbandingan terbuka untuk membahas seluruh pengaturan cloud dan pesan chat sekaligus di layar proyektor." />
            </p>
            <button
              type="button"
              aria-pressed={showAllExplanations}
              onClick={handleToggleShowAll}
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              {showAllExplanations ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
              <span>
                {showAllExplanations
                  ? 'Tutup Semua Penjelasan Terbuka'
                  : 'Buka Semua Penjelasan Kondisi'}
              </span>
            </button>
          </div>
        )}

        {/* PART 1: CLOUD ACCESS */}
        <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-1 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div className="inline-flex items-center gap-2 rounded bg-[#0B1F3A] px-2.5 py-0.5 font-mono text-xs font-semibold text-white dark:bg-slate-800 dark:text-emerald-300">
              <Cloud className="h-3.5 w-3.5" aria-hidden="true" />
              <span>BAGIAN 1: PENGATURAN HAK AKSES CLOUD (3 ITEM)</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              <RichTermText text="Bandingkan Izin Berbagi Dokumen Proyek SaaSCore & BPR" />
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <RichTermText text="Klik setiap pilihan konfigurasi di bawah untuk melihat perbedaan dampak antara tautan terbuka dan izin berbasis prinsip least privilege." />
            </p>
          </div>

          <div className="space-y-5">
            {CLOUD_CONFIGS.map((item, idx) => {
              const clickedList = clickedCloudOptions[item.id] ?? [];
              return (
                <article
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                        BERKAS #{idx + 1} / {item.platform}
                      </span>
                      <h4 className="mt-0.5 break-all font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
                        {item.resourceName}
                      </h4>
                    </div>
                    <span className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-rose-300 bg-rose-50 px-2.5 py-1 font-mono text-xs font-semibold text-rose-800 dark:border-rose-700/60 dark:bg-rose-950/50 dark:text-rose-200">
                      <FileWarning className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>
                        Kondisi awal: <RichTermText text={item.currentRiskSetting} />
                      </span>
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <RichTermText text={item.context} />
                  </p>

                  <div className="mt-3 space-y-2.5">
                    {item.options.map((opt) => {
                      const isInspected = showAllExplanations || clickedList.includes(opt.id);
                      return (
                        <div key={opt.id} className="space-y-2">
                          <button
                            type="button"
                            aria-expanded={isInspected}
                            onClick={() => handleClickCloudOption(item.id, opt.id)}
                            className={`flex min-h-[44px] w-full items-start gap-3 rounded-md border px-3.5 py-2.5 text-left text-sm transition-colors ${
                              isInspected
                                ? opt.status === 'safe'
                                  ? 'border-emerald-700/60 bg-emerald-50/80 font-medium text-slate-950 dark:border-emerald-500/60 dark:bg-emerald-950/35 dark:text-slate-50'
                                  : 'border-rose-700/60 bg-rose-50/80 font-medium text-slate-950 dark:border-rose-500/60 dark:bg-rose-950/35 dark:text-slate-50'
                                : 'border-slate-200 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800'
                            }`}
                          >
                            <Lock
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                isInspected
                                  ? opt.status === 'safe'
                                    ? 'text-emerald-700 dark:text-emerald-400'
                                    : 'text-rose-700 dark:text-rose-400'
                                  : 'text-slate-400 dark:text-slate-500'
                              }`}
                              aria-hidden="true"
                            />
                            <span className="leading-snug">{opt.label}</span>
                          </button>

                          {isInspected && (
                            <FeedbackBox
                              variant={opt.status === 'safe' ? 'safe' : 'risk'}
                              label={
                                opt.status === 'safe' ? 'KONDISI AMAN / TEPAT' : 'KONDISI BERISIKO'
                              }
                            >
                              <p>
                                <strong>Dampak di Lapangan:</strong>{' '}
                                <RichTermText text={opt.fieldImpact} />
                              </p>
                              <p className="mt-1">
                                <strong>Mengapa & Langkah Tepat:</strong>{' '}
                                <RichTermText text={opt.whyAndAction} />
                              </p>
                            </FeedbackBox>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* PART 2: GROUP CHAT AUDIT */}
        <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-1 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div className="inline-flex items-center gap-2 rounded bg-[#0B1F3A] px-2.5 py-0.5 font-mono text-xs font-semibold text-white dark:bg-slate-800 dark:text-emerald-300">
              <MessageSquareWarning className="h-3.5 w-3.5" aria-hidden="true" />
              <span>BAGIAN 2: AUDIT PERCAKAPAN GRUP CHAT (6 PESAN)</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Grup Koordinasi Implementasi SaaSCore - BPR Mitra (Simulasi WhatsApp/Telegram)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <RichTermText text='Klik baris pesan atau tombol "Lihat Analisis Kondisi" untuk memeriksa apakah pesan tersebut aman atau melanggar UU PDP dan keamanan perbankan.' />
            </p>
          </div>

          <Callout title="Panduan Diskusi Grup Chat" variant="navy">
            <p>
              <RichTermText text="Perhatikan perbedaan antara koordinasi tiket yang aman dengan kebocoran alamat IP server, kredensial plaintext, file .ovpn beserta sandinya, dan data pribadi nasabah tanpa penyamaran (redaction)." />
            </p>
          </Callout>

          <div className="space-y-3">
            {CHAT_MESSAGES.map((msg) => {
              const isInspected = showAllExplanations || Boolean(openedChatMessages[msg.id]);
              return (
                <div
                  key={msg.id}
                  className={`rounded-lg border p-4 transition-colors ${
                    isInspected
                      ? msg.status === 'safe'
                        ? 'border-emerald-700/40 bg-emerald-50/40 dark:border-emerald-500/40 dark:bg-emerald-950/20'
                        : 'border-rose-700/40 bg-rose-50/40 dark:border-rose-500/40 dark:bg-rose-950/20'
                      : 'border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/60'
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {msg.sender}
                        </span>
                        <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {msg.role}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">{msg.time} WIB</span>
                      </div>

                      {msg.attachment && (
                        <div className="inline-block max-w-full rounded border border-slate-300 bg-white px-2.5 py-1 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                          {msg.attachment}
                        </div>
                      )}

                      <p className="break-words text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                        {msg.text}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-expanded={isInspected}
                      onClick={() => handleToggleChatLine(msg.id)}
                      className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{isInspected ? 'Tutup Analisis' : 'Lihat Analisis Kondisi'}</span>
                    </button>
                  </div>

                  {isInspected && (
                    <div className="mt-3">
                      <FeedbackBox
                        variant={msg.status === 'safe' ? 'safe' : 'risk'}
                        label={
                          msg.status === 'safe'
                            ? 'KONDISI AMAN / TEPAT'
                            : 'KONDISI BERISIKO (MELANGGAR ATURAN)'
                        }
                      >
                        <p>
                          <strong>Dampak di Lapangan:</strong>{' '}
                          <RichTermText text={msg.fieldImpact} />
                        </p>
                        <p className="mt-1">
                          <strong>Mengapa & Langkah Tepat:</strong>{' '}
                          <RichTermText text={msg.whyAndAction} />
                        </p>
                      </FeedbackBox>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </LabShell>
  );
}

export default Lab09CloudChatAudit;
