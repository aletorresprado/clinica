// features/paciente/pages/RegisterPaciente.jsx (simplificado)
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaCalendar, FaLock } from 'react-icons/fa';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useAuthPaciente } from '../hooks/useAuthPaciente';
import { registerPacienteSchema } from '../schemas/pacienteSchemas';

const RegisterPaciente = () => {
  const { registerPaciente, loading } = useAuthPaciente();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerPacienteSchema)
  });

  const onSubmit = async (data) => {
    try {
      await registerPaciente(data);
      // ✅ La redirección ahora se maneja en el hook
    } catch (error) {
      // El error ya se maneja en el hook
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl font-bold text-center">Crear Cuenta de Paciente</h1>
          <p className="text-blue-100 text-center mt-2">
            Regístrate y espera la aprobación del administrador
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nombre"
              type="text"
              placeholder="Tu nombre"
              error={errors.nombre?.message}
              icon={<FaUser className="text-gray-400" />}
              {...register('nombre')}
            />
            
            <Input
              label="Apellido"
              type="text"
              placeholder="Tu apellido"
              error={errors.apellido?.message}
              icon={<FaUser className="text-gray-400" />}
              {...register('apellido')}
            />
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            icon={<FaEnvelope className="text-gray-400" />}
            {...register('email')}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Teléfono"
              type="tel"
              placeholder="+54 11 1234-5678"
              error={errors.telefono?.message}
              icon={<FaPhone className="text-gray-400" />}
              {...register('telefono')}
            />
            
            <Input
              label="DNI"
              type="text"
              placeholder="12345678"
              error={errors.dni?.message}
              icon={<FaIdCard className="text-gray-400" />}
              {...register('dni')}
            />
          </div>

          <Input
            label="Fecha de Nacimiento"
            type="date"
            error={errors.fechaNacimiento?.message}
            icon={<FaCalendar className="text-gray-400" />}
            {...register('fechaNacimiento')}
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            icon={<FaLock className="text-gray-400" />}
            {...register('password')}
          />

          <Input
            label="Confirmar Contraseña"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            icon={<FaLock className="text-gray-400" />}
            {...register('confirmPassword')}
          />

          <Button 
            type="submit" 
            loading={loading}
            className="mt-6"
          >
            Registrarse como Paciente
          </Button>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to="/paciente/login" 
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPaciente;