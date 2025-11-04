import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import useAuthPaciente from '../hooks/useAuthPaciente';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../../../common/ToastProvider';
import { HeartPulse } from 'lucide-react'; // 💡 Ícono elegante para apps médicas

export default function LoginPaciente() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthPaciente();
  const navigate = useNavigate();
  const { push } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      push('Bienvenido/a');
      navigate('/paciente/dashboard');
    } catch (err) {
      push(err.message);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-300 via-rose-100 to-red-200 overflow-hidden">
      {/* Luces suaves */}
      <div className="absolute w-80 h-80 bg-red-200/40 rounded-full blur-3xl top-16 left-16 animate-float-slow -z-10"></div>
      <div className="absolute w-96 h-96 bg-red-800/30 rounded-full blur-3xl bottom-10 right-10 animate-float -z-10"></div>

      {/* Contenedor */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-red-600 shadow-2xl rounded-3xl p-10 w-full max-w-md z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <HeartPulse className="text-red-600 w-8 h-8 animate-pulse" />
          <h1 className="text-3xl font-bold text-red-600 tracking-wide">
            Clínica San Miguel
          </h1>
        </div>
        <p className="text-center text-red-600 mb-6 tracking-wide">
          Bienvenido al portal de pacientes
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
          >
            Ingresar
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link
            to="/paciente/register"
            className="text-red-600 font-semibold hover:text-red-700 underline transition-colors"
          >
            Registrate
          </Link>
        </div>
      </div>
    </div>
  );
}