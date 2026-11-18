export type RundownItemType = 'module' | 'break' | 'ishoma' | 'closing';

export interface RundownSegment {
  id: string;
  label: string;
  type: RundownItemType;
  startMinutes: number;
  endMinutes: number;
  timeRange: string;
  route?: string;
}

export const RUNDOWN_SEGMENTS: RundownSegment[] = [
  {
    id: 'modul-01',
    label: 'Modul 01: Fundamental IT Security dan Prinsip Cybersecurity',
    type: 'module',
    startMinutes: 8 * 60 + 30,
    endMinutes: 9 * 60 + 10,
    timeRange: '08.30 - 09.10',
    route: '#/modul/1',
  },
  {
    id: 'modul-02',
    label: 'Modul 02: Pengenalan Ancaman dan Serangan Siber',
    type: 'module',
    startMinutes: 9 * 60 + 10,
    endMinutes: 9 * 60 + 50,
    timeRange: '09.10 - 09.50',
    route: '#/modul/2',
  },
  {
    id: 'rehat-pagi',
    label: 'Rehat Kopi Pagi',
    type: 'break',
    startMinutes: 9 * 60 + 50,
    endMinutes: 10 * 60 + 5,
    timeRange: '09.50 - 10.05',
  },
  {
    id: 'modul-03',
    label: 'Modul 03: Phishing Awareness dan Social Engineering',
    type: 'module',
    startMinutes: 10 * 60 + 5,
    endMinutes: 10 * 60 + 50,
    timeRange: '10.05 - 10.50',
    route: '#/modul/3',
  },
  {
    id: 'modul-04',
    label: 'Modul 04: Password Security dan Access Management',
    type: 'module',
    startMinutes: 10 * 60 + 50,
    endMinutes: 11 * 60 + 30,
    timeRange: '10.50 - 11.30',
    route: '#/modul/4',
  },
  {
    id: 'modul-05',
    label: 'Modul 05: Data Protection dan Information Security',
    type: 'module',
    startMinutes: 11 * 60 + 30,
    endMinutes: 12 * 60,
    timeRange: '11.30 - 12.00',
    route: '#/modul/5',
  },
  {
    id: 'ishoma',
    label: 'ISHOMA (Istirahat, Sholat, Makan Siang)',
    type: 'ishoma',
    startMinutes: 12 * 60,
    endMinutes: 13 * 60,
    timeRange: '12.00 - 13.00',
  },
  {
    id: 'modul-06',
    label: 'Modul 06: Endpoint Security dan Device Protection',
    type: 'module',
    startMinutes: 13 * 60,
    endMinutes: 13 * 60 + 40,
    timeRange: '13.00 - 13.40',
    route: '#/modul/6',
  },
  {
    id: 'modul-07',
    label: 'Modul 07: Network Security dan Safe Internet Practices',
    type: 'module',
    startMinutes: 13 * 60 + 40,
    endMinutes: 14 * 60 + 20,
    timeRange: '13.40 - 14.20',
    route: '#/modul/7',
  },
  {
    id: 'modul-08',
    label: 'Modul 08: Cybersecurity Incident Response dan Reporting',
    type: 'module',
    startMinutes: 14 * 60 + 20,
    endMinutes: 14 * 60 + 55,
    timeRange: '14.20 - 14.55',
    route: '#/modul/8',
  },
  {
    id: 'modul-09',
    label: 'Modul 09: Email, Cloud, dan Digital Communication Security',
    type: 'module',
    startMinutes: 14 * 60 + 55,
    endMinutes: 15 * 60 + 30,
    timeRange: '14.55 - 15.30',
    route: '#/modul/9',
  },
  {
    id: 'modul-10',
    label: 'Modul 10: Cybersecurity Best Practices dan Security Awareness Culture',
    type: 'module',
    startMinutes: 15 * 60 + 30,
    endMinutes: 16 * 60,
    timeRange: '15.30 - 16.00',
    route: '#/modul/10',
  },
  {
    id: 'sesi-penutup',
    label: 'Sesi Penutup: Rangkuman dan Kartu Saku',
    type: 'closing',
    startMinutes: 16 * 60,
    endMinutes: 16 * 60 + 15,
    timeRange: '16.00 - 16.15',
    route: '#/penutup',
  },
];

export interface RundownStatus {
  activeSegment: RundownSegment | null;
  nextSegment: RundownSegment | null;
  minutesRemaining: number | null;
  isWarningWindow: boolean;
  warningKey: string | null;
  warningMessage: string | null;
  statusSummary: string;
}

function buildWarningMessage(nextSegment: RundownSegment, remaining: number): string {
  switch (nextSegment.type) {
    case 'break':
      return `Sisa ${remaining} menit sebelum ${nextSegment.label} (${nextSegment.timeRange}).`;
    case 'ishoma':
      return `Sisa ${remaining} menit sebelum waktu ${nextSegment.label} (${nextSegment.timeRange}).`;
    case 'closing':
      return `Sisa ${remaining} menit menuju ${nextSegment.label} (${nextSegment.timeRange}).`;
    case 'module':
    default:
      return `Sisa ${remaining} menit sebelum berpindah ke ${nextSegment.label} (${nextSegment.timeRange}).`;
  }
}

export function getRundownStatus(now: Date): RundownStatus {
  const exactMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  let activeIndex = -1;
  for (let i = 0; i < RUNDOWN_SEGMENTS.length; i += 1) {
    const seg = RUNDOWN_SEGMENTS[i];
    if (seg && exactMinutes >= seg.startMinutes && exactMinutes < seg.endMinutes) {
      activeIndex = i;
      break;
    }
  }

  if (activeIndex >= 0) {
    const activeSegment = RUNDOWN_SEGMENTS[activeIndex] ?? null;
    const nextSegment = RUNDOWN_SEGMENTS[activeIndex + 1] ?? null;
    if (!activeSegment) {
      return {
        activeSegment: null,
        nextSegment: null,
        minutesRemaining: null,
        isWarningWindow: false,
        warningKey: null,
        warningMessage: null,
        statusSummary: 'Di luar jam sesi (08.30 - 16.15)',
      };
    }

    const minutesRemaining = Math.max(1, Math.ceil(activeSegment.endMinutes - exactMinutes));
    const isWarningWindow = Boolean(
      nextSegment && minutesRemaining >= 1 && minutesRemaining <= 15
    );
    const warningKey =
      isWarningWindow && nextSegment ? `${activeSegment.id}->${nextSegment.id}` : null;
    const warningMessage =
      isWarningWindow && nextSegment ? buildWarningMessage(nextSegment, minutesRemaining) : null;

    return {
      activeSegment,
      nextSegment,
      minutesRemaining,
      isWarningWindow,
      warningKey,
      warningMessage,
      statusSummary: `${activeSegment.label} (${activeSegment.timeRange})`,
    };
  }

  const firstSegment = RUNDOWN_SEGMENTS[0] ?? null;
  if (firstSegment && exactMinutes < firstSegment.startMinutes) {
    return {
      activeSegment: null,
      nextSegment: firstSegment,
      minutesRemaining: null,
      isWarningWindow: false,
      warningKey: null,
      warningMessage: null,
      statusSummary: 'Menuju Sesi Pagi (08.30)',
    };
  }

  return {
    activeSegment: null,
    nextSegment: null,
    minutesRemaining: null,
    isWarningWindow: false,
    warningKey: null,
    warningMessage: null,
    statusSummary: 'Di luar jam sesi (08.30 - 16.15)',
  };
}

const WEEKDAYS_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] as const;
const MONTHS_SHORT_ID = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
] as const;

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatHeaderDate(now: Date): string {
  const dayName = WEEKDAYS_ID[now.getDay()] ?? '';
  const dateNum = now.getDate();
  const monthName = MONTHS_SHORT_ID[now.getMonth()] ?? '';
  const year = now.getFullYear();
  return `${dayName}, ${dateNum} ${monthName} ${year}`;
}

export function formatHeaderClock(now: Date): string {
  const hh = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  const ss = pad2(now.getSeconds());
  const isWib = now.getTimezoneOffset() === -420;
  return isWib ? `${hh}:${mm}:${ss} WIB` : `${hh}:${mm}:${ss}`;
}
