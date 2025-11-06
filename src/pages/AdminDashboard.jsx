import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const navigate = useNavigate();
  const [turnos, setTurnos] = useState([]);
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('turnos') || '[]');
    setTurnos(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  const actualizarTurno = (id, nuevoEstado) => {
    const turnosActualizados = turnos.map((t) =>
      t.id === id ? { ...t, estado: nuevoEstado } : t
    );
    setTurnos(turnosActualizados);
    localStorage.setItem('turnos', JSON.stringify(turnosActualizados));

    toast.success(`Turno ${nuevoEstado === 'aprobado' ? 'aprobado' : 'rechazado'}`);
  };

  const turnosFiltrados =
    filtro === 'todos' ? turnos : turnos.filter((t) => t.estado === filtro);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="bg-white shadow rounded-lg px-4 py-5 sm:p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Panel del Administrador
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* FILTROS */}
        <div className="bg-white shadow rounded-lg px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Gestión de turnos</h2>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="todos">Todos</option>
            <option value="pendiente">Pendientes</option>
            <option value="aprobado">Aprobados</option>
            <option value="rechazado">Rechazados</option>
          </select>
        </div>

        {/* LISTADO DE TURNOS */}
        <div className="bg-white shadow rounded-lg px-6 py-8">
          {turnosFiltrados.length === 0 ? (
            <p className="text-gray-600">No hay turnos para mostrar.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {turnosFiltrados.map((t) => (
                <li key={t.id} className="py-4">
                  <div className="flex justify-between items-center flex-wrap">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {t.especialidad} - {t.profesional}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {t.fecha} a las {t.hora}
                      </p>
                      <p className="text-gray-500 text-sm">{t.motivo}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        Solicitado por: {t.userEmail}
                      </p>
                    </div>

                    <div className="mt-2 sm:mt-0 flex items-center gap-2">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          t.estado === 'pendiente'
                            ? 'bg-yellow-100 text-yellow-700'
                            : t.estado === 'aprobado'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {t.estado}
                      </span>

                      {t.estado === 'pendiente' && (
                        <>
                          <button
                            onClick={() => actualizarTurno(t.id, 'aprobado')}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1 px-3 rounded-md"
                          >
                            Aprobar
                          </button>
                          <button
                            onClick={() => actualizarTurno(t.id, 'rechazado')}
                            className="bg-red-600 hover:bg-blue-700 text-white text-xs font-medium py-1 px-3 rounded-md"
                          >
                            Rechazar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
