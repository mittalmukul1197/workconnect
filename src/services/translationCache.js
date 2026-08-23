/**
 * WorkConnect Translation Cache
 * Uses localStorage key: wc_trans_cache
 * Schema: { "hi": { "Dashboard": "डैशबोर्ड" }, "pa": { ... } }
 */

const CACHE_KEY = 'wc_trans_cache';

const SEED_DICTIONARY = {
  hi: {
    '100 Ethnic Kurtis Stitching Order': '100 एथनिक कुर्तियों की सिलाई का ऑर्डर',
    '50 Office Desks Assembly & Lock Fittings': '50 ऑफिस डेस्क असेंबली और लॉक फिटिंग',
    'Factory Main Switchboard Rewiring & Conduit Pipe Fitting': 'फैक्ट्री मुख्य स्विचबोर्ड रीवायरिंग और नाली पाइप फिटिंग',
    'Rooftop Solar Wiring & Commissioning': 'रूफटॉप सोलर वायरिंग और कमीशनिंग',
    'Handicraft Gift Box Packaging': 'हस्तशिल्प उपहार बॉक्स पैकेजिंग',
    'Emergency Main DB & Switchboard Rewiring': 'आपातकालीन मुख्य डीबी और स्विचबोर्ड रीवायरिंग',
    '100 Cotton Kurtis Batch Stitching': '100 सूती कुर्तियों का बैच सिलाई',
    'Store Room Loading & Material Shift': 'स्टोर रूम लोडिंग और सामग्री शिफ्ट',
    'Wooden Counter Lock & Shelf Repair': 'लकड़ी के काउंटर का ताला और शेल्फ मरम्मत',
    'Fix Main DB Electric Switchboard & Fan Regulator': 'मुख्य डीबी इलेक्ट्रिक स्विचबोर्ड और पंखा रेगुलेटर ठीक करें',
    'Kitchen Sink Drain Leakage & New Tap Install': 'रसोई सिंक नाली रिसाव और नया नल स्थापित करें',
    'Electrician (Switchboard Rewiring)': 'इलेक्ट्रीशियन (स्विचबोर्ड रीवायरिंग)',
    'In Production': 'उत्पादन में',
    'Delayed / Self-Healing': 'विलंबित / स्व-उपचार',
    'Completed': 'पूरा हुआ',
    'Open': 'खुला',
    'Active': 'सक्रिय',
    'Delayed': 'विलंबित',
    'Assigned & On the Way': 'सौंपा गया और रास्ते में',
    'pending': 'लंबित',
    'accepted': 'स्वीकृत',
    'Workers Assigned': 'श्रमिक नियुक्त',
    'Workers': 'श्रमिक',
    'Budget': 'बजट',
    'View Details': 'विवरण देखें',
    'Model Town, Rajpura': 'मॉडल टाउन, राजपुरा',
    'Industrial Focal Point, Rajpura': 'इंडस्ट्रियल फोकल प्वाइंट, राजपुरा',
    'Focal Point GT Road, Rajpura': 'फोकल प्वाइंट जीटी रोड, राजपुरा',
    'Model Town, Sector 4, Rajpura': 'मॉडल टाउन, सेक्टर 4, राजपुरा',
    'Main Market, Sector 2': 'मुख्य बाजार, सेक्टर 2',
    'In active production': 'सक्रिय उत्पादन में',
    'Across active teams': 'सक्रिय टीमों में',
    'On-time delivery rate 96%': 'समय पर डिलीवरी दर 96%',
    'In your saved talent pool': 'आपके सहेजे गए टैलेंट पूल में',
    'Real-time status & workforce output tracker': 'वास्तविक समय स्थिति और कार्यबल आउटपुट ट्रैकर',
    'Painting & Wall Finishing': 'पेंटिंग और दीवार फिनिशिंग',
    'Garment Manufacturing & Apparel': 'परिधान निर्माण और वस्त्र',
    'Solar / Electrical Installation': 'सोलर / इलेक्ट्रिकल इंस्टॉलेशन',
    'Electrical Contracting': 'इलेक्ट्रिकल ठेकेदारी',
    'Electrical Repair & Maintenance': 'इलेक्ट्रिकल मरम्मत और रखरखाव',
    'Plumbing & Pipe Fitting': 'प्लंबिंग और पाइप फिटिंग',
    'Construction & Civil Work': 'निर्माण और नागरिक कार्य',
    'Woodwork & Furniture Repair': 'लकड़ी का काम और फर्नीचर मरम्मत',
    'Site Helper & Material Shifting': 'साइट हेल्पर और सामग्री शिफ्टिंग',
    'Painting': 'पेंटिंग',
    'Stitching': 'सिलाई',
    'Solar Panel Installation': 'सोलर पैनल इंस्टॉलेशन',
    'Electrical Wiring': 'इलेक्ट्रिकल वायरिंग',
    'Electrical Repair': 'इलेक्ट्रिकल मरम्मत',
    'Plumbing': 'प्लंबिंग',
    'Carpentry': 'कारपेंटरी',
    'Daily Labour': 'दैनिक श्रमिक',
    'Master Tailor & Garment Designer': 'मास्टर दर्जी और परिधान डिजाइनर',
    'Senior Electrician & Wiring Master': 'वरिष्ठ इलेक्ट्रीशियन और वायरिंग मास्टर',
    'Plumbing & Bathroom Fitting Specialist': 'प्लंबिंग और बाथरूम फिटिंग विशेषज्ञ',
    'Master Tailor & Suit Alterations': 'मास्टर दर्जी और सूट संशोधन'
  },
  pa: {
    '100 Ethnic Kurtis Stitching Order': '100 ਐਥਨਿਕ ਕੁਰਤੀਆਂ ਦੀ ਸਿਲਾਈ ਦਾ ਆਰਡਰ',
    '50 Office Desks Assembly & Lock Fittings': '50 ਦਫ਼ਤਰੀ ਡੈਸਕਾਂ ਦੀ ਅਸੈਂਬਲੀ ਅਤੇ ਲਾਕ ਫਿਟਿੰਗ',
    'Factory Main Switchboard Rewiring & Conduit Pipe Fitting': 'ਫੈਕਟਰੀ ਮੇਨ ਸਵਿੱਚਬੋਰਡ ਰੀਵਾਇਰਿੰਗ ਅਤੇ ਕੰਡਿਊਟ ਪਾਈਪ ਫਿਟਿੰਗ',
    'Rooftop Solar Wiring & Commissioning': 'ਛੱਤ ਵਾਲੀ ਸੋਲਰ ਵਾਇਰਿੰਗ ਅਤੇ ਕਮਿਸ਼ਨਿੰਗ',
    'Handicraft Gift Box Packaging': 'ਹਸਤਕਲਾ ਗਿਫਟ ਬਾਕਸ ਪੈਕੇਜਿੰਗ',
    'Emergency Main DB & Switchboard Rewiring': 'ਐਮਰਜੈਂਸੀ ਮੇਨ ਡੀਬੀ ਅਤੇ ਸਵਿੱਚਬੋਰਡ ਰੀਵਾਇਰਿੰਗ',
    '100 Cotton Kurtis Batch Stitching': '100 ਸੂਤੀ ਕੁਰਤੀਆਂ ਦਾ ਬੈਚ ਸਿਲਾਈ',
    'Store Room Loading & Material Shift': 'ਸਟੋਰ ਰੂਮ ਲੋਡਿੰਗ ਅਤੇ ਸਮੱਗਰੀ ਸ਼ਿਫਟ',
    'Wooden Counter Lock & Shelf Repair': 'ਲੱਕੜ ਦੇ ਕਾਊਂਟਰ ਦਾ ਲਾਕ ਅਤੇ ਸ਼ੈਲਫ ਮੁਰੰਮਤ',
    'Fix Main DB Electric Switchboard & Fan Regulator': 'ਮੇਨ ਡੀਬੀ ਇਲੈਕਟ੍ਰਿਕ ਸਵਿੱਚਬੋਰਡ ਅਤੇ ਫੈਨ ਰੈਗੂਲੇਟਰ ਠੀਕ ਕਰੋ',
    'Kitchen Sink Drain Leakage & New Tap Install': 'ਰਸੋਈ ਦੀ ਸਿੰਕ ਡਰੇਨ ਲੀਕੇਜ ਅਤੇ ਨਵੀਂ ਟੂਟੀ ਲਗਾਓ',
    'Electrician (Switchboard Rewiring)': 'ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ (ਸਵਿੱਚਬੋਰਡ ਰੀਵਾਇਰਿੰਗ)',
    'In Production': 'ਉਤਪਾਦਨ ਵਿੱਚ',
    'Delayed / Self-Healing': 'ਦੇਰੀ ਨਾਲ / ਸੈਲਫ-ਹੀਲਿੰਗ',
    'Completed': 'ਪੂਰਾ ਹੋ ਗਿਆ',
    'Open': 'ਖੁੱਲ੍ਹਾ',
    'Active': 'ਐਕਟਿਵ',
    'Delayed': 'ਦੇਰੀ',
    'Assigned & On the Way': 'ਅਲਾਟ ਕੀਤਾ ਅਤੇ ਰਸਤੇ ਵਿੱਚ',
    'pending': 'ਪੈਂਡਿੰਗ',
    'accepted': 'ਸਵੀਕਾਰ ਕੀਤਾ',
    'Workers Assigned': 'ਮਜ਼ਦੂਰ ਅਲਾਟ ਕੀਤੇ',
    'Workers': 'ਮਜ਼ਦੂਰ',
    'Budget': 'ਬਜਟ',
    'View Details': 'ਵੇਰਵੇ ਵੇਖੋ',
    'Model Town, Rajpura': 'ਮਾਡਲ ਟਾਊਨ, ਰਾਜਪੁਰਾ',
    'Industrial Focal Point, Rajpura': 'ਇੰਡਸਟਰੀਅਲ ਫੋਕਲ ਪੁਆਇੰਟ, ਰਾਜਪੁਰਾ',
    'Focal Point GT Road, Rajpura': 'ਫੋਕਲ ਪੁਆਇੰਟ ਜੀਟੀ ਰੋਡ, ਰਾਜਪੁਰਾ',
    'Model Town, Sector 4, Rajpura': 'ਮਾਡਲ ਟਾਊਨ, ਸੈਕਟਰ 4, ਰਾਜਪੁਰਾ',
    'Main Market, Sector 2': 'ਮੁੱਖ ਮਾਰਕੀਟ, ਸੈਕਟਰ 2',
    'In active production': 'ਸਰਗਰਮ ਉਤਪਾਦਨ ਵਿੱਚ',
    'Across active teams': 'ਸਰਗਰਮ ਟੀਮਾਂ ਵਿੱਚ',
    'On-time delivery rate 96%': 'ਸਮੇਂ ਸਿਰ ਡਿਲੀਵਰੀ ਦਰ 96%',
    'In your saved talent pool': 'ਤੁਹਾਡੇ ਸੰਭਾਲੇ ਪ੍ਰਤਿਭਾ ਪੂਲ ਵਿੱਚ',
    'Real-time status & workforce output tracker': 'ਰੀਅਲ-ਟਾਈਮ ਸਥਿਤੀ ਅਤੇ ਵਰਕਫੋਰਸ ਆਉਟਪੁੱਟ ਟ੍ਰੈਕਰ',
    'Painting & Wall Finishing': 'ਪੇਂਟਿੰਗ ਅਤੇ ਕੰਧ ਫਿਨਿਸ਼ਿੰਗ',
    'Garment Manufacturing & Apparel': 'ਕੱਪੜਾ ਨਿਰਮਾਣ ਅਤੇ ਵਸਤਰ',
    'Solar / Electrical Installation': 'ਸੋਲਰ / ਇਲੈਕਟ੍ਰੀਕਲ ਇੰਸਟਾਲੇਸ਼ਨ',
    'Electrical Contracting': 'ਇਲੈਕਟ੍ਰੀਕਲ ਠੇਕੇਦਾਰੀ',
    'Electrical Repair & Maintenance': 'ਇਲੈਕਟ੍ਰੀਕਲ ਮੁਰੰਮਤ ਅਤੇ ਰੱਖ-ਰਖਾਅ',
    'Plumbing & Pipe Fitting': 'ਪਲੰਬਿੰਗ ਅਤੇ ਪਾਈਪ ਫਿਟਿੰਗ',
    'Painting': 'ਪੇਂਟਿੰਗ',
    'Stitching': 'ਸਿਲਾਈ',
    'Solar Panel Installation': 'ਸੋਲਰ ਪੈਨਲ ਇੰਸਟਾਲੇਸ਼ਨ',
    'Electrical Wiring': 'ਇਲੈਕਟ੍ਰੀਕਲ ਵਾਇਰਿੰਗ',
    'Electrical Repair': 'ਇਲੈਕਟ੍ਰੀਕਲ ਮੁਰੰਮਤ',
    'Plumbing': 'ਪਲੰਬਿੰਗ',
    'Carpentry': 'ਕਾਰਪੈਂਟਰੀ',
    'Daily Labour': 'ਦਿਹਾੜੀਦਾਰ ਮਜ਼ਦੂਰ'
  },
  mr: {
    '100 Ethnic Kurtis Stitching Order': '100 एथनिक कुर्त्या शिलाई ऑर्डर',
    '50 Office Desks Assembly & Lock Fittings': '50 ऑफिस डेस्क असेंब्ली आणि लॉक फिटिंग',
    'Factory Main Switchboard Rewiring & Conduit Pipe Fitting': 'फॅक्टरी मुख्य स्विचबोर्ड रीवायरिंग आणि कंड्युइट पाईप फिटिंग',
    'Rooftop Solar Wiring & Commissioning': 'रूफटॉप सोलर वायरिंग आणि कमिशनिंग',
    'In Production': 'उत्पादनात',
    'Delayed / Self-Healing': 'विलंब / स्व-दुरुस्ती',
    'Completed': 'पूर्ण',
    'Open': 'उघडे',
    'Active': 'सक्रिय',
    'Workers Assigned': 'कामगार नियुक्त',
    'Budget': 'बजेट',
    'View Details': 'तपशील पहा',
    'Painting & Wall Finishing': 'पेंटिंग आणि भिंत फिनिशिंग',
    'Garment Manufacturing & Apparel': 'कापड निर्मिती आणि वस्त्रे',
    'Solar / Electrical Installation': 'सोलर / इलेक्ट्रिकल इन्स्टॉलेशन',
    'Electrical Contracting': 'इलेक्ट्रिकल कंत्राट',
    'Painting': 'पेंटिंग',
    'Stitching': 'शिलाई',
    'Solar Panel Installation': 'सोलर पॅनेल इन्स्टॉलेशन',
    'Electrical Wiring': 'इलेक्ट्रिकल वायरिंग',
    'Plumbing': 'प्लंबिंग'
  },
  bn: {
    '100 Ethnic Kurtis Stitching Order': '100 এথনিক কুর্তি সেলাই অর্ডার',
    '50 Office Desks Assembly & Lock Fittings': '50 অফিস ডেস্ক অ্যাসেম্বলি ও লক ফিটিং',
    'Factory Main Switchboard Rewiring & Conduit Pipe Fitting': 'ফ্যাক্টরি মেইন সুইচবোর্ড রিয়ারিং ও পাইপ ফিটিং',
    'In Production': 'উত্পাদনে',
    'Delayed / Self-Healing': 'বিলম্বিত / স্ব-নিরাময়',
    'Completed': 'সম্পন্ন',
    'Workers Assigned': 'কর্মী নির্ধারিত',
    'Budget': 'বাজেট',
    'View Details': 'বিস্তারিত দেখুন',
    'Painting & Wall Finishing': 'পেইন্টিং এবং দেয়াল ফিনিশিং',
    'Garment Manufacturing & Apparel': 'পোশাক তৈরি ও বস্ত্র',
    'Painting': 'পেইন্টিং',
    'Stitching': 'সেলাই',
    'Plumbing': 'প্লাম্বিং'
  },
  ta: {
    '100 Ethnic Kurtis Stitching Order': '100 எத்னிக் குர்திகள் தையல் ஆர்டர்',
    '50 Office Desks Assembly & Lock Fittings': '50 அலுவலக மேஜைகள் அசெம்பிளி & லாக் ஃபிட்டிங்',
    'Factory Main Switchboard Rewiring & Conduit Pipe Fitting': 'தொழிற்சாலை மெயின் சுவிட்ச்போர்டு ரீவைரிங் & பைப் ஃபிட்டிங்',
    'In Production': 'உற்பத்தியில்',
    'Delayed / Self-Healing': 'தாமதமானது / சுய சீரமைப்பு',
    'Completed': 'முடிந்தது',
    'Workers Assigned': 'பணியாளர்கள் நியமிக்கப்பட்டனர்',
    'Budget': 'பட்ஜெட்',
    'View Details': 'விவரங்களை காண்க',
    'Painting & Wall Finishing': 'பெயிண்டிங் மற்றும் சுவர் பினிஷிங்',
    'Garment Manufacturing & Apparel': 'ஆடை தயாரிப்பு',
    'Painting': 'பெயிண்டிங்',
    'Stitching': 'தையல்',
    'Plumbing': 'ப்ளம்பிங்'
  }
};

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {};
    }
    return parsed;
  } catch (err) {
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
  if (cache[lang]?.[text]) return cache[lang][text];
  if (SEED_DICTIONARY[lang]?.[text]) return SEED_DICTIONARY[lang][text];
  return null;
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
  if (typeof cache[lang]?.[text] === 'string') return true;
  if (typeof SEED_DICTIONARY[lang]?.[text] === 'string') return true;
  return false;
}

export function clearCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (err) {
    console.warn('[TranslationCache] Failed to clear cache.', err);
  }
}
