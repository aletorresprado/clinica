// features/paciente/services/mockPacienteService.js
export const mockPacienteService = {
  register: async (pacienteData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // ✅ Generar ID único para cada paciente registrado
    const pacienteId = 'paciente-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    
    return {
      success: true,
      message: 'Registro exitoso. Espera la aprobación del administrador.',
      paciente: { 
        id: pacienteId, 
        ...pacienteData,
        estado: 'pendiente' // Agregar estado de aprobación
      }
    };
  },

  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // ✅ Generar ID único basado en el email para consistencia entre logins
    // Usamos una versión simple sin Buffer para compatibilidad
    const emailHash = btoa(credentials.email).replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
    const pacienteId = 'paciente-' + emailHash;
    
    return {
      success: true,
      token: 'mock-token-' + Date.now(),
      paciente: {
        id: pacienteId, // ✅ ID único por paciente (mismo email = mismo ID)
        nombre: credentials.email.split('@')[0],
        apellido: 'Paciente',
        email: credentials.email,
        estado: 'aprobado', // Simular que está aprobado
        telefono: '123-456-7890', // Datos adicionales para consistencia
        dni: '12345678',
        fechaNacimiento: '1990-01-01'
      }
    };
  },

  getTurnos: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // ✅ Estos son solo datos de ejemplo, la app usará localStorage
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