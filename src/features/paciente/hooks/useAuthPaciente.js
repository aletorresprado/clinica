// src/features/paciente/hooks/useAuthPaciente.js
import { useState } from 'react';
import { findPacienteByEmail } from '../../../services/mockService';

const LS_SESSION = 'clinica_session_paciente_v1';

export function isPacienteLogged() {
  const s = localStorage.getItem(LS_SESSION);
  return !!s;
}

export default function useAuthPaciente() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(LS_SESSION);
    return raw ? JSON.parse(raw) : null;
  });

  async function login(email, password) {
    const p = await findPacienteByEmail(email);
    if (!p || p.password !== password) throw new Error('Credenciales inválidas');
    if (p.estado !== 'aprobado') throw new Error(`Cuenta no aprobada: ${p.estado}`);
    localStorage.setItem(LS_SESSION, JSON.stringify(p));
    setUser(p);
    return p;
  }

  function logout() {
    localStorage.removeItem(LS_SESSION);
    setUser(null);
  }

  function setSessionFromPaciente(paciente) {
    localStorage.setItem(LS_SESSION, JSON.stringify(paciente));
    setUser(paciente);
  }

  return { user, login, logout, setSessionFromPaciente };
}
