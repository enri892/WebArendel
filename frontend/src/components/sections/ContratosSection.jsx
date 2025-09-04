// ContratosSection.jsx - Versión refactorizada
import React, { useState, useEffect } from 'react'
import { Crown, Sparkles, Star } from 'lucide-react'
import ContractCard from '../ui/ContractCard'

const ContratosSection = ({ onSelectContract }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const section = document.getElementById('contratos');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    const handleSelectPlan = (contractType, contractValue) => {
        if (onSelectContract) {
            onSelectContract(contractValue);
        }

        const section = document.getElementById('contacto');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Datos de los contratos
    const contracts = [
        {
            title: "Contrato 20 Horas",
            description: "Ideal para estudiantes o trabajo complementario",
            badgeText: "Jornada Media",
            price: "+ 700€",
            benefits: [
                "20 horas semanales",
                "Horarios flexibles",
                "Bonos por rendimiento",
                "Vacaciones pagadas",
                "Equipo de trabajo incluido"
            ],
            selectText: "20 Horas - Medio Tiempo",
            value: "20-horas",
            buttonEndIcon: Sparkles
        },
        {
            title: "Contrato 30 Horas",
            description: "Perfecto para equilibrar vida personal y laboral",
            badgeText: "Jornada Parcial",
            price: "+ 1.000€",
            benefits: [
                "30 horas semanales",
                "Horarios flexibles",
                "Bonos por rendimiento",
                "Vacaciones pagadas",
                "Equipo de trabajo incluido"
            ],
            selectText: "30 Horas - Tiempo Completo",
            value: "30-horas",
            popularIcon: Star,
            buttonEndIcon: Star
        },
        {
            title: "Contrato 40 Horas",
            description: "Máximos ingresos y estabilidad completa",
            badgeText: "Jornada Completa",
            badgeIcon: Crown,
            price: "+ 1.300€",
            benefits: [
                "40 horas semanales",
                "Horarios flexibles",
                "Bonos por rendimiento",
                "Vacaciones pagadas",
                "Equipo de trabajo incluido"
                ],
            selectText: "40 Horas - Premium",
            value: "40-horas",
            buttonIcon: Crown
        }
    ];

    return (
        <section id="contratos" className="relative py-12 lg:py-20 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
            {/* Background Effects*/}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full filter blur-3xl" />
                <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full filter blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-400/15 to-indigo-400/15 rounded-full filter blur-3xl" />
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
                            Elige el contrato que mejor
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                            se adapte a ti
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl lg:text-2xl text-blue-100/80 max-w-4xl mx-auto leading-relaxed">
                        Ofrecemos diferentes modalidades para que encuentres el equilibrio perfecto
                        entre trabajo y vida personal
                    </p>
                </div>

                {/* Contracts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {contracts.map((contract, index) => (
                        <ContractCard
                            key={contract.value}
                            contract={contract}
                            isVisible={isVisible}
                            delay={index * 100}
                            onSelectPlan={handleSelectPlan}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Gradient igual que antes... */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
        </section>
    )
}
export default ContratosSection