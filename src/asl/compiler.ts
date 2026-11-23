import { ASLCompilationResult, SignSegment } from '../types';
import { convertTextToGloss } from './textToGloss';
import { GlossToken } from './SignAnimationEngine';
import { SIGN_CLIPS } from './signClips';
import { BUILTIN_EXTENDED_SIGNS } from './signLearner';
import { SYNONYM_MAP } from './signDictionary';
import { CUSTOM_SIGN_WORDS } from './customSigns';
import { WLASL_SIGN_MAP, isWlaslWord } from './wlaslSigns';
import { translateVietnameseToASLGloss } from './vietnameseMapping';
import { useSettingsStore } from '../stores/settingsStore';

// Combined set of verified signable words from ASL & VSL lexicon
export const verifiedSignSet = new Set<string>([
  ...Object.keys(SIGN_CLIPS).map((k) => k.toUpperCase()),
  ...Object.keys(BUILTIN_EXTENDED_SIGNS).map((k) => k.toUpperCase()),
  ...Object.keys(WLASL_SIGN_MAP).map((k) => k.toUpperCase()),
  ...CUSTOM_SIGN_WORDS.map((k) => k.toUpperCase())
]);

/**
 * Normalizes user input text
 */
export function normalizeInputText(text: string): string {
  return text
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Check if a single word has a verified ASL/VSL sign in the lexicon
 */
export function isWordVerified(word: string): boolean {
  const upper = word.toUpperCase();
  const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
  const synMap = SYNONYM_MAP as Record<string, string>;
  return (
    verifiedSignSet.has(upper) ||
    verifiedSignSet.has(clean.toUpperCase()) ||
    Boolean(synMap[word.toLowerCase()]) ||
    Boolean(synMap[clean]) ||
    isWlaslWord(word)
  );
}

/**
 * Compiles input text into ASL/VSL structured tokens with word segments and status.
 * Powered by high-fidelity NLP text-to-gloss pipeline from sign-studio.
 * Supports both English text and Vietnamese phrases with authentic ASL/VSL sign definitions.
 */
export function compileASLUtterance(
  rawText: string,
  signLangOverride?: 'asl' | 'vsl'
): ASLCompilationResult {
  const normalized = normalizeInputText(rawText);
  if (!normalized) {
    return {
      clip: null,
      signedWords: [],
      spelledWords: [],
      segments: [],
      duration: 0,
      totalTracks: 0,
      tokens: []
    };
  }

  const signLang =
    signLangOverride || useSettingsStore.getState()?.settings?.signLanguage || 'asl';

  // Translate Vietnamese phrases to standard ASL/VSL gloss sequence
  const aslText = translateVietnameseToASLGloss(normalized);

  const glossResult = convertTextToGloss(aslText, signLang);
  const tokens = glossResult.tokens;

  const signedList: string[] = [];
  const spelledList: string[] = [];

  for (const t of tokens) {
    if (t.type === 'SIGN') {
      signedList.push(t.gloss);
      if (t.gloss === 'ME / I') {
        signedList.push('I');
        signedList.push('ME');
      }
      if (t.clipKey === 'THANK_YOU') {
        signedList.push('THANK');
        signedList.push('YOU');
      }
    } else {
      const cleanSpelled = (t.text || t.gloss)
        .replace(/^fs-/, '')
        .replace(/-/g, '')
        .toUpperCase();
      spelledList.push(cleanSpelled);
    }
  }

  const segments: SignSegment[] = tokens.map((token) => {
    const isSigned = token.type === 'SIGN';
    const cleanWord = (token.text || token.gloss).toUpperCase();
    return {
      rawWord: token.text,
      normalized: cleanWord,
      gloss: isSigned ? token.gloss : `fs-${cleanWord}`,
      status: isSigned ? 'verified' : 'fingerspelled',
      descriptionVi:
        token.desc ||
        (isSigned
          ? `Ký hiệu ${signLang.toUpperCase()}: ${token.gloss}`
          : `Đánh vần từng chữ cái: ${token.letters?.join('-')}`),
      duration: (token.duration || 1000) / 1000
    };
  });

  const totalDuration = tokens.reduce(
    (acc, t) => acc + (t.duration || 1000) / 1000,
    0
  );
  const totalTracks = tokens.length * 36;

  return {
    clip: {
      duration: totalDuration,
      tracks: new Array(totalTracks).fill(null),
      name: 'sign-sequence',
      tokens
    },
    signedWords: signedList,
    spelledWords: spelledList,
    segments,
    duration: totalDuration,
    totalTracks,
    tokens
  };
}
