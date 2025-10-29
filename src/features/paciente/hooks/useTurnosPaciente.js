// src/features/paciente/hooks/useTurnosPaciente.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// ✅ Servicio mock COMPLETO - debe estar dentro del mismo archivo
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

  // ✅ Función para obtener el paciente logueado
  const getPacienteLogueado = () => {
    try {
      const pacienteData = localStorage.getItem('pacienteData');
      return pacienteData ? JSON.parse(pacienteData) : null;
    } catch (error) {
      console.error('Error al obtener paciente logueado:', error);
      return null;
    }
  };

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
      // ✅ Obtener paciente logueado
      const paciente = getPacienteLogueado();
      if (!paciente) {
        toast.error('No se pudo identificar al paciente');
        throw new Error('Paciente no identificado');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const medicoSeleccionado = medicos.find(med => med.id === turnoData.medicoId);
      const nuevoTurno = {
        id: 'turno-' + Date.now(),
        pacienteId: paciente.id, // ✅ Asociar al paciente
        pacienteNombre: `${paciente.nombre} ${paciente.apellido}`, // ✅ Nombre del paciente
        medicoId: turnoData.medicoId,
        medicoNombre: medicoSeleccionado ? `Dr. ${medicoSeleccionado.nombre} ${medicoSeleccionado.apellido}` : 'Médico',
        especialidad: turnoData.especialidad,
        fecha: turnoData.fecha,
        hora: turnoData.hora,
        motivo: turnoData.motivo,
        estado: 'pendiente',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      // ✅ Guardar en localStorage
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
      // ✅ Obtener paciente logueado para verificación
      const paciente = getPacienteLogueado();
      if (!paciente) {
        toast.error('No se pudo identificar al paciente');
        throw new Error('Paciente no identificado');
      }

      await mockService.cancelarTurno(turnoId);
      
      const turnosExistentes = JSON.parse(localStorage.getItem('turnosPaciente') || '[]');
      const turnosActualizados = turnosExistentes.map(turno => 
        turno.id === turnoId && turno.pacienteId === paciente.id // ✅ Verificar que el turno pertenece al paciente
          ? { ...turno, estado: 'cancelado' }
          : turno
      );
      
      localStorage.setItem('turnosPaciente', JSON.stringify(turnosActualizados));
      
      toast.success('Turno cancelado. Se notificó al administrador.');
      
      return { success: true };
    } catch (error) {
      toast.error('Error al cancelar turno');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Función para obtener solo los turnos del paciente logueado
  const getTurnosDelPaciente = () => {
    try {
      const paciente = getPacienteLogueado();
      if (!paciente) return [];
      
      const todosLosTurnos = JSON.parse(localStorage.getItem('turnosPaciente') || '[]');
      return todosLosTurnos.filter(turno => turno.pacienteId === paciente.id);
    } catch (error) {
      console.error('Error al obtener turnos del paciente:', error);
      return [];
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
    cancelarTurno,
    getTurnosDelPaciente // ✅ Exportar la nueva función
  };
};