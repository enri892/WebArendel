import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageCircle
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

const localidadOptions = [
  { value: 'Madrid', label: 'Madrid' },
  { value: 'GranCanaria', label: 'Gran Canaria' }
];

const FormularioSection = ({ selectedContract, onContractChange }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    contrato: '',
    localidad: '',
    comentarios: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [showContractMessage, setShowContractMessage] = useState(false);

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
          ...parsedData
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

    if (emptyFields.length > 0 || !file) {
      const errors = {};

      emptyFields.forEach(field => {
        errors[field] = 'Este campo es obligatorio';
      });

      if (!file) {
        errors['cv'] = 'El currículum es obligatorio';
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
      formDataToSend.append('localidad', formData.localidad);
      formDataToSend.append('comentarios', formData.comentarios || '');

      if (file) {
        formDataToSend.append('cv', file);
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/job-applications`, {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

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
          localidad: '',
          comentarios: ''
        });
        setFile(null);
        setFileName('');
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

          {/* Contrato y Localidad */}
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