import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'

const FormularioSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    contrato: '',
    experiencia: '',
    comentarios: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.')
    console.log('Datos del formulario:', formData)
  }

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comienza tu carrera con Arendel
          </h2>
          <p className="text-xl text-gray-600">
            Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas
          </p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contrato">Tipo de Contrato Preferido *</Label>
                <Select onValueChange={(value) => handleInputChange('contrato', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de contrato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20-horas">20 Horas - Medio Tiempo</SelectItem>
                    <SelectItem value="30-horas">30 Horas - Tiempo Completo</SelectItem>
                    <SelectItem value="40-horas">40 Horas - Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experiencia">Experiencia Previa (Opcional)</Label>
                <Input
                  id="experiencia"
                  type="text"
                  placeholder="Ej: 2 años en delivery, licencia de conducir..."
                  value={formData.experiencia}
                  onChange={(e) => handleInputChange('experiencia', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentarios">Comentarios Adicionales (Opcional)</Label>
                <Textarea
                  id="comentarios"
                  placeholder="Cuéntanos algo más sobre ti o tus expectativas..."
                  value={formData.comentarios}
                  onChange={(e) => handleInputChange('comentarios', e.target.value)}
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
              >
                Enviar Solicitud
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default FormularioSection