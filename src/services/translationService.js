/**
 * WorkConnect Translation Service
 * Uses LibreTranslate REST API.
 *
 * Config via env vars (VITE_ prefix for Vite frontend):
 *   VITE_LIBRETRANSLATE_URL   - default: https://libretranslate.de
 *   VITE_LIBRETRANSLATE_API_KEY - optional, leave empty if not needed
 *
 * NOTE: This is a frontend-only app. VITE_ env vars are publicly visible
 * in the browser bundle. Do not put secret keys here. Use a
 * self-hosted LibreTranslate instance that doesn't require a key,
 * or a CORS-enabled instance without a private key requirement.
 */

const API_URL = (import.meta.env.VITE_LIBRETRANSLATE_URL || 'https://libretranslate.de').replace(/\/$/, '');
const API_KEY = import.meta.env.VITE_LIBRETRANSLATE_API_KEY || '';

/**
 * Maps our internal language codes to LibreTranslate ISO 639-1 codes.
 * All codes are already standard ISO 639-1.
 */
const LANG_MAP = {
  en: 'en',
  hi: 'hi',
  pa: 'pa',
  mr: 'mr',
  bn: 'bn',
  ta: 'ta',
};

/**
 * Builds the request body for LibreTranslate.
 */
function buildBody(q, targetLang) {
  const body = {
    q,
    source: 'en',
    target: LANG_MAP[targetLang] || targetLang,
    format: 'text',
  };
  if (API_KEY) body.api_key = API_KEY;
  return JSON.stringify(body);
}

/**
 * Translate a single text string.
 * Returns translated string, or original text on any failure.
 */
export async function translateText(text, targetLang) {
  if (!text || typeof text !== 'string' || text.trim() === '') return text;
  if (!targetLang || targetLang === 'en') return text;

  try {
    const response = await fetch(`${API_URL}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: buildBody(text, targetLang),
    });

    if (!response.ok) {
      console.warn(`[TranslationService] HTTP ${response.status} for single translate`);
      return text;
    }

    const data = await response.json();

    if (data?.translatedText && typeof data.translatedText === 'string') {
      return data.translatedText;
    }

    return text;
  } catch (err) {
    // Network error, CORS, or invalid URL — fail silently
    console.warn('[TranslationService] translateText failed:', err?.message || err);
    return text;
  }
}

/**
 * Translate a batch of strings.
 * Tries a batch API call first; falls back to individual calls if needed.
 * Returns a Map<originalText, translatedText>.
 * Never throws — returns original texts on any failure.
 */
export async function translateBatch(texts, targetLang) {
  const result = new Map();

  if (!texts || texts.length === 0) return result;
  if (!targetLang || targetLang === 'en') {
    texts.forEach((t) => result.set(t, t));
    return result;
  }

  // Filter out empty/invalid strings
  const validTexts = texts.filter((t) => t && typeof t === 'string' && t.trim() !== '');
  validTexts.forEach((t) => result.set(t, t)); // pre-fill with originals as fallback

  if (validTexts.length === 0) return result;

  // Attempt batch (send as newline-separated q — some LibreTranslate instances support this)
  // Actually, the standard LibreTranslate API does NOT support array batch natively in all versions.
  // We send individual requests concurrently (capped at 5 at a time to avoid rate limiting).
  const CONCURRENCY = 5;
  const chunks = [];
  for (let i = 0; i < validTexts.length; i += CONCURRENCY) {
    chunks.push(validTexts.slice(i, i + CONCURRENCY));
  }

  for (const chunk of chunks) {
    const promises = chunk.map(async (text) => {
      const translated = await translateText(text, targetLang);
      result.set(text, translated);
    });
    await Promise.all(promises);
  }

  return result;
}
