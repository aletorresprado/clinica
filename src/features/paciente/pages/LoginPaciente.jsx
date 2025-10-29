// features/paciente/pages/LoginPaciente.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaStethoscope } from 'react-icons/fa';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useAuthPaciente } from '../hooks/useAuthPaciente';
import { loginPacienteSchema } from '../schemas/pacienteSchemas';

const LoginPaciente = () => {
  const { loginPaciente, loading } = useAuthPaciente();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginPacienteSchema)
  });

  const onSubmit = async (data) => {
    try {
      await loginPaciente(data);
      navigate('/paciente/dashboard');
    } catch (error) {
      // El error ya se maneja en el hook
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-center mb-2">
            <FaStethoscope className="text-2xl mr-2" />
            <h1 className="text-2xl font-bold">Ingresar como Paciente</h1>
          </div>
          <p className="text-green-100 text-center">
            Accede a tu cuenta para gestionar tus turnos
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            icon={<FaEnvelope className="text-gray-400" />}
            {...register('email')}
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            icon={<FaLock className="text-gray-400" />}
            {...register('password')}
          />

          <Button 
            type="submit" 
            loading={loading}
            className="mt-6"
          >
            Iniciar Sesión
          </Button>

          <div className="text-center space-y-2 mt-4">
            <p className="text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link 
                to="/paciente/register" 
                className="text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                Regístrate aquí
              </Link>
            </p>
            <p className="text-sm text-gray-500">
              * Tu cuenta debe ser aprobada por un administrador
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPaciente;