import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProfDashboard() {
  const navigate = useNavigate()
  const [turnos, setTurnos] = useState([])

  // 🧩 Recuperar el email del profesional logueado
  const profEmail = localStorage.getItem('profEmail')
  
  // 🧩 Buscar el profesional completo en el listado
  const profesionales = JSON.parse(localStorage.getItem('profesionales') || '[]')
  const profUser = profesionales.find((p) => p.email === profEmail)

  // Cargar turnos al montar el componente
  useEffect(() => {
    const turnosGuardados = JSON.parse(localStorage.getItem('turnos') || '[]')
    setTurnos(turnosGuardados)
  }, [])

  // Función para actualizar el estado de un turno
  const actualizarTurno = (id, nuevoEstado) => {
    const turnosActualizados = turnos.map((t) =>
      t.id === id ? { ...t, estado: nuevoEstado } : t
    )

    setTurnos(turnosActualizados)
    localStorage.setItem('turnos', JSON.stringify(turnosActualizados))
    
    if (nuevoEstado === 'rechazado') {
      toast.warning('Turno rechazado correctamente')
    } else {
      toast.info(`El turno fue ${nuevoEstado}.`)
    }
  }

  // Si no se encuentra el usuario, mostrar mensaje pero no redirigir (ya lo hace ProfProtectedRoute)
  if (!profUser) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <p className='text-red-600'>Error: Usuario no encontrado</p>
          <button
            onClick={() => {
              localStorage.removeItem('profEmail')
              navigate('/proflogin')
            }}
            className='mt-4 bg-blue-600 text-white py-2 px-4 rounded'
          >
            Volver al Login
          </button>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('profEmail')
    toast.success('Sesión cerrada correctamente')
    navigate('/proflogin')
  }

  // 📅 Obtener todos los turnos aprobados Y asignados a este profesional
  const turnosAsignados = turnos.filter(
    (t) =>
      t.estado === 'aprobado' &&
      t.profesionalAsignadoEmail === profEmail
  )

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto space-y-10'>
        <div className='bg-white shadow rounded-lg px-4 py-5 sm:p-6'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                Bienvenido, {profUser.username}
              </h1>
              <p className='text-gray-600 mt-1'>Especialidad: {profUser.especialidad}</p>
            </div>
            <button
              onClick={handleLogout}
              className='bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200'
            >
              Cerrar Sesión
            </button>
          </div>

          <div className='border-t border-gray-200 pt-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Tus turnos asignados
            </h2>

            {turnosAsignados.length === 0 ? (
              <div className='text-center py-8'>
                <p className='text-gray-600 text-lg'>Aún no tenés turnos asignados.</p>
                <p className='text-gray-500 text-sm mt-2'>Los turnos aparecerán aquí cuando el administrador te los asigne.</p>
              </div>
            ) : (
              <ul className='divide-y divide-gray-200'>
                {turnosAsignados.map((t) => (
                  <li key={t.id} className='py-4'>
                    <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                      <p className='font-semibold text-gray-900 text-lg'>
                        Paciente: {t.userEmail || t.paciente}
                      </p>
                      <p className='text-gray-600 text-sm mt-1'>
                        📅 {t.fecha} a las {t.hora}
                      </p>
                      <p className='text-gray-500 text-sm mt-1'>
                        📋 Motivo: {t.motivo}
                      </p>
                      <p className='text-gray-400 text-sm mt-1'>
                        🏥 Especialidad: {t.especialidad}
                      </p>
                      <div className='mt-2 pt-2 border-t border-green-200 flex justify-between items-center'>
                        <span className='inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full'>
                          ✅ Asignado a ti
                        </span>
                        <button
                          onClick={() => actualizarTurno(t.id, 'rechazado')}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1 px-3 rounded-md transition duration-200"
                        >
                          Rechazar Turno
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfDashboard