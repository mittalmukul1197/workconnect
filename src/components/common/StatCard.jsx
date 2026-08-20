import React from 'react';
import { Icon } from './Icon';

export const StatCard = ({ title, value, subtext, icon, variant = 'primary' }) => {
  const iconColors = {
    primary: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    amber: 'bg-amber-50 text-amber-600 border border-amber-200',
    sky: 'bg-sky-50 text-sky-600 border border-sky-200',
    rose: 'bg-rose-50 text-rose-600 border border-rose-200'
  };

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
        <span className="uppercase tracking-wider text-[10px]">{title}</span>
        {icon && (
          <div className={`p-2 rounded-xl ${iconColors[variant] || iconColors.primary}`}>
            <Icon name={icon} className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="text-3xl font-black text-slate-900 tracking-tight">{value}</div>
      {subtext && <div className="text-[11px] text-slate-500 font-medium">{subtext}</div>}
    </div>
  );
};
