import { useData } from "../../../context/DataContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DashboardAdmin() {
  const {
    pacientes,
    turnos,
    aprobarPaciente,
    aprobarTurno,
    cancelarTurno,
  } = useData();

  const [tab, setTab] = useState("pacientes");

  // 👉 Manejo de aprobación de pacientes
  const handleAprobarPaciente = (email) => {
    aprobarPaciente(email);
    toast.success(`Paciente ${email} aprobado correctamente`);
  };

  // 👉 Manejo de aprobación de turnos
  const handleAprobarTurno = (id) => {
    aprobarTurno(id);
    toast.success(`Turno ${id} aprobado correctamente`);
  };

  // 👉 Manejo de cancelación de turnos
  const handleCancelarTurno = (id) => {
    cancelarTurno(id);
    toast.info(`Turno ${id} cancelado`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Panel de Administración
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setTab("pacientes")}
          className={`px-4 py-2 rounded-lg ${
            tab === "pacientes"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Pacientes
        </button>
        <button
          onClick={() => setTab("turnos")}
          className={`px-4 py-2 rounded-lg ${
            tab === "turnos"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Turnos
        </button>
      </div>

      {/* PACIENTES */}
      {tab === "pacientes" && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Pacientes pendientes</h2>
          {pacientes.filter((p) => p.estado === "pendiente").length === 0 ? (
            <p className="text-gray-600">No hay pacientes pendientes.</p>
          ) : (
            <ul className="space-y-3">
              {pacientes
                .filter((p) => p.estado === "pendiente")
                .map((p) => (
                  <li
                    key={p.email}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{p.nombre}</p>
                      <p className="text-sm text-gray-500">{p.email}</p>
                    </div>
                    <button
                      onClick={() => handleAprobarPaciente(p.email)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      Aprobar
                    </button>
                  </li>
                ))}
            </ul>
          )}

          <h2 className="text-xl font-semibold mt-8 mb-4">Pacientes activos</h2>
          {pacientes.filter((p) => p.estado === "activo").length === 0 ? (
            <p className="text-gray-600">No hay pacientes activos.</p>
          ) : (
            <ul className="space-y-3">
              {pacientes
                .filter((p) => p.estado === "activo")
                .map((p) => (
                  <li
                    key={p.email}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{p.nombre}</p>
                      <p className="text-sm text-gray-500">{p.email}</p>
                    </div>
                    <span className="text-green-600 font-medium">Activo</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}

      {/* TURNOS */}
      {tab === "turnos" && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Turnos pendientes</h2>
          {turnos.filter((t) => t.estado === "pendiente").length === 0 ? (
            <p className="text-gray-600">No hay turnos pendientes.</p>
          ) : (
            <ul className="space-y-3">
              {turnos
                .filter((t) => t.estado === "pendiente")
                .map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{t.paciente}</p>
                      <p className="text-sm text-gray-500">
                        {t.especialidad} - {t.fecha}
                      </p>
                      <p className="text-sm text-gray-400">
                        Motivo: {t.motivo}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAprobarTurno(t.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      Aprobar
                    </button>
                  </li>
                ))}
            </ul>
          )}

          <h2 className="text-xl font-semibold mt-8 mb-4">Turnos activos</h2>
          {turnos.filter((t) => t.estado === "aprobado").length === 0 ? (
            <p className="text-gray-600">No hay turnos aprobados.</p>
          ) : (
            <ul className="space-y-3">
              {turnos
                .filter((t) => t.estado === "aprobado")
                .map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{t.paciente}</p>
                      <p className="text-sm text-gray-500">
                        {t.especialidad} - {t.fecha}
                      </p>
                      <p className="text-sm text-gray-400">
                        Motivo: {t.motivo}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCancelarTurno(t.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Cancelar
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
