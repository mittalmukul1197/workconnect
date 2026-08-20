import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '../common/Icon';
import { Badge } from '../common/Badge';

export const Sidebar = ({ currentPath, onNavigate, isMobileOpen, onCloseMobile }) => {
  const { user, isBusiness, switchRole } = useAuth();

  const businessNav = [
    { path: '/business/dashboard', label: 'Dashboard', icon: 'bar-chart' },
    { path: '/business/post-work', label: 'Post Work', icon: 'plus', badge: 'AI Parser' },
    { path: '/business/matches', label: 'AI Matches', icon: 'sparkles' },
    { path: '/business/workers', label: 'Worker Directory', icon: 'users' },
    { path: '/business/projects', label: 'My Projects', icon: 'briefcase' },
    { path: '/business/history', label: 'Work History', icon: 'clock' },
    { path: '/business/profile', label: 'Company Profile', icon: 'building' }
  ];

  const workerNav = [
    { path: '/worker/dashboard', label: 'Dashboard', icon: 'bar-chart' },
    { path: '/worker/work', label: 'Find Work', icon: 'search', badge: 'Reverse' },
    { path: '/worker/capacity', label: 'My Capacity', icon: 'zap' },
    { path: '/worker/matches', label: 'Matched Jobs', icon: 'sparkles' },
    { path: '/worker/projects', label: 'Assigned Work', icon: 'briefcase' },
    { path: '/worker/profile', label: 'Work Passport', icon: 'shield-check' },
    { path: '/worker/history', label: 'Earning History', icon: 'clock' }
  ];

  const navItems = isBusiness ? businessNav : workerNav;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 glass-panel border-r border-slate-800/80 bg-slate-950/95 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between px-2 pt-2">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => onNavigate && onNavigate('/')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Icon name="zap" className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white">Work<span className="text-gradient">Connect</span></span>
                <p className="text-[10px] text-slate-400 font-medium">Workforce Network</p>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Current Role:</span>
              <Badge variant={isBusiness ? 'primary' : 'success'}>
                {isBusiness ? 'Business / Owner' : 'Worker / Artisan'}
              </Badge>
            </div>
            <button
              onClick={() => {
                switchRole(isBusiness ? 'worker' : 'business');
                onNavigate(isBusiness ? '/worker/dashboard' : '/business/dashboard');
              }}
              className="w-full py-1.5 px-3 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <Icon name="sync" className="w-3.5 h-3.5" />
              <span>Switch to {isBusiness ? 'Worker View' : 'Business View'}</span>
            </button>
          </div>

          <nav className="space-y-1">
            <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              {isBusiness ? 'Business Management' : 'Worker Portal'}
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
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={item.icon} className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/60">
          <button
            onClick={() => onNavigate('/admin/demo')}
            className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Icon name="cpu" className="w-4 h-4 text-amber-400" />
            <span>Admin Demo Center</span>
          </button>

          <div className="flex items-center gap-3 pt-1">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-9 h-9 rounded-xl object-cover border border-slate-700"
            />
            <div className="min-w-0 flex-1">
              <h5 className="font-bold text-xs text-white truncate">{user?.name || 'User'}</h5>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
