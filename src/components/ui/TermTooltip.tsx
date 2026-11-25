import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { TooltipTerm } from '../../data/tooltipTerms';

const TOOLTIP_OPEN_EVENT = 'saas:tooltip-open';

export type TermTooltipVariant = 'default' | 'inverse';

export interface TermTooltipProps {
  label: string;
  entry: TooltipTerm;
  variant?: TermTooltipVariant;
}

interface PopoverCoords {
  top: number;
  left: number;
  arrowLeft: number;
  placement: 'top' | 'bottom';
}

export function TermTooltip({
  label,
  entry,
  variant = 'default',
}: TermTooltipProps) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [coords, setCoords] = useState<PopoverCoords | null>(null);

  const tooltipId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const balloonRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const pinnedRef = useRef(false);
  const suppressFocusOpenRef = useRef(false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeTooltip = useCallback(() => {
    clearCloseTimer();
    pinnedRef.current = false;
    setPinned(false);
    setOpen(false);
  }, [clearCloseTimer]);

  const focusTriggerSilently = useCallback(() => {
    if (!triggerRef.current || document.activeElement === triggerRef.current) {
      return;
    }
    suppressFocusOpenRef.current = true;
    triggerRef.current.focus();
    window.setTimeout(() => {
      suppressFocusOpenRef.current = false;
    }, 0);
  }, []);

  const announceOpen = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent<string>(TOOLTIP_OPEN_EVENT, { detail: tooltipId })
      );
    }
  }, [tooltipId]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      if (!pinnedRef.current) {
        setOpen(false);
      }
    }, 90);
  }, [clearCloseTimer]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || typeof window === 'undefined') return;
    const rects = triggerRef.current.getClientRects();
    const rect = rects.item(0) ?? triggerRef.current.getBoundingClientRect();

    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      closeTooltip();
      return;
    }

    const balloonHeight = balloonRef.current?.offsetHeight ?? 150;
    const balloonWidth = balloonRef.current?.offsetWidth ?? 300;
    const margin = 12;
    const gap = 10;

    const spaceAbove = rect.top - margin;
    const spaceBelow = window.innerHeight - rect.bottom - margin;

    let placement: 'top' | 'bottom';
    if (spaceAbove >= balloonHeight + gap) {
      placement = 'top';
    } else if (spaceBelow >= balloonHeight + gap) {
      placement = 'bottom';
    } else {
      placement = spaceAbove >= spaceBelow ? 'top' : 'bottom';
    }

    const rawTop =
      placement === 'top' ? rect.top - balloonHeight - gap : rect.bottom + gap;
    const maxTop = Math.max(margin, window.innerHeight - balloonHeight - margin);
    const top = Math.max(margin, Math.min(maxTop, rawTop));

    const triggerCenterX = rect.left + rect.width / 2;
    const rawLeft = triggerCenterX - balloonWidth / 2;
    const maxLeft = Math.max(margin, window.innerWidth - balloonWidth - margin);
    const left = Math.max(margin, Math.min(maxLeft, rawLeft));

    const arrowLeft = Math.max(
      14,
      Math.min(balloonWidth - 14, triggerCenterX - left)
    );

    setCoords({ top, left, arrowLeft, placement });
  }, [closeTooltip]);

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }
    updatePosition();
    const raf = window.requestAnimationFrame(updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const handleOtherTooltipOpen = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail !== tooltipId) {
        closeTooltip();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeTooltip();
        focusTriggerSilently();
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        !triggerRef.current?.contains(target) &&
        !balloonRef.current?.contains(target)
      ) {
        closeTooltip();
      }
    };

    window.addEventListener(TOOLTIP_OPEN_EVENT, handleOtherTooltipOpen);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      window.removeEventListener(TOOLTIP_OPEN_EVENT, handleOtherTooltipOpen);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [open, tooltipId, closeTooltip, focusTriggerSilently]);

  const triggerVariantClass =
    variant === 'inverse'
      ? 'border-emerald-300 bg-white/10 text-emerald-100 hover:bg-white/20'
      : 'border-[#047857] bg-emerald-500/5 text-inherit hover:bg-emerald-500/15 dark:border-emerald-400 dark:bg-emerald-400/10 dark:hover:bg-emerald-400/20';

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onMouseEnter={() => {
          clearCloseTimer();
          announceOpen();
          setOpen(true);
        }}
        onMouseLeave={() => {
          if (!pinnedRef.current) scheduleClose();
        }}
        onFocus={() => {
          if (suppressFocusOpenRef.current) {
            suppressFocusOpenRef.current = false;
            return;
          }
          clearCloseTimer();
          announceOpen();
          setOpen(true);
        }}
        onBlur={() => {
          if (!pinnedRef.current) scheduleClose();
        }}
        onClick={(event) => {
          event.stopPropagation();
          clearCloseTimer();
          const nextPinned = !pinnedRef.current;
          pinnedRef.current = nextPinned;
          setPinned(nextPinned);
          setOpen(nextPinned);
          if (nextPinned) {
            announceOpen();
          }
        }}
        className={`inline cursor-help rounded-sm border-b border-dotted px-0.5 font-medium transition-colors print:border-0 print:bg-transparent print:p-0 ${triggerVariantClass}`}
      >
        {label}
      </button>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={balloonRef}
            id={tooltipId}
            role="tooltip"
            onMouseEnter={() => {
              clearCloseTimer();
              setOpen(true);
            }}
            onMouseLeave={() => {
              if (!pinnedRef.current) scheduleClose();
            }}
            style={
              coords
                ? { top: `${coords.top}px`, left: `${coords.left}px` }
                : { top: '-9999px', left: '-9999px' }
            }
            className="no-print fixed z-50 w-72 max-w-[calc(100vw-24px)] text-left sm:w-80"
          >
            {coords && (
              <span
                aria-hidden="true"
                style={{ left: `${coords.arrowLeft}px` }}
                className={`pointer-events-none absolute z-10 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-slate-700 bg-[#0B1F3A] dark:border-emerald-500/60 dark:bg-slate-900 ${
                  coords.placement === 'top'
                    ? '-bottom-1.5 border-b border-r'
                    : '-top-1.5 border-l border-t'
                }`}
              />
            )}
            <div className="max-h-[70vh] overflow-y-auto rounded-lg border border-slate-700 bg-[#0B1F3A] p-3.5 text-white shadow-xl dark:border-emerald-500/60 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Penjelasan Istilah
                </p>
                {pinned && (
                  <button
                    type="button"
                    aria-label="Tutup penjelasan"
                    onClick={(event) => {
                      event.stopPropagation();
                      closeTooltip();
                      focusTriggerSilently();
                    }}
                    className="-mr-2 -mt-2 inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-md text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <span aria-hidden="true" className="text-base leading-none">
                      &times;
                    </span>
                  </button>
                )}
              </div>
              <p className="mt-0.5 text-sm font-bold leading-snug text-white">
                {entry.term}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-100">
                {entry.meaning}
              </p>
              {entry.context && (
                <p className="mt-2 border-t border-white/15 pt-1.5 text-[11px] leading-relaxed text-emerald-200">
                  <span className="font-semibold">Konteks: </span>
                  {entry.context}
                </p>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
