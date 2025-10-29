// src/features/paciente/pages/SolicitarTurno.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaCalendar, FaUserMd, FaStethoscope, FaClock, FaArrowLeft } from 'react-icons/fa';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useTurnosPaciente } from '../hooks/useTurnosPaciente';

const SolicitarTurno = () => {
  const [medicosFiltrados, setMedicosFiltrados] = useState([]);
  
  const { 
    loading, 
    medicos, 
    especialidades, 
    horarios,
    getMedicos, 
    getEspecialidades, 
    getHorariosDisponibles,
    solicitarTurno 
  } = useTurnosPaciente();
  
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm();

  const watchEspecialidad = watch('especialidad');
  const watchMedico = watch('medicoId');
  const watchFecha = watch('fecha');

  // Función para obtener la fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  useEffect(() => {
    const loadData = async () => {
      await getMedicos();
      await getEspecialidades();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (watchEspecialidad) {
      const filtered = medicos.filter(medico => 
        medico.especialidad === watchEspecialidad
      );
      setMedicosFiltrados(filtered);
      setValue('medicoId', '');
    }
  }, [watchEspecialidad, medicos, setValue]);

  useEffect(() => {
    if (watchMedico && watchFecha) {
      getHorariosDisponibles(watchMedico, watchFecha);
    }
  }, [watchMedico, watchFecha]);

  const onSubmit = async (data) => {
    try {
      // Obtener nombre del médico seleccionado
      const medicoSeleccionado = medicos.find(med => med.id === data.medicoId);
      const turnoData = {
        ...data,
        medicoNombre: `Dr. ${medicoSeleccionado?.nombre} ${medicoSeleccionado?.apellido}` || 'Médico'
      };
      
      await solicitarTurno(turnoData);
    } catch (error) {
      console.error('Error al solicitar turno:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FaCalendar className="mr-3 text-blue-600" />
              Solicitar Nuevo Turno
            </h1>
            <p className="text-gray-600 mt-2">
              Completa los datos para solicitar tu turno médico
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Especialidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaStethoscope className="inline mr-2 text-gray-400" />
                Especialidad Médica
              </label>
              <select
                {...register('especialidad', { required: 'Selecciona una especialidad' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Selecciona una especialidad</option>
                {especialidades.map((especialidad) => (
                  <option key={especialidad} value={especialidad}>
                    {especialidad}
                  </option>
                ))}
              </select>
              {errors.especialidad && (
                <p className="mt-1 text-sm text-red-600">{errors.especialidad.message}</p>
              )}
            </div>

            {/* Médico */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUserMd className="inline mr-2 text-gray-400" />
                Médico
              </label>
              <select
                {...register('medicoId', { required: 'Selecciona un médico' })}
                disabled={!watchEspecialidad}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Selecciona un médico</option>
                {medicosFiltrados.map((medico) => (
                  <option key={medico.id} value={medico.id}>
                    Dr. {medico.nombre} {medico.apellido} - {medico.especialidad}
                  </option>
                ))}
              </select>
              {errors.medicoId && (
                <p className="mt-1 text-sm text-red-600">{errors.medicoId.message}</p>
              )}
            </div>

            {/* Fecha */}
            <Input
              label="Fecha del Turno"
              type="date"
              min={getMinDate()}
              error={errors.fecha?.message}
              {...register('fecha', { required: 'Selecciona una fecha' })}
            />

            {/* Horario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaClock className="inline mr-2 text-gray-400" />
                Horario Disponible
              </label>
              <select
                {...register('hora', { required: 'Selecciona un horario' })}
                disabled={!watchMedico || !watchFecha}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Selecciona un horario</option>
                {horarios.map((horario) => (
                  <option key={horario} value={horario}>
                    {horario}
                  </option>
                ))}
              </select>
              {errors.hora && (
                <p className="mt-1 text-sm text-red-600">{errors.hora.message}</p>
              )}
            </div>

            {/* Motivo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo de la Consulta
              </label>
              <textarea
                {...register('motivo', { 
                  required: 'Describe el motivo de la consulta',
                  minLength: { value: 10, message: 'Mínimo 10 caracteres' }
                })}
                rows={4}
                placeholder="Describe brevemente el motivo de tu consulta..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              />
              {errors.motivo && (
                <p className="mt-1 text-sm text-red-600">{errors.motivo.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              loading={loading}
              disabled={!watchMedico || !watchFecha || !watch('hora')}
              className="mt-6"
            >
              Solicitar Turno
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SolicitarTurno;