import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import InicioPage from './pages/InicioPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/inicio" element={<InicioPage />} />
      <Route path="/" element={<Navigate to="/inicio" replace />} />
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  )
}

export default App
