import React from 'react'

const ProcesoSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Proceso simple en 4 pasos
          </h2>
          <p className="text-xl text-gray-600">
            Únete a nuestro equipo de manera rápida y sencilla
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Postúlate Online</h3>
            <p className="text-gray-600">
              Completa nuestro formulario simple con tus datos básicos
            </p>
          </div>

          <div className="text-center">
            <div className="bg-secondary text-secondary-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Entrevista Telefónica</h3>
            <p className="text-gray-600">
              Conversación breve para conocerte mejor y resolver dudas
            </p>
          </div>

          <div className="text-center">
            <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Capacitación</h3>
            <p className="text-gray-600">
              Entrenamiento completo sobre procesos y herramientas
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="text-xl font-semibold mb-2">¡Comienza a Trabajar!</h3>
            <p className="text-gray-600">
              Inicia tu carrera con Arendel y comienza a generar ingresos
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcesoSection