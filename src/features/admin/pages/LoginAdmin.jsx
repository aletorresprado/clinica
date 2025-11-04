import React, { useState } from 'react';
import useAuthAdmin from '../hooks/useAuthAdmin';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../common/ToastProvider';
import { ShieldCheck } from 'lucide-react';

export default function LoginAdmin() {
  const { login } = useAuthAdmin();
  const [email, setEmail] = useState('admin@clinica.com');
  const [password, setPassword] = useState('admin123');
  const navigate = useNavigate();
  const { push } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      push('Login admin exitoso');
      navigate('/admin/dashboard');
    } catch (err) {
      push(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-300 to-red-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-red-600">
        <div className="flex items-center justify-center gap-2 mb-6">
          <ShieldCheck className="w-6 h-6 text-red-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Clínica San Miguel</h2>
        </div>

        <h3 className="text-lg font-medium text-gray-700 text-center mb-4">
          Ingreso Administrador
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                      Ingresar
                    </Button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Credenciales fijas: <br />
          <span className="font-medium">admin@clinica.com / admin123</span>
        </p>
      </div>
    </div>
  );
}