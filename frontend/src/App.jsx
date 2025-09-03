import React, { useState } from 'react'
import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import BeneficiosSection from './components/sections/BeneficiosSection'
import ContratosSection from './components/sections/ContratosSection'
import ProcesoSection from './components/sections/ProcesoSection'
import TestimoniosSection from './components/sections/TestimoniosSection'
import FormularioSection from './components/sections/FormularioSection'

function App() {
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BeneficiosSection />
      <ContratosSection />
      <ProcesoSection />
      <TestimoniosSection />
      <FormularioSection />
      <Footer />
    </div>
  )
  
}

export default App
