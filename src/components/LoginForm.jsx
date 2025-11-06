import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../utils/validationSchema'
import { toast } from 'react-toastify'
import Input from './Input'

function LoginForm({ onLogin }) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const foundUser = users.find(
        (u) => u.email === data.email && u.password === data.password
      )

      if (!foundUser) {
        toast.error('Credenciales incorrectas')
        return
      }

      localStorage.setItem('user', JSON.stringify(foundUser))
      toast.success(`¡Bienvenido, ${foundUser.username}!`)
      onLogin(foundUser)

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
        placeholder="tu@email.com"
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                   text-sm font-medium text-white bg-blue-400 hover:bg-blue-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                   disabled:opacity-50"
      >
        {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}

export default LoginForm
