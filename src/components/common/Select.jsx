import React from 'react';

export const Select = ({
  label,
  value,
  onChange,
  options = [],
  required = false,
  error,
  className = ''
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full p-3 rounded-xl bg-slate-900 border text-xs text-white focus:outline-none transition-colors cursor-pointer ${
          error ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-indigo-500'
        }`}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value || opt} className="bg-slate-900 text-white">
            {opt.label || opt}
          </option>
        ))}
      </select>
      {error && <p className="text-[11px] font-medium text-rose-400">{error}</p>}
    </div>
  );
};
