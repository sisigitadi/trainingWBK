import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { TooltipTerm } from '../../data/tooltipTerms';

export interface TermTooltipProps {
  label: string;
  entry: TooltipTerm;
}

interface PopoverCoords {
  top: number;
  left: number;
  arrowLeft: number;
  placement: 'top' | 'bottom';
}

export function TermTooltip({ label, entry }: TermTooltipProps) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [coords, setCoords] = useState<PopoverCoords | null>(null);

  const tooltipId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const balloonRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      if (!pinned) {
        setOpen(false);
      }
    }, 90);
  }, [clearCloseTimer, pinned]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || typeof window === 'undefined') return;
    const rect = triggerRef.current.getBoundingClientRect();
    const balloonHeight = balloonRef.current?.offsetHeight ?? 150;
    const balloonWidth = balloonRef.current?.offsetWidth ?? 300;
    const margin = 12;
    const gap = 10;

    const spaceAbove = rect.top;
    const placement: 'top' | 'bottom' =
      spaceAbove >= balloonHeight + gap + 64 ? 'top' : 'bottom';

    const rawTop =
      placement === 'top' ? rect.top - balloonHeight - gap : rect.bottom + gap;
    const top = Math.max(
      margin,
      Math.min(window.innerHeight - balloonHeight - margin, rawTop)
    );

    const triggerCenterX = rect.left + rect.width / 2;
    const rawLeft = triggerCenterX - balloonWidth / 2;
    const left = Math.max(
      margin,
      Math.min(window.innerWidth - balloonWidth - margin, rawLeft)
    );

    const arrowLeft = Math.max(
      14,
      Math.min(balloonWidth - 14, triggerCenterX - left)
    );

    setCoords({ top, left, arrowLeft, placement });
  }, []);

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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPinned(false);
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        !triggerRef.current?.contains(target) &&
        !balloonRef.current?.contains(target)
      ) {
        setPinned(false);
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onMouseEnter={() => {
          clearCloseTimer();
          setOpen(true);
        }}
        onMouseLeave={() => {
          if (!pinned) scheduleClose();
        }}
        onFocus={() => {
          clearCloseTimer();
          setOpen(true);
        }}
        onBlur={() => {
          if (!pinned) scheduleClose();
        }}
        onClick={(event) => {
          event.stopPropagation();
          clearCloseTimer();
          setPinned((prev) => {
            const next = !prev;
            setOpen(next);
            return next;
          });
        }}
        className="inline cursor-help rounded-sm border-b border-dotted border-[#047857] bg-emerald-500/5 px-0.5 font-medium text-inherit transition-colors hover:bg-emerald-500/15 dark:border-emerald-400 dark:bg-emerald-400/10 dark:hover:bg-emerald-400/20"
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
              if (!pinned) scheduleClose();
            }}
            style={
              coords
                ? { top: `${coords.top}px`, left: `${coords.left}px` }
                : { top: '-9999px', left: '-9999px' }
            }
            className="fixed z-50 w-72 max-w-[calc(100vw-24px)] rounded-lg border border-slate-700 bg-[#0B1F3A] p-3.5 text-left text-white shadow-xl dark:border-emerald-500/60 dark:bg-slate-900 sm:w-80"
          >
            {coords && (
              <span
                aria-hidden="true"
                style={{ left: `${coords.arrowLeft}px` }}
                className={`absolute h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-slate-700 bg-[#0B1F3A] dark:border-emerald-500/60 dark:bg-slate-900 ${
                  coords.placement === 'top'
                    ? '-bottom-1.5 border-b border-r'
                    : '-top-1.5 border-l border-t'
                }`}
              />
            )}
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Penjelasan Istilah
            </p>
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
          </div>,
          document.body
        )}
    </>
  );
}
