import { useState } from "react";
import { useData } from "../../../context/DataContext";

export default function TurnoForm({ pacienteEmail }) {
  const { solicitarTurno } = useData();
  const [motivo, setMotivo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!motivo.trim()) return alert("Debe ingresar un motivo.");
    solicitarTurno({
      id: Date.now(),
      paciente: pacienteEmail,
      motivo,
      estado: "pendiente",
    });
    alert("Turno solicitado. Esperando aprobación del administrador.");
    setMotivo("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-3">Solicitar Turno</h2>
      <textarea
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        placeholder="Motivo de la consulta..."
        className="w-full border rounded p-2 mb-2"
      />
      <button className="w-full bg-green-600 text-white rounded py-2 hover:bg-green-700">
        Enviar solicitud
      </button>
    </form>
  );
}
