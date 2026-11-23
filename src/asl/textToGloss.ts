// @ts-nocheck
// Text-to-Gloss NLP Pipeline
// Converts translated text into structured Sign Language Gloss tokens
// Implements Topic-Comment reordering, WH-word movement, stopword filtering,
// NMM (Non-Manual Markers) injection, and Fingerspelling fallback for OOV words.

import { SIGN_LEXICON, SYNONYM_MAP } from './signDictionary';
import { SIGN_CLIPS } from './signClips';
import { signLearnerInstance } from './signLearner';
import { spellingLetters, spellingDuration } from './fingerspelling';

// Stopwords to eliminate (pure auxiliary verbs, articles, grammatical particles)
const STOPWORDS = new Set([
  'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'the', 'a', 'an', 'to', 'of', 'for', 'in', 'on', 'at', 'by',
  'do', 'does', 'did', 'that',
  'its', 'as', 'with',
  // Vietnamese particles, grammatical auxiliaries, and intensifiers (handled by NMM facial affect)
  'và', 'là', 'thì', 'mà', 'của', 'ở', 'được', 'bị', 'những', 'các', 'một',
  'rất', 'quá', 'lắm', 'nhiều', 'rất nhiều', 'trời'
]);

// Wh-question markers that should be shifted to the end of the clause in ASL/VSL
const WH_WORDS = new Set(['what', 'where', 'how', 'why', 'who', 'when', 'which']);

/**
 * @typedef {Object} GlossToken
 * @property {string} id - Unique identifier or animation clip key
 * @property {string} text - Original or displayed word
 * @property {string} gloss - Canonical sign gloss in uppercase
 * @property {'SIGN' | 'FINGERSPELL'} type - Sign gesture or fingerspelled letter sequence
 * @property {string[]} [letters] - Array of letters if type is FINGERSPELL
 * @property {number} duration - Milliseconds duration
 * @property {Object} nmm - Non-Manual Markers (eyebrows, head, mouth)
 * @property {string} desc - Description of the gesture
 */

function detectSentenceEmotion(text, rawWords, sentenceType) {
  const lower = text.toLowerCase();

  // 1. Politeness / Greetings
  if (/^(hello|hi|hey|greetings|chào|xin chào)/.test(lower) ||
      /thank|thanks|cảm ơn|cám ơn|nice to meet|hân hạnh/.test(lower)) {
    return { emotion: 'GREETING', smile: 0.85, eyebrows: 'neutral', headTilt: 0.08, headNod: 0.14, mouthOpen: 0.10 };
  }

  // 2. Happy / Joy / Love / Wishes
  if (/happy|love|wish|vui|yêu|thích|chúc|mừng|tuyệt|great|wonderful|good|fine|khoẻ|khỏe|very well/.test(lower)) {
    return { emotion: 'HAPPY', smile: 0.90, eyebrows: 'neutral', headTilt: 0.06, headNod: 0.18, mouthOpen: 0.12 };
  }

  // 3. Negation / Refusal / Denial / Serious
  if (/không|chưa|chẳng|đừng|ngừng|dừng|no|not|don't|doesn't|cannot|never|stop|cold|lạnh/.test(lower)) {
    return { emotion: 'NEGATION', smile: 0.0, eyebrows: 'furrowed', headShake: 0.28, headTilt: 0.0, mouthOpen: 0.0 };
  }

  // 4. Request / Help / Sympathy
  if (/please|help|làm ơn|giúp|xin lỗi|sorry|doctor|bác sĩ/.test(lower)) {
    return { emotion: 'REQUEST', smile: 0.2, eyebrows: 'raised', headTilt: 0.12, headNod: 0.12, mouthOpen: 0.15 };
  }

  // 5. Questions
  if (sentenceType === 'WH_QUESTION') {
    return { emotion: 'WH_QUESTION', smile: 0.1, eyebrows: 'furrowed', headTilt: 0.14, headNod: 0.08, mouthOpen: 0.22 };
  }
  if (sentenceType === 'YES_NO_QUESTION') {
    return { emotion: 'YES_NO_QUESTION', smile: 0.35, eyebrows: 'raised', headTilt: 0.08, headNod: 0.16, mouthOpen: 0.15 };
  }

  // 6. Default statement
  return { emotion: 'STATEMENT', smile: 0.35, eyebrows: 'neutral', headTilt: 0.0, headNod: 0.06, mouthOpen: 0.05 };
}

/**
 * Parses and maps translated text into a sequenced array of Sign Gloss Tokens
 * @param {string} text - Translated/source text (e.g. "What is your name?")
 * @param {string} signLangCode - Target sign language ('asl', 'vsl')
 * @returns {{ tokens: GlossToken[], sentenceType: string, summary: string }}
 */
export function convertTextToGloss(text, signLangCode = 'asl') {
  if (!['asl', 'vsl'].includes(signLangCode)) throw new Error('Chỉ hỗ trợ ASL và VSL.');
  if (!text || typeof text !== 'string') {
    return { tokens: [], sentenceType: 'STATEMENT', summary: '' };
  }

  const rawLower = text.normalize('NFC').toLowerCase().trim();
  const isQuestion = rawLower.includes('?') ||
    rawLower.startsWith('what') || rawLower.startsWith('where') ||
    rawLower.startsWith('how') || rawLower.startsWith('why') ||
    rawLower.startsWith('who') || rawLower.startsWith('do you') ||
    rawLower.startsWith('can you');

  const hasWhWord = Array.from(WH_WORDS).some(wh => rawLower.includes(wh));
  const sentenceType = isQuestion ? (hasWhWord ? 'WH_QUESTION' : 'YES_NO_QUESTION') : 'STATEMENT';
  const sentenceEmotion = detectSentenceEmotion(text, rawLower, sentenceType);

  // 1. Tokenize and greedily group compound words from SYNONYM_MAP (especially for Vietnamese & phrases)
  const rawWords = rawLower
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  const compoundWords = [];
  let wIdx = 0;
  while (wIdx < rawWords.length) {
    let matched = false;
    for (let len = Math.min(4, rawWords.length - wIdx); len >= 2; len--) {
      const phrase = rawWords.slice(wIdx, wIdx + len).join(' ');
      if (SYNONYM_MAP[phrase]) {
        compoundWords.push(phrase);
        wIdx += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      compoundWords.push(rawWords[wIdx]);
      wIdx++;
    }
  }

  // 2. Syntax Reordering (SVO -> Topic-Comment / WH-movement)
  // Check for common conversational formulas / greetings first
  const normalizedPhrase = rawWords.join(' ');
  let reorderedWords;

  if (normalizedPhrase === 'hello how are you today' || normalizedPhrase === 'hello how you today') {
    reorderedWords = ['hello', 'how', 'you', 'today'];
  } else if (normalizedPhrase === 'how are you today' || normalizedPhrase === 'how you today') {
    reorderedWords = ['how', 'you', 'today'];
  } else if (normalizedPhrase === 'hello how are you' || normalizedPhrase === 'hello how you') {
    reorderedWords = ['hello', 'how', 'you'];
  } else if (normalizedPhrase === 'how are you' || normalizedPhrase === 'how you') {
    reorderedWords = ['how', 'you'];
  } else {
    // Keep greetings (e.g. HELLO, HI, XIN CHÀO) at the start of the utterance
    const GREETINGS = new Set(['hello', 'hi', 'hey', 'goodbye', 'bye', 'xin chào', 'chào', 'tạm biệt']);
    const greetings = [];
    const extractedWh = [];
    const contentWords = [];

    for (const word of compoundWords) {
      if (GREETINGS.has(word)) {
        greetings.push(word);
      } else if (WH_WORDS.has(word) || /^(cái gì|ở đâu|khi nào|tại sao|thế nào|bao nhiêu|ai|gì|đâu|sao)$/.test(word)) {
        extractedWh.push(word);
      } else if (!STOPWORDS.has(word)) {
        contentWords.push(word);
      }
    }

    reorderedWords = [...greetings, ...contentWords, ...extractedWh];
  }

  // 3. Resolve each word to Sign Lexicon or Fingerspelling
  const glossTokens = [];

  for (let i = 0; i < reorderedWords.length; i++) {
    const word = reorderedWords[i];
    const lexiconKey = SYNONYM_MAP[word];
    const hasFrame = lexiconKey && (SIGN_CLIPS[lexiconKey] || signLearnerInstance.resolveFrames(lexiconKey, signLangCode));

    if (lexiconKey && SIGN_LEXICON[lexiconKey] && hasFrame) {
      // Known Sign gesture found in SignBank or SignLearner
      const signData = SIGN_LEXICON[lexiconKey][signLangCode] || SIGN_LEXICON[lexiconKey]['asl'] || SIGN_LEXICON[lexiconKey];
      
      // Determine Non-Manual Markers (NMM) with sentence emotion context
      const tokenNmm = {
        ...sentenceEmotion,
        ...(signData.nmm || {})
      };

      // In ASL/VSL: Wh-questions require furrowed eyebrows, but greetings remain warm and smiling
      if (word === 'hello' || word === 'hi') {
        tokenNmm.eyebrows = 'neutral';
        tokenNmm.smile = 0.8;
        tokenNmm.headTilt = 0.06;
      } else if (word === 'love' || word === 'happy' || word === 'wish') {
        tokenNmm.smile = 0.85;
      } else if (sentenceType === 'WH_QUESTION' && (WH_WORDS.has(word) || i === reorderedWords.length - 1)) {
        tokenNmm.eyebrows = 'furrowed';
        tokenNmm.headTilt = 0.12;
      } else if (sentenceType === 'YES_NO_QUESTION' && i === reorderedWords.length - 1) {
        tokenNmm.eyebrows = 'raised';
        tokenNmm.headTilt = 0.08;
      }

      glossTokens.push({
        id: `${lexiconKey}_${i}`,
        clipKey: lexiconKey,
        signLang: signLangCode,
        text: word,
        gloss: signData.gloss || lexiconKey,
        type: 'SIGN',
        duration: signData.duration || 1000,
        nmm: tokenNmm,
        desc: signData.desc || `Ký hiệu: ${word}`
      });
    } else {
      // Out-Of-Vocabulary (OOV) or Proper Noun -> Trigger Fingerspelling Fallback with clean diacritics
      const letters = spellingLetters(word, signLangCode);

      if (letters.length > 0) {
        glossTokens.push({
          id: `FS_${word}_${i}`,
          clipKey: 'FINGERSPELL',
          signLang: signLangCode,
          text: word,
          gloss: letters.join('-'),
          type: 'FINGERSPELL',
          letters: letters,
          duration: spellingDuration(letters),
          nmm: {
            ...sentenceEmotion,
            eyebrows: sentenceType === 'WH_QUESTION' ? 'furrowed' : sentenceType === 'YES_NO_QUESTION' ? 'raised' : 'neutral',
            smile: sentenceEmotion.smile ?? 0.1
          },
          desc: `Đánh vần ngón tay (Fingerspell): ${letters.join('-')}`
        });
      }
    }
  }

  const summary = glossTokens.map(t => `[${t.gloss}]`).join(' ');

  return {
    tokens: glossTokens,
    sentenceType,
    summary
  };
}
