// Simulación de servicios de paciente (sin backend)

export const pacienteService = {
  registrar: (data) => console.log("Simulando registro:", data),
  login: (credenciales) => console.log("Simulando login:", credenciales),
  solicitarTurno: (turno) => console.log("Simulando solicitud de turno:", turno),
  cancelarTurno: (id) => console.log("Simulando cancelación de turno:", id),
};
