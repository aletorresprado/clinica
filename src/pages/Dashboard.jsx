import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Input from '../components/Input'

// --- Función para actualizar el estado de un turno ---
const actualizarTurno = (id, nuevoEstado, setTurnos) => {
  const turnos = JSON.parse(localStorage.getItem('turnos') || '[]')
  const turnosActualizados = turnos.map((t) =>
    t.id === id ? { ...t, estado: nuevoEstado } : t
  )

  localStorage.setItem('turnos', JSON.stringify(turnosActualizados))
  setTurnos(turnosActualizados)
  toast.info(`El turno fue ${nuevoEstado}.`)
}

// --- COMPONENTE PRINCIPAL ---
function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const [turnos, setTurnos] = useState(
    JSON.parse(localStorage.getItem('turnos') || '[]')
  )

  const especialidadSeleccionada = watch('especialidad')

  const especialidades = {
    Cardiología: ['Dr. Juan Pérez', 'Dra. Laura Gómez'],
    Pediatría: ['Dr. Carlos Ruiz', 'Dra. Marta López'],
    Dermatología: ['Dr. José Medina', 'Dra. Ana Torres'],
    Neurología: ['Dr. Diego Salas', 'Dra. Verónica Herrera'],
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/entrada')
  }

  if (!user) return null

  // --- Guardar turno ---
  const onSubmit = (data) => {
    try {
      const nuevoTurno = {
        id: Date.now(),
        ...data,
        userEmail: user.email,
        estado: 'pendiente',
      }

      const nuevosTurnos = [...turnos, nuevoTurno]
      setTurnos(nuevosTurnos)
      localStorage.setItem('turnos', JSON.stringify(nuevosTurnos))

      toast.success('Turno solicitado correctamente')
      reset()
    } catch (error) {
      console.error(error)
      toast.error('Error al solicitar el turno')
    }
  }

  // --- Filtrar turnos del usuario actual ---
  const turnosUsuario = turnos.filter((t) => t.userEmail === user.email)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* 🧩 HEADER */}
        <div className="bg-white shadow rounded-lg px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              ¡Bienvenido, {user.username}!
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Cerrar Sesión
            </button>
          </div>

          {/* 📋 DATOS DEL USUARIO */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tu información
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Usuario</p>
                <p className="text-lg text-gray-900">{user.username}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg text-gray-900">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🩺 FORMULARIO DE TURNO */}
        <div className="bg-white shadow rounded-lg px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Solicitar nuevo turno
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Especialidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Especialidad
              </label>
              <select
                {...register('especialidad', { required: 'Seleccioná una especialidad' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 sm:text-sm"
              >
                <option value="">-- Seleccionar --</option>
                {Object.keys(especialidades).map((esp) => (
                  <option key={esp} value={esp}>{esp}</option>
                ))}
              </select>
              {errors.especialidad && (
                <p className="text-red-500 text-sm mt-1">{errors.especialidad.message}</p>
              )}
            </div>

            {/* Profesional dependiente de la especialidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profesional
              </label>
              <select
                {...register('profesional', { required: 'Seleccioná un profesional' })}
                disabled={!especialidadSeleccionada}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 sm:text-sm disabled:bg-gray-100 disabled:text-gray-400"
              >
                <option value="">-- Seleccionar --</option>
                {especialidadSeleccionada &&
                  especialidades[especialidadSeleccionada].map((doc) => (
                    <option key={doc} value={doc}>{doc}</option>
                  ))}
              </select>
              {errors.profesional && (
                <p className="text-red-500 text-sm mt-1">{errors.profesional.message}</p>
              )}
            </div>

            {/* Fecha */}
            <Input
              label="Día"
              type="date"
              name="fecha"
              register={register}
              error={errors.fecha}
            />

            {/* Horario */}
            <Input
              label="Horario"
              type="time"
              name="hora"
              register={register}
              error={errors.hora}
            />

            {/* Motivo */}
            <Input
              label="Motivo de la consulta"
              type="text"
              name="motivo"
              placeholder="Describí brevemente el motivo de tu consulta"
              register={register}
              error={errors.motivo}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar turno'}
            </button>
          </form>
        </div>

        {/* 📅 LISTADO DE TURNOS */}
        <div className="bg-white shadow rounded-lg px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mis turnos</h2>
          {turnosUsuario.length === 0 ? (
            <p className="text-gray-600">Aún no has solicitado turnos.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {turnosUsuario.map((t) => (
                <li key={t.id} className="py-3">
                  <p className="font-semibold text-gray-900">
                    {t.especialidad} - {t.profesional}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {t.fecha} a las {t.hora}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{t.motivo}</p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                      t.estado === 'pendiente'
                        ? 'bg-yellow-100 text-yellow-700'
                        : t.estado === 'aprobado'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {t.estado}
                  </span>

                  {(t.estado === 'pendiente' || t.estado === 'aprobado') && (
                    <button
                      onClick={() => actualizarTurno(t.id, 'rechazado', setTurnos)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1 px-3 rounded-md ml-2"
                    >
                      Rechazar
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard
