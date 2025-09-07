import React, { useState, useEffect, useRef } from 'react'
import { Home, MapPin, Globe } from 'lucide-react'
import logo from '../assets/logoWhite.png'

const NotFoundPage = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [orbs, setOrbs] = useState([])
    const intervalRefs = useRef([])

    useEffect(() => {
        setIsVisible(true)
        
        // Generar configuración de orbe
        const generateOrbConfig = () => ({
            id: Math.random(),
            left: Math.random() * 90 + 5, // Entre 5% y 95% para evitar bordes
            top: Math.random() * 90 + 5,
            size: Math.random() * 40 + 25, // Tamaño entre 25px y 65px
            color: ['blue', 'cyan', 'purple', 'indigo'][Math.floor(Math.random() * 4)],
            isVisible: true
        })
        
        // Crear 10 orbes iniciales, todos visibles
        const initialOrbs = Array.from({ length: 10 }, () => generateOrbConfig())
        setOrbs(initialOrbs)
        
        // Configurar renovación individual para cada orbe
        initialOrbs.forEach((_, index) => {
            const startRenewal = () => {
                const randomDelay = Math.random() * 3000 + 2000 // Entre 2 y 5 segundos
                
                intervalRefs.current[index] = setTimeout(() => {
                    // Hacer desaparecer el orbe
                    setOrbs(prev => {
                        const newOrbs = [...prev]
                        newOrbs[index] = { ...newOrbs[index], isVisible: false }
                        return newOrbs
                    })
                    
                    // Después de la animación de desvanecimiento, crear nuevo orbe
                    setTimeout(() => {
                        setOrbs(prev => {
                            const newOrbs = [...prev]
                            newOrbs[index] = generateOrbConfig()
                            return newOrbs
                        })
                        
                        // Continuar el ciclo
                        startRenewal()
                    }, 700) // Tiempo para que complete la animación de fade out
                }, randomDelay)
            }
            
            // Iniciar el ciclo para cada orbe con un delay inicial aleatorio
            setTimeout(() => startRenewal(), Math.random() * 5000)
        })
        
        // Cleanup
        return () => {
            intervalRefs.current.forEach(timeout => clearTimeout(timeout))
        }
    }, [])

    const goHome = () => {
        window.location.href = '/'
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
            {/* Background Effects */}
            <div className="absolute inset-0"> 
                {/* Orbes Dinámicos con Transiciones Suaves */}
                {orbs.map((orb) => (
                    <div
                        key={orb.id}
                        className="absolute rounded-full transition-all duration-700 ease-in-out"
                        style={{
                            left: `${orb.left}%`,
                            top: `${orb.top}%`,
                            width: `${orb.size}px`,
                            height: `${orb.size}px`,
                            background: `radial-gradient(circle, ${
                                orb.color === 'blue' ? 'rgba(59, 130, 246, 0.4)' :
                                orb.color === 'cyan' ? 'rgba(6, 182, 212, 0.4)' :
                                orb.color === 'purple' ? 'rgba(147, 51, 234, 0.4)' :
                                'rgba(99, 102, 241, 0.4)'
                            }, transparent)`,
                            filter: 'blur(2px)',
                            opacity: orb.isVisible ? 0.6 : 0,
                            transform: `scale(${orb.isVisible ? 1 : 0.7})`,
                            pointerEvents: 'none'
                        }}
                    />
                ))}
            </div>

            {/* Subtle Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 1px, transparent 0)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Header with Logo - Sin interferir con el contenido principal */}
            <div className="relative z-10 pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8 pb-4">
                <div className="max-w-7xl mx-auto">
                    <img 
                        src={logo}
                        alt="Logo" 
                        className="h-6 sm:h-8 w-auto opacity-90"
                    />
                </div>
            </div>

            {/* Main Content - Layout mejorado para móvil */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8">
                <div className="max-w-4xl w-full text-center mx-auto">
                    
                    {/* 404 Animation */}
                    <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        
                        {/* 404 Number Section */}
                        <div className="relative mb-8 sm:mb-12">
                            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black mb-4 sm:mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                                    4
                                </span>
                                <span className="bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
                                    0
                                </span>
                                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                                    4
                                </span>
                            </h1>
                        </div>

                        {/* Iconos decorativos para móvil - debajo del 404 */}
                        <div className="flex justify-center gap-4 mb-6 lg:hidden">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/40 to-blue-500/40 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl animate-pulse">
                                <MapPin className="w-6 h-6 text-blue-200" />
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/40 to-indigo-500/40 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl animate-pulse" style={{ animationDelay: '0.5s' }}>
                                <Globe className="w-6 h-6 text-blue-200" />
                            </div>
                        </div>

                        {/* Error Message */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                                    ¡Ups! Parece que te perdiste
                                </span>
                            </h2>
                            
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-10 px-2">
                                La página que buscas decidió tomarse unas vacaciones inesperadas. 
                                Pero no te preocupes, ¡podemos ayudarte a encontrar tu camino de vuelta!
                            </p>
                        </div>

                        {/* Home Button - Responsive */}
                        <div className="flex justify-center px-2">
                            <button
                                onClick={goHome}
                                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-900 via-cyan-700 to-blue-900 text-white font-bold text-base sm:text-lg rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-blue-400/30 hover:border-cyan-300/50 flex items-center justify-center gap-2 sm:gap-3 min-w-[240px] sm:min-w-[260px] w-full sm:w-auto max-w-xs sm:max-w-none"
                            >
                                <Home className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200" />
                                <span>Volver al inicio</span>
                                <div className="w-2 h-2 bg-white/60 rounded-full group-hover:bg-white transition-colors duration-200"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>
    )
}

export default NotFoundPage