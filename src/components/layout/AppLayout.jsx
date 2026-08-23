import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Icon } from '../common/Icon';

export const AppLayout = ({ currentPath, onNavigate, children }) => {
  const { t } = useTranslation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const { user, isBusiness, logout } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (!searchQuery.trim()) return;
      if (isBusiness) {
        onNavigate && onNavigate('/business/workers');
      } else {
        onNavigate && onNavigate('/worker/work');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <header className="sticky top-0 z-30 h-16 glass-panel border-b border-slate-200/80 bg-white/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            <Icon name="menu" className="w-6 h-6" />
          </button>

          <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center gap-3">
            <div className="relative">
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
                <Icon name="search" className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                placeholder={isBusiness ? t('appLayout.searchBusinessPlaceholder') : t('appLayout.searchHouseholdPlaceholder')}
                className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 w-64 lg:w-80 shadow-2xs"
              />
            </div>
          </form>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  if (unreadCount > 0) markAllAsRead();
                }}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <Icon name="bell" className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifDropdown && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 space-y-3 animate-scale-up">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Icon name="bell" className="w-4 h-4 text-indigo-600" />
                      <span>{t('appLayout.notifications')}</span>
                    </h4>
                    <span className="text-[11px] text-slate-500">{notifications.length} {t('appLayout.total')}</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                          n.type === 'rebalance'
                            ? 'bg-rose-50 border-rose-200 text-rose-800'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-500 font-normal">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-600">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
              onClick={() => onNavigate(user?.role === 'household' ? '/household/profile' : isBusiness ? '/business/profile' : '/worker/profile')}
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-7 h-7 rounded-lg object-cover border border-slate-200"
              />
              <span className="text-xs font-bold text-slate-800 hidden md:inline truncate max-w-[100px]">
                {user?.name?.split(' ')[0] || t('appLayout.profile')}
              </span>
            </div>

            <button
              onClick={() => {
                logout();
                onNavigate('/login');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all shadow-xs"
              title={t('nav.logout') || 'Logout'}
            >
              <Icon name="log-out" className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">{t('nav.logout')}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};
