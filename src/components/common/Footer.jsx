import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icon';
import { Badge } from './Badge';

export const Footer = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 bg-slate-100/80 text-slate-600 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate && onNavigate('/')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-0.5 flex items-center justify-center shadow-md animate-logo-pulse">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Icon name="zap" className="w-4 h-4 text-indigo-600" />
              </div>
            </div>
            <span className="text-xl font-black text-slate-900">Work<span className="text-gradient">Connect</span></span>
          </div>
          <p className="text-slate-600 text-xs max-w-sm leading-relaxed">
            {t('footer.tagline')}
          </p>
          <p className="text-[11px] text-slate-500 font-semibold">
            "A job board finds people once — WorkConnect keeps the work running."
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">{t('footer.quickLinks')}</h4>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li><button onClick={() => onNavigate && onNavigate('/')} className="hover:text-indigo-600 transition-colors">{t('nav.home')}</button></li>
            <li><button onClick={() => onNavigate && onNavigate('/role-selection')} className="hover:text-indigo-600 transition-colors">{t('nav.roleSelection')}</button></li>
            <li><button onClick={() => onNavigate && onNavigate('/onboarding/business')} className="hover:text-indigo-600 transition-colors">{t('auth.businessTitle')}</button></li>
            <li><button onClick={() => onNavigate && onNavigate('/onboarding/worker')} className="hover:text-indigo-600 transition-colors">{t('auth.workerTitle')}</button></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">{t('nav.dashboard')}</h4>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li><button onClick={() => onNavigate && onNavigate('/business/dashboard')} className="hover:text-indigo-600 transition-colors text-indigo-700 font-semibold">{t('auth.businessTitle')}</button></li>
            <li><button onClick={() => onNavigate && onNavigate('/worker/dashboard')} className="hover:text-emerald-600 transition-colors text-emerald-700 font-semibold">{t('auth.workerTitle')}</button></li>
            <li><button onClick={() => onNavigate && onNavigate('/admin/demo')} className="hover:text-amber-600 transition-colors text-amber-700 font-semibold">{t('nav.switchPersona')}</button></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500">
        <p>© 2026 WorkConnect Network. {t('footer.rights')}</p>
        <p>Hyperlocal Two-Sided Capability Discovery Platform</p>
      </div>
    </footer>
  );
};
