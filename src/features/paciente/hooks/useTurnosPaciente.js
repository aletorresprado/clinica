// src/features/paciente/hooks/useTurnosPaciente.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Servicio mock
const mockService = {
  getMedicos: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
      { id: 'med-1', nombre: 'Juan', apellido: 'Pérez', especialidad: 'Cardiología' },
      { id: 'med-2', nombre: 'María', apellido: 'García', especialidad: 'Dermatología' },
      { id: 'med-3', nombre: 'Carlos', apellido: 'López', especialidad: 'Pediatría' },
      { id: 'med-4', nombre: 'Ana', apellido: 'Martínez', especialidad: 'Traumatología' },
    ];
  },

  getEspecialidades: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return ['Cardiología', 'Dermatología', 'Pediatría', 'Traumatología', 'Oftalmología'];
  },

  getHorariosDisponibles: async (medicoId, fecha) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'];
  },

  solicitarTurno: async (turnoData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'Turno solicitado. Espera la aprobación del administrador.'
    };
  },

  cancelarTurno: async (turnoId) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      message: 'Turno cancelado. Se notificó al administrador.'
    };
  }
};

export const useTurnosPaciente = () => {
  const [loading, setLoading] = useState(false);
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const navigate = useNavigate();

  const getMedicos = async () => {
    setLoading(true);
    try {
      const data = await mockService.getMedicos();
      setMedicos(data);
      return data;
    } catch (error) {
      toast.error('Error al cargar médicos');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getEspecialidades = async () => {
    try {
      const data = await mockService.getEspecialidades();
      setEspecialidades(data);
      return data;
    } catch (error) {
      toast.error('Error al cargar especialidades');
      throw error;
    }
  };

  const getHorariosDisponibles = async (medicoId, fecha) => {
    setLoading(true);
    try {
      const data = await mockService.getHorariosDisponibles(medicoId, fecha);
      setHorarios(data);
      return data;
    } catch (error) {
      toast.error('Error al cargar horarios disponibles');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const solicitarTurno = async (turnoData) => {
    setLoading(true);
    try {
      // Simular solicitud
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Crear nuevo turno con datos del formulario
      const medicoSeleccionado = medicos.find(med => med.id === turnoData.medicoId);
      const nuevoTurno = {
        id: 'turno-' + Date.now(),
        medicoNombre: medicoSeleccionado ? `Dr. ${medicoSeleccionado.nombre} ${medicoSeleccionado.apellido}` : 'Médico',
        especialidad: turnoData.especialidad,
        fecha: turnoData.fecha,
        hora: turnoData.hora,
        motivo: turnoData.motivo,
        estado: 'pendiente',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      // Guardar en localStorage
      const turnosExistentes = JSON.parse(localStorage.getItem('turnosPaciente') || '[]');
      const turnosActualizados = [...turnosExistentes, nuevoTurno];
      localStorage.setItem('turnosPaciente', JSON.stringify(turnosActualizados));
      
      toast.success('Turno solicitado. Espera la aprobación del administrador.');
      
      setTimeout(() => {
        navigate('/paciente/turnos');
      }, 1500);
      
      return { success: true, turno: nuevoTurno };
      
    } catch (error) {
      toast.error('Error al solicitar turno');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelarTurno = async (turnoId) => {
    setLoading(true);
    try {
      await mockService.cancelarTurno(turnoId);
      
      // Actualizar estado localmente
      const turnosExistentes = JSON.parse(localStorage.getItem('turnosPaciente') || '[]');
      const turnosActualizados = turnosExistentes.map(turno => 
        turno.id === turnoId 
          ? { ...turno, estado: 'cancelado' }
          : turno
      );
      
      localStorage.setItem('turnosPaciente', JSON.stringify(turnosActualizados));
      
      return { success: true };
    } catch (error) {
      toast.error('Error al cancelar turno');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    medicos,
    especialidades,
    horarios,
    getMedicos,
    getEspecialidades,
    getHorariosDisponibles,
    solicitarTurno,
    cancelarTurno
  };
};