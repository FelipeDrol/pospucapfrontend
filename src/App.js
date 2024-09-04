import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Dados from './pages/Dados'
import Anexos from './pages/Anexos'
import Final from './pages/Final'

export default function App() {
  return (
      <BrowserRouter basename="/">
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/dados" element={<Dados />} />
          <Route path="/anexos" element={<Anexos />} />
          <Route path="/final" element={<Final />} />
        </Routes>
      </BrowserRouter>
  )
}

