export default function TurnoCard({ turno, onCancelar }) {
  return (
    <div className="border rounded p-3 bg-gray-50 mb-2 shadow-sm">
      <p><span className="font-semibold">Disciplina:</span> {turno.disciplina}</p>
      <p><span className="font-semibold">Profesional:</span> {turno.profesional}</p>
      <p><span className="font-semibold">Fecha:</span> {turno.fecha}</p>
      <p><span className="font-semibold">Hora:</span> {turno.hora}</p>
      {turno.motivo && <p><span className="font-semibold">Motivo:</span> {turno.motivo}</p>}
      <p className="text-sm text-gray-600 mt-1">Estado: {turno.estado}</p>

      {turno.estado === "aprobado" && (
        <button
          onClick={() => onCancelar(turno.id)}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Cancelar
        </button>
      )}
    </div>
  );
}
