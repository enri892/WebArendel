import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Button } from './button'
import { Badge } from './badge'
import { CheckCircle } from 'lucide-react'

const ContractCard = ({
    contract,
    isPopular = false,
    isVisible,
    delay = 0,
    onSelectPlan
}) => {
    return (
        <div
            className={`transform transition-all duration-1000 ${isPopular ? 'z-10' : ''
                } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >

            <div className="relative group h-full">
                {/* Glowing Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl ${isPopular ? 'opacity-60 group-hover:opacity-80' : 'opacity-0 group-hover:opacity-60'
                    } blur-xl transition-all duration-500`} />

                {/* Card Background */}
                <Card className={`relative h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl border border-white/20 group-hover:border-white/40
         overflow-hidden transition-all duration-500 transform group-hover:scale-105`}>

                    <CardHeader className={`text-center relative z-10 pb-4`}>
                        <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-600/20 text-purple-200 border-purple-400/30 font-bold px-4 py-1 w-fit mx-auto mb-4">
                            {contract.badgeIcon && <contract.badgeIcon className="w-3 h-3 mr-1" />}
                            {contract.badgeText}
                        </Badge>

                        <CardTitle className="text-2xl font-bold text-white mb-2">
                            {contract.title}
                        </CardTitle>
                        <CardDescription className="text-blue-100/70">
                            {contract.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6 relative z-10">
                        {/* Precio */}
                        <div className="text-center p-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-400/20">
                            <div className="text-4xl font-black bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                                {contract.price}
                            </div>
                        </div>

                        {/* Beneficios */}
                        <ul className="space-y-3">
                            {contract.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-sm text-blue-100/80 font-medium">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Botón */}
                        <Button
                            className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-700 
                       hover:from-purple-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl
                       shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105
                       border-none"
                            onClick={() => onSelectPlan(contract.selectText, contract.value)}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {contract.buttonIcon && (
                                    <contract.buttonIcon className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                                )}
                                <span>Elegir Plan</span>
                                {contract.buttonEndIcon && (
                                    <contract.buttonEndIcon className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                                )}
                            </span>

                            {/* Efecto brillante */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full 
                            transition-transform duration-700"></div>
                        </Button>
                    </CardContent>

                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
            </div>
        </div>
    )
}

export default ContractCard