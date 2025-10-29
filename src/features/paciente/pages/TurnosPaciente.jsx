import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaCalendar, FaFilter, FaEye, FaTimes } from "react-icons/fa";
import { useTurnosPaciente } from "../hooks/useTurnosPaciente";

const TurnosPaciente = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos');
  const { cancelarTurno, getTurnosDelPaciente } = useTurnosPaciente(); // ✅ Agregar getTurnosDelPaciente
  const navigate = useNavigate();

  useEffect(() => {
    loadTurnos();
  }, []);

  const loadTurnos = async () => {
    try {
      setLoading(true);
      
      // ✅ Usar la nueva función que filtra por paciente
      const turnosDelPaciente = getTurnosDelPaciente();
      
      if (turnosDelPaciente.length === 0) {
        // Datos de ejemplo solo si el paciente no tiene turnos
        const pacienteData = JSON.parse(localStorage.getItem('pacienteData') || '{}');
        const turnosEjemplo = [
          {
            id: 'turno-ejemplo-1',
            pacienteId: pacienteData.id, // ✅ Asociar al paciente actual
            pacienteNombre: `${pacienteData.nombre} ${pacienteData.apellido}`,
            medicoNombre: 'Juan Pérez',
            especialidad: 'Cardiología',
            fecha: '2024-12-15',
            hora: '10:00',
            motivo: 'Control cardíaco rutinario',
            estado: 'pendiente',
            createdAt: '2024-11-28'
          }
        ];
        setTurnos(turnosEjemplo);
        localStorage.setItem('turnosPaciente', JSON.stringify(turnosEjemplo));
      } else {
        setTurnos(turnosDelPaciente);
      }
    } catch (error) {
      toast.error('Error al cargar los turnos');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarTurno = async (turnoId) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar este turno? Se notificará al administrador.')) {
      try {
        await cancelarTurno(turnoId);
        await loadTurnos(); // Recargar la lista
      } catch (error) {
        // Error manejado en el hook
      }
    }
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      aprobado: 'bg-green-100 text-green-800',
      cancelado: 'bg-red-100 text-red-800',
      rechazado: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${estados[estado]}`}>
        {estado.charAt(0).toUpperCase() + estado.slice(1)}
      </span>
    );
  };

  const turnosFiltrados = turnos.filter(turno => {
    if (filtro === 'todos') return true;
    return turno.estado === filtro;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/paciente/dashboard')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Volver al Dashboard
          </button>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaCalendar className="mr-3 text-blue-600" />
                  Mis Turnos
                </h1>
                <p className="text-gray-600 mt-2">
                  Gestiona todos tus turnos médicos
                </p>
              </div>
              
              {/* Filtro */}
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-2">
                  <FaFilter className="text-gray-400" />
                  <select
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="todos">Todos los turnos</option>
                    <option value="pendiente">Pendientes</option>
                    <option value="aprobado">Aprobados</option>
                    <option value="cancelado">Cancelados</option>
                    <option value="rechazado">Rechazados</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Turnos */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {turnosFiltrados.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <FaCalendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay turnos</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filtro === 'todos' 
                  ? 'No tienes turnos solicitados.' 
                  : `No tienes turnos ${filtro}.`}
              </p>
              <button
                onClick={() => navigate('/paciente/solicitar-turno')}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Solicitar Primer Turno
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {turnosFiltrados.map((turno) => (
                <div key={turno.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {turno.medicoNombre}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {turno.especialidad}
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-600">
                              <strong>Fecha:</strong> {new Date(turno.fecha).toLocaleDateString()} 
                              {' '}a las {turno.hora}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Motivo:</strong> {turno.motivo}
                            </p>
                            <p className="text-sm text-gray-500">
                              <strong>Solicitado:</strong> {new Date(turno.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {getEstadoBadge(turno.estado)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Acciones */}
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
                      <button
                        onClick={() => {
                          toast.info(`Detalles del turno: ${turno.motivo}`);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FaEye className="mr-2" />
                        Ver
                      </button>
                      
                      {(turno.estado === 'aprobado' || turno.estado === 'pendiente') && (
                        <button
                          onClick={() => handleCancelarTurno(turno.id)}
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTimes className="mr-2" />
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TurnosPaciente;