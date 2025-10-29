// src/common/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminLogged, isPacienteLogged } from '../features/admin/hooks/useAuthAdmin';

export default function PrivateRoute({ children, role }) {
  // role: 'admin' | 'paciente'
  if (role === 'admin' && !isAdminLogged()) {
    return <Navigate to="/admin/login" replace />;
  }
  if (role === 'paciente' && !isPacienteLogged()) {
    return <Navigate to="/paciente/login" replace />;
  }
  return children;
}
