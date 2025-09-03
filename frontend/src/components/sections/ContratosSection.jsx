import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { CheckCircle } from 'lucide-react'

const ContratosSection = () => {
  return (
    <section id="contratos" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Elige el contrato que mejor se adapte a ti
          </h2>
          <p className="text-xl text-gray-600">
            Ofrecemos diferentes modalidades para que encuentres el equilibrio perfecto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="relative hover:shadow-xl transition-shadow border-2 hover:border-primary/20">
            <CardHeader className="text-center">
              <Badge variant="secondary" className="w-fit mx-auto mb-4">Medio Tiempo</Badge>
              <CardTitle className="text-2xl">Contrato 20 Horas</CardTitle>
              <CardDescription>Ideal para estudiantes o trabajo complementario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$800-1,200</div>
                <div className="text-sm text-gray-600">por semana</div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">20 horas semanales</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Horarios flexibles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Prestaciones básicas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Capacitación incluida</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">
                Elegir Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="relative hover:shadow-xl transition-shadow border-2 border-primary/50 scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground">Más Popular</Badge>
            </div>
            <CardHeader className="text-center">
              <Badge variant="default" className="w-fit mx-auto mb-4 bg-primary">Tiempo Completo</Badge>
              <CardTitle className="text-2xl">Contrato 30 Horas</CardTitle>
              <CardDescription>Perfecto para equilibrar vida personal y laboral</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$1,200-1,800</div>
                <div className="text-sm text-gray-600">por semana</div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">30 horas semanales</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Prestaciones completas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Seguro médico</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Bonos por rendimiento</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Vacaciones pagadas</span>
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Elegir Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="relative hover:shadow-xl transition-shadow border-2 hover:border-accent/20">
            <CardHeader className="text-center">
              <Badge variant="outline" className="w-fit mx-auto mb-4 border-accent text-accent">Premium</Badge>
              <CardTitle className="text-2xl">Contrato 40 Horas</CardTitle>
              <CardDescription>Máximos ingresos y estabilidad completa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$1,600-2,400</div>
                <div className="text-sm text-gray-600">por semana</div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">40 horas semanales</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Prestaciones premium</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Seguro médico familiar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Bonos especiales</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Oportunidades de ascenso</span>
                </li>
              </ul>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Elegir Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ContratosSection