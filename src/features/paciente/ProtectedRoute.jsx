// src/features/paciente/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useData } from "../../context/DataContext"; // 👈 subir 2 niveles (desde paciente hasta context)

export default function ProtectedRoute({ children, role }) {
  const { userLogged } = useData();

  if (!userLogged) {
    return <Navigate to="/LoginPaciente" replace />;
  }

  if (role && userLogged.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
