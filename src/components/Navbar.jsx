import React, { useState } from 'react';
import img from '../assets/Logo-Clinica.png';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="relative dark:bg--600 shadow-md" id="inicio">
            <div className='flex items-center justify-between h-20 px-5'>
                <div className='flex items-center'>
                    <img src={img} alt="Clinica San Miguel" className="h-14 mr-5" />
                    <h2 className="text-blue-400  text-2xl font-bold hidden lg:block">Clinica San Miguel</h2>
                    <h2 className="text-blue-400  text-2xl font-bold block lg:hidden">Clinica S.M.</h2>
                </div>
                <nav className='hidden lg:flex items-center p-2'>
                    <Link to="/login" className="mx-3 font-bold text-blue-400 hover:text-sky-600">Iniciar Sesión</Link>
                    <Link to="/register" className="mx-3 font-bold text-blue-400 hover:text-sky-600">Registro</Link>
                    <Link to="#profecionales" className="mx-3 font-bold text-blue-400 hover:text-sky-600">Profesionales</Link>
                    <Link to="/Clinica-SanMiguel" className="mx-3 font-bold text-blue-400 hover:text-sky-600">Acerca de</Link>
                    <Link to="#contacto" className="mx-3 font-bold text-blue-400 hover:text-sky-600">Contacto</Link>
                </nav>
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md lg:hidden"
                >
                    <div className={`w-6 h-0.5 bg-blue-500 mb-1.5 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-blue-500 mb-1.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-blue-500 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                </button>
            </div>

            {isOpen && (
                <div 
                    onClick={() => setIsOpen(false)} 
                    className="fixed inset-0 bg-blue-300 bg-opacity-50 z-40 lg:hidden" 
                ></div>
            )}

            <div 
                className={`fixed top-0 right-0 w-64 h-full bg-red-200 shadow-lg transform transition-transform duration-500 ease-in-out z-50 lg:hidden
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-4 flex flex-col items-center pt-20">
                    <h2 className="text-xl font-bold mb-4">Menú</h2>
                    <ul className='flex flex-col items-center'>
                        <li className="mb-2"><Link to="/login" className="mx-3 font-bold text-blue-600 hover:text-sky-600">Iniciar Sesión</Link></li> 
                        <li className="mb-2"><Link to="/register" className="mx-3 font-bold text-blue-600 hover:text-sky-600">Registro</Link></li>
                        <li className="mb-2"><Link to="#profecionales" className="mx-3 font-bold text-blue-600 hover:text-sky-600">Profesionales</Link></li>
                        <li className="mb-2"><Link to="/Clinica-SanMiguel" className="mx-3 font-bold text-blue-600 hover:text-sky-600">Acerca de</Link></li>
                        <li className="mb-2"><Link to="#contacto" className="mx-3 font-bold text-blue-600 hover:text-sky-600">Contacto</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;