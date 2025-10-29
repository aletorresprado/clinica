// features/paciente/pages/DashboardPaciente.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaCalendarCheck, 
  FaCalendarPlus, 
  FaSignOutAlt, 
  FaUser,
  FaClock,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuthPaciente } from '../hooks/useAuthPaciente';
import { pacienteService } from '../services/pacienteService';

const DashboardPaciente = () => {
  const [pacienteData, setPacienteData] = useState(null);
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logoutPaciente } = useAuthPaciente();
  const navigate = useNavigate();

  useEffect(() => {
    loadPacienteData();
    loadTurnos();
  }, []);

  const loadPacienteData = () => {
    const data = localStorage.getItem('pacienteData');
    if (data) {
      setPacienteData(JSON.parse(data));
    }
  };

  const loadTurnos = async () => {
  try {
    // ✅ Usar datos de localStorage en lugar de API
    const turnosGuardados = localStorage.getItem('turnosPaciente');
    if (turnosGuardados) {
      setTurnos(JSON.parse(turnosGuardados));
    } else {
      setTurnos([]); // No hay turnos
    }
  } catch (error) {
    toast.error('Error al cargar los turnos');
  } finally {
    setLoading(false);
  }
};

  const handleLogout = () => {
    logoutPaciente();
    /* navigate('/paciente/login'); */
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      pendiente: { color: 'bg-yellow-100 text-yellow-800', icon: FaClock },
      aprobado: { color: 'bg-green-100 text-green-800', icon: FaCheckCircle },
      cancelado: { color: 'bg-red-100 text-red-800', icon: FaTimesCircle },
      rechazado: { color: 'bg-red-100 text-red-800', icon: FaTimesCircle }
    };
    
    const config = estados[estado] || estados.pendiente;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="mr-1" />
        {estado.charAt(0).toUpperCase() + estado.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FaUser className="text-2xl text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Hola, {pacienteData?.nombre} {pacienteData?.apellido}
                </h1>
                <p className="text-sm text-gray-500">Panel del Paciente</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-4 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaCalendarCheck className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Turnos Totales
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {turnos.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaCheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Turnos Aprobados
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {turnos.filter(t => t.estado === 'aprobado').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaClock className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pendientes
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {turnos.filter(t => t.estado === 'pendiente').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8 px-4 sm:px-0">
          <button
            onClick={() => navigate('/paciente/solicitar-turno')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <FaCalendarPlus className="mr-2" />
            Solicitar Nuevo Turno
          </button>
        </div>

        {/* Turnos Recientes */}
        <div className="px-4 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Mis Turnos Recientes
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Historial de turnos solicitados
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              {turnos.length === 0 ? (
                <div className="px-4 py-12 text-center">
                  <FaCalendarCheck className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay turnos</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Comienza solicitando tu primer turno médico.
                  </p>
                </div>
              ) : (
                turnos.slice(0, 5).map((turno) => (
                  <div key={turno.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FaUser className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-semibold text-gray-900">
                            Dr. {turno.medicoNombre}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {turno.especialidad} • {new Date(turno.fecha).toLocaleDateString()} 
                            {' '}a las {turno.hora}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Motivo: {turno.motivo}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {getEstadoBadge(turno.estado)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPaciente;