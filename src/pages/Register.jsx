import { Link, useNavigate } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

function Register() {
  const navigate = useNavigate()
  const handleRegister = (userData) => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 border border-blue-400">
        
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-blue-800">
            Crear cuenta
          </h2>
          <p className="mt-1 text-sm text-blue-800">
            ¿Ya tenés una cuenta?{' '}
            <Link 
              to="/login" 
              className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Iniciá sesión
            </Link>
          </p>
        </div>

        {/* Formulario */}
        <RegisterForm onRegister={handleRegister} />

      </div>
    </div>
  )
}

export default Register