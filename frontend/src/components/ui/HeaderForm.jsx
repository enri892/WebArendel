import React from 'react';
import { CheckCircle } from 'lucide-react';

const HeaderForm = ({ isVisible, showContractMessage, formData }) => {
  return (
    <>
      <div className={`text-center mb-12 lg:mb-16 transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Comienza tu carrera
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            con Arendel
          </span>
        </h2>

        <p className="text-lg md:text-xl lg:text-2xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
          Completa el formulario y nos pondremos en contacto contigo
          en menos de 24 horas
        </p>
      </div>

      {/* Mensaje temporal de contrato seleccionado (3 segundos) */}
      {showContractMessage && formData.contrato && (
        <div className={`flex justify-center items-center mb-8 transform transition-all duration-500 ${
          showContractMessage ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-60 animate-pulse" />
            <div className="relative p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="flex items-center justify-center gap-2 h-full leading-none">
                <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <p className="text-white font-semibold m-0">
                  Has seleccionado: {formData.contrato.replace('-', ' - ').replace('horas', 'Horas')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderForm;