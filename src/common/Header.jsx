// src/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-sky-600">ClinicaSM</Link>
        <nav className="space-x-3">
          <Link to="/paciente/login" className="text-sm text-gray-600 hover:text-sky-600">Paciente</Link>
          <Link to="/admin/login" className="text-sm text-gray-600 hover:text-sky-600">Administrador</Link>
        </nav>
      </div>
    </header>
  );
}
