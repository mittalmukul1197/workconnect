import React from 'react';

export const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  className = ''
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full p-3 rounded-xl bg-slate-900 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
          error ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-indigo-500'
        }`}
      />
      {error && <p className="text-[11px] font-medium text-rose-400">{error}</p>}
      {helpText && !error && <p className="text-[11px] text-slate-400">{helpText}</p>}
    </div>
  );
};
