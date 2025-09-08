import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Home, Gift, FileText, Mail, Map } from 'lucide-react';
import logo from '../../assets/logo.png';
import './Header.css'; 

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'beneficios', label: 'Beneficios', icon: Gift },
    { id: 'zonas', label: 'Zonas', icon: Map },
    { id: 'contratos', label: 'Contratos', icon: FileText },
    { id: 'contacto', label: 'Contáctanos', icon: Mail }
  ];

  // Escuchar cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      // Cerrar menú móvil si se redimensiona a un tamaño mayor
      if (window.innerWidth > 950) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll listener con scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detectar sección visible
      let currentSection = 'inicio';
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= window.innerHeight / 2) {
            currentSection = item.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  // Determinar si estamos en modo "mobile" (incluyendo tabletas pequeñas)
  const isMobileView = windowWidth <= 950;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-20">
        {/* Fondos con transición suave */}
        <div
          className="absolute inset-0 transition-opacity duration-500 ease-in-out bg-gradient-to-r from-purple-50/80 to-blue-50/80 backdrop-blur-sm"
          style={{ opacity: isScrolled ? 0.2 : 1 }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500 ease-in-out bg-white/95 backdrop-blur-lg shadow-2xl border-b border-purple-100"
          style={{ opacity: isScrolled ? 1 : 0 }}
        />

        {/* Contenido */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <div className="relative w-40 h-12 transform transition-all duration-300 overflow-hidden group hover:scale-105">
              <img src={logo} alt="Arendel Logo" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Navegación Desktop - Solo se muestra en pantallas grandes */}
          {!isMobileView ? (
            <>
              <nav className="flex space-x-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`group relative px-4 py-2 rounded-full transition-all duration-300 border-none bg-transparent cursor-pointer
                        hover:bg-white/80 hover:shadow-lg hover:-translate-y-0.5 ${activeSection === item.id ? 'bg-white shadow-md' : 'text-gray-700'
                        }`}
                      style={{ color: activeSection === item.id ? '#003ea5' : undefined }}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-4 h-4 transition-all duration-300 group-hover:rotate-12 ${activeSection === item.id ? 'text-purple-600' : 'group-hover:text-purple-600'
                          }`} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {activeSection === item.id && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full animate-pulse"></div>
                      )}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  );
                })}
              </nav>

              {/* CTA Desktop */}
              <div>
                <button
                  onClick={() => handleNavClick('contacto')}
                  className="group relative px-3 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-800 via-cyan-700 to-blue-800
                    text-white font-semibold rounded-full shadow-lg hover:shadow-xl
                    transform transition-all duration-300 hover:scale-105 hover:-translate-y-1
                    text-sm md:text-base overflow-hidden
                    hover:from-blue-900 hover:to-cyan-800 hover:to-blue-900"
                >
                  <span className="relative flex items-center space-x-2 z-10">
                    <span>Únete Ahora</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                    transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 z-20"></div>
                </button>
              </div>
            </>
          ) : (
            /* Mobile Menu Button - Se muestra en tabletas pequeñas y móviles */
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/80 shadow-lg backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      </header>

      {/* Mobile Menu - Se muestra en tabletas pequeñas y móviles */}
      {isMobileView && (
        <div
          className={`fixed inset-0 z-40 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div
            className={`absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-bold text-xl">Menú</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <nav className="p-6 space-y-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 border-none bg-transparent cursor-pointer w-full text-left
                      hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-lg hover:transform hover:translate-x-2 ${activeSection === item.id ? 'bg-gradient-to-r from-purple-100 to-pink-100 shadow-md' : ''
                      }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: isMobileMenuOpen ? 'slideIn 0.5s ease-out forwards' : 'none'
                    }}
                  >
                    <Icon
                      className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${activeSection === item.id ? 'text-purple-600' : 'text-gray-600 group-hover:text-purple-600'
                        }`}
                    />
                    <span
                      className={`font-medium transition-colors duration-300 ${activeSection === item.id ? 'text-purple-600' : 'text-gray-700 group-hover:text-purple-600'
                        }`}
                    >
                      {item.label}
                    </span>
                    {activeSection === item.id && (
                      <div className="ml-auto w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="p-6">
              <button
                onClick={() => handleNavClick('contacto')}
                className="w-full group relative px-6 py-4 bg-gradient-to-r from-blue-800 via-cyan-700 to-blue-800
                  text-white font-semibold rounded-xl shadow-lg hover:shadow-xl
                  transform transition-all duration-300 hover:scale-105 overflow-hidden
                  hover:from-blue-900 hover:to-cyan-800 hover:to-blue-900"
              >
                <span className="relative flex items-center justify-center space-x-2 z-10">
                  <span>Únete Ahora</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent
                  transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 z-20"
                ></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;