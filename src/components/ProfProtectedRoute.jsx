// components/ProfProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProfProtectedRoute({ children }) {
  const isProfAuthenticated = Boolean(localStorage.getItem('profEmail'));
  
  return isProfAuthenticated ? children : <Navigate to="/proflogin" replace />;
}

export default ProfProtectedRoute;