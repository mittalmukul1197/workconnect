import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '../common/Icon';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { SmartAuthModal } from '../common/SmartAuthModal';
import { LanguageSelector } from '../common/LanguageSelector';

export const Navbar = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isHousehold = user?.role === 'household' || user?.clientType === 'household';
  const isBusiness = user?.role === 'business';

  const getDashboardPath = () => {
    if (isHousehold) return '/household/dashboard';
    if (isBusiness) return '/business/dashboard';
    return '/worker/dashboard';
  };

  const handleNavScrollOrRedirect = (targetId) => {
    if (window.location.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate && onNavigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-md animate-logo-pulse">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Icon name="zap" className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900">Work<span className="text-gradient">Connect</span></span>
            </div>
            <span className="text-[10px] text-slate-500 hidden sm:block font-medium">{t('nav.brandSubtitle')}</span>
          </div>
        </div>

        {/* Complete Middle Navigation Bar */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600">
          <button
            onClick={() => onNavigate && onNavigate('/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-100 font-bold transition-all"
          >
            <Icon name="home" className="w-4 h-4 text-indigo-600" />
            <span>{t('nav.home')}</span>
          </button>

          <button
            onClick={() => handleNavScrollOrRedirect('on-demand-section')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-all"
          >
            <Icon name="zap" className="w-4 h-4 text-emerald-600" />
            <span>{t('nav.onDemand')}</span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('/role-selection')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-all"
          >
            <Icon name="plus" className="w-4 h-4 text-purple-600" />
            <span>{t('nav.openOffers')}</span>
          </button>

          {user && (
            <button
              onClick={() => onNavigate && onNavigate(getDashboardPath())}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold transition-all"
            >
              <Icon name="briefcase" className="w-4 h-4 text-indigo-600" />
              <span>{t('nav.dashboard')}</span>
            </button>
          )}
        </nav>

        {/* Header Actions & Language Switcher Dropdown */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <LanguageSelector />

          {user ? (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="primary"
                icon="user"
                onClick={() => onNavigate && onNavigate(getDashboardPath())}
              >
                {user.name.split(' ')[0]}
              </Button>

              <button
                onClick={logout}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title={t('nav.logout')}
              >
                <Icon name="log-out" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="primary"
                icon="sparkles"
                onClick={() => setIsAuthModalOpen(true)}
              >
                {t('nav.signInRegister')}
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => onNavigate && onNavigate('/login')}
                className="text-xs text-slate-600 hover:text-indigo-600 font-semibold"
              >
                {t('nav.loginPage')}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* SMART AUTH ONBOARDING MODAL */}
      <SmartAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onNavigate={onNavigate}
      />
    </header>
  );
};
