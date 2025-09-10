import React from 'react';

const FormSelect = ({
  icon: Icon,
  iconColor = 'text-white',
  label,
  field,
  value,
  onChange,
  options,
  placeholder = 'Selecciona una opción',
  error,
  required = true,
  highlightSelected = false,
  selectedContract = null
}) => {
  const isHighlighted = highlightSelected && selectedContract && value === selectedContract;
  
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
        <Icon className={`h-4 w-4 ${iconColor}`} />
        {label} {required && '*'}
      </label>
      <div className="relative">
        <select
          required={required}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className={`w-full px-4 py-4 bg-white/10 backdrop-blur-xl border rounded-2xl text-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer ${
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : isHighlighted
                ? `${iconColor.replace('text', 'border')}/50 bg-${iconColor.replace('text-', '')}/10 focus:${iconColor.replace('text', 'border')} focus:ring-2 focus:${iconColor.replace('text', 'ring')}/20`
                : `border-white/20 focus:${iconColor.replace('text', 'border')} focus:ring-2 focus:${iconColor.replace('text', 'ring')}/20`
          }`}
        >
          <option value="" className="bg-slate-800 text-white" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value} 
              className="bg-slate-800 text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FormSelect;