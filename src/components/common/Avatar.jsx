import React from 'react';

export const Avatar = ({ src, alt = 'User', size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 rounded-lg text-xs',
    md: 'w-10 h-10 rounded-xl text-sm',
    lg: 'w-14 h-14 rounded-2xl text-base',
    xl: 'w-20 h-20 rounded-2xl text-xl'
  };

  const initials = alt ? alt.split(' ').map(n => n[0]).join('').substring(0, 2) : 'U';

  return (
    <div className={`relative overflow-hidden border border-slate-200 bg-indigo-50 shrink-0 flex items-center justify-center font-bold text-indigo-700 shadow-xs ${sizes[size] || sizes.md} ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
