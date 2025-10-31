// src/features/paciente/pages/LoginPaciente.jsx
import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import useAuthPaciente from '../hooks/useAuthPaciente';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../../../common/ToastProvider';

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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Ingreso Paciente</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
        <div className="mt-4 flex gap-2">
          <Button type="submit">Ingresar</Button>
          <Link to="/paciente/register" className="ml-auto text-sm text-sky-600 self-center">Registrarme</Link>
        </div>
      </form>
    </div>
  );
}