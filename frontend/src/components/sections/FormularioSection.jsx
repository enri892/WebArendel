import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageCircle,
  Calendar,
  CheckSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import HeaderForm from '../ui/HeaderForm.jsx';
import FormInput from '../ui/FormInput.jsx';
import FormSelect from '../ui/FormSelect.jsx';
import ResponseMessage from '../ui/ResponseMessage.jsx';
import BackgroundEffects from '../ui/BackgroundEffects.jsx';
import FormCard from '../ui/FormCard.jsx';
import FileUpload from '../ui/FileUpload.jsx';
import TextArea from '../ui/TextArea.jsx';
import SubmitButton from '../ui/SubmitButton.jsx';

// Opciones para los selects
const contratoOptions = [
  { value: '20-horas', label: '20 Horas - Jornada Media' },
  { value: '30-horas', label: '30 Horas - Jornada Parcial' },
  { value: '40-horas', label: '40 Horas - Jornada Completa' }
];

const disponibilidadOptions = [
  { value: 'manana', label: 'Mañana' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'noche-plus', label: 'Noche (Plus)' }
];

const localidadOptions = [
  { value: 'Madrid', label: 'Madrid' },
  { value: 'GranCanaria', label: 'Gran Canaria' }
];

// Zonas por localidad
const zonasPorLocalidad = {
  Madrid: [
    { value: 'getafe-leganes', label: 'Getafe-Leganés' },
    { value: 'arganda-rivas', label: 'Arganda-Rivas' },
    { value: 'madrid', label: 'Madrid' },
    { value: 'villanueva-brunete', label: 'Villanueva-Brunete' },
    { value: 'toledo', label: 'Toledo' }
  ],
  GranCanaria: [
    { value: 'telde', label: 'Telde' },
    { value: 'puertorico-mogan', label: 'Puerto Rico-Mogán' },
    { value: 'maspalomas', label: 'Maspalomas' },
    { value: 'arucas', label: 'Arucas' },
    { value: 'vecindario', label: 'Vecindario' }
  ]
};

const FormularioSection = ({ selectedContract, onContractChange }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    contrato: '',
    disponibilidad: [],
    localidad: '',
    zonas: [],
    comentarios: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [showContractMessage, setShowContractMessage] = useState(false);
  const [showZonasDropdown, setShowZonasDropdown] = useState(false);
  const [showDisponibilidadDropdown, setShowDisponibilidadDropdown] = useState(false);

  const responseRef = useRef(null);
  const contractMessageTimer = useRef(null);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem('arendel_form_temp');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev,
          ...parsedData,
          zonas: parsedData.zonas || [],
          disponibilidad: parsedData.disponibilidad || []
        }));
      } catch (error) {
        console.error('Error cargando datos temporales:', error);
      }
    }
  }, []);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('arendel_form_temp', JSON.stringify(formData));
  }, [formData]);

  // Limpiar localStorage al desmontar si fue exitoso
  useEffect(() => {
    return () => {
      if (apiResponse?.success) {
        localStorage.removeItem('arendel_form_temp');
      }
    };
  }, [apiResponse]);

  // Configurar el observer de intersección
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

  // Efecto para el mensaje temporal del contrato
  useEffect(() => {
    if (selectedContract) {
      setFormData(prev => ({
        ...prev,
        contrato: selectedContract
      }));

      setShowContractMessage(true);

      if (contractMessageTimer.current) {
        clearTimeout(contractMessageTimer.current);
      }

      contractMessageTimer.current = setTimeout(() => {
        setShowContractMessage(false);
      }, 3000);

      if (onContractChange) {
        onContractChange(selectedContract);
      }
    }
  }, [selectedContract, onContractChange]);

  // Limpiar zonas cuando cambia la localidad
  useEffect(() => {
    if (formData.localidad) {
      setFormData(prev => ({
        ...prev,
        zonas: []
      }));
      setShowZonasDropdown(false);
    }
  }, [formData.localidad]);

  // Limpiar timer al desmontar
  useEffect(() => {
    return () => {
      if (contractMessageTimer.current) {
        clearTimeout(contractMessageTimer.current);
      }
    };
  }, []);

  // Scroll al mensaje de respuesta
  useEffect(() => {
    if (apiResponse && responseRef.current) {
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

    if (field === 'contrato' && onContractChange) {
      onContractChange(value);
    }
  };

  const handleZonaChange = (zona) => {
    setFormData(prev => ({
      ...prev,
      zonas: prev.zonas.includes(zona)
        ? prev.zonas.filter(z => z !== zona)
        : [...prev.zonas, zona]
    }));
  };

  const handleDisponibilidadChange = (disponibilidad) => {
    setFormData(prev => ({
      ...prev,
      disponibilidad: prev.disponibilidad.includes(disponibilidad)
        ? prev.disponibilidad.filter(d => d !== disponibilidad)
        : [...prev.disponibilidad, disponibilidad]
    }));
  };

  const toggleZonasDropdown = () => {
    setShowZonasDropdown(!showZonasDropdown);
    if (showDisponibilidadDropdown) setShowDisponibilidadDropdown(false);
  };

  const toggleDisponibilidadDropdown = () => {
    setShowDisponibilidadDropdown(!showDisponibilidadDropdown);
    if (showZonasDropdown) setShowZonasDropdown(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // Función para extraer solo el error más relevante de cada campo
  const getRelevantError = (errors) => {
    const simplifiedErrors = {};

    for (const [field, error] of Object.entries(errors)) {
      if (error && typeof error === 'string') {
        const errorParts = error.split(';');
        const requiredError = errorParts.find(e =>
          e.toLowerCase().includes('obligatorio') ||
          e.toLowerCase().includes('requerido')
        );

        if (requiredError) {
          simplifiedErrors[field] = requiredError.trim();
        } else {
          simplifiedErrors[field] = errorParts[0].trim();
        }
      }
    }

    return simplifiedErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['nombre', 'telefono', 'email', 'contrato', 'localidad'];
    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0 || !file || formData.zonas.length === 0 || formData.disponibilidad.length === 0) {
      const errors = {};

      emptyFields.forEach(field => {
        errors[field] = 'Este campo es obligatorio';
      });

      if (!file) {
        errors['cv'] = 'El currículum es obligatorio';
      }

      if (formData.zonas.length === 0) {
        errors['zonas'] = 'Debes seleccionar al menos una zona';
      }

      if (formData.disponibilidad.length === 0) {
        errors['disponibilidad'] = 'Debes seleccionar al menos una disponibilidad';
      }

      setApiResponse({
        success: false,
        message: 'Por favor, completa todos los campos obligatorios.',
        errors
      });

      setTimeout(() => {
        if (responseRef.current) {
          responseRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 100);

      return;
    }

    setIsSubmitting(true);
    setApiResponse(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('contrato', formData.contrato);
      formDataToSend.append('disponibilidad', formData.disponibilidad.join(','));
      formDataToSend.append('localidad', formData.localidad);
      formDataToSend.append('zonas', formData.zonas.join(','));
      formDataToSend.append('comentarios', formData.comentarios || '');

      if (file) {
        formDataToSend.append('cv', file);
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/job-applications`, {
        method: 'POST',
        body: formDataToSend,
      });
      console.log(formDataToSend)
      const result = await response.json();
      console.log('Respuesta de la API:', result);
      if (result.message && result.message.includes('HV000028')) {
        setApiResponse({
          success: false,
          message: 'Por favor, completa todos los campos obligatorios.',
          errors: {}
        });
      } else {
        const simplifiedErrors = result.errors ? getRelevantError(result.errors) : {};
        setApiResponse({
          ...result,
          errors: simplifiedErrors
        });
      }

      if (result.success) {
        setFormData({
          nombre: '',
          telefono: '',
          email: '',
          contrato: '',
          disponibilidad: [],
          localidad: '',
          zonas: [],
          comentarios: ''
        });
        setFile(null);
        setFileName('');
        setShowZonasDropdown(false);
        setShowDisponibilidadDropdown(false);
        localStorage.removeItem('arendel_form_temp');

        const fileInput = document.getElementById('curriculum-input');
        if (fileInput) fileInput.value = '';
      }

    } catch (error) {
      console.error('Error de conexión:', error);
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

  const zonasDisponibles = zonasPorLocalidad[formData.localidad] || [];

  return (
    <section
      id="contacto"
      className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950"
    >
      {/* Background Effects */}
      <BackgroundEffects />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <HeaderForm
          isVisible={isVisible}
          showContractMessage={showContractMessage}
          formData={formData}
        />

        {/* Mensaje de respuesta de la API */}
        <ResponseMessage
          ref={responseRef}
          apiResponse={apiResponse}
          isVisible={isVisible}
          onClose={closeMessage}
        />

        {/* Form Card */}
        <FormCard isVisible={isVisible}>

          {/* Primera fila: Nombre y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              icon={User}
              iconColor="text-emerald-400"
              label="Nombre Completo"
              field="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Tu nombre completo"
              error={apiResponse?.errors?.nombre}
            />

            <FormInput
              icon={Phone}
              iconColor="text-blue-400"
              label="Teléfono"
              type="tel"
              field="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="+34655555555 (Sin espacios)"
              error={apiResponse?.errors?.telefono}
            />
          </div>

          {/* Email */}
          <FormInput
            icon={Mail}
            iconColor="text-purple-400"
            label="Correo Electrónico"
            type="email"
            field="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="ejemplo@email.com"
            error={apiResponse?.errors?.email}
            colSpan={2}
          />

          {/* Contrato y Disponibilidad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              icon={Clock}
              iconColor="text-orange-400"
              label="Tipo de Contrato"
              field="contrato"
              value={formData.contrato}
              onChange={handleInputChange}
              options={contratoOptions}
              placeholder="Selecciona el tipo de contrato"
              error={apiResponse?.errors?.contrato}
              highlightSelected={true}
              selectedContract={selectedContract}
            />

            {/* Disponibilidad con desplegable */}
            <div className="space-y-3 relative">
              <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
                <Calendar className="h-4 w-4 text-yellow-400" />
                Disponibilidad *
              </label>

              <button
                type="button"
                onClick={toggleDisponibilidadDropdown}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-white/15 transition-all duration-300 flex items-center justify-between"
              >
                <span className="text-white/80">
                  {formData.disponibilidad.length === 0
                    ? "Selecciona tus disponibilidades"
                    : `${formData.disponibilidad.length} seleccionada(s)`
                  }
                </span>
                {showDisponibilidadDropdown ? (
                  <ChevronUp className="h-4 w-4 text-yellow-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-yellow-400" />
                )}
              </button>

              {/* Desplegable de disponibilidad */}
              {showDisponibilidadDropdown && (
                <div className="absolute left-0 right-0 z-50 mt-1 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-medium text-sm">Selecciona tus disponibilidades</span>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {disponibilidadOptions.map(disponibilidad => (
                        <label
                          key={disponibilidad.value}
                          className="w-100 flex items-center gap-3 p-3 bg-slate-700/80 hover:bg-slate-600/60 rounded-lg cursor-pointer transition-all duration-200 border border-slate-600/50 hover:border-cyan-400/70 group"
                        >
                          <input
                            type="checkbox"
                            checked={formData.disponibilidad.includes(disponibilidad.value)}
                            onChange={() => handleDisponibilidadChange(disponibilidad.value)}
                            className="w-4 h-4 text-cyan-500 bg-slate-800 border-cyan-400/60 rounded focus:ring-cyan-400 focus:ring-2 focus:ring-offset-0"
                          />
                          <span className="pl-2 text-white text-sm font-medium group-hover:text-cyan-100 transition-colors select-none">
                            {disponibilidad.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {apiResponse?.errors?.disponibilidad && (
                <p className="mt-1 text-sm text-red-400">{apiResponse.errors.disponibilidad}</p>
              )}
            </div>
          </div>

          {/* Localidad y Zonas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              icon={MapPin}
              iconColor="text-pink-400"
              label="Localidad"
              field="localidad"
              value={formData.localidad}
              onChange={handleInputChange}
              options={localidadOptions}
              placeholder="Selecciona tu localidad"
              error={apiResponse?.errors?.localidad}
            />

            {/* Zonas con desplegable */}
            <div className="space-y-3 relative">
              <label className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider">
                <CheckSquare className="h-4 w-4 text-cyan-400" />
                Zonas de trabajo *
              </label>

              {!formData.localidad ? (
                <div className="text-align-center p-3 bg-white/5 backdrop-blur-xl border border-white/20 ">
                  <p className="text-white/60 m-0 p-0">Selecciona una localidad</p>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={toggleZonasDropdown}
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-white/15 transition-all duration-300 flex items-center justify-between"
                  >
                    <span className="text-white/80">
                      {formData.zonas.length === 0
                        ? "Ver zonas disponibles"
                        : `${formData.zonas.length} zona(s) seleccionada(s)`
                      }
                    </span>
                    {showZonasDropdown ? (
                      <ChevronUp className="h-4 w-4 text-cyan-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-cyan-400" />
                    )}
                  </button>

                  {/* Desplegable de zonas */}
                  {showZonasDropdown && (
                    <div className="absolute left-0 right-0 z-50 mt-1 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden">
                      <div className="p-4 space-y-3">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-white font-medium text-sm">Selecciona tus zonas</span>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {zonasDisponibles.map(zona => (
                            <label
                              key={zona.value}
                              className="w-100 flex items-center gap-3 p-3 bg-slate-700/80 hover:bg-slate-600/60 rounded-lg cursor-pointer transition-all duration-200 border border-slate-600/50 hover:border-cyan-400/70 group"
                            >
                              <input
                                type="checkbox"
                                checked={formData.zonas.includes(zona.value)}
                                onChange={() => handleZonaChange(zona.value)}
                                className="w-4 h-4 text-cyan-500 bg-slate-800 border-cyan-400/60 rounded focus:ring-cyan-400 focus:ring-2 focus:ring-offset-0"
                              />
                              <span className="pl-2 text-white text-sm font-medium group-hover:text-cyan-100 transition-colors select-none">
                                {zona.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {apiResponse?.errors?.zonas && (
                <p className="mt-1 text-sm text-red-400">{apiResponse.errors.zonas}</p>
              )}
            </div>
          </div>

          {/* Curriculum PDF */}
          <FileUpload
            fileName={fileName}
            onChange={handleFileChange}
            error={apiResponse?.errors?.cv}
            accept=".pdf,application/pdf"
            placeholder="Selecciona tu currículum (PDF)"
            label="Currículum (PDF)"
            required={true}
          />

          {/* Comentarios */}
          <TextArea
            icon={MessageCircle}
            iconColor="text-violet-400"
            label="Comentarios Adicionales"
            field="comentarios"
            value={formData.comentarios}
            onChange={handleInputChange}
            placeholder="Cuéntanos algo más sobre ti o tus expectativas..."
            rows={4}
            required={false}
          />

          {/* Submit Button */}
          <SubmitButton
            isSubmitting={isSubmitting}
            onClick={handleSubmit}
            text="Enviar Solicitud"
            loadingText="Enviando..."
          />

        </FormCard>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
};

export default FormularioSection;