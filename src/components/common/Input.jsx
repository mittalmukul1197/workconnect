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
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full p-3 rounded-xl bg-white border text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
          error ? 'border-rose-500 focus:border-rose-400' : 'border-slate-300 focus:border-indigo-500 shadow-xs'
        }`}
      />
      {error && <p className="text-[11px] font-medium text-rose-600">{error}</p>}
      {helpText && !error && <p className="text-[11px] text-slate-500">{helpText}</p>}
    </div>
  );
};
