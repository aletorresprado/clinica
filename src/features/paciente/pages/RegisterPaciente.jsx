// src/features/paciente/pages/RegisterPaciente.jsx
import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { addPaciente } from '../../../services/mockService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../common/ToastProvider';

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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Registro Paciente</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} name="nombre" />
        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
        <div className="mt-4">
          <Button type="submit">Registrarme</Button>
        </div>
      </form>
    </div>
  );
}