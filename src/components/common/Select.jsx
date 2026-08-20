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
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full p-3 rounded-xl bg-white border text-xs text-slate-900 focus:outline-none transition-colors cursor-pointer ${
          error ? 'border-rose-500 focus:border-rose-400' : 'border-slate-300 focus:border-indigo-500 shadow-xs'
        }`}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value || opt} className="bg-white text-slate-900">
            {opt.label || opt}
          </option>
        ))}
      </select>
      {error && <p className="text-[11px] font-medium text-rose-600">{error}</p>}
    </div>
  );
};
