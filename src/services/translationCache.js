/**
 * WorkConnect Translation Cache
 * Uses localStorage key: wc_trans_cache
 * Schema: { "hi": { "Dashboard": "डैशबोर्ड" }, "pa": { ... } }
 */

const CACHE_KEY = 'wc_trans_cache';

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      console.warn('[TranslationCache] Invalid cache structure, resetting.');
      return {};
    }
    return parsed;
  } catch (err) {
    console.warn('[TranslationCache] Failed to parse cache, resetting.', err);
    try { localStorage.removeItem(CACHE_KEY); } catch (_) {}
    return {};
  }
}

function saveCache(cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (err) {
    console.warn('[TranslationCache] Failed to save cache.', err);
  }
}

export function getCached(lang, text) {
  if (!lang || !text) return null;
  const cache = loadCache();
  return cache[lang]?.[text] ?? null;
}

export function setCached(lang, text, translated) {
  if (!lang || !text || !translated || translated === text) return;
  const cache = loadCache();
  if (!cache[lang]) cache[lang] = {};
  cache[lang][text] = translated;
  saveCache(cache);
}

export function isCached(lang, text) {
  if (!lang || !text) return false;
  const cache = loadCache();
  return typeof cache[lang]?.[text] === 'string';
}

export function clearCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (err) {
    console.warn('[TranslationCache] Failed to clear cache.', err);
  }
}
