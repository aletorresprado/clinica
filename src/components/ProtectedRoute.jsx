// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // TODO: Integrar con el contexto de autenticación real
  const isAuthenticated = localStorage.getItem('pacienteToken');
  
  if (!isAuthenticated) {
    return <Navigate to="/paciente/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;