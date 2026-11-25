import { useEffect, useState } from 'react';
import {
  BellRing,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import type { LabProps } from '../../types/training';
import { computeLabProgress, useLabSessionState } from '../../lib/useLabExploration';
import { useProgress } from '../../state/ProgressContext';
import { Callout, FeedbackBox, LabShell, RichTermText } from '../ui';

type StrengthTier = 'Lemah' | 'Sedang' | 'Kuat' | 'Sangat Kuat';
type MfaActionId = 'approve' | 'ignore' | 'reject-report';

interface EntropyAnalysis {
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
  classCount: number;
  uniqueChars: number;
  isRepetitive: boolean;
  hasWeakPattern: boolean;
  matchedPatterns: string[];
  rawEntropyBits: number;
  entropyBits: number;
  tier: StrengthTier;
  crackEstimate: string;
}

interface TestedSample {
  value: string;
  tier: StrengthTier;
  entropyBits: number;
  meetsThreshold: boolean;
}

const REFERENCE_PASSWORD = 'Saas@2026!';
const STRONG_SAMPLE_PASSPHRASE = 'kopi-pagi-lampu-hijau-48!';
const TOTAL_EXPLORATION_ITEMS = 4;

const WEAK_PATTERN_TOKENS = [
  'saascore',
  'sigitadi',
  'password',
  'rahasia',
  'qwerty',
  'admin',
  'login',
  'saas',
  'sigit',
  'bpr',
  '2024',
  '2025',
  '2026',
  '2027',
  '1234',
  '123',
  '0000',
  '1111',
];

function detectWeakPatterns(value: string): string[] {
  const lower = value.toLowerCase();
  const found: string[] = [];
  for (const token of WEAK_PATTERN_TOKENS) {
    if (lower.includes(token) && !found.some((item) => item.includes(token))) {
      found.push(token);
    }
  }
  return found;
}

function analyzePassphrase(value: string): EntropyAnalysis {
  const length = value.length;
  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasDigit = /[0-9]/.test(value);
  const hasSymbol = /[^a-zA-Z0-9]/.test(value);

  const classCount = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;
  const uniqueChars = new Set(value).size;

  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasDigit) poolSize += 10;
  if (hasSymbol) poolSize += 32;

  const isRepetitive = length >= 6 && uniqueChars <= 4;
  const matchedPatterns = length > 0 ? detectWeakPatterns(value) : [];
  const hasWeakPattern = matchedPatterns.length > 0;
  const rawEntropyBits =
    length > 0 && poolSize > 0 ? Math.round(length * Math.log2(poolSize)) : 0;

  let entropyBits = rawEntropyBits;
  if (isRepetitive) {
    entropyBits = Math.min(entropyBits, 24);
  }
  if (hasWeakPattern) {
    const penalized = Math.max(
      Math.min(rawEntropyBits, 12),
      rawEntropyBits - matchedPatterns.length * 24
    );
    entropyBits = length < 16 ? Math.min(penalized, 28) : penalized;
  }

  let tier: StrengthTier = 'Lemah';
  let crackEstimate = 'Hitungan detik hingga menit';

  if (hasWeakPattern && length < 16) {
    tier = 'Lemah';
    crackEstimate = 'Hitungan detik hingga menit (terdeteksi pola kamus atau tahun)';
  } else if (entropyBits >= 72) {
    tier = 'Sangat Kuat';
    crackEstimate = 'Ribuan tahun terhadap brute-force modern';
  } else if (entropyBits >= 50) {
    tier = 'Kuat';
    crackEstimate = 'Puluhan hingga ratusan tahun';
  } else if (entropyBits >= 36) {
    tier = 'Sedang';
    crackEstimate = 'Beberapa jam hingga minggu';
  }

  return {
    length,
    hasLower,
    hasUpper,
    hasDigit,
    hasSymbol,
    classCount,
    uniqueChars,
    isRepetitive,
    hasWeakPattern,
    matchedPatterns,
    rawEntropyBits,
    entropyBits,
    tier,
    crackEstimate,
  };
}

const MFA_ACTIONS: {
  id: MfaActionId;
  label: string;
  isSafe: boolean;
  impact: string;
  rationale: string;
}[] = [
  {
    id: 'approve',
    label: 'Setujui permintaan login agar notifikasi ponsel berhenti berbunyi',
    isSafe: false,
    impact:
      'Penyerang langsung masuk ke Portal VPN Admin SaaSCore pada pukul 02.14 WIB dan memperoleh jalur akses ke lingkungan BPR mitra.',
    rationale:
      'Sangat berisiko! Menekan Approve pada serangan MFA Fatigue berarti Anda sendiri yang membukakan pintu terakhir setelah kata sandi berhasil ditebak atau dicuri.',
  },
  {
    id: 'ignore',
    label: 'Abaikan saja notifikasi tersebut dan senyapkan ponsel hingga pagi',
    isSafe: false,
    impact:
      'Pelaku masih memegang kata sandi aktif Anda dan dapat mengulang serangan keesokan hari atau mencoba portal lain yang memakai kredensial sama.',
    rationale:
      'Masih berisiko! Munculnya prompt MFA tanpa aktivitas Anda membuktikan passphrase sudah bocor. Mengabaikannya hanya menunda pembobolan, bukan menutup celah.',
  },
  {
    id: 'reject-report',
    label:
      'Tolak permintaan, segera ubah passphrase akun dari perangkat aman, dan lapor Tim IT SaaS',
    isSafe: true,
    impact:
      'Sesi percobaan masuk ditolak seketika, kata sandi lama langsung tidak berlaku, dan Tim IT dapat memblokir IP sumber serta memeriksa log akses.',
    rationale:
      'Langkah tepat! Kombinasi menolak prompt asing, rotasi passphrase di Password Manager, dan pelaporan cepat memutus rantai serangan secara menyeluruh.',
  },
];

const TIER_STYLES: Record<StrengthTier, { bar: string; badge: string; pct: number }> = {
  Lemah: {
    bar: 'bg-rose-600 dark:bg-rose-500',
    badge: 'bg-rose-700 text-white dark:bg-rose-500 dark:text-slate-950',
    pct: 25,
  },
  Sedang: {
    bar: 'bg-amber-600 dark:bg-amber-400',
    badge: 'bg-amber-700 text-white dark:bg-amber-400 dark:text-slate-950',
    pct: 52,
  },
  Kuat: {
    bar: 'bg-emerald-600 dark:bg-emerald-400',
    badge: 'bg-emerald-700 text-white dark:bg-emerald-400 dark:text-slate-950',
    pct: 78,
  },
  'Sangat Kuat': {
    bar: 'bg-[#047857] dark:bg-[#10B981]',
    badge: 'bg-[#047857] text-white dark:bg-[#10B981] dark:text-slate-950',
    pct: 100,
  },
};

interface Lab04SessionState {
  part1Explored: boolean;
  activeMfaAction: MfaActionId | null;
  inspectedMfaActions: MfaActionId[];
  manualDone: boolean;
}

const INITIAL_LAB04_STATE: Lab04SessionState = {
  part1Explored: false,
  activeMfaAction: null,
  inspectedMfaActions: [],
  manualDone: false,
};

export function Lab04AuthLab({
  moduleId,
  instructorMode = false,
  onMarkExplored,
}: LabProps) {
  const { resetModuleExploration } = useProgress();
  // Passphrase lives strictly in ephemeral React state and is never persisted or transmitted.
  const [passphrase, setPassphrase] = useState('');
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [testedSamples, setTestedSamples] = useState<TestedSample[]>([]);
  const [sessionState, setSessionState, resetSessionState] =
    useLabSessionState<Lab04SessionState>(moduleId, INITIAL_LAB04_STATE);
  const { part1Explored, activeMfaAction, inspectedMfaActions, manualDone } = sessionState;

  const [showAllExplanations, setShowAllExplanations] = useState(false);

  useEffect(() => {
    if (!instructorMode) {
      setShowAllExplanations(false);
    }
  }, [instructorMode]);

  const analysis = analyzePassphrase(passphrase);
  const referenceAnalysis = analyzePassphrase(REFERENCE_PASSWORD);

  const meetsThreshold =
    !analysis.isRepetitive &&
    !analysis.hasWeakPattern &&
    analysis.uniqueChars >= 5 &&
    (analysis.entropyBits >= 50 ||
      (analysis.length >= 16 && analysis.classCount >= 3));

  const rawExploredCount = (part1Explored ? 1 : 0) + inspectedMfaActions.length;
  const { exploredCount, isExplored } = computeLabProgress(
    rawExploredCount,
    TOTAL_EXPLORATION_ITEMS,
    manualDone,
  );

  const notifyProgress = (
    nextPart1: boolean,
    nextMfaList: MfaActionId[],
    isDone = manualDone,
  ) => {
    const count = (nextPart1 ? 1 : 0) + nextMfaList.length;
    onMarkExplored(isDone ? TOTAL_EXPLORATION_ITEMS : count, TOTAL_EXPLORATION_ITEMS);
  };

  const handlePassphraseChange = (nextValue: string) => {
    setPassphrase(nextValue);
    if (!part1Explored && nextValue.length >= 4) {
      setSessionState((prev) => ({ ...prev, part1Explored: true }));
      notifyProgress(true, inspectedMfaActions);
    }
  };

  const handleSubmitPassphrase = () => {
    if (passphrase.length === 0) return;
    if (!part1Explored) {
      setSessionState((prev) => ({ ...prev, part1Explored: true }));
      notifyProgress(true, inspectedMfaActions);
    }
    setTestedSamples((prev) => {
      const filtered = prev.filter((item) => item.value !== passphrase);
      return [
        {
          value: passphrase,
          tier: analysis.tier,
          entropyBits: analysis.entropyBits,
          meetsThreshold,
        },
        ...filtered,
      ].slice(0, 5);
    });
  };

  const handleApplyPreset = (preset: string) => {
    setPassphrase(preset);
    setShowPassphrase(true);
    if (!part1Explored) {
      setSessionState((prev) => ({ ...prev, part1Explored: true }));
      notifyProgress(true, inspectedMfaActions);
    }
  };

  const handleExploreMfa = (actionId: MfaActionId) => {
    const nextList = inspectedMfaActions.includes(actionId)
      ? inspectedMfaActions
      : [...inspectedMfaActions, actionId];
    setSessionState((prev) => ({
      ...prev,
      activeMfaAction: actionId,
      inspectedMfaActions: nextList,
    }));
    notifyProgress(part1Explored, nextList);
  };

  const handleToggleAll = () => {
    const nextShow = !showAllExplanations;
    setShowAllExplanations(nextShow);
    if (nextShow) {
      const allMfa: MfaActionId[] = ['approve', 'ignore', 'reject-report'];
      setSessionState((prev) => ({
        ...prev,
        part1Explored: true,
        inspectedMfaActions: allMfa,
      }));
      onMarkExplored(TOTAL_EXPLORATION_ITEMS, TOTAL_EXPLORATION_ITEMS);
    }
  };

  const handleMarkDone = () => {
    setSessionState((prev) => ({ ...prev, manualDone: true }));
    onMarkExplored(TOTAL_EXPLORATION_ITEMS, TOTAL_EXPLORATION_ITEMS);
  };

  const handleReset = () => {
    setPassphrase('');
    setShowPassphrase(false);
    setTestedSamples([]);
    resetSessionState();
    setShowAllExplanations(false);
    resetModuleExploration(moduleId);
  };

  const tierStyle = TIER_STYLES[analysis.tier];
  const selectedMfaObj = MFA_ACTIONS.find((a) => a.id === activeMfaAction);

  return (
    <LabShell
      moduleId={moduleId}
      session="pagi"
      title="Uji Entropi Passphrase & Simulasi MFA Fatigue (Simulasi Eksplorasi)"
      instructions="Eksplorasi dua bagian pengamanan akses berikut: (1) uji perbedaan kekuatan entropi password pendek vs passphrase panjang secara lokal, dan (2) coba seluruh pilihan respons saat menghadapi simulasi serangan MFA Fatigue pukul 02.14 WIB."
      exploredCount={exploredCount}
      totalCount={TOTAL_EXPLORATION_ITEMS}
      isExplored={isExplored}
      onMarkDone={handleMarkDone}
      onReset={handleReset}
    >
      <div className="space-y-6">
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
                    ? 'Coba seluruh tombol respons MFA Fatigue secara bebas untuk membandingkan dampaknya, atau buka semua penjelasan sekaligus di layar proyektor.'
                    : 'Uji kekuatan passphrase secara lokal dan coba seluruh pilihan respons MFA Fatigue untuk mengamati konsekuensinya masing-masing.'
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

        <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded bg-[#0B1F3A] px-2.5 py-1 font-mono text-xs font-semibold text-emerald-300 dark:bg-slate-800">
              <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
              <span>BAGIAN 1 / METERAN ENTROPI PASSPHRASE</span>
            </span>
            {part1Explored ? (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-700 px-2.5 py-1 font-mono text-xs font-semibold text-white dark:bg-emerald-500 dark:text-slate-950">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Meteran Dieksplorasi</span>
              </span>
            ) : (
              <span className="rounded border border-slate-300 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Target aman: minimal 50 bit atau 16 karakter dengan 3 kelas
              </span>
            )}
          </div>

          <Callout
            title="Jaminan Privasi Lokal (Sesi Memori Browser)"
            variant="emerald"
            badge="LOKAL ONLY"
            icon={
              <Lock
                className="h-4 w-4 text-[#047857] dark:text-emerald-400"
                aria-hidden="true"
              />
            }
          >
            <RichTermText text="Input passphrase pada simulasi ini hanya dihitung secara lokal di memori React sesi browser Anda. Teks tidak pernah disimpan ke localStorage dan tidak dikirim ke server mana pun. Gunakan contoh frasa latihan, bukan kata sandi kerja asli Anda." />
          </Callout>

          <form
            className="mt-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitPassphrase();
            }}
          >
            <div>
              <label
                htmlFor="passphrase-lab-input"
                className="block text-sm font-bold text-slate-900 dark:text-slate-100"
              >
                Uji Coba Passphrase Latihan
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  id="passphrase-lab-input"
                  type={showPassphrase ? 'text' : 'password'}
                  value={passphrase}
                  onChange={(e) => handlePassphraseChange(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder={`Contoh frasa latihan: ${STRONG_SAMPLE_PASSPHRASE}`}
                  className="min-h-[44px] w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 font-mono text-sm text-slate-900 placeholder:text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassphrase((prev) => !prev)}
                  aria-pressed={showPassphrase}
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  {showPassphrase ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>{showPassphrase ? 'Sembunyikan' : 'Tampilkan'}</span>
                </button>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Contoh cepat uji perbandingan:
                </span>
                {[
                  { label: 'Lemah: admin123', val: 'admin123' },
                  { label: 'Berpola: Saas@2026!', val: 'Saas@2026!' },
                  {
                    label: `Passphrase Kuat: ${STRONG_SAMPLE_PASSPHRASE}`,
                    val: STRONG_SAMPLE_PASSPHRASE,
                  },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => handleApplyPreset(preset.val)}
                    className="inline-flex min-h-[44px] items-center rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 font-mono text-xs font-medium text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                    Tingkat Ketahanan:
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${tierStyle.badge}`}
                  >
                    {analysis.tier}
                  </span>
                </div>
                <span className="font-mono text-sm font-bold tabular-nums text-slate-900 dark:text-slate-100">
                  {analysis.entropyBits} bit entropi ({analysis.length} karakter)
                </span>
              </div>

              <div
                className="mt-2.5 h-2.5 w-full overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800"
                role="progressbar"
                aria-valuenow={passphrase.length === 0 ? 0 : tierStyle.pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Kekuatan entropi passphrase"
              >
                <div
                  className={`h-full transition-all duration-200 ${tierStyle.bar}`}
                  style={{ width: `${passphrase.length === 0 ? 0 : tierStyle.pct}%` }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                <RichTermText text="Estimasi ketahanan brute-force:" />{' '}
                <strong className="text-slate-900 dark:text-slate-100">
                  <RichTermText
                    text={
                      passphrase.length === 0
                        ? 'Masukkan karakter atau pilih contoh di atas untuk mulai mengukur'
                        : analysis.crackEstimate
                    }
                  />
                </strong>
              </p>

              {analysis.isRepetitive && (
                <p className="mt-2 rounded border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-900 dark:border-rose-700 dark:bg-rose-950/50 dark:text-rose-200">
                  Pola terlalu seragam atau berulang (hanya {analysis.uniqueChars}{' '}
                  karakter unik). Gunakan kombinasi kata acak yang lebih beragam.
                </p>
              )}

              {analysis.hasWeakPattern && (
                <p className="mt-2 rounded border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-900 dark:border-rose-700 dark:bg-rose-950/50 dark:text-rose-200">
                  Terdeteksi kata kamus atau pola tahun mudah ditebak (
                  {analysis.matchedPatterns.join(', ')}). Penyerang menguji pola ini pada
                  detik pertama serangan berbasis aturan.
                </p>
              )}

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { label: 'Huruf Kecil (a-z)', active: analysis.hasLower },
                  { label: 'Huruf Besar (A-Z)', active: analysis.hasUpper },
                  { label: 'Angka (0-9)', active: analysis.hasDigit },
                  { label: 'Simbol (!@#)', active: analysis.hasSymbol },
                ].map((cls) => (
                  <div
                    key={cls.label}
                    className={`flex items-center gap-1.5 rounded border px-2.5 py-2 text-xs font-medium ${
                      cls.active
                        ? 'border-emerald-600/50 bg-emerald-50 text-emerald-950 dark:border-emerald-500/50 dark:bg-emerald-950/50 dark:text-emerald-200'
                        : 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
                    }`}
                  >
                    <CheckCircle2
                      className={`h-3.5 w-3.5 shrink-0 ${
                        cls.active
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{cls.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400">
                  PEMBANDING: PASSWORD PENDEK BERPOLA
                </div>
                <div className="mt-1 font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
                  {REFERENCE_PASSWORD} ({referenceAnalysis.length} karakter)
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  <RichTermText
                    text={`Meskipun memakai 4 jenis karakter (${referenceAnalysis.rawEntropyBits} bit mentah), nilai ketahanannya turun menjadi ${referenceAnalysis.entropyBits} bit efektif karena pola singkat nama perusahaan + tahun rentan terhadap serangan kamus berbasis aturan (rule-based cracking).`}
                  />
                </p>
              </div>

              <div className="rounded-md border border-emerald-200 bg-emerald-50/50 p-3.5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                <div className="font-mono text-xs font-bold text-[#047857] dark:text-emerald-400">
                  PASSPHRASE ANDA SAAT INI
                </div>
                <div className="mt-1 font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
                  {analysis.length} karakter, {analysis.classCount} kelas (
                  {analysis.entropyBits} bit)
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  <RichTermText text="Passphrase panjang (minimal 16 karakter) dengan kata tidak terduga jauh lebih mudah diingat manusia namun sangat mahal untuk ditembus mesin penebak kata sandi." />
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <RichTermText
                  text={
                    meetsThreshold
                      ? 'Passphrase latihan sudah memenuhi standar ketahanan (>= 50 bit efektif atau >= 16 karakter tanpa pola lemah).'
                      : 'Coba panjangkan frasa hingga minimal 16 karakter tanpa kata kamus atau pola tahun.'
                  }
                />
              </p>
              <button
                type="submit"
                disabled={passphrase.length === 0}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#047857] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#065F46] disabled:cursor-not-allowed disabled:opacity-45 dark:bg-[#10B981] dark:text-slate-950 dark:hover:bg-emerald-400"
              >
                Simpan ke Daftar Perbandingan
              </button>
            </div>

            {testedSamples.length > 0 && (
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="mb-2 font-mono text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Perbandingan Uji Lokal Sementara ({testedSamples.length} sampel)
                </div>
                <div className="space-y-1.5">
                  {testedSamples.map((sample) => (
                    <div
                      key={sample.value}
                      className="flex flex-wrap items-center justify-between gap-2 rounded border border-slate-200 bg-white px-3 py-2 font-mono text-xs dark:border-slate-800 dark:bg-slate-900"
                    >
                      <span className="break-all font-semibold text-slate-900 dark:text-slate-100">
                        {showPassphrase
                          ? sample.value
                          : `${sample.value.slice(0, 2)}${'*'.repeat(Math.max(2, sample.value.length - 2))}`}
                      </span>
                      <span
                        className={`rounded px-2 py-0.5 font-semibold ${
                          sample.meetsThreshold
                            ? 'bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950'
                            : 'bg-rose-700 text-white dark:bg-rose-500 dark:text-slate-950'
                        }`}
                      >
                        {sample.tier} ({sample.entropyBits} bit)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(part1Explored || showAllExplanations) && passphrase.length > 0 && (
              <FeedbackBox
                variant={meetsThreshold ? 'safe' : 'risk'}
                label={
                  meetsThreshold
                    ? 'KONDISI AMAN / PASSPHRASE TANGGUH'
                    : 'KONDISI BERISIKO / MUDAH DITEBAK'
                }
              >
                <p>
                  <strong>Dampak Situasi di Lapangan:</strong>{' '}
                  <RichTermText
                    text={
                      meetsThreshold
                        ? 'Serangan brute-force dan credential stuffing akan membutuhkan waktu sangat lama sehingga akun portal maupun VPN terlindungi kuat.'
                        : 'Kata sandi pendek atau berpola mudah ditembus perangkat lunak penebak otomatis dalam hitungan menit hingga hari.'
                    }
                  />
                </p>
                <p className="mt-1.5">
                  <strong>Mengapa &amp; Langkah Tepatnya:</strong>{' '}
                  <RichTermText text="Gunakan kombinasi minimal 4 kata acak (16+ karakter) yang unik untuk setiap layanan tanpa nama perusahaan/tahun, lalu simpan di Password Manager resmi." />
                </p>
              </FeedbackBox>
            )}
          </form>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded bg-[#0B1F3A] px-2.5 py-1 font-mono text-xs font-semibold text-emerald-300 dark:bg-slate-800">
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>BAGIAN 2 / SIMULASI SERANGAN MFA FATIGUE</span>
            </span>
            <span className="rounded border border-slate-300 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {inspectedMfaActions.length}/3 respons dieksplorasi
            </span>
          </div>

          <div className="rounded-lg border-2 border-amber-500/60 bg-slate-900 p-4 text-slate-100 sm:p-5 dark:border-amber-400/60 dark:bg-slate-950">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-amber-400" aria-hidden="true" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                  NOTIFIKASI AUTENTIKATOR SAAS
                </span>
              </div>
              <span className="rounded bg-rose-600 px-2 py-0.5 font-mono text-xs font-bold text-white">
                02.14 WIB | PERCOBAAN KE-7
              </span>
            </div>

            <div className="mt-3 space-y-2 text-sm">
              <p className="font-bold text-white">
                <RichTermText
                  text="Permintaan Persetujuan Login Portal VPN Admin SaaSCore"
                  variant="inverse"
                />
              </p>
              <div className="grid grid-cols-1 gap-1.5 rounded bg-slate-800/80 p-3 font-mono text-xs text-slate-200 sm:grid-cols-2">
                <div>Akun: staf.support@sigitadi.id</div>
                <div>Waktu: 02.14 WIB (Sedang Tidur)</div>
                <div>IP Sumber: 185.220.101.42 (Tidak Dikenal)</div>
                <div>Perangkat: Linux CLI / Proxy Luar Negeri</div>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                <RichTermText
                  text="Ponsel Anda bergetar terus-menerus dengan permintaan persetujuan login yang sama selama 4 menit terakhir padahal Anda tidak sedang mengakses VPN maupun portal kerja."
                  variant="inverse"
                />
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Klik seluruh opsi di bawah ini untuk membandingkan konsekuensinya:
            </p>
            {MFA_ACTIONS.map((action) => {
              const isSelected = activeMfaAction === action.id;
              const isInspected = inspectedMfaActions.includes(action.id);

              return (
                <div key={action.id} className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleExploreMfa(action.id)}
                    aria-pressed={isSelected}
                    className={`flex min-h-[44px] w-full items-start gap-3 rounded-md border px-4 py-3 text-left text-sm leading-relaxed transition-colors ${
                      isSelected
                        ? action.isSafe
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600 dark:border-emerald-400 dark:bg-emerald-950/50 dark:text-emerald-100 dark:ring-emerald-400'
                          : 'border-rose-600 bg-rose-50 text-rose-950 ring-1 ring-rose-600 dark:border-rose-400 dark:bg-rose-950/50 dark:text-rose-100 dark:ring-rose-400'
                        : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="mt-0.5 shrink-0">
                      {isInspected ? (
                        action.isSafe ? (
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
                    <span>{action.label}</span>
                  </button>

                  {showAllExplanations && (
                    <FeedbackBox
                      variant={action.isSafe ? 'safe' : 'risk'}
                      label={
                        action.isSafe ? 'KONDISI AMAN / TEPAT' : 'KONDISI BERISIKO'
                      }
                    >
                      <p>
                        <strong>Dampak Situasi di Lapangan:</strong>{' '}
                        <RichTermText text={action.impact} />
                      </p>
                      <p className="mt-1">
                        <strong>Mengapa &amp; Langkah Tepatnya:</strong>{' '}
                        <RichTermText text={action.rationale} />
                      </p>
                    </FeedbackBox>
                  )}
                </div>
              );
            })}
          </div>

          {!showAllExplanations && selectedMfaObj && (
            <div className="mt-4">
              <FeedbackBox
                variant={selectedMfaObj.isSafe ? 'safe' : 'risk'}
                label={
                  selectedMfaObj.isSafe ? 'KONDISI AMAN / TEPAT' : 'KONDISI BERISIKO'
                }
              >
                <p>
                  <strong>Dampak Situasi di Lapangan:</strong>{' '}
                  <RichTermText text={selectedMfaObj.impact} />
                </p>
                <p className="mt-1.5">
                  <strong>Mengapa &amp; Langkah Tepatnya:</strong>{' '}
                  <RichTermText text={selectedMfaObj.rationale} />
                </p>
              </FeedbackBox>
            </div>
          )}
        </section>
      </div>
    </LabShell>
  );
}

export default Lab04AuthLab;
