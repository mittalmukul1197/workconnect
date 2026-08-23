/**
 * useAutoTranslate hook
 *
 * Translates an array of English UI strings into the current language
 * using LibreTranslate (via translationService), with localStorage caching.
 *
 * Static i18next translations always take priority — this hook is only
 * for text that cannot be handled by static JSON keys (e.g. dynamic labels,
 * or pages not yet migrated to useTranslation).
 *
 * Usage:
 *   const translations = useAutoTranslate(['Find Work', 'Post Work'], language);
 *   // returns: { 'Find Work': 'काम खोजें', 'Post Work': 'काम पोस्ट करें' }
 *
 * Behavior:
 * - Returns original English text immediately (no flicker, no blocking)
 * - Never shows undefined / null / blank
 * - Never calls API when language is 'en'
 * - Never makes duplicate in-flight requests for the same text+lang
 * - Caches results in localStorage under wc_trans_cache
 */

import { useState, useEffect, useRef } from 'react';
import { getCached, setCached, isCached } from '../services/translationCache';
import { translateBatch } from '../services/translationService';

// Global in-flight request tracker to prevent duplicate concurrent fetches
// { "hi::Find Work": Promise<string> }
const inFlight = {};

export function useAutoTranslate(texts, language) {
  // Build initial result map: original English as fallback
  const buildInitial = () => {
    const map = {};
    (texts || []).forEach((t) => { if (t) map[t] = t; });
    return map;
  };

  const [translations, setTranslations] = useState(buildInitial);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!texts || texts.length === 0) return;
    if (!language || language === 'en') {
      // Reset to originals for English
      const map = {};
      texts.forEach((t) => { if (t) map[t] = t; });
      setTranslations(map);
      return;
    }

    // Check what's already cached — apply those immediately
    const needsFetch = [];
    const fromCache = {};

    texts.forEach((text) => {
      if (!text) return;
      if (isCached(language, text)) {
        fromCache[text] = getCached(language, text);
      } else {
        needsFetch.push(text);
        fromCache[text] = text; // fallback to original while loading
      }
    });

    // Apply cached results immediately (instant render update)
    setTranslations({ ...fromCache });

    if (needsFetch.length === 0) return;

    // Filter out any already in-flight requests
    const toFetch = needsFetch.filter((text) => {
      const key = `${language}::${text}`;
      return !inFlight[key];
    });

    if (toFetch.length === 0) {
      // All being fetched by a concurrent hook instance — wait for state update
      return;
    }

    // Create in-flight markers
    toFetch.forEach((text) => {
      const key = `${language}::${text}`;
      inFlight[key] = true;
    });

    (async () => {
      try {
        const resultMap = await translateBatch(toFetch, language);

        // Cache each result
        resultMap.forEach((translated, original) => {
          if (translated && translated !== original) {
            setCached(language, original, translated);
          }
        });

        if (!mountedRef.current) return;

        // Merge with existing state
        setTranslations((prev) => {
          const next = { ...prev };
          resultMap.forEach((translated, original) => {
            next[original] = translated || original;
          });
          return next;
        });
      } catch (err) {
        // Never crash — silently keep originals
        console.warn('[useAutoTranslate] Batch translation failed:', err?.message || err);
      } finally {
        // Clean up in-flight markers
        toFetch.forEach((text) => {
          const key = `${language}::${text}`;
          delete inFlight[key];
        });
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, JSON.stringify(texts)]);

  return translations;
}
