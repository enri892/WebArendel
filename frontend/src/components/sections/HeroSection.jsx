import React, { useState, useEffect, useRef } from 'react';
import { Star, Truck, Users, MapPin, Award, ArrowRight, Play, Sparkles } from 'lucide-react';
import repartidor from '../../assets/repartidor.jpg';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Intersection Observer para detectar cuando el componente entra en vista
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1, // Se activa cuando el 10% del componente es visible
        rootMargin: '-50px' // Se activa 50px antes de que sea visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { icon: Users, number: "500+", label: "Repartidores Activos", color: "from-blue-400 to-blue-600" },
    { icon: MapPin, number: "15", label: "Localidades", color: "from-emerald-400 to-emerald-600" },
    { icon: Award, number: "3", label: "Años de Experiencia", color: "from-purple-400 to-purple-600" }
  ];

  return (
    <section 
      ref={sectionRef}
      id="inicio" 
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950"
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Gradient Orbs */}
        <div 
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full filter blur-3xl animate-pulse transform transition-all duration-1500 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) ${isVisible ? 'scale(1)' : 'scale(0.75)'}`,
            transitionDelay: '200ms'
          }}
        />
        <div 
          className={`absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 rounded-full filter blur-3xl animate-pulse transform transition-all duration-1500 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
          style={{
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px) ${isVisible ? 'scale(1)' : 'scale(0.75)'}`,
            transitionDelay: '400ms'
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className={`absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
          
          {/* Left Content */}
          <div className={`transform transition-all duration-1200 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'}`}
               style={{ transitionDelay: '300ms' }}>
            
            {/* Title with staggered animation */}
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className={`block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '500ms' }}>
                Únete al Equipo
              </span>
              <span className={`block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '700ms' }}>
                de Élite
              </span>
              <span className={`block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '900ms' }}>
                de Arendel
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl text-blue-100/80 mb-12 leading-relaxed transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
               style={{ transitionDelay: '1100ms' }}>
              Flexibilidad total, ingresos extraordinarios y estabilidad garantizada. 
              Forma parte de la empresa más innovadora en logística y delivery del país.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                 style={{ transitionDelay: '1300ms' }}>      
              <button className="group px-8 py-4 bg-white/10 backdrop-blur-md rounded-full font-semibold text-white border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center">
                  <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span>Ver Video</span>
                </div>
              </button>
            </div>

            {/* Stats with individual delays */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                  style={{ transitionDelay: `${1500 + (index * 150)}ms` }}
                >
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-xl`} />
                    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-3 lg:p-6 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center justify-center mb-2 lg:mb-3">
                        <div className={`p-2 lg:p-3 bg-gradient-to-r ${stat.color} rounded-full`}>
                          <stat.icon className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl lg:text-3xl xl:text-4xl font-black text-white mb-1 lg:mb-2">{stat.number}</div>
                        <div className="text-xs lg:text-sm text-blue-100/70 font-medium leading-tight">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image Section */}
          <div className={`relative transform transition-all duration-1200 ease-out ${isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-16 opacity-0 scale-95'}`}
               style={{ transitionDelay: '600ms' }}>
            <div className="relative group">
              {/* Glowing Border Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 animate-pulse transition-all duration-1000 ${isVisible ? 'scale-100' : 'scale-90'}`}
                   style={{ transitionDelay: '800ms' }} />
              
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-white/20 to-white/5 rounded-3xl p-1 backdrop-blur-md border border-white/30">
                <div className="relative overflow-hidden rounded-3xl">
                  <img 
                    src={repartidor}
                    alt="Repartidor profesional de Arendel" 
                    className={`w-full h-[600px] object-cover rounded-3xl transform group-hover:scale-105 transition-all duration-1000 ${isVisible ? 'scale-100' : 'scale-110'}`}
                    style={{ transitionDelay: '1000ms' }}
                  />
                  {/* Overlay gradient for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl" />
                </div>
              </div>

              {/* Floating Rating Card */}
              <div className={`absolute -bottom-8 -left-8 transform hover:scale-110 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                   style={{ transitionDelay: '1400ms' }}>
                <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 text-yellow-400 fill-current transition-all duration-300`}
                          style={{ 
                            transitionDelay: `${1600 + (i * 100)}ms`,
                            transform: isVisible ? 'scale(1)' : 'scale(0)'
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">4.8/5</div>
                      <div className="text-sm text-gray-600 font-medium">Satisfacción Laboral</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Success Indicator */}
              <div className={`absolute -top-6 -right-6 transform hover:scale-110 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-6 opacity-0 -rotate-12'}`}
                   style={{ transitionDelay: '1200ms' }}>
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full p-4 shadow-2xl">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '1800ms' }} />
    </section>
  );
};

export default HeroSection;