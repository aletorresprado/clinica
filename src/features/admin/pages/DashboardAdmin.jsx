// src/features/admin/pages/DashboardAdmin.jsx
import React, { useEffect, useState } from 'react';
import useAuthAdmin from '../hooks/useAuthAdmin';
import { getPacientes, updatePacienteEstado, getTurnos, updateTurnoEstado } from '../../../services/mockService';
import Button from '../../../components/ui/Button';
import EstadoBadge from '../../../components/ui/EstadoBadge';
import { useToast } from '../../../common/ToastProvider';
import { useNavigate } from 'react-router-dom';

export default function DashboardAdmin() {
  const { logout } = useAuthAdmin();
  const [pacientes, setPacientes] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const { push } = useToast();
  const navigate = useNavigate();

  async function loadAll() {
    const ps = await getPacientes();
    const ts = await getTurnos();
    setPacientes(ps);
    setTurnos(ts);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function changePacienteEstado(id, estado) {
    await updatePacienteEstado(id, estado);
    push(`Paciente ${estado}`);
    await loadAll();
  }

  async function changeTurnoEstado(id, estado) {
    await updateTurnoEstado(id, estado);
    push(`Turno ${estado}`);
    await loadAll();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Panel Administrador</h2>
         <Button onClick={() => { logout(); push('Sesion cerrada'); navigate('/admin/login'); }}>Cerrar sesión</Button>
         
      </div>

      <section className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Pacientes</h3>
        <div className="grid gap-3">
          {pacientes.length === 0 && <div className="text-sm text-gray-500">No hay pacientes</div>}
          {pacientes.map((p) => (
            <div key={p.id} className="flex items-center justify-between border p-2 rounded">
              <div>
                <div className="font-medium">{p.nombre}</div>
                <div className="text-xs text-gray-600">{p.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <EstadoBadge estado={p.estado} />
                <div className="flex gap-1">
                  <Button onClick={() => changePacienteEstado(p.id, 'aprobado')} className="bg-green-500">Aprobar</Button>
                  <Button onClick={() => changePacienteEstado(p.id, 'rechazado')} className="bg-red-500">Rechazar</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Turnos</h3>
        <div className="grid gap-3">
          {turnos.length === 0 && <div className="text-sm text-gray-500">No hay turnos</div>}
          {turnos.map((t) => (
            <div key={t.id} className="flex items-center justify-between border p-2 rounded">
              <div>
                <div className="font-medium">{t.especialidad} - {t.medicoId}</div>
                <div className="text-xs text-gray-600">{t.fecha} {t.hora} — Paciente: {t.pacienteId}</div>
                <div className="text-sm mt-1">{t.motivo}</div>
              </div>
              <div className="flex items-center gap-2">
                <EstadoBadge estado={t.estado} />
                <div className="flex gap-1">
                  <Button onClick={() => changeTurnoEstado(t.id, 'aprobado')} className="bg-green-500">Aprobar</Button>
                  <Button onClick={() => changeTurnoEstado(t.id, 'rechazado')} className="bg-red-500">Rechazar</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
