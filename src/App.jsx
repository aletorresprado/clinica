import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Login  from './pages/Login';
import  Dashboard  from './pages/Dashboard';
import  Register from './pages/Register';
import 	ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin'
import AdminRegister from './pages/AdminRegister'
import AdminDashboard from './pages/AdminDashboard'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import Entrada from "./pages/Entrada";



	function App() {
		const isAuthenticated = Boolean(localStorage.getItem('user'));


	return (


			<Router>
				<Navbar />

				<div className='App'>
				<Routes>
					<Route path="/entrada" element={<Entrada />} />
					<Route path="/login" 
					element={isAuthenticated ? <Navigate to="/home" replace/> : <Login/>}
					/>
					<Route path="/register" 
				element={isAuthenticated ? <Navigate to="/home" replace/> : <Register/>}
				/>
				
					<Route 
				path="/home"
				element={
					<ProtectedRoute>
						<Home/>
					</ProtectedRoute>
				}
				/>
					<Route 
				path="/dashboard" 
				element={
					<ProtectedRoute>
						<Dashboard/>
					</ProtectedRoute>
				}
				/>
					<Route path="/admin" element={<AdminLogin />} />
					<Route path="/admin/register" element={<AdminRegister />} />

					<Route
  					path="/admin/dashboard"
  					element={
    					<AdminProtectedRoute>
      					<AdminDashboard />
    					</AdminProtectedRoute>
  					}
					/>

					<Route
					path='/'
					element= {<Navigate to ="/entrada" replace/>}
					/>
					</Routes>
					<ToastContainer position='bottom-right'/>
				</div>

      			<Footer />
			</Router>
    	
  );
}
export default App
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

