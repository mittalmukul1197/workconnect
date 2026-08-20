import React from 'react';

export const Card = ({ children, className = '', hover = true, borderVariant = 'default' }) => {
  const borderVariants = {
    default: 'border-slate-200/80 bg-white shadow-sm',
    indigo: 'border-indigo-200/80 bg-white shadow-sm hover:border-indigo-300',
    emerald: 'border-emerald-200/80 bg-white shadow-sm hover:border-emerald-300',
    amber: 'border-amber-200/80 bg-white shadow-sm hover:border-amber-300',
    rose: 'border-rose-200/80 bg-white shadow-sm hover:border-rose-300',
    purple: 'border-purple-200/80 bg-white shadow-sm hover:border-purple-300',
    cyan: 'border-cyan-200/80 bg-white shadow-sm hover:border-cyan-300',
    sky: 'border-sky-200/80 bg-white shadow-sm hover:border-sky-300'
  };

  return (
    <div
      className={`p-6 rounded-2xl border ${borderVariants[borderVariant] || borderVariants.default} ${
        hover ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
