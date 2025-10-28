import { useState } from "react";
import { useData } from "../../../context/DataContext";

export default function TurnoForm({ pacienteEmail }) {
  const { solicitarTurno } = useData();

  const [disciplina, setDisciplina] = useState("");
  const [profesional, setProfesional] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");

  const disciplinas = {
    Psicología: ["Lic. Ana López", "Lic. Carlos Díaz"],
    Nutrición: ["Lic. Mariana Gómez", "Lic. Tomás Ruiz"],
    Fisioterapia: ["Lic. Laura Méndez", "Lic. Martín Torres"],
    Pediatría: ["Dra. Paula Herrera", "Dr. Luis Cabrera"],
  };

  // Horarios disponibles (simplificado)
  const horarios = [
    "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "14:00",
    "14:30", "15:00", "15:30", "16:00",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!disciplina || !profesional || !fecha || !hora)
      return alert("Por favor complete todos los campos.");

    solicitarTurno({
      id: Date.now(),
      paciente: pacienteEmail,
      disciplina,
      profesional,
      fecha,
      hora,
      motivo,
      estado: "pendiente",
    });

    alert("Turno solicitado con éxito. Esperando aprobación.");
    setDisciplina("");
    setProfesional("");
    setFecha("");
    setHora("");
    setMotivo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-xl p-5 space-y-3"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Solicitar Turno</h2>

      {/* Disciplina */}
      <div>
        <label className="block text-sm font-medium mb-1">Disciplina</label>
        <select
          value={disciplina}
          onChange={(e) => {
            setDisciplina(e.target.value);
            setProfesional(""); // reset profesional
          }}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Seleccione una disciplina</option>
          {Object.keys(disciplinas).map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Profesional */}
      {disciplina && (
        <div>
          <label className="block text-sm font-medium mb-1">Profesional</label>
          <select
            value={profesional}
            onChange={(e) => setProfesional(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Seleccione un profesional</option>
            {disciplinas[disciplina].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      )}

      {/* Fecha */}
      <div>
        <label className="block text-sm font-medium mb-1">Fecha</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full border rounded-lg p-2"
          min={new Date().toISOString().split("T")[0]} // no permitir fechas pasadas
        />
      </div>

      {/* Hora */}
      <div>
        <label className="block text-sm font-medium mb-1">Horario</label>
        <select
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Seleccione un horario</option>
          {horarios.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>

      {/* Motivo */}
      <div>
        <label className="block text-sm font-medium mb-1">Motivo (opcional)</label>
        <textarea
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Motivo de la consulta..."
          className="w-full border rounded-lg p-2"
        />
      </div>

      <button className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition">
        Enviar solicitud
      </button>
    </form>
  );
}
