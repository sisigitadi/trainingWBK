import React, { useMemo } from 'react';
import { TOOLTIP_TERMS, type TooltipTerm } from '../../data/tooltipTerms';
import { TermTooltip, type TermTooltipVariant } from './TermTooltip';

interface CompiledMatcher {
  regex: RegExp;
  patternToTerm: Map<string, TooltipTerm>;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const COMPILED: CompiledMatcher = (() => {
  const patternToTerm = new Map<string, TooltipTerm>();
  const extensionPatterns: string[] = [];
  const wordPatterns: string[] = [];

  for (const entry of TOOLTIP_TERMS) {
    for (const pat of entry.patterns) {
      const key = pat.toLowerCase();
      if (!patternToTerm.has(key)) {
        patternToTerm.set(key, entry);
        if (pat.startsWith('.')) {
          extensionPatterns.push(pat);
        } else {
          wordPatterns.push(pat);
        }
      }
    }
  }

  // Longest-match-first so multi-word phrases and multi-dot extensions win over shorter terms
  extensionPatterns.sort((a, b) => b.length - a.length);
  wordPatterns.sort((a, b) => b.length - a.length);

  const branches: string[] = [];
  if (extensionPatterns.length > 0) {
    const extAlt = extensionPatterns.map(escapeRegExp).join('|');
    branches.push(`(?:${extAlt})(?![A-Za-z0-9_])`);
  }
  if (wordPatterns.length > 0) {
    const wordAlt = wordPatterns.map(escapeRegExp).join('|');
    branches.push(
      `(?<![A-Za-z0-9_.@])(?:${wordAlt})(?![A-Za-z0-9_])(?!://)(?!\\.[A-Za-z0-9])`
    );
  }

  return {
    regex: new RegExp(branches.join('|'), 'gi'),
    patternToTerm,
  };
})();

export interface RichTermTextProps {
  text: string;
  className?: string;
  variant?: TermTooltipVariant;
}

export function RichTermText({
  text,
  className,
  variant = 'default',
}: RichTermTextProps) {
  const nodes = useMemo(() => {
    if (!text) return [text];

    const parts: React.ReactNode[] = [];
    const seenLabels = new Set<string>();
    const regex = new RegExp(COMPILED.regex.source, 'gi');

    let lastIndex = 0;
    let match: RegExpExecArray | null = regex.exec(text);
    let keyIdx = 0;

    while (match !== null) {
      const matchedText = match[0];
      const normalized = matchedText.toLowerCase();
      const start = match.index;
      const entry = COMPILED.patternToTerm.get(normalized);

      if (entry && !seenLabels.has(normalized)) {
        seenLabels.add(normalized);
        if (start > lastIndex) {
          parts.push(text.slice(lastIndex, start));
        }
        parts.push(
          <TermTooltip
            key={`${entry.id}-${keyIdx++}`}
            label={matchedText}
            entry={entry}
            variant={variant}
          />
        );
        lastIndex = start + matchedText.length;
      }

      match = regex.exec(text);
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  }, [text, variant]);

  if (className) {
    return <span className={className}>{nodes}</span>;
  }

  return <>{nodes}</>;
}
