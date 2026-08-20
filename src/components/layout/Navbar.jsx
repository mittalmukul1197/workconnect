import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '../common/Icon';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const Navbar = ({ onNavigate }) => {
  const { user, logout, loginAsDemoBusiness, loginAsDemoWorker } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate && onNavigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Icon name="zap" className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">Work<span className="text-gradient">Connect</span></span>
              <Badge variant="primary" className="text-[10px] px-2 py-0">Hackathon MVP</Badge>
            </div>
            <span className="text-[10px] text-slate-400 hidden sm:block">Two-Sided Workforce Network</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button onClick={() => onNavigate && onNavigate('/')} className="hover:text-white transition-colors">Overview</button>
          <button onClick={() => onNavigate && onNavigate('/role-selection')} className="hover:text-white transition-colors">Get Started</button>
          <button onClick={() => onNavigate && onNavigate('/admin/demo')} className="hover:text-white transition-colors flex items-center gap-1 text-amber-400 font-bold">
            <Icon name="cpu" className="w-4 h-4" />
            <span>Demo Control</span>
          </button>
        </nav>

        {/* Dual Actions & Demo Shortcuts */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="primary"
                icon="briefcase"
                onClick={() => onNavigate && onNavigate(user.role === 'business' ? '/business/dashboard' : '/worker/dashboard')}
              >
                Go to Dashboard
              </Button>

              <button
                onClick={logout}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Log out"
              >
                <Icon name="log-out" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                icon="building"
                onClick={() => { loginAsDemoBusiness(); onNavigate && onNavigate('/business/dashboard'); }}
              >
                Demo Business
              </Button>
              <Button
                size="sm"
                variant="secondary"
                icon="user"
                onClick={() => { loginAsDemoWorker(); onNavigate && onNavigate('/worker/dashboard'); }}
              >
                Demo Worker
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
