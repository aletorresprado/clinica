// src/features/admin/pages/LoginAdmin.jsx
import React, { useState } from 'react';
import useAuthAdmin from '../hooks/useAuthAdmin';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../common/ToastProvider';

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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Ingreso Administrador</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
        <div className="mt-4">
          <Button type="submit">Ingresar</Button>
        </div>
      </form>
      <p className="text-xs text-gray-500 mt-3">Credenciales fijas: admin@clinica.com / admin123</p>
    </div>
  );
}
