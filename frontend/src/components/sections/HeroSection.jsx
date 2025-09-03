import React from 'react';
import { Button } from '../ui/button';
import { Star } from 'lucide-react';
import heroImage from '../../assets/tAnlWpnjiVFD.jpg'

const HeroSection = () => {
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Únete al Equipo de 
              <span className="text-primary"> Repartidores</span> de Arendel
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Flexibilidad, buenos ingresos y estabilidad laboral te esperan. 
              Forma parte de la empresa líder en logística y delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Postúlate Ahora
              </Button>
              <Button size="lg" variant="outline">
                Conoce Más
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Repartidores</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">15</div>
                <div className="text-sm text-gray-600">Ciudades</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">5</div>
                <div className="text-sm text-gray-600">Años de experiencia</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Repartidor profesional de Arendel" 
              className="rounded-lg shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-semibold">4.8/5</span>
                <span className="text-sm text-gray-600">Satisfacción laboral</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;