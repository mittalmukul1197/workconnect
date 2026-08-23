import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { Icon } from '../common/Icon';
import { Badge } from '../common/Badge';
import { LanguageSelector } from '../common/LanguageSelector';

export const Sidebar = ({ currentPath, onNavigate, isMobileOpen, onCloseMobile }) => {
  const { t } = useTranslation();
  const { user, isHousehold, isBusiness, isWorker, logout } = useAuth();
  const { unreadCount } = useChat();

  const householdNav = [
    { path: '/household/dashboard', label: t('nav.dashboard'), icon: 'bar-chart' },
    { path: '/messages', label: t('chat.messages') || 'Messages', icon: 'message-square', badge: unreadCount > 0 ? `${unreadCount} New` : null },
    { path: '/household/bookings', label: t('sidebar.myBookings') || 'My Bookings', icon: 'clock', badge: 'Doorstep' },
    { path: '/household/profile', label: t('sidebar.householdProfile') || 'Household Profile', icon: 'user' }
  ];

  const businessNav = [
    { path: '/business/dashboard', label: t('nav.dashboard'), icon: 'bar-chart' },
    { path: '/messages', label: t('chat.messages') || 'Messages', icon: 'message-square', badge: unreadCount > 0 ? `${unreadCount} New` : null },
    { path: '/business/post-work', label: t('nav.postWork'), icon: 'plus', badge: 'AI Parser' },
    { path: '/business/matches', label: t('sidebar.aiMatches') || 'AI Matches', icon: 'sparkles' },
    { path: '/business/workers', label: t('nav.workerDirectory'), icon: 'users' },
    { path: '/business/projects', label: t('sidebar.myProjects') || 'My Projects', icon: 'briefcase' },
    { path: '/business/history', label: t('sidebar.workHistory') || 'Work History', icon: 'clock' },
    { path: '/business/profile', label: t('sidebar.companyProfile') || 'Company Profile', icon: 'building' }
  ];

  const workerNav = [
    { path: '/worker/dashboard', label: t('nav.dashboard'), icon: 'bar-chart' },
    { path: '/messages', label: t('chat.messages') || 'Messages', icon: 'message-square', badge: unreadCount > 0 ? `${unreadCount} New` : null },
    { path: '/worker/work', label: t('nav.findWork'), icon: 'search', badge: 'Reverse' },
    { path: '/worker/capacity', label: t('sidebar.myCapacity') || 'My Capacity', icon: 'zap' },
    { path: '/worker/matches', label: t('sidebar.matchedJobs') || 'Matched Jobs', icon: 'sparkles' },
    { path: '/worker/projects', label: t('sidebar.assignedWork') || 'Assigned Work', icon: 'briefcase' },
    { path: '/worker/profile', label: t('workPassport.title'), icon: 'shield-check' },
    { path: '/worker/history', label: t('sidebar.earningHistory') || 'Earning History', icon: 'clock' }
  ];

  const navItems = isHousehold ? householdNav : isBusiness ? businessNav : workerNav;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 glass-panel border-r border-slate-200/80 bg-white/95 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between px-2 pt-2">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => onNavigate && onNavigate('/')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-0.5 flex items-center justify-center shadow-md animate-logo-pulse">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Icon name="zap" className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-slate-900">Work<span className="text-gradient">Connect</span></span>
                <p className="text-[10px] text-slate-500 font-medium">Workforce Network</p>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>
          </div>

          {/* Language Switcher */}
          <div className="px-2">
            <LanguageSelector className="w-full justify-center" />
          </div>

          <nav className="space-y-1">
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {isHousehold ? t('sidebar.householdPortal') : isBusiness ? t('sidebar.businessManagement') : t('sidebar.workerPortal')}
            </div>
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate && onNavigate(item.path);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/25 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={item.icon} className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200/80 space-y-3 bg-slate-50/80">
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-8 h-8 rounded-xl object-cover border border-slate-200"
              />
              <div className="min-w-0 flex-1">
                <h5 className="font-bold text-xs text-slate-900 truncate">{user?.name || 'User'}</h5>
                <p className="text-[10px] text-slate-500 truncate">{user?.email || user?.phone}</p>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                onNavigate('/login');
              }}
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors shrink-0"
              title="Logout"
            >
              <Icon name="log-out" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
