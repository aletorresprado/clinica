// features/paciente/schemas/pacienteSchemas.js
import { z } from 'zod';

export const registerPacienteSchema = z.object({
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  apellido: z.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),
  email: z.string()
    .email('Ingresa un email válido')
    .min(1, 'El email es obligatorio'),
  telefono: z.string()
    .min(8, 'El teléfono debe tener al menos 8 caracteres')
    .max(15, 'El teléfono no puede exceder 15 caracteres'),
  dni: z.string()
    .min(7, 'El DNI debe tener al menos 7 caracteres')
    .max(10, 'El DNI no puede exceder 10 caracteres'),
  fechaNacimiento: z.string()
    .min(1, 'La fecha de nacimiento es obligatoria'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(50, 'La contraseña no puede exceder 50 caracteres'),
  confirmPassword: z.string()
    .min(1, 'Confirma tu contraseña')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
});

export const loginPacienteSchema = z.object({
  email: z.string().email('Ingresa un email válido'),
  password: z.string().min(1, 'La contraseña es obligatoria')
});

// features/paciente/schemas/pacienteSchemas.js (agregar)
export const solicitarTurnoSchema = z.object({
  medicoId: z.string().min(1, 'Selecciona un médico'),
  especialidad: z.string().min(1, 'Selecciona una especialidad'),
  fecha: z.string().min(1, 'Selecciona una fecha'),
  hora: z.string().min(1, 'Selecciona un horario'),
  motivo: z.string()
    .min(10, 'El motivo debe tener al menos 10 caracteres')
    .max(500, 'El motivo no puede exceder 500 caracteres')
});