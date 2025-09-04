import React, { useState, useEffect } from 'react';
import {
  User,
  Phone,
  Mail,
  Clock,
  MapPin,
  Upload,
  MessageCircle,
  Send,
  CheckCircle
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Si cambian el contrato manualmente, notificamos al componente padre
    if (field === 'contrato' && onContractChange) {
      onContractChange(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        curriculum: file.name
      }));
    } else if (file) {
      alert('Por favor, selecciona un archivo PDF válido.');
      e.target.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
    console.log('Datos del formulario:', formData);

    // Resetear el formulario y limpiar localStorage
    setFormData({
      nombre: '',
      telefono: '',
      email: '',
      contrato: '',
      localidad: '',
      curriculum: null,
      comentarios: ''
    });

    localStorage.removeItem('arendel_form_data');
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

        {/* Mensaje adicional si hay un contrato pre-seleccionado - CORREGIDO EL CENTRADO */}
        {selectedContract && (
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

        {/* Form Card */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative">
            {/* Glowing Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-500/30 rounded-3xl opacity-50 blur-xl transition-all duration-500" />

            {/* Card Background */}
            <div className="relative bg-gradient-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
              <div className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
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
                          className="w-full px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
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
                          placeholder="+34 123 456 789"
                          value={formData.telefono}
                          onChange={(e) => handleInputChange('telefono', e.target.value)}
                          required
                          className="w-full px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
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
                        className="w-full px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
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
                          className={`w-full px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 appearance-none cursor-pointer ${selectedContract ? 'border-orange-400/50 bg-orange-400/10' : ''}`}
                        >
                          <option value="" className="bg-slate-800 text-white" disabled hidden>Selecciona el tipo de contrato</option>
                          <option value="20-horas" className="bg-slate-800 text-white">20 Horas - Medio Tiempo</option>
                          <option value="30-horas" className="bg-slate-800 text-white">30 Horas - Tiempo Completo</option>
                          <option value="40-horas" className="bg-slate-800 text-white">40 Horas - Premium</option>
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
                          className="w-full px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 appearance-none cursor-pointer"
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
                      <div className="w-full px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all duration-300 cursor-pointer hover:bg-white/15">
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

                  {/* Submit Button - CORREGIDO: El efecto solo se activa al pasar el ratón sobre el botón */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full"
                    >
                      <div className="group relative w-full">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-30 group-hover:opacity-60 blur-md transition-all duration-300" />
                        <div className="relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 group-hover:from-emerald-500 group-hover:to-teal-500 flex items-center justify-center gap-3">
                          <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          Enviar Solicitud
                        </div>
                      </div>
                    </button>
                  </div>

                </form>
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