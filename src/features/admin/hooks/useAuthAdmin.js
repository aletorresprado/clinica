// src/features/admin/hooks/useAuthAdmin.js
import { useState } from 'react';
import { authAdmin } from '../../../services/mockService';

const LS_SESSION = 'clinica_session_admin_v1';

export function isAdminLogged() {
  const s = localStorage.getItem(LS_SESSION);
  return !!s;
}

export default function useAuthAdmin() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(LS_SESSION);
    return raw ? JSON.parse(raw) : null;
  });

  async function login(email, password) {
    const a = await authAdmin(email, password);
    if (!a) throw new Error('Credenciales inválidas');
    localStorage.setItem(LS_SESSION, JSON.stringify(a));
    setUser(a);
    return a;
  }

  function logout() {
    localStorage.removeItem(LS_SESSION);
    setUser(null);
  }

  return { user, login, logout };
}
// agregue a mano esto
export const isPacienteLogged = () => {
  // Your authentication logic here
  return Boolean(localStorage.getItem('pacienteToken'));
};

// Or if it's a hook:
export const usePacienteAuth = () => {
  const isPacienteLogged = () => {
    return Boolean(localStorage.getItem('pacienteToken'));
  };
  
  return { isPacienteLogged };
};