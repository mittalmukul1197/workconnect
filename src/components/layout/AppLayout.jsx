import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Icon } from '../common/Icon';

export const AppLayout = ({ currentPath, onNavigate, children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const { user, isBusiness, isHousehold, switchRole } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();

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

          <div className="hidden sm:flex items-center gap-3">
            <div className="relative">
              <Icon name="search" className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isBusiness ? "Search workers by skill, location..." : "Search available work opportunities..."}
                className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 w-64 lg:w-80"
              />
            </div>
          </div>

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
                      <span>Notifications</span>
                    </h4>
                    <span className="text-[11px] text-slate-500">{notifications.length} total</span>
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
              className="flex items-center gap-2.5 cursor-pointer p-1 rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => onNavigate(isHousehold ? '/household/profile' : isBusiness ? '/business/profile' : '/worker/profile')}
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-8 h-8 rounded-xl object-cover border border-slate-200"
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
