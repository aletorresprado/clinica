import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'

function ProfRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    especialidad: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const profesionales = JSON.parse(localStorage.getItem('profesionales') || '[]')

    // Evitar duplicados
    if (profesionales.some((p) => p.email === form.email)) {
      toast.error('Este correo ya está registrado')
      return
    }

    const nuevoProf = {
      id: Date.now(),
      ...form,
    }

    profesionales.push(nuevoProf)
    localStorage.setItem('profesionales', JSON.stringify(profesionales))
    toast.success('Registro exitoso. Ahora podés iniciar sesión.')
    navigate('/proflogin')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4'
      >
        <h2 className='text-2xl font-bold text-center'>Registro Profesional</h2>

        <input
          type='text'
          name='username'
          placeholder='Nombre completo'
          onChange={handleChange}
          className='w-full border p-2 rounded'
          required
        />
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
        <input
          type='text'
          name='especialidad'
          placeholder='Especialidad'
          onChange={handleChange}
          className='w-full border p-2 rounded'
        />

        <button
          type='submit'
          className='bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700'
        >
          Registrarme
        </button>
      </form>
    </div>
  )
}

export default ProfRegister
