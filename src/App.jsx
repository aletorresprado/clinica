import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

import {
  RegistroPaciente,
  LoginPaciente,
  DashboardPaciente,
} from "./features/paciente";

import DashboardAdmin from "./features/admin/pages/DashboardAdmin";

export default function App() {
  return (
    <DataProvider>
      <Router>
        <nav className="bg-blue-700 text-white p-4 flex justify-between">
          <h1 className="font-bold text-lg">Clínica Salud+</h1>
          <ul className="flex gap-4">
            <li>
              <Link to="/" className="hover:underline">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/paciente/registro" className="hover:underline">
                Registro Paciente
              </Link>
            </li>
            <li>
              <Link to="/paciente/login" className="hover:underline">
                Login Paciente
              </Link>
            </li>
            <li>
              <Link to="/paciente/dashboard" className="hover:underline">
                Panel Paciente
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard" className="hover:underline">
                Admin
              </Link>
            </li>
          </ul>
        </nav>

        <main className="p-4 min-h-screen bg-gray-50">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center mt-20">
                  <h2 className="text-3xl font-bold text-blue-700">
                    Bienvenido a la Clínica Salud+
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Acceda como paciente o administrador desde el menú superior.
                  </p>
                </div>
              }
            />
            <Route path="/paciente/registro" element={<RegistroPaciente />} />
            <Route path="/paciente/login" element={<LoginPaciente />} />
            <Route path="/paciente/dashboard" element={<DashboardPaciente />} />
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          </Routes>
        </main>
      </Router>
    </DataProvider>
  );
}
