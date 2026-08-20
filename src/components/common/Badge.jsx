import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
    amber: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
    danger: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold',
    rose: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold',
    info: 'bg-sky-50 text-sky-700 border-sky-200 font-semibold',
    sky: 'bg-sky-50 text-sky-700 border-sky-200 font-semibold',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200 font-semibold'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full border ${variants[variant] || variants.primary} ${className}`}>
      {children}
    </span>
  );
};
