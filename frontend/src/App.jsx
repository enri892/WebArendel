import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import InicioPage from './pages/InicioPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import QRPage from './pages/QRPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<InicioPage />} />
      <Route path="/qr" element={<QRPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
