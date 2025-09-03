// src/components/layout/Header.jsx
import React from 'react';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">Arendel</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-gray-600 hover:text-primary transition-colors">Inicio</a>
            <a href="#beneficios" className="text-gray-600 hover:text-primary transition-colors">Beneficios</a>
            <a href="#contratos" className="text-gray-600 hover:text-primary transition-colors">Contratos</a>
            <a href="#contacto" className="text-gray-600 hover:text-primary transition-colors">Contacto</a>
          </nav>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Únete Ahora
          </Button>
        </div>
      </div>
    </header>
  );
};

// Asegúrate de que esta línea esté presente
export default Header;