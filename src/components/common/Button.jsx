import React from 'react';
import { Icon } from './Icon';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  className = ''
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5',
    secondary: 'bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5',
    outline: 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 shadow-md',
    accent: 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30',
    ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/60'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-xs gap-2',
    lg: 'px-6 py-3.5 text-sm gap-2.5'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading && <Icon name="sync" className="w-4 h-4 animate-spin" />}
      {!loading && icon && iconPosition === 'left' && <Icon name={icon} className="w-4 h-4" />}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <Icon name={icon} className="w-4 h-4" />}
    </button>
  );
};
