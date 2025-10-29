// features/paciente/services/mockPacienteService.js
export const mockPacienteService = {
  register: async (pacienteData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Registro exitoso. Espera la aprobación del administrador.',
      paciente: { id: 'mock-' + Date.now(), ...pacienteData }
    };
  },

  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      token: 'mock-token-' + Date.now(),
      paciente: {
        id: 'mock-123',
        nombre: credentials.email.split('@')[0],
        apellido: 'Paciente',
        email: credentials.email
      }
    };
  },

  getTurnos: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: 'turno-1',
        medicoNombre: 'Juan Pérez',
        especialidad: 'Cardiología',
        fecha: '2024-12-15',
        hora: '10:00',
        motivo: 'Control cardíaco rutinario',
        estado: 'pendiente',
        createdAt: '2024-11-28'
      },
      {
        id: 'turno-2', 
        medicoNombre: 'María García',
        especialidad: 'Dermatología',
        fecha: '2024-12-20',
        hora: '15:30',
        motivo: 'Consulta por manchas en la piel',
        estado: 'aprobado',
        createdAt: '2024-11-25'
      }
    ];
  },

  getMedicos: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      { id: 'med-1', nombre: 'Juan', apellido: 'Pérez', especialidad: 'Cardiología' },
      { id: 'med-2', nombre: 'María', apellido: 'García', especialidad: 'Dermatología' },
      { id: 'med-3', nombre: 'Carlos', apellido: 'López', especialidad: 'Pediatría' },
      { id: 'med-4', nombre: 'Ana', apellido: 'Martínez', especialidad: 'Cardiología' }
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
      message: 'Turno solicitado. Espera la aprobación del administrador.',
      turno: { id: 'new-turno-' + Date.now(), ...turnoData, estado: 'pendiente' }
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
