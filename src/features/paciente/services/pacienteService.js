// features/paciente/services/pacienteService.js (actualizado)
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Crear instancia de axios con timeout
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos timeout
});

export const pacienteService = {
  register: async (pacienteData) => {
    const response = await api.post('/pacientes/register', pacienteData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/pacientes/login', credentials);
    return response.data;
  },

  getTurnos: async () => {
    const token = localStorage.getItem('pacienteToken');
    const response = await api.get('/pacientes/turnos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getMedicos: async () => {
    const token = localStorage.getItem('pacienteToken');
    const response = await api.get('/medicos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getEspecialidades: async () => {
    const token = localStorage.getItem('pacienteToken');
    const response = await api.get('/especialidades', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getHorariosDisponibles: async (medicoId, fecha) => {
    const token = localStorage.getItem('pacienteToken');
    const response = await api.get(
      `/medicos/${medicoId}/horarios?fecha=${fecha}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  solicitarTurno: async (turnoData) => {
    const token = localStorage.getItem('pacienteToken');
    const response = await api.post('/pacientes/turnos/solicitar', turnoData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  cancelarTurno: async (turnoId) => {
    const token = localStorage.getItem('pacienteToken');
    const response = await api.put(
      `/pacientes/turnos/${turnoId}/cancelar`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
};