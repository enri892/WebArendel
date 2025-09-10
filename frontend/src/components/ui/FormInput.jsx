import React from 'react';

const FormInput = ({ 
  icon: Icon,
  iconColor = 'text-white',
  label,
  type = 'text',
  field,
  value,
  onChange,
  placeholder,
  error,
  required = true,
  colSpan = 1
}) => {
  return (
    <div className={`space-y-3 ${colSpan === 2 ? 'md:col-span-2' : ''}`}>
      <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
        <Icon className={`h-4 w-4 ${iconColor}`} />
        {label} {required && '*'}
      </label>
      <div className="relative">
        <input
          required={required}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className={`w-full px-4 py-4 bg-white/10 backdrop-blur-xl border rounded-2xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : `border-white/20 focus:${iconColor.replace('text', 'border')} focus:ring-2 focus:${iconColor.replace('text', 'ring')}/20`
          }`}
        />
      </div>
    </div>
  );
};

export default FormInput;