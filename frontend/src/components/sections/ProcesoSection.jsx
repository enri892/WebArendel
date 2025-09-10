import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Phone, 
  GraduationCap, 
  Rocket,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const ProcesoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('proceso');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: FileText,
      title: "Postúlate Online",
      description: "Completa nuestro formulario simple con tus datos básicos",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      delay: 0,
      number: 1
    },
    {
      icon: Phone,
      title: "Entrevista Telefónica",
      description: "Conversación breve para conocerte mejor y resolver dudas",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      delay: 150,
      number: 2
    },
    {
      icon: GraduationCap,
      title: "Capacitación",
      description: "Entrenamiento completo sobre procesos y herramientas",
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-500/10 to-violet-500/10",
      delay: 300,
      number: 3
    },
    {
      icon: Rocket,
      title: "¡Comienza a Trabajar!",
      description: "Inicia tu carrera con Arendel y comienza a generar ingresos",
      gradient: "from-orange-500 to-pink-600",
      bgGradient: "from-orange-500/10 to-pink-500/10",
      delay: 450,
      number: 4
    }
  ];

  return (
    <section id="proceso" className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full filter blur-3xl" />
      </div>

      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 lg:mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Proceso simple en
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              4 pasos
            </span>
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
            Únete a nuestro equipo de manera rápida y sencilla. 
            Tu nueva carrera está a solo unos pasos de distancia.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${step.delay}ms` }}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div className="relative group h-full">
                {/* Glowing Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${step.gradient} rounded-3xl opacity-0 group-hover:opacity-60 blur-xl transition-all duration-500`} />
                
                {/* Card Background */}
                <div className={`relative h-full bg-gradient-to-br ${step.bgGradient} backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden group-hover:border-white/40 transition-all duration-500 transform group-hover:scale-105`}>
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-8 h-8 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col text-center">
                    {/* Icon Container */}
                    <div className="mb-6">
                      <div className={`inline-flex p-4 bg-gradient-to-r ${step.gradient} rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-blue-100/70 leading-relaxed text-sm lg:text-base flex-grow group-hover:text-blue-100/90 transition-colors duration-300">
                      {step.description}
                    </p>

                    {/* Step Indicator */}
                    <div className="mt-6 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100" />
                      {index < steps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-white/30 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                      )}
                    </div>
                  </div>
                  
                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
};

export default ProcesoSection;