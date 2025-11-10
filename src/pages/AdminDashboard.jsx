import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const navigate = useNavigate();
  const [turnos, setTurnos] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [asignandoTurno, setAsignandoTurno] = useState(null); // Para controlar qué turno se está asignando
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState('');
  const [modoReasignacion, setModoReasignacion] = useState(false); // Para diferenciar entre asignar y reasignar

  useEffect(() => {
    const storedTurnos = JSON.parse(localStorage.getItem('turnos') || '[]');
    const storedProfesionales = JSON.parse(localStorage.getItem('profesionales') || '[]');
    setTurnos(storedTurnos);
    setProfesionales(storedProfesionales);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin');
  };

  const iniciarAsignacion = (turnoId) => {
    setAsignandoTurno(turnoId);
    setModoReasignacion(false);
    setProfesionalSeleccionado('');
  };

  const iniciarReasignacion = (turnoId) => {
    const turno = turnos.find(t => t.id === turnoId);
    setAsignandoTurno(turnoId);
    setModoReasignacion(true);
    // Precargar el profesional actualmente asignado
    setProfesionalSeleccionado(turno?.profesionalAsignado || '');
  };

  const cancelarAsignacion = () => {
    setAsignandoTurno(null);
    setModoReasignacion(false);
    setProfesionalSeleccionado('');
  };

  const asignarTurnoAProfesional = (turnoId) => {
    if (!profesionalSeleccionado) {
      toast.error('Por favor selecciona un profesional');
      return;
    }

    const turnosActualizados = turnos.map((t) =>
      t.id === turnoId 
        ? { 
            ...t, 
            estado: 'aprobado',
            profesionalAsignado: profesionalSeleccionado,
            profesionalAsignadoEmail: profesionales.find(p => p.id === parseInt(profesionalSeleccionado))?.email || ''
          } 
        : t
    );
    
    setTurnos(turnosActualizados);
    localStorage.setItem('turnos', JSON.stringify(turnosActualizados));
    
    setAsignandoTurno(null);
    setModoReasignacion(false);
    setProfesionalSeleccionado('');
    
    const prof = profesionales.find(p => p.id === parseInt(profesionalSeleccionado));
    const accion = modoReasignacion ? 'reasignado' : 'asignado';
    toast.success(`Turno ${accion} a ${prof?.username}`);
  };

  const rechazarTurno = (id) => {
    const turnosActualizados = turnos.map((t) =>
      t.id === id ? { 
        ...t, 
        estado: 'rechazado', 
        profesionalAsignado: null,
        profesionalAsignadoEmail: null
      } : t
    );
    setTurnos(turnosActualizados);
    localStorage.setItem('turnos', JSON.stringify(turnosActualizados));
    toast.success('Turno rechazado');
  };

  const rechazarTurnoAsignado = (id) => {
    const turnosActualizados = turnos.map((t) =>
      t.id === id ? { 
        ...t, 
        estado: 'rechazado', 
        profesionalAsignado: null,
        profesionalAsignadoEmail: null
      } : t
    );
    setTurnos(turnosActualizados);
    localStorage.setItem('turnos', JSON.stringify(turnosActualizados));
    toast.warning('Turno asignado ha sido rechazado');
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
                  <div className="flex justify-between items-start flex-wrap">
                    <div className="flex-1">
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
                      
                      {/* Mostrar profesional asignado si existe */}
                      {t.profesionalAsignado && (
                        <p className="text-green-600 text-xs mt-1 font-semibold">
                          Asignado a: {profesionales.find(p => p.id === parseInt(t.profesionalAsignado))?.username || 'Profesional'}
                        </p>
                      )}
                    </div>

                    <div className="mt-2 sm:mt-0 flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          t.estado === 'pendiente'
                            ? 'bg-yellow-100 text-yellow-700'
                            : t.estado === 'aprobado'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {t.estado}
                      </span>

                      {t.estado === 'pendiente' && (
                        <>
                          {/* Modal de asignación de profesional */}
                          {asignandoTurno === t.id ? (
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Asignar a profesional:
                              </p>
                              <select
                                value={profesionalSeleccionado}
                                onChange={(e) => setProfesionalSeleccionado(e.target.value)}
                                className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm mb-2 w-full"
                              >
                                <option value="">Seleccionar profesional</option>
                                {profesionales.map((prof) => (
                                  <option key={prof.id} value={prof.id}>
                                    {prof.username} - {prof.especialidad}
                                  </option>
                                ))}
                              </select>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => asignarTurnoAProfesional(t.id)}
                                  className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1 px-3 rounded-md"
                                >
                                  Confirmar
                                </button>
                                <button
                                  onClick={cancelarAsignacion}
                                  className="bg-gray-500 hover:bg-gray-600 text-white text-xs font-medium py-1 px-3 rounded-md"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => iniciarAsignacion(t.id)}
                                className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1 px-3 rounded-md"
                              >
                                Asignar y Aprobar
                              </button>
                              <button
                                onClick={() => rechazarTurno(t.id)}
                                className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1 px-3 rounded-md"
                              >
                                Rechazar
                              </button>
                            </div>
                          )}
                        </>
                      )}

                      {t.estado === 'aprobado' && t.profesionalAsignado && (
                        <>
                          {/* Modal de REASIGNACIÓN de profesional */}
                          {asignandoTurno === t.id && modoReasignacion ? (
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Reasignar a otro profesional:
                              </p>
                              <select
                                value={profesionalSeleccionado}
                                onChange={(e) => setProfesionalSeleccionado(e.target.value)}
                                className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm mb-2 w-full"
                              >
                                <option value="">Seleccionar profesional</option>
                                {profesionales.map((prof) => (
                                  <option key={prof.id} value={prof.id}>
                                    {prof.username} - {prof.especialidad}
                                  </option>
                                ))}
                              </select>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => asignarTurnoAProfesional(t.id)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1 px-3 rounded-md"
                                >
                                  Reasignar
                                </button>
                                <button
                                  onClick={cancelarAsignacion}
                                  className="bg-gray-500 hover:bg-gray-600 text-white text-xs font-medium py-1 px-3 rounded-md"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => iniciarReasignacion(t.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1 px-3 rounded-md"
                              >
                                Reasignar
                              </button>
                              <button
                                onClick={() => rechazarTurnoAsignado(t.id)}
                                className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1 px-3 rounded-md"
                              >
                                Rechazar
                              </button>
                            </div>
                          )}
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