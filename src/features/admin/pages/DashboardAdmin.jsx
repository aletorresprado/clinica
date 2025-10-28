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

  // 👉 Aprobación de pacientes
  const handleAprobarPaciente = (email) => {
    aprobarPaciente(email);
    toast.success(`Paciente ${email} aprobado correctamente`);
  };

  // 👉 Aprobación de turnos
  const handleAprobarTurno = (id) => {
    aprobarTurno(id);
    toast.success(`Turno ${id} aprobado correctamente`);
  };

  // 👉 Cancelación de turnos
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
          className={`px-4 py-2 rounded-lg transition ${
            tab === "pacientes"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Pacientes
        </button>
        <button
          onClick={() => setTab("turnos")}
          className={`px-4 py-2 rounded-lg transition ${
            tab === "turnos"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Turnos
        </button>
      </div>

      {/* --- PACIENTES --- */}
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

      {/* --- TURNOS --- */}
      {tab === "turnos" && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          {/* Turnos pendientes */}
          <h2 className="text-xl font-semibold mb-4">Turnos pendientes</h2>
          {turnos.filter((t) => t.estado === "pendiente").length === 0 ? (
            <p className="text-gray-600">No hay turnos pendientes.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {turnos
                .filter((t) => t.estado === "pendiente")
                .map((t) => (
                  <div
                    key={t.id}
                    className="border rounded-xl p-4 shadow-sm bg-gray-50 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-800">{t.paciente}</p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Disciplina:</span> {t.disciplina}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Profesional:</span> {t.profesional}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Fecha:</span> {t.fecha} - {t.hora}
                      </p>
                      {t.motivo && (
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Motivo:</span> {t.motivo}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleAprobarTurno(t.id)}
                      className="mt-3 bg-green-600 text-white rounded-lg px-3 py-1 hover:bg-green-700"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleCancelarTurno(t.id)}
                      className="mt-3 bg-red-500 text-white rounded-lg px-3 py-1 hover:bg-red-600"
                    >
                      Cancelar
                    </button>
                  </div>
                ))}
            </div>
          )}

          {/* Turnos aprobados */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Turnos aprobados</h2>
          {turnos.filter((t) => t.estado === "aprobado").length === 0 ? (
            <p className="text-gray-600">No hay turnos aprobados.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {turnos
                .filter((t) => t.estado === "aprobado")
                .map((t) => (
                  <div
                    key={t.id}
                    className="border rounded-xl p-4 shadow-sm bg-green-50 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-800">{t.paciente}</p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Disciplina:</span> {t.disciplina}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Profesional:</span> {t.profesional}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Fecha:</span> {t.fecha} - {t.hora}
                      </p>
                      {t.motivo && (
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Motivo:</span> {t.motivo}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleCancelarTurno(t.id)}
                      className="mt-3 bg-red-500 text-white rounded-lg px-3 py-1 hover:bg-red-600"
                    >
                      Cancelar
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
