import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  DollarSign, 
  Shield, 
  Users, 
  Truck, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

const BeneficiosSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('beneficios');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: Clock,
      title: "Horarios Flexibles",
      description: "Elige entre contratos de 20, 30 o 40 horas semanales. Adapta tu trabajo a tu estilo de vida.",
      gradient: "from-blue-500 to-purple-600",
      bgGradient: "from-blue-500/10 to-purple-500/10",
      delay: 0
    },
    {
      icon: DollarSign,
      title: "Ingresos Competitivos",
      description: "Salarios por encima del promedio del mercado, con bonos por rendimiento y puntualidad.",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      delay: 100
    },
    {
      icon: Shield,
      title: "Contratos Estables",
      description: "Seguridad laboral con contratos formales, prestaciones sociales y seguro médico incluido.",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      delay: 200
    },
    {
      icon: Users,
      title: "Apoyo Constante",
      description: "Equipo de soporte 24/7, capacitación continua y acompañamiento en tu desarrollo profesional.",
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-500/10 to-red-500/10",
      delay: 300
    },
    {
      icon: Truck,
      title: "Equipamiento Incluido",
      description: "Proporcionamos uniforme, equipo de protección y herramientas necesarias para tu trabajo.",
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
      delay: 400
    },
    {
      icon: TrendingUp,
      title: "Crecimiento Profesional",
      description: "Oportunidades de ascenso a supervisor, coordinador o roles administrativos dentro de la empresa.",
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-500/10 to-purple-500/10",
      delay: 500
    }
  ];

  return (
    <section id="beneficios" className="relative py-12 lg:py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Static Gradient Orbs - más claros que el hero */}
        <div className="absolute top-1/3 left-1/6 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full filter blur-3xl" />
      </div>

      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 lg:mb-15 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              ¿Por qué elegir
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Arendel?
            </span>
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100/80 max-w-4xl mx-auto leading-relaxed">
            Ofrecemos las mejores condiciones del mercado para que puedas desarrollar 
            tu carrera profesional con estabilidad y crecimiento extraordinario.
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${benefit.delay}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative group h-full">
                {/* Glowing Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-60 blur-xl transition-all duration-500`} />
                
                {/* Card Background */}
                <div className={`relative h-full bg-gradient-to-br ${benefit.bgGradient} backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden group-hover:border-white/40 transition-all duration-500 transform group-hover:scale-105`}>
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
                    {/* Icon Container */}
                    <div className="mb-6">
                      <div className={`inline-flex p-4 bg-gradient-to-r ${benefit.gradient} rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform duration-300`}>
                        <benefit.icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-blue-100/70 leading-relaxed text-sm lg:text-base flex-grow group-hover:text-blue-100/90 transition-colors duration-300">
                      {benefit.description}
                    </p>
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

export default BeneficiosSection;