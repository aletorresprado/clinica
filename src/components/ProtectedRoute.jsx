// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function ProtectedRoute({ children, role }) {
  const { userLogged } = useData(); // <-- o como se llame en tu contexto el usuario activo

  // Si no hay usuario logueado, redirige al login
  if (!userLogged) {
    return <Navigate to="/LoginPaciente" replace />;
  }

  // Si el componente recibe un "role", podemos chequear permisos
  if (role && userLogged.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Si pasa todas las validaciones, renderiza el contenido protegido
  return children;
}
