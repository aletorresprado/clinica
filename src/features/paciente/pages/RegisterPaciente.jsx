import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { addPaciente } from '../../../services/mockService';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../../../common/ToastProvider';
import { UserPlus } from 'lucide-react';

export default function RegisterPaciente() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { push } = useToast();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addPaciente({ nombre, email, password });
      push('Registro exitoso. Queda en estado pendiente de aprobación.');
      navigate('/paciente/login');
    } catch (err) {
      push(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-300 to-red-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-red-600">
        <div className="flex items-center justify-center gap-2 mb-6">
          <UserPlus className="w-6 h-6 text-red-600" />
           <h1 className="text-3xl font-bold text-black-600 tracking-wide">
            Clínica San Miguel
          </h1>
        </div>
        <h3 className="text-lg font-medium text-gray-700 text-center mb-4">
          Registro de Paciente
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            name="nombre"
          />
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />

          <div className="mt-6 flex flex-col gap-3">
            <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                      >
                       Registrarme
                      </Button>

            <p className="text-sm text-gray-600 text-center">
              ¿Ya tienes una cuenta?{' '}
              <Link
                to="/paciente/login"
                className="text-red-600 hover:underline font-medium"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}