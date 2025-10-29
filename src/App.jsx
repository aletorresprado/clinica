// App.jsx (ejemplo de configuración)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Paciente Pages
import LoginPaciente from './features/paciente/pages/LoginPaciente';
import RegisterPaciente from './features/paciente/pages/RegisterPaciente';
import DashboardPaciente from './features/paciente/pages/DashboardPaciente';
import SolicitarTurno from './features/paciente/pages/SolicitarTurno';
import TurnosPaciente from './features/paciente/pages/TurnosPaciente';

// Components
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas públicas paciente */}
          <Route path="/paciente/login" element={<LoginPaciente />} />
          <Route path="/paciente/register" element={<RegisterPaciente />} />
          
          {/* Rutas protegidas paciente */}
          <Route 
            path="/paciente/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPaciente />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/paciente/solicitar-turno" 
            element={
              <ProtectedRoute>
                <SolicitarTurno />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/paciente/turnos" 
            element={
              <ProtectedRoute>
                <TurnosPaciente />
              </ProtectedRoute>
            } 
          />
          
          {/* Ruta por defecto */}
          <Route path="/" element={<LoginPaciente />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; // ✅ ESTA LÍNEA ES CRÍTICA