// features/paciente/hooks/useAuthPaciente.js (actualizado)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Agregar useNavigate
import { pacienteService } from '../services/pacienteService';
import { mockPacienteService } from '../services/mockPacienteService';
import { toast } from 'react-toastify';

const USE_MOCK = true;
const service = USE_MOCK ? mockPacienteService : pacienteService;

export const useAuthPaciente = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Inicializar navigate

  const registerPaciente = async (data) => {
    setLoading(true);
    try {
      const response = await service.register(data);
      toast.success('Registro exitoso. Espera la aprobación del administrador.');
      
      // ✅ Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/paciente/login');
      }, 2000);
      
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Error en el registro';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginPaciente = async (credentials) => {
    setLoading(true);
    try {
      const response = await service.login(credentials);
      
      if (response.success) {
        localStorage.setItem('pacienteToken', response.token);
        localStorage.setItem('pacienteData', JSON.stringify(response.paciente));
        toast.success('Inicio de sesión exitoso');
        
        // ✅ Redirigir al dashboard inmediatamente
        navigate('/paciente/dashboard');
      }
      
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Error en el login';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutPaciente = () => {
    localStorage.removeItem('pacienteToken');
    localStorage.removeItem('pacienteData');
    toast.info('Sesión cerrada');
    navigate('/paciente/login'); // ✅ Redirigir al login después del logout
  };

  return {
    loading,
    registerPaciente,
    loginPaciente,
    logoutPaciente
  };
};