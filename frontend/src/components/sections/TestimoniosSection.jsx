import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Star } from 'lucide-react'

// Importar imágenes - asegúrate de que las rutas sean correctas según tu estructura
import driverImage1 from '../../assets/4m5E2DBrnMMg.jpg'
import driverImage2 from '../../assets/HEAokLEdY1p1.jpg'
import driverImage3 from '../../assets/lgCfm4GQdh4W.jpg'

const TestimoniosSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros repartidores
          </h2>
          <p className="text-xl text-gray-600">
            Conoce las experiencias reales de quienes ya forman parte del equipo Arendel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={driverImage1} 
                  alt="Carlos Mendoza" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">Carlos Mendoza</h4>
                  <p className="text-sm text-gray-600">Repartidor desde 2022</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Arendel me ha dado la flexibilidad que necesitaba para estudiar y trabajar. 
                El ambiente es excelente y los pagos siempre puntuales."
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={driverImage2} 
                  alt="Ana García" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">Ana García</h4>
                  <p className="text-sm text-gray-600">Supervisora de zona</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Empecé como repartidora y ahora soy supervisora. Arendel realmente 
                invierte en el crecimiento profesional de su equipo."
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={driverImage3} 
                  alt="Miguel Torres" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">Miguel Torres</h4>
                  <p className="text-sm text-gray-600">Repartidor tiempo completo</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Los beneficios son increíbles. Seguro médico, vacaciones pagadas y 
                un equipo de trabajo que realmente se preocupa por ti."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default TestimoniosSection