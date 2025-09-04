import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Phone,
  Mail,
  Clock,
  MapPin,
  Upload,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  X,
  Loader
} from 'lucide-react';

const FormularioSection = ({ selectedContract, onContractChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    contrato: '',
    localidad: '',
    curriculum: null,
    comentarios: ''
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [file, setFile] = useState(null);
  
  // Referencia para el mensaje de respuesta
  const responseRef = useRef(null);

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem('arendel_form_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev,
          ...parsedData
        }));
      } catch (error) {
        console.error('Error cargando datos guardados:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Guardar datos en localStorage cada vez que cambien
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('arendel_form_data', JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contacto');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Efecto para actualizar el contrato cuando se selecciona desde otra sección
  useEffect(() => {
    if (selectedContract && isLoaded) {
      setFormData(prev => ({
        ...prev,
        contrato: selectedContract
      }));

      // Notificar al componente padre del cambio
      if (onContractChange) {
        onContractChange(selectedContract);
      }
    }
  }, [selectedContract, isLoaded, onContractChange]);

  // Efecto para desplazar hacia el mensaje de respuesta cuando haya uno
  useEffect(() => {
    if (apiResponse && responseRef.current) {
      // Pequeño retraso para permitir que el mensaje se renderice completamente
      setTimeout(() => {
        responseRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });
      }, 100);
    }
  }, [apiResponse]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Si cambian el contrato manualmente, notificamos al componente padre
    if (field === 'contrato' && onContractChange) {
      onContractChange(value);
    }

    // Limpiar errores cuando el usuario modifique campos
    if (apiResponse && !apiResponse.success && apiResponse.errors && apiResponse.errors[field]) {
      setApiResponse(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [field]: undefined
        }
      }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormData(prev => ({
        ...prev,
        curriculum: selectedFile.name
      }));

      // Limpiar error de cv si existe
      if (apiResponse && !apiResponse.success && apiResponse.errors && apiResponse.errors.cv) {
        setApiResponse(prev => ({
          ...prev,
          errors: {
            ...prev.errors,
            cv: undefined
          }
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiResponse(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('contrato', formData.contrato);
      formDataToSend.append('localidad', formData.localidad);
      formDataToSend.append('comentarios', formData.comentarios);
      
      if (file) {
        formDataToSend.append('cv', file);
      }

      const response = await fetch('http://localhost:8080/api/v1/job-applications', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      console.log('Respuesta de la API:', result);
      setApiResponse(result);

      if (result.success) {
        // Resetear el formulario y limpiar localStorage en caso de éxito
        setFormData({
          nombre: '',
          telefono: '',
          email: '',
          contrato: '',
          localidad: '',
          curriculum: null,
          comentarios: ''
        });
        setFile(null);
        localStorage.removeItem('arendel_form_data');
        
        // Reset file input
        const fileInput = document.getElementById('curriculum-input');
        if (fileInput) fileInput.value = '';
      }

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setApiResponse({
        success: false,
        message: 'Error de conexión. Por favor, inténtalo de nuevo.',
        errors: {}
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeMessage = () => {
    setApiResponse(null);
  };

  // Renderizar mensaje de respuesta
  const renderResponseMessage = () => {
    if (!apiResponse) return null;

    const { success, message, errors = {} } = apiResponse;
    const hasErrors = Object.keys(errors).length > 0;

    return (
      <div 
        ref={responseRef} // Añadimos la referencia aquí
        className={`flex justify-center items-center mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="relative max-w-2xl w-full">
          <div className={`absolute -inset-0.5 ${success ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-red-500 to-orange-500'} rounded-2xl opacity-60 blur-lg`} />
          <div className={`relative p-4 ${success ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20' : 'bg-gradient-to-r from-red-500/20 to-orange-500/20'} backdrop-blur-xl rounded-2xl border border-white/20`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {success ? (
                    <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  )}
                  <p className="text-white font-semibold m-0">
                    {message}
                  </p>
                </div>
                
                {hasErrors && (
                  <div className="mt-3 space-y-2">
                    {Object.entries(errors).map(([field, error]) => (
                      error && (
                        <div key={field} className="flex items-center gap-2 text-sm">
                          <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0" />
                          <span className="text-red-200">
                            <strong className="capitalize">{field === 'cv' ? 'Currículum' : field}:</strong> {error}
                          </span>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={closeMessage}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="contacto" className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full filter blur-3xl" />
      </div>

      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 lg:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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

        {/* Mensaje de contrato pre-seleccionado */}
        {selectedContract && !apiResponse && (
          <div className={`flex justify-center items-center mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-60 blur-lg" />
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

        {/* Mensaje de respuesta de la API */}
        {renderResponseMessage()}

        {/* Form Card */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative">
            {/* Glowing Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-500/30 rounded-3xl opacity-50 blur-xl transition-all duration-500" />

            {/* Card Background */}
            <div className="relative bg-gradient-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
              <div className="p-8 lg:p-12">
                <div className="space-y-8">
                  {/* Primera fila: Nombre y Teléfono */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
                        <User className="h-4 w-4 text-emerald-400" />
                        Nombre Completo *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Tu nombre completo"
                          value={formData.nombre}
                          onChange={(e) => handleInputChange('nombre', e.target.value)}
                          required
                          className={`w-full px-4 py-4 bg-white/10 backdrop-blur-xl border rounded-2xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                            apiResponse && apiResponse.errors && apiResponse.errors.nombre
                              ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                              : 'border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
                        <Phone className="h-4 w-4 text-blue-400" />
                        Teléfono *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="+34655555555 (Sin espacios)"
                          value={formData.telefono}
                          onChange={(e) => handleInputChange('telefono', e.target.value)}
                          required
                          className={`w-full px-4 py-4 bg-white/10 backdrop-blur-xl border rounded-2xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                            apiResponse && apiResponse.errors && apiResponse.errors.telefono
                              ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                              : 'border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
                      <Mail className="h-4 w-4 text-purple-400" />
                      Correo Electrónico *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="ejemplo@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className={`w-full px-4 py-4 bg-white/10 backdrop-blur-xl border rounded-2xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                          apiResponse && apiResponse.errors && apiResponse.errors.email
                            ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                            : 'border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Contrato y Localidad */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
                        <Clock className="h-4 w-4 text-orange-400" />
                        Tipo de Contrato *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.contrato}
                          onChange={(e) => handleInputChange('contrato', e.target.value)}
                          required
                          className={`w-full px-4 py-4 bg-white/10 backdrop-blur-xl border rounded-2xl text-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer ${
                            apiResponse && apiResponse.errors && apiResponse.errors.contrato
                              ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                              : selectedContract 
                                ? 'border-orange-400/50 bg-orange-400/10 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20'
                                : 'border-white/20 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20'
                          }`}
                        >
                          <option value="" className="bg-slate-800 text-white" disabled hidden>Selecciona el tipo de contrato</option>
                          <option value="20-horas" className="bg-slate-800 text-white">20 Horas - Jornada Media</option>
                          <option value="30-horas" className="bg-slate-800 text-white">30 Horas - Jornada Parcial</option>
                          <option value="40-horas" className="bg-slate-800 text-white">40 Horas - Jornada Completa</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
                        <MapPin className="h-4 w-4 text-pink-400" />
                        Localidad *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.localidad}
                          onChange={(e) => handleInputChange('localidad', e.target.value)}
                          required
                          className={`w-full px-4 py-4 bg-white/10 backdrop-blur-xl border rounded-2xl text-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer ${
                            apiResponse && apiResponse.errors && apiResponse.errors.localidad
                              ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                              : 'border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20'
                          }`}
                        >
                          <option value="" className="bg-slate-800 text-white" disabled hidden>Selecciona tu localidad</option>
                          <option value="madrid" className="bg-slate-800 text-white">Madrid</option>
                          <option value="barcelona" className="bg-slate-800 text-white">Barcelona</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Curriculum PDF */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
                      <Upload className="h-4 w-4 text-cyan-400" />
                      Currículum (PDF) *
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        required
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        id="curriculum-input"
                      />
                      <div className={`w-full px-4 py-4 bg-white/10 backdrop-blur-xl border rounded-2xl text-white transition-all duration-300 cursor-pointer hover:bg-white/15 ${
                        apiResponse && apiResponse.errors && apiResponse.errors.cv
                          ? 'border-red-400 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-400/20'
                          : 'border-white/20 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20'
                      }`}>
                        <label htmlFor="curriculum-input" className="flex items-center gap-3 cursor-pointer">
                          <span className={formData.curriculum ? 'text-white' : 'text-white/50'}>
                            {formData.curriculum || 'Selecciona tu currículum (PDF)'}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Comentarios */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
                      <MessageCircle className="h-4 w-4 text-violet-400" />
                      Comentarios Adicionales (Opcional)
                    </label>
                    <div className="relative">
                      <textarea
                        placeholder="Cuéntanos algo más sobre ti o tus expectativas..."
                        value={formData.comentarios}
                        onChange={(e) => handleInputChange('comentarios', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      className="w-full"
                    >
                      <div className="group relative w-full">
                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-30 group-hover:opacity-60 blur-md transition-all duration-300 ${isSubmitting ? 'animate-pulse' : ''}`} />
                        <div className={`relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 group-hover:from-emerald-500 group-hover:to-teal-500 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-80' : ''}`}>
                          {isSubmitting ? (
                            <>
                              <Loader className="h-5 w-5 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                              Enviar Solicitud
                            </>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>

                </div>
              </div>

              {/* Subtle Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-white/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
};

export default FormularioSection;