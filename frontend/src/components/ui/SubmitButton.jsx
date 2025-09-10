import React from 'react';
import { Send, Loader } from 'lucide-react';

const SubmitButton = ({
  isSubmitting,
  onClick,
  text = "Enviar Solicitud",
  loadingText = "Enviando..."
}) => {
  return (
    <div className="pt-4">
      <button
        type="button"
        disabled={isSubmitting}
        onClick={onClick}
        className="w-full"
      >
        <div className="group relative w-full">
          <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-30 group-hover:opacity-60 blur-md transition-all duration-300 ${
            isSubmitting ? 'animate-pulse' : ''
          }`} />
          <div className={`relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 group-hover:from-emerald-500 group-hover:to-teal-500 flex items-center justify-center gap-3 ${
            isSubmitting ? 'opacity-80' : ''
          }`}>
            {isSubmitting ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                {loadingText}
              </>
            ) : (
              <>
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                {text}
              </>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default SubmitButton;