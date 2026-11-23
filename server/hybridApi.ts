import type { Connect } from 'vite';
import { verifiedSignSet } from '../src/asl/compiler';

export const DEFAULT_MODEL = 'gemini-2.5-flash';
export const MAX_INPUT_LENGTH = 500;
export const MAX_GLOSS_TOKENS = 100;

const sentenceTypes = ['STATEMENT', 'WH_QUESTION', 'YES_NO_QUESTION'];
const eyebrows = ['neutral', 'raised', 'furrowed'];
const numberNames = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];

const bounded = (value: any, min: number, max: number, fallback = 0) =>
  typeof value === 'number' && Number.isFinite(value)
    ? Math.max(min, Math.min(max, value))
    : fallback;

export const GLOSS_SCHEMA = {
  type: 'object',
  required: ['translation', 'sentenceType', 'tokens'],
  properties: {
    translation: { type: 'string', description: 'Faithful English translation of the entire input.' },
    sentenceType: { type: 'string', enum: sentenceTypes },
    tokens: {
      type: 'array',
      description: 'Between 1 and 100 ASL gloss tokens.',
      items: {
        type: 'object',
        required: ['gloss', 'spelling', 'nmm'],
        properties: {
          gloss: { type: 'string', description: 'One ASL gloss in UPPERCASE; compound signs use underscores.' },
          spelling: { type: 'string', description: 'English word or romanized name to fingerspell if no animation exists.' },
          nmm: {
            type: 'object',
            required: ['eyebrows', 'smile', 'headTilt', 'headNod', 'headShake', 'mouthOpen'],
            properties: {
              eyebrows: { type: 'string', enum: eyebrows },
              smile: { type: 'number', description: 'Intensity from 0 to 1.' },
              headTilt: { type: 'number', description: 'Angle from -0.25 to 0.25 radians.' },
              headNod: { type: 'number', description: 'Angle from -0.25 to 0.25 radians.' },
              headShake: { type: 'number', description: 'Angle from -0.25 to 0.25 radians.' },
              mouthOpen: { type: 'number', description: 'Intensity from 0 to 0.5.' }
            }
          }
        }
      }
    }
  }
};

export function normalizeNmm(value: any = {}) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) value = {};
  return {
    eyebrows: eyebrows.includes(value.eyebrows) ? value.eyebrows : 'neutral',
    smile: bounded(value.smile, 0, 1),
    headTilt: bounded(value.headTilt, -0.25, 0.25),
    headNod: bounded(value.headNod, -0.25, 0.25),
    headShake: bounded(value.headShake, -0.25, 0.25),
    mouthOpen: bounded(value.mouthOpen, 0, 0.5)
  };
}

export function mapHybridGloss(data: any, availableSigns: Set<string>) {
  if (
    !data ||
    typeof data.translation !== 'string' ||
    !data.translation.trim() ||
    !sentenceTypes.includes(data.sentenceType) ||
    !Array.isArray(data.tokens) ||
    !data.tokens.length ||
    data.tokens.length > MAX_GLOSS_TOKENS
  ) {
    throw new Error('INVALID_GLOSS');
  }

  const tokens = data.tokens.map((item: any, index: number) => {
    if (
      !item ||
      typeof item.gloss !== 'string' ||
      !item.gloss.trim() ||
      typeof item.spelling !== 'string' ||
      !item.nmm
    ) {
      throw new Error('INVALID_GLOSS');
    }

    const gloss = item.gloss.trim().toUpperCase();
    const key = gloss.replace(/[ -]+/g, '_');
    const nmm = normalizeNmm(item.nmm);
    const isSigned = availableSigns.has(key) || availableSigns.has(gloss);

    if (isSigned) {
      return {
        id: `AI_${index}`,
        type: 'SIGN',
        clipKey: key,
        text: gloss,
        gloss,
        nmm,
        status: 'verified'
      };
    }

    const spelling = (item.spelling.trim() || gloss)
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .replace(/[đĐ]/g, 'D')
      .toUpperCase()
      .replace(/\d/g, (d: string) => numberNames[Number(d)]);

    const letters = spelling.replace(/[^A-Z]/g, '').split('');
    return {
      id: `AI_FS_${index}`,
      type: 'FINGERSPELL',
      clipKey: 'FINGERSPELL',
      text: gloss,
      gloss: `fs-${gloss}`,
      letters,
      nmm,
      status: 'fingerspelled'
    };
  });

  return {
    translation: data.translation.trim(),
    sentenceType: data.sentenceType,
    tokens
  };
}

const SYSTEM_PROMPT = `You create experimental ASL gloss plans for a 3D signing prototype.
Translate the user's text faithfully into English, then plan an ASL gloss sequence in context.
Preserve negation, names, numbers, time and meaning.
For conversational greetings and idioms (e.g. 'Hello, how are you today?'), preserve the natural greeting order: HELLO -> HOW -> YOU -> TODAY.
Non-manual markers carry grammar as well as affect. Assign them per token across the relevant question/negation scope.
Assign eyebrows (neutral, raised, furrowed), smile, headTilt, headNod, headShake.
Available signs with dedicated animations: ${Array.from(verifiedSignSet).join(', ')}.
Use these exact identifiers when semantically appropriate. Other words will be fingerspelled.
For every token supply spelling as an English word or romanized proper name using A-Z. Write numbers as English words. Keep distinct concepts as separate tokens. Return only the requested JSON.`;

async function readJson(req: any): Promise<any> {
  let size = 0;
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 8192) throw Object.assign(new Error('Dữ liệu gửi quá lớn.'), { status: 413 });
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw Object.assign(new Error('Dữ liệu JSON không hợp lệ.'), { status: 400 });
  }
}

function reply(res: any, status: number, body: any) {
  if (res.destroyed || res.writableEnded) return;
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(JSON.stringify(body));
}

export function createHybridApi(options: { env?: Record<string, string | undefined> } = {}): Connect.NextHandleFunction {
  const env = options.env || process.env;
  const cache = new Map<string, { time: number; value: any }>();

  return async (req: any, res: any, next: any) => {
    const url = req.url?.split('?')[0];

    // GET /api/hybrid/health
    if (url === '/api/hybrid/health' && req.method === 'GET') {
      const apiKey = (req.headers['x-gemini-api-key'] as string) || env.GEMINI_API_KEY || env.GOOGLE_API_KEY;
      const model = env.GEMINI_MODEL || DEFAULT_MODEL;
      const hasKey = Boolean(apiKey && apiKey.trim());

      return reply(res, 200, {
        configured: hasKey,
        provider: 'gemini',
        model,
        target: 'asl',
        availableSigns: verifiedSignSet.size
      });
    }

    // POST /api/hybrid/gloss
    if (url === '/api/hybrid/gloss' && req.method === 'POST') {
      try {
        const clientKey = req.headers['x-gemini-api-key'] as string;
        const apiKey = clientKey?.trim() || env.GEMINI_API_KEY?.trim() || env.GOOGLE_API_KEY?.trim();
        const model = env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;

        if (!apiKey) {
          return reply(res, 503, {
            error: 'Chưa cấu hình GEMINI_API_KEY. Vui lòng thêm key vào file .env hoặc cài đặt trong ứng dụng.',
            code: 'NOT_CONFIGURED'
          });
        }

        const input = await readJson(req);
        if (!input || typeof input.text !== 'string' || !input.text.trim()) {
          return reply(res, 400, { error: 'Nhập câu cần dịch.', code: 'INVALID_INPUT' });
        }

        const cacheKey = JSON.stringify([input.text.trim(), input.sourceLanguage || 'vi', model]);
        const cached = cache.get(cacheKey);
        if (cached && Date.now() - cached.time < 15 * 60_000) {
          return reply(res, 200, { ...cached.value, cached: true });
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [
              {
                role: 'user',
                parts: [{ text: JSON.stringify({ sourceLanguage: input.sourceLanguage || 'vi', text: input.text.trim() }) }]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 8192,
              responseMimeType: 'application/json',
              responseJsonSchema: GLOSS_SCHEMA
            }
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          return reply(res, 502, {
            error: `Gemini API lỗi (${response.status}): ${errText}`,
            code: 'PROVIDER_ERROR'
          });
        }

        const payload: any = await response.json();
        const content = payload.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!content) {
          return reply(res, 502, { error: 'Gemini không trả về nội dung hợp lệ.', code: 'INVALID_RESPONSE' });
        }

        const rawResult = JSON.parse(content);
        const mappedResult = mapHybridGloss(rawResult, verifiedSignSet);
        const finalValue = { ...mappedResult, provider: 'gemini', model, cached: false };

        cache.set(cacheKey, { time: Date.now(), value: finalValue });
        if (cache.size > 100) cache.delete(cache.keys().next().value!);

        return reply(res, 200, finalValue);
      } catch (err: any) {
        return reply(res, err.status || 500, {
          error: err.message || 'Lỗi xử lý yêu cầu dịch.',
          code: 'SERVER_ERROR'
        });
      }
    }

    next();
  };
}
