import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'

function ProfLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
  e.preventDefault()
  const profesionales = JSON.parse(localStorage.getItem('profesionales') || '[]')
  const prof = profesionales.find(
    (p) => p.email === form.email && p.password === form.password
  )

  if (!prof) {
    toast.error('Credenciales incorrectas')
    return
  }

  localStorage.setItem('profEmail', prof.email)
  console.log('Login exitoso, redirigiendo a /profdashboard') // Debug
  toast.success(`Bienvenido, ${prof.username}`)
  navigate('/profdashboard')
}

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4'
      >
        <h2 className='text-2xl font-bold text-center'>Login Profesional</h2>

        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          className='w-full border p-2 rounded'
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Contraseña'
          onChange={handleChange}
          className='w-full border p-2 rounded'
          required
        />

        <button
          type='submit'
          className='bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700'
        >
          Ingresar
        </button>
      </form>
    </div>
  )
}

export default ProfLogin
