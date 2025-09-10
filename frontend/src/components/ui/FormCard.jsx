import React from 'react';

const FormCard = ({ children, isVisible }) => {
  return (
    <div className={`transform transition-all duration-1000 delay-500 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`}>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-500/30 rounded-3xl opacity-50 blur-xl transition-all duration-500" />
        
        <div className="relative bg-gradient-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
          <div className="p-8 lg:p-12">
            <div className="space-y-8">
              {children}
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-white/10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default FormCard;