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
import ProfLogin from "./pages/ProfLogin";
import ProfRegister from "./pages/ProfRegister";
import ProfDashboard from "./pages/ProfDashboard";
import ProfProtectedRoute from "./components/ProfProtectedRoute";


	function App() {
		const isAuthenticated = Boolean(localStorage.getItem('user'));
		const isProfAuthenticated = Boolean(localStorage.getItem("profEmail"));

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
					<Route 
  path="/proflogin" 
  element={
    localStorage.getItem('profEmail') 
      ? <Navigate to="/profdashboard" replace /> 
      : <ProfLogin />
  }
/>

<Route 
  path="/profregister" 
  element={
    localStorage.getItem('profEmail') 
      ? <Navigate to="/profdashboard" replace /> 
      : <ProfRegister />
  }
/>

<Route 
  path="/profdashboard" 
  element={
    <ProfProtectedRoute>
      <ProfDashboard />
    </ProfProtectedRoute>
  }
/>

					</Routes>
					<ToastContainer position='bottom-right'/>
				</div>

      			<Footer />
			</Router>
    	
  );
}
export default App
