import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import Input from './Input'

// Esquema Zod de validación
const adminRegisterSchema = z
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

function AdminRegisterForm({ onRegister }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(adminRegisterSchema)
  })

  const onSubmit = async (data) => {
    try {
      const admins = JSON.parse(localStorage.getItem('admins') || '[]')

      const existing = admins.find((a) => a.email === data.email)
      if (existing) {
        toast.error('Ya existe un administrador con ese email')
        return
      }

      const newAdmin = {
        username: data.username,
        email: data.email,
        password: data.password,
        role: 'admin'
      }

      admins.push(newAdmin)
      localStorage.setItem('admins', JSON.stringify(admins))
      toast.success('Administrador registrado correctamente')
      reset()
      onRegister(newAdmin)
    } catch (error) {
      console.error(error)
      toast.error('Error al registrar el administrador')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Nombre de usuario"
        type="text"
        name="username"
        placeholder="Administrador"
        register={register}
        error={errors.username}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="admin@clinicapp.com"
        register={register}
        error={errors.email}
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        placeholder="••••••"
        register={register}
        error={errors.password}
      />

      <Input
        label="Confirmar contraseña"
        type="password"
        name="confirmPassword"
        placeholder="••••••"
        register={register}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                   text-sm font-medium text-white bg-green-600 hover:bg-green-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
                   disabled:opacity-50"
      >
        {isSubmitting ? 'Registrando...' : 'Registrar administrador'}
      </button>
    </form>
  )
}

export default AdminRegisterForm
