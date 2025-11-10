import {z} from 'zod';


// ✅ Esquema para Usuarios
export const loginSchema  = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const registerSchema = z
.object({
    username: z.string().min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword,{
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

// ✅ Nuevo esquema para profesionales
export const profLoginSchema = z.object({
  email: z.string().email({ message: "Email profesional inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})

export const profRegisterSchema = z
  .object({
    username: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })


  // ✅ Esquema para Administradores
export const adminLoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(4, { message: "La contraseña debe tener al menos 4 caracteres" }),
});

export const adminRegisterSchema = z
  .object({
    username: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string().min(4, { message: 'La contraseña debe tener al menos 4 caracteres' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  })

