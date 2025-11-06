import React from "react";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"
import Contacto from "./components/Contacto";
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



	
	function App() {
		const isAuthenticated = Boolean(localStorage.getItem('user'));

	return (

		<Router>
				<Navbar />
      			<Banner />
				<Contacto />
      			
		
				<div className='App'>
			<Routes>
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
				element= {<Navigate to ="/login" replace/>}
				/>				
				</Routes>
					<ToastContainer position='bottom-right'/>
				</div>
<Footer />
		</Router>
	);
};

export default App;