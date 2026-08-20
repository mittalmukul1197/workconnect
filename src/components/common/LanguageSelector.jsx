import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icon';

export const LanguageSelector = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' }
  ];

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div className="relative flex items-center">
        <span className="absolute left-2.5 text-xs pointer-events-none text-slate-500 font-bold flex items-center gap-1">
          <span>🌐</span>
        </span>

        <select
          value={currentLang}
          onChange={handleLanguageChange}
          className="appearance-none pl-8 pr-7 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 shadow-xs cursor-pointer transition-all"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-white text-slate-900 font-semibold py-1">
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>

        <div className="absolute right-2.5 pointer-events-none text-slate-400">
          <Icon name="chevron-down" className="w-3.5 h-3.5 text-slate-500" />
        </div>
      </div>
    </div>
  );
};
