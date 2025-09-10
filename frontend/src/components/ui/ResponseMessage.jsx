import React, { forwardRef } from 'react';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';

// Función auxiliar para formatear nombres de campos
const formatFieldName = (field) => {
  const fieldNames = {
    nombre: 'Nombre',
    telefono: 'Teléfono',
    email: 'Email',
    contrato: 'Contrato',
    disponibilidad: 'Disponibilidad',
    localidad: 'Localidad',
    zonas: 'Zonas',
    cv: 'Currículum',
    comentarios: 'Comentarios'
  };
  return fieldNames[field] || field;
};

const ResponseMessage = forwardRef(({ 
  apiResponse, 
  isVisible, 
  onClose 
}, ref) => {
  
  if (!apiResponse) return null;

  const { success, message, errors = {} } = apiResponse;
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div
      ref={ref}
      className={`flex justify-center items-center mb-8 transform transition-all duration-1000 delay-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="relative max-w-2xl w-full">
        <div className={`relative p-6 rounded-2xl shadow-2xl ${
          success
            ? 'bg-emerald-900/70 border-2 border-emerald-400'
            : 'bg-red-950/70 border-2 border-red-400'
        } backdrop-blur-xl`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {/* Mensaje principal */}
              <div className="flex items-center gap-3 mb-3">
                {success ? (
                  <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 animate-pulse" />
                )}
                <p className="font-bold text-lg m-0 text-white">
                  {message}
                </p>
              </div>

              {/* Lista de errores si existen */}
              {hasErrors && (
                <div className="mt-4 p-4 bg-black/30 rounded-xl space-y-3">
                  <p className="text-red-300 font-semibold mb-2">
                    Campos con errores:
                  </p>
                  {Object.entries(errors).map(([field, error]) => (
                    error && (
                      <div key={field} className="flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">▸</span>
                        <div className="text-white">
                          <span className="font-bold text-red-300">
                            {formatFieldName(field)}:
                          </span>
                          <span className="ml-1 text-gray-200">
                            {error}
                          </span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* Botón de cerrar */}
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              aria-label="Cerrar mensaje"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

ResponseMessage.displayName = 'ResponseMessage';

export default ResponseMessage;