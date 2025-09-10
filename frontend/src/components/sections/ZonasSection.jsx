import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Building2, 
  Palmtree, 
  Navigation,
  Map,
  Compass
} from 'lucide-react';

const ZonasSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Función para abrir Google Maps con la zona específica
  const openMapLocation = (zoneName, regionId) => {
    const searchQuery = regionId === 'canarias' 
      ? `${zoneName}, Gran Canaria, España`
      : `${zoneName}, Madrid, España`;
    
    const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
    window.open(googleMapsUrl, '_blank');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('zonas');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const regions = [
    {
      id: 'madrid',
      name: 'Comunidad de Madrid',
      icon: Building2,
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-500/10 to-purple-500/10',
      zones: [
        'Madrid Capital',
        'Getafe',
        'Leganés', 
        'Toledo',
        'Rivas-Vaciamadrid',
        'Arganda del Rey',
        'Villanueva de la Cañada',
        'Brunete'
      ],
      delay: 0
    },
    {
      id: 'canarias',
      name: 'Gran Canaria',
      icon: Palmtree,
      gradient: 'from-emerald-500 to-cyan-600',
      bgGradient: 'from-emerald-500/10 to-cyan-500/10',
      zones: [
        'Telde',
        'Maspalomas',
        'Arucas',
        'Puerto Rico',
        'Mogán',
        'Vecindario'
      ],
      delay: 200
    }
  ];

  return (
    <section id="zonas" className="relative py-12 lg:py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Top Gradient Shadow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-800 to-transparent" />
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Static Gradient Orbs */}
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
        <div className={`text-center mb-16 lg:mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Zonas de
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Trabajo
            </span>
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100/80 max-w-4xl mx-auto leading-relaxed">
            Operamos en las principales ciudades y zonas metropolitanas, 
            ofreciendo oportunidades laborales cerca de ti.
          </p>
        </div>
        
        {/* Regions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {regions.map((region, index) => (
            <div
              key={region.id}
              className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${region.delay}ms` }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              <div className="relative group h-full">
                {/* Glowing Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${region.gradient} rounded-3xl opacity-0 group-hover:opacity-60 blur-xl transition-all duration-500`} />
                
                {/* Card Background */}
                <div className={`relative h-full bg-gradient-to-br ${region.bgGradient} backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden group-hover:border-white/40 transition-all duration-500 transform group-hover:scale-105`}>
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-8 lg:p-10 h-full">
                    {/* Header with Icon */}
                    <div className="flex items-center mb-8">
                      <div className={`inline-flex p-4 bg-gradient-to-r ${region.gradient} rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform duration-300 mr-6`}>
                        <region.icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
                        {region.name}
                      </h3>
                    </div>
                    
                    {/* Zones Grid */}
                    <div className="grid grid-cols-2 gap-3 lg:gap-4">
                      {region.zones.map((zone, zoneIndex) => (
                        <div
                          key={zoneIndex}
                          className="group/zone relative overflow-hidden cursor-pointer"
                          onClick={() => openMapLocation(zone, region.id)}
                        >
                          <div className="flex items-center p-3 lg:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 group-hover/zone:border-white/30 group-hover/zone:bg-white/10 transition-all duration-300 group-hover/zone:shadow-lg">
                            <MapPin className="h-4 w-4 text-blue-300 mr-3 flex-shrink-0 group-hover/zone:text-white transition-colors duration-300" />
                            <span className="text-blue-100/80 text-sm lg:text-base group-hover/zone:text-white transition-colors duration-300 leading-tight">
                              {zone}
                            </span>
                            <div className="ml-auto opacity-0 group-hover/zone:opacity-100 transition-opacity duration-300">
                              <Map className="h-4 w-4 text-blue-300 group-hover/zone:text-white transition-colors duration-300" />
                            </div>
                          </div>
                          
                          {/* Subtle hover glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/zone:opacity-100 transition-opacity duration-300 rounded-xl" />
                        </div>
                      ))}
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

export default ZonasSection;