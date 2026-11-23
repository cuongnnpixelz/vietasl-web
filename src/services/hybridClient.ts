/**
 * Hybrid ASL Translation Client (Gemini AI + Local fallback)
 * Inspired by cuongnnpixelz/sign-studio
 */

export interface HybridToken {
  id: string;
  type: 'SIGN' | 'FINGERSPELL';
  clipKey: string;
  text: string;
  gloss: string;
  letters?: string[];
  status: 'verified' | 'fingerspelled';
  nmm?: {
    eyebrows: 'neutral' | 'raised' | 'furrowed';
    smile: number;
    headTilt: number;
    headNod: number;
    headShake: number;
    mouthOpen: number;
  };
}

export interface HybridGlossResponse {
  translation: string;
  sentenceType: string;
  tokens: HybridToken[];
  provider: 'gemini' | 'local';
  model?: string;
  cached?: boolean;
}

export interface HybridHealthResponse {
  configured: boolean;
  provider: string;
  model: string;
  target: string;
  availableSigns: number;
}

/**
 * Checks server Gemini health & configuration
 */
export async function checkHybridHealth(clientApiKey?: string): Promise<HybridHealthResponse> {
  const headers: Record<string, string> = {};
  if (clientApiKey) {
    headers['x-gemini-api-key'] = clientApiKey;
  }

  const res = await fetch('/api/hybrid/health', { headers });
  if (!res.ok) {
    throw new Error('Không thể kết nối máy chủ dịch.');
  }
  return await res.json();
}

/**
 * Sends translation request to Gemini AI hybrid endpoint
 */
export async function requestHybridGloss(
  text: string,
  sourceLanguage: 'vi' | 'en' = 'vi',
  clientApiKey?: string,
  signal?: AbortSignal
): Promise<HybridGlossResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (clientApiKey) {
    headers['x-gemini-api-key'] = clientApiKey;
  }

  const res = await fetch('/api/hybrid/gloss', {
    method: 'POST',
    headers,
    signal,
    body: JSON.stringify({
      text: text.trim(),
      sourceLanguage,
      targetSign: 'asl'
    })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Lỗi máy chủ (${res.status})`);
  }

  return await res.json();
}
