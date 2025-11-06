import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import Input from './Input'

// esquema específico para admin
const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(4, { message: 'La contraseña debe tener al menos 4 caracteres' }),
  
})

function AdminLoginForm({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(adminLoginSchema)
  })

  const onSubmit = async (data) => {
    try {
      const admins = JSON.parse(localStorage.getItem('admins') || '[]')
      const foundAdmin = admins.find(
        (a) =>
          a.email === data.email &&
          a.password === data.password
      )

      if (!foundAdmin) {
        toast.error('Credenciales o código incorrectos')
        return
      }

      localStorage.setItem('admin', JSON.stringify(foundAdmin))
      toast.success(`Bienvenido administrador, ${foundAdmin.username}`)
      onLogin(foundAdmin)

    } catch (error) {
      console.error(error)
      toast.error('Error al iniciar sesión')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="admin@ejemplo.com"
        register={register}
        error={errors.email}
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        placeholder="••••••••"
        register={register}
        error={errors.password}
      />

      

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                   text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                   disabled:opacity-50"
      >
        {isSubmitting ? 'Verificando...' : 'Acceder al panel'}
      </button>
    </form>
  )
}

export default AdminLoginForm
