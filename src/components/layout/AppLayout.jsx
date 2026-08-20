import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Icon } from '../common/Icon';

export const AppLayout = ({ currentPath, onNavigate, children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const { user, isBusiness, switchRole } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <header className="sticky top-0 z-30 h-16 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900"
          >
            <Icon name="menu" className="w-6 h-6" />
          </button>

          <div className="hidden sm:flex items-center gap-3">
            <div className="relative">
              <Icon name="search" className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isBusiness ? "Search workers by skill, location..." : "Search available work opportunities..."}
                className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-64 lg:w-80"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                switchRole(isBusiness ? 'worker' : 'business');
                onNavigate(isBusiness ? '/worker/dashboard' : '/business/dashboard');
              }}
              className="px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Icon name="sync" className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mode:</span>
              <strong className="text-white">{isBusiness ? 'Business' : 'Worker'}</strong>
            </button>

            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  if (unreadCount > 0) markAllAsRead();
                }}
                className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
              >
                <Icon name="bell" className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-slate-950 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifDropdown && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 glass-card rounded-2xl border border-slate-700/80 shadow-2xl p-4 z-50 space-y-3 animate-scale-up">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Icon name="bell" className="w-4 h-4 text-indigo-400" />
                      <span>Notifications</span>
                    </h4>
                    <span className="text-[11px] text-slate-400">{notifications.length} total</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                          n.type === 'rebalance'
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-300">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="flex items-center gap-2.5 cursor-pointer p-1 rounded-xl hover:bg-slate-900 transition-colors"
              onClick={() => onNavigate(isBusiness ? '/business/profile' : '/worker/profile')}
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-8 h-8 rounded-xl object-cover border border-slate-700"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};
