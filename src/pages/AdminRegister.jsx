import { useNavigate } from 'react-router-dom'
import AdminRegisterForm from '../components/AdminRegisterForm'

function AdminRegister() {
  const navigate = useNavigate()

  const handleRegister = (adminData) => {
    navigate('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registro de administrador
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Crear una cuenta para acceso al panel de administración
          </p>
        </div>
        <AdminRegisterForm onRegister={handleRegister} />
      </div>
    </div>
  )
}

export default AdminRegister
