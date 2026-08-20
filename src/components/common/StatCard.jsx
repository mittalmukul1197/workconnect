import React from 'react';
import { Icon } from './Icon';

export const StatCard = ({ title, value, subtext, icon, variant = 'primary' }) => {
  const iconColors = {
    primary: 'bg-indigo-500/10 text-indigo-400',
    emerald: 'bg-emerald-500/10 text-emerald-400',
    amber: 'bg-amber-500/10 text-amber-400',
    sky: 'bg-sky-500/10 text-sky-400',
    rose: 'bg-rose-500/10 text-rose-400'
  };

  return (
    <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
      <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
        <span className="uppercase tracking-wider text-[10px]">{title}</span>
        {icon && (
          <div className={`p-2 rounded-xl ${iconColors[variant] || iconColors.primary}`}>
            <Icon name={icon} className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="text-3xl font-black text-white tracking-tight">{value}</div>
      {subtext && <div className="text-[11px] text-slate-400 font-medium">{subtext}</div>}
    </div>
  );
};
