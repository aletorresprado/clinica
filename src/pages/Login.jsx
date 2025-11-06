import { Link, useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

function Login() {
  const navigate = useNavigate()
  const handleLogin = (userData) => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 border border-blue-400">
        
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-blue-800">
            Bienvenido
          </h2>
          <p className="mt-1 text-sm text-blue-800">
            Inicia sesión para continuar
          </p>
        </div>

        {/* Formulario */}
        <LoginForm onLogin={handleLogin} />

        <div className="mt-4 text-center text-sm text-gray-600">
          ¿No tenés cuenta?{' '}
          <Link 
            to="/register" 
            className="font-medium text-blue-800 hover:text-teal-700 transition-colors"
          >
            Registrate acá
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login