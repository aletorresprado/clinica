// src/features/paciente/pages/DashboardPaciente.jsx
import React, { useEffect, useState } from 'react';
import useAuthPaciente from '../hooks/useAuthPaciente';
import { getTurnos, addTurno, getPacientes } from '../../../services/mockService';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import Button from '../../../components/ui/Button';
import EstadoBadge from '../../../components/ui/EstadoBadge';
import { useToast } from '../../../common/ToastProvider';
import { useNavigate } from 'react-router-dom';

const MEDICOS_POR_ESPECIALIDAD = {
  'Cardiología': ['Dr. Pérez', 'Dr. Gómez'],
  'Pediatría': ['Dra. López', 'Dra. Díaz'],
  'Traumatología': ['Dr. Ruiz', 'Dr. Fernández'],
  'General': ['Dr. Molina', 'Dra. Torres']
};

export default function DashboardPaciente() {
  const { user, logout } = useAuthPaciente();
  const [turnos, setTurnos] = useState([]);
  const [especialidad, setEspecialidad] = useState('');
  const [medico, setMedico] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const { push } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    cargarTurnos();
  }, []);

  async function cargarTurnos() {
    try {
      const all = await getTurnos();
      const mios = all.filter((t) => t.pacienteId === (user?.id ?? JSON.parse(localStorage.getItem('clinica_session_paciente_v1') || 'null')?.id));
      setTurnos(mios || []); // Asegurar que siempre sea un array
    } catch (error) {
      console.error('Error cargando turnos:', error);
      setTurnos([]); // En caso de error, establecer array vacío
    }
  }

  async function handleSolicitar(e) {
    e.preventDefault();
    if (!especialidad || !medico || !fecha || !hora) {
      push('Complete los campos obligatorios');
      return;
    }
    try {
      await addTurno({
        pacienteId: user?.id ?? JSON.parse(localStorage.getItem('clinica_session_paciente_v1') || 'null')?.id,
        medicoId: medico,
        fecha,
        hora,
        especialidad,
        motivo
      });
      push('Turno solicitado (pendiente)');
      setEspecialidad('');
      setMedico('');
      setFecha('');
      setHora('');
      setMotivo('');
      await cargarTurnos();
    } catch (error) {
      console.error('Error solicitando turno:', error);
      push('Error al solicitar turno');
    }
  }

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Panel Paciente — {user.nombre}</h2>
        <div className="flex gap-2">
          <Button onClick={() => { logout(); push('Sesion cerrada'); navigate('/paciente/login'); }}>Cerrar sesión</Button>
        </div>
      </div>

      <section className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Solicitar turno</h3>
        <form onSubmit={handleSolicitar} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select
            label="Especialidad"
            value={especialidad}
            onChange={(e) => { setEspecialidad(e.target.value); setMedico(''); }}
            options={Object.keys(MEDICOS_POR_ESPECIALIDAD).map((s) => ({ label: s, value: s }))}
          />
          <Select
            label="Médico"
            value={medico}
            onChange={(e) => setMedico(e.target.value)}
            options={especialidad ? MEDICOS_POR_ESPECIALIDAD[especialidad].map((m) => ({ label: m, value: m })) : []}
          />
          <Input label="Fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} name="fecha" />
          <Input label="Hora" type="time" value={hora} onChange={(e) => setHora(e.target.value)} name="hora" />
          <Textarea label="Motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} name="motivo" />
          <div className="md:col-span-2">
            <Button type="submit">Solicitar</Button>
          </div>
        </form>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Mis turnos</h3>
        <div className="grid gap-3">
          {turnos?.length === 0 && <div className="text-sm text-gray-500">No tienes turnos</div>}
          {turnos?.map((t) => ( // ✅ CORRECCIÓN APLICADA AQUÍ
            <div key={t.id} className="flex items-center justify-between border p-2 rounded">
              <div>
                <div className="font-medium">{t.especialidad} — {t.medicoId}</div>
                <div className="text-xs text-gray-600">{t.fecha} {t.hora}</div>
                <div className="text-sm mt-1">{t.motivo}</div>
              </div>
              <EstadoBadge estado={t.estado} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}