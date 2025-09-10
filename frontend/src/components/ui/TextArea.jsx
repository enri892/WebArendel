import React from 'react';

const TextArea = ({
  icon: Icon,
  iconColor = 'text-white',
  label,
  field,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false
}) => {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
        <Icon className={`h-4 w-4 ${iconColor}`} />
        {label} {required ? '*' : '(Opcional)'}
      </label>
      <div className="relative">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          rows={rows}
          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:${iconColor.replace('text', 'border')} focus:ring-2 focus:${iconColor.replace('text', 'ring')}/20 transition-all duration-300 resize-none`}
        />
      </div>
    </div>
  );
};

export default TextArea;