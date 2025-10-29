// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './common/Header';
import PrivateRoute from './common/PrivateRoute';
import LoginAdmin from './features/admin/pages/LoginAdmin';
import DashboardAdmin from './features/admin/pages/DashboardAdmin';
import LoginPaciente from './features/paciente/pages/LoginPaciente';
import RegisterPaciente from './features/paciente/pages/RegisterPaciente';
import DashboardPaciente from './features/paciente/pages/DashboardPaciente';
import { initMockData } from './services/mockService';

export default function App() {
  useEffect(() => {
    initMockData(); // Inicializa arrays en LocalStorage si no existen
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/paciente/login" />} />

          {/* Paciente */}
          <Route path="/paciente/login" element={<LoginPaciente />} />
          <Route path="/paciente/register" element={<RegisterPaciente />} />
          <Route
            path="/paciente/dashboard"
            element={
              <PrivateRoute role="paciente">
                <DashboardPaciente />
              </PrivateRoute>
            }
          />

          {/* Admin */}
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute role="admin">
                <DashboardAdmin />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<div>404 - Página no encontrada</div>} />
        </Routes>
      </main>
    </div>
  );
}

