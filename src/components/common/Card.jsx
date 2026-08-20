import React from 'react';

export const Card = ({ children, className = '', hover = true, borderVariant = 'default' }) => {
  const borderVariants = {
    default: 'border-slate-800',
    indigo: 'border-indigo-500/30',
    emerald: 'border-emerald-500/30',
    amber: 'border-amber-500/30',
    rose: 'border-rose-500/30'
  };

  return (
    <div
      className={`glass-card p-6 rounded-2xl border ${borderVariants[borderVariant] || borderVariants.default} ${
        hover ? 'hover:border-slate-700 hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
