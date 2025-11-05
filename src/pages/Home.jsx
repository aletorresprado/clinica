import {useNavigate } from 'react-router-dom';

function Home() {

const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem('user') || null);
const handleLogout = () => {
  localStorage.removeItem('user');
  navigate('/login');
}

if (!user) return null 

return(
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
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
            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-gray-600">
                Has accedido exitosamente a tu cuenta. Esta es tu página del Home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home