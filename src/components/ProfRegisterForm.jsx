import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

function ProfLoginForm({ onLogin }) {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    const profesionales = JSON.parse(localStorage.getItem('profesionales') || '[]')
    const prof = profesionales.find(
      (p) => p.email === data.email && p.password === data.password
    )

    if (!prof) {
      toast.error('Credenciales inválidas')
      return
    }

    localStorage.setItem('profUser', JSON.stringify(prof))
    toast.success(`Bienvenido ${prof.username}`)
    onLogin(prof)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('email', { required: true })} type="email" placeholder="Email" className="w-full p-2 border rounded" />
      <input {...register('password', { required: true })} type="password" placeholder="Contraseña" className="w-full p-2 border rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Iniciar Sesión
      </button>
    </form>
  )
}

export default ProfLoginForm
