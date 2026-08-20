import React from 'react';
import { Icon } from './Icon';
import { Badge } from './Badge';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate && onNavigate('/')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Icon name="zap" className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <span className="text-xl font-black text-white">Work<span className="text-gradient">Connect</span></span>
            <Badge variant="primary">Hackathon MVP</Badge>
          </div>
          <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
            An intelligent two-sided workforce network connecting businesses needing work done with workers and skilled professionals offering available capacity.
          </p>
          <p className="text-[11px] text-slate-500 font-semibold">
            "A job board finds people once — WorkConnect keeps the work running."
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Quick Navigation</h4>
          <ul className="space-y-1.5 text-xs">
            <li><button onClick={() => onNavigate && onNavigate('/')} className="hover:text-white transition-colors">Home Overview</button></li>
            <li><button onClick={() => onNavigate && onNavigate('/role-selection')} className="hover:text-white transition-colors">Get Started (Role Selection)</button></li>
            <li><button onClick={() => onNavigate && onNavigate('/onboarding/business')} className="hover:text-white transition-colors">Business Onboarding</button></li>
            <li><button onClick={() => onNavigate && onNavigate('/onboarding/worker')} className="hover:text-white transition-colors">Worker Onboarding</button></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Demo Dashboards</h4>
          <ul className="space-y-1.5 text-xs">
            <li><button onClick={() => onNavigate && onNavigate('/business/dashboard')} className="hover:text-white transition-colors text-indigo-300">Business Dashboard</button></li>
            <li><button onClick={() => onNavigate && onNavigate('/worker/dashboard')} className="hover:text-white transition-colors text-emerald-300">Worker Dashboard</button></li>
            <li><button onClick={() => onNavigate && onNavigate('/admin/demo')} className="hover:text-white transition-colors text-amber-300">Admin Demo Center</button></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500">
        <p>© 2026 WorkConnect Network. Built for National Hackathon Excellence.</p>
        <p>Industry-Agnostic Two-Sided Capability Discovery Platform</p>
      </div>
    </footer>
  );
};
