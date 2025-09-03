import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Arendel</h3>
            <p className="text-gray-400 mb-4">
              Líder en servicios de logística y delivery, 
              comprometidos con la excelencia y el crecimiento de nuestro equipo.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>reclutamiento@arendel.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Ciudad de México, México</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
            <div className="space-y-2 text-gray-400">
              <div><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></div>
              <div><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></div>
              <div><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></div>
              <div><a href="#" className="hover:text-white transition-colors">Soporte</a></div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="space-y-2 text-gray-400">
              <div><a href="#" className="hover:text-white transition-colors">Facebook</a></div>
              <div><a href="#" className="hover:text-white transition-colors">Instagram</a></div>
              <div><a href="#" className="hover:text-white transition-colors">LinkedIn</a></div>
              <div><a href="#" className="hover:text-white transition-colors">Twitter</a></div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Arendel. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;