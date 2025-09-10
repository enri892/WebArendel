import React from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({
  fileName,
  onChange,
  error,
  accept = ".pdf,application/pdf",
  placeholder = "Selecciona tu currículum (PDF)",
  label = "Currículum (PDF)",
  required = true
}) => {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
        <Upload className="h-4 w-4 text-cyan-400" />
        {label} {required && '*'}
      </label>
      <div className="relative">
        <input
          required={required}
          type="file"
          accept={accept}
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          id="curriculum-input"
        />
        <div className={`w-full px-4 py-4 bg-white/10 backdrop-blur-xl border rounded-2xl text-white transition-all duration-300 cursor-pointer hover:bg-white/15 ${
          error
            ? 'border-red-400 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-400/20'
            : 'border-white/20 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20'
        }`}>
          <label htmlFor="curriculum-input" className="flex items-center gap-3 cursor-pointer">
            <span className={fileName ? 'text-white' : 'text-white/50'}>
              {fileName || placeholder}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;