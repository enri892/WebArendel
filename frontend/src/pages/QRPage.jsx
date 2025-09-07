// pages/QRPage.jsx
import React, { useState, useEffect, useRef } from 'react'
import { Globe, Sparkles, ArrowRight } from 'lucide-react'
import logo from '../assets/logo.png'

const QRPage = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [orbs, setOrbs] = useState([])
    const intervalRefs = useRef([])
    const [redirectProgress, setRedirectProgress] = useState(0)

    useEffect(() => {
        // 🎯 ¡¡¡CAMBIA SOLO ESTA LÍNEA PARA ACTUALIZAR EL DESTINO!!!
        const REDIRECT_URL = 'http://localhost/'
        
        setIsVisible(true)
        
        // Generar orbes animados (mismo estilo que NotFoundPage)
        const generateOrbConfig = () => ({
            id: Math.random(),
            left: Math.random() * 90 + 5,
            top: Math.random() * 90 + 5,
            size: Math.random() * 40 + 25,
            color: ['blue', 'cyan', 'purple', 'indigo'][Math.floor(Math.random() * 4)],
            isVisible: true
        })
        
        const initialOrbs = Array.from({ length: 8 }, () => generateOrbConfig())
        setOrbs(initialOrbs)
        
        // Animación de orbes
        initialOrbs.forEach((_, index) => {
            const startRenewal = () => {
                const randomDelay = Math.random() * 3000 + 2000
                
                intervalRefs.current[index] = setTimeout(() => {
                    setOrbs(prev => {
                        const newOrbs = [...prev]
                        newOrbs[index] = { ...newOrbs[index], isVisible: false }
                        return newOrbs
                    })
                    
                    setTimeout(() => {
                        setOrbs(prev => {
                            const newOrbs = [...prev]
                            newOrbs[index] = generateOrbConfig()
                            return newOrbs
                        })
                        startRenewal()
                    }, 700)
                }, randomDelay)
            }
            
            setTimeout(() => startRenewal(), Math.random() * 5000)
        })

        // Barra de progreso animada
        const progressInterval = setInterval(() => {
            setRedirectProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    return 100
                }
                return prev + 5
            })
        }, 50)

        // Redirección después de 1.5 segundos
        const redirectTimeout = setTimeout(() => {
            window.location.href = REDIRECT_URL
        }, 1500)
        
        // Cleanup
        return () => {
            intervalRefs.current.forEach(timeout => clearTimeout(timeout))
            clearTimeout(redirectTimeout)
            clearInterval(progressInterval)
        }
    }, [])

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
            {/* Background Effects - Orbes Dinámicos */}
            <div className="absolute inset-0">
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

            {/* Header with Logo */}
            <div className="relative z-10 pt-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <img 
                        src={logo}
                        alt="Logo" 
                        className="h-8 w-auto opacity-90"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 -mt-20">
                <div className={`max-w-2xl w-full text-center transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                    
                    {/* Animated Icon */}
                    <div className="mb-8 relative">
                        <div className="relative inline-block">
                            {/* Círculo exterior animado */}
                            <div className="absolute inset-0 animate-ping">
                                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full"></div>
                            </div>
                            
                            {/* Icono principal */}
                            <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                                <Globe className="w-12 h-12 text-white animate-pulse" />
                            </div>
                            
                            {/* Sparkles decorativos */}
                            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                            <Sparkles 
                                className="absolute -bottom-1 -left-1 w-4 h-4 text-cyan-400 animate-pulse" 
                                style={{ animationDelay: '0.5s' }} 
                            />
                        </div>
                    </div>

                    {/* Mensaje de redirección */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                            Conectando...
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-blue-100/80 mb-8">
                        Te estamos redirigiendo a tu destino
                    </p>

                    {/* Progress Bar Container */}
                    <div className="relative max-w-sm mx-auto mb-8">
                        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-1 shadow-2xl">
                            <div className="relative h-3 bg-black/20 rounded-full overflow-hidden">
                                <div 
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-300 ease-out shadow-lg shadow-cyan-500/50"
                                    style={{ 
                                        width: `${redirectProgress}%`
                                    }}
                                >
                                    {/* Efecto de brillo usando animate-pulse de Tailwind */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Loading dots animation */}
                    <div className="flex justify-center items-center gap-2 mb-8">
                        <div 
                            className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" 
                            style={{ animationDelay: '0s' }}
                        ></div>
                        <div 
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" 
                            style={{ animationDelay: '0.2s' }}
                        ></div>
                        <div 
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" 
                            style={{ animationDelay: '0.4s' }}
                        ></div>
                    </div>

                    {/* Info Box */}
                    <div className="relative max-w-md mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                            <div className="flex items-center justify-center gap-3">
                                <ArrowRight className="w-5 h-5 text-cyan-300 animate-pulse" />
                                <p className="text-blue-100/90 text-sm">
                                    Si no eres redirigido automáticamente, 
                                    <br />
                                    <span className="text-cyan-300">la página se actualizará en breve</span>
                                </p>
                                <ArrowRight className="w-5 h-5 text-cyan-300 animate-pulse" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>
    )
}

export default QRPage