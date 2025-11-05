import {Link, useNavigate} from 'react-router-dom'
import LoginForm from '../components/LoginForm'

function Login() {

const navigate = useNavigate()
const handleLogin = (userData) => {
  navigate('/dashboard');
}


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px6 lg:px-8'>
      <div className=' max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Iniciar sesión en su cuenta 
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            O{' '}
            <Link to='/register' className='font-medium text-indigo-600 hover:text-indigo-500'>
              registra una nueva cuenta
            </Link>
          </p>
        </div>
        <LoginForm onLogin={handleLogin} />


      </div>
    </div>
  )
}

export default Login;