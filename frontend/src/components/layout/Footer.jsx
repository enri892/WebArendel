import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter,
  ArrowUp, Heart
} from 'lucide-react';

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Instagram, name: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Linkedin, name: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Twitter, name: 'Twitter', color: 'hover:text-sky-400' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-800 to-black text-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-3xl font-black bg-gradient-to-r from-white via-gray-400 to-gray-500 bg-clip-text text-transparent mb-4">
                Arendel
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full mb-4"></div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              Líder en servicios de logística y delivery, comprometidos con la excelencia 
              y el crecimiento profesional de nuestro equipo.
            </p>
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 text-sm font-medium border border-white/10 hover:border-white/20"
            >
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-300" />
              Volver arriba
            </button>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contacto</h4>
            <div className="space-y-4">
              {/* Teléfono */}
              <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                <div className="p-2 bg-blue-800/20 rounded-lg group-hover:bg-blue-800/30 transition-colors duration-300">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Teléfono</p>
                  <p className="text-white font-medium">+34 900 123 456</p>
                </div>
              </div>
              {/* Email */}
              <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                <div className="p-2 bg-emerald-800/20 rounded-lg group-hover:bg-emerald-800/30 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                  <p className="text-white font-medium">reclutamiento@arendel.com</p>
                </div>
              </div>
              {/* Ubicación */}
              <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                <div className="p-2 bg-purple-800/20 rounded-lg group-hover:bg-purple-800/30 transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Ubicación</p>
                  <p className="text-white font-medium">Madrid, España</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Enlaces Rápidos</h4>
            <div className="space-y-3">
              {['Términos y Condiciones','Política de Privacidad','Preguntas Frecuentes','Centro de Soporte','Portal del Empleado'].map((link, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="group block p-2 rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-white group-hover:w-2 transition-all duration-300"></div>
                    <span className="text-gray-400 group-hover:text-white transition-colors duration-300 text-sm">{link}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Síguenos</h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Mantente conectado y descubre las últimas oportunidades laborales.
            </p>
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="group flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                    <social.icon className={`h-4 w-4 text-gray-400 transition-colors duration-300 ${social.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>&copy; 2024 Arendel. Todos los derechos reservados.</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Hecho con</span>
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
              <span>para nuestro equipo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
