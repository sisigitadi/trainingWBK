import React, { useMemo } from 'react';
import { TOOLTIP_TERMS, type TooltipTerm } from '../../data/tooltipTerms';
import { TermTooltip } from './TermTooltip';

interface CompiledMatcher {
  regex: RegExp;
  patternToTerm: Map<string, TooltipTerm>;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const COMPILED: CompiledMatcher = (() => {
  const patternToTerm = new Map<string, TooltipTerm>();
  const allPatterns: string[] = [];

  for (const entry of TOOLTIP_TERMS) {
    for (const pat of entry.patterns) {
      const key = pat.toLowerCase();
      if (!patternToTerm.has(key)) {
        patternToTerm.set(key, entry);
        allPatterns.push(pat);
      }
    }
  }

  // Longest-match-first so multi-word phrases win over nested short acronyms
  allPatterns.sort((a, b) => b.length - a.length);
  const alternation = allPatterns.map(escapeRegExp).join('|');

  return {
    regex: new RegExp(`(?<![A-Za-z0-9_])(?:${alternation})(?![A-Za-z0-9_])`, 'gi'),
    patternToTerm,
  };
})();

export interface RichTermTextProps {
  text: string;
}

export function RichTermText({ text }: RichTermTextProps) {
  const nodes = useMemo(() => {
    if (!text) return [text];

    const parts: React.ReactNode[] = [];
    const seenIds = new Set<string>();
    const regex = new RegExp(COMPILED.regex.source, 'gi');

    let lastIndex = 0;
    let match: RegExpExecArray | null = regex.exec(text);
    let keyIdx = 0;

    while (match !== null) {
      const matchedText = match[0];
      const start = match.index;
      const entry = COMPILED.patternToTerm.get(matchedText.toLowerCase());

      if (entry && !seenIds.has(entry.id)) {
        seenIds.add(entry.id);
        if (start > lastIndex) {
          parts.push(text.slice(lastIndex, start));
        }
        parts.push(
          <TermTooltip key={`${entry.id}-${keyIdx++}`} label={matchedText} entry={entry} />
        );
        lastIndex = start + matchedText.length;
      }

      match = regex.exec(text);
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  }, [text]);

  return <>{nodes}</>;
}
