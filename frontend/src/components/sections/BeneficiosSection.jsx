import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { 
  Clock, 
  DollarSign, 
  Shield, 
  Users, 
  Truck, 
  TrendingUp 
} from 'lucide-react'

const BeneficiosSection = () => {
  return (
    <section id="beneficios" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir Arendel?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos las mejores condiciones del mercado para que puedas desarrollar 
            tu carrera profesional con estabilidad y crecimiento.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Horarios Flexibles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Elige entre contratos de 20, 30 o 40 horas semanales. 
                Adapta tu trabajo a tu estilo de vida.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <DollarSign className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Ingresos Competitivos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Salarios por encima del promedio del mercado, con bonos 
                por rendimiento y puntualidad.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-accent mb-4" />
              <CardTitle>Contratos Estables</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Seguridad laboral con contratos formales, prestaciones 
                sociales y seguro médico incluido.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Apoyo Constante</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Equipo de soporte 24/7, capacitación continua y 
                acompañamiento en tu desarrollo profesional.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Truck className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Equipamiento Incluido</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Proporcionamos uniforme, equipo de protección y 
                herramientas necesarias para tu trabajo.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-accent mb-4" />
              <CardTitle>Crecimiento Profesional</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Oportunidades de ascenso a supervisor, coordinador 
                o roles administrativos dentro de la empresa.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default BeneficiosSection