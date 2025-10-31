// src/services/mockService.js
// Simula API usando LocalStorage
const LS_KEYS = {
  pacientes: 'clinica_pacientes_v1',
  turnos: 'clinica_turnos_v1',
  admins: 'clinica_admins_v1'
};

export function initMockData() {
  if (!localStorage.getItem(LS_KEYS.pacientes)) {
    localStorage.setItem(LS_KEYS.pacientes, JSON.stringify([]));
  }
  if (!localStorage.getItem(LS_KEYS.turnos)) {
    localStorage.setItem(LS_KEYS.turnos, JSON.stringify([]));
  }
  // admin fijo (no password hashed, es demo)
  if (!localStorage.getItem(LS_KEYS.admins)) {
    const admins = [{ id: 'admin-1', email: 'admin@clinica.com', password: 'admin123', name: 'Administrador' }];
    localStorage.setItem(LS_KEYS.admins, JSON.stringify(admins));
  }
}

/* Pacientes */
export async function addPaciente({ nombre, email, password }) {
  const pacientes = JSON.parse(localStorage.getItem(LS_KEYS.pacientes) || '[]');
  const exists = pacientes.find((p) => p.email === email);
  if (exists) throw new Error('Email ya registrado');
  const nuevo = { id: Date.now().toString(), nombre, email, password, estado: 'pendiente' };
  pacientes.push(nuevo);
  localStorage.setItem(LS_KEYS.pacientes, JSON.stringify(pacientes));
  return nuevo;
}

export async function getPacientes() {
  return JSON.parse(localStorage.getItem(LS_KEYS.pacientes) || '[]');
}

export async function updatePacienteEstado(id, estado) {
  const pacientes = JSON.parse(localStorage.getItem(LS_KEYS.pacientes) || '[]');
  const idx = pacientes.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error('Paciente no encontrado');
  pacientes[idx].estado = estado;
  localStorage.setItem(LS_KEYS.pacientes, JSON.stringify(pacientes));
  return pacientes[idx];
}

export async function findPacienteByEmail(email) {
  const pacientes = JSON.parse(localStorage.getItem(LS_KEYS.pacientes) || '[]');
  return pacientes.find((p) => p.email === email);
}

/* Turnos */
export async function addTurno({ pacienteId, medicoId, fecha, hora, especialidad, motivo }) {
  const turnos = JSON.parse(localStorage.getItem(LS_KEYS.turnos) || '[]');
  const nuevo = { id: Date.now().toString(), pacienteId, medicoId, fecha, hora, especialidad, motivo, estado: 'pendiente' };
  turnos.push(nuevo);
  localStorage.setItem(LS_KEYS.turnos, JSON.stringify(turnos));
  return nuevo;
}

export async function getTurnos() {
  return JSON.parse(localStorage.getItem(LS_KEYS.turnos) || '[]');
}

export async function updateTurnoEstado(id, estado) {
  const turnos = JSON.parse(localStorage.getItem(LS_KEYS.turnos) || '[]');
  const idx = turnos.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error('Turno no encontrado');
  turnos[idx].estado = estado;
  localStorage.setItem(LS_KEYS.turnos, JSON.stringify(turnos));
  return turnos[idx];
}

/* Admin auth (credenciales fijas en LS) */
export async function authAdmin(email, password) {
  const admins = JSON.parse(localStorage.getItem(LS_KEYS.admins) || '[]');
  return admins.find((a) => a.email === email && a.password === password) || null;
}
