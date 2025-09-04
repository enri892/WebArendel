import React, { useState } from 'react'
import '../App.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import BeneficiosSection from '../components/sections/BeneficiosSection'
import ContratosSection from '../components/sections/ContratosSection'
import ProcesoSection from '../components/sections/ProcesoSection'
import FormularioSection from '../components/sections/FormularioSection'

function InicioPage() {
  // Estado para manejar el contrato seleccionado
  const [selectedContract, setSelectedContract] = useState('');

  // Función para cuando se selecciona un contrato desde ContratosSection
  const handleSelectContract = (contractValue) => {
    setSelectedContract(contractValue);
  };

  // Función para cuando se cambia el contrato manualmente en el formulario
  const handleContractChange = (contractValue) => {
    setSelectedContract(contractValue);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BeneficiosSection />
      <ContratosSection onSelectContract={handleSelectContract} />
      <ProcesoSection />
      <FormularioSection 
        selectedContract={selectedContract}
        onContractChange={handleContractChange}
      />
      <Footer />
    </div>
  )
}

export default InicioPage