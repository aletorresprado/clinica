export default function TurnoCard({ turno, onCancelar }) {
  return (
    <div className="border rounded p-3 bg-gray-50 flex justify-between items-center mb-2">
      <div>
        <p className="font-medium">Motivo: {turno.motivo}</p>
        <p className="text-sm text-gray-600">Estado: {turno.estado}</p>
      </div>
      {turno.estado === "aprobado" && (
        <button
          onClick={() => onCancelar(turno.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Cancelar
        </button>
      )}
    </div>
  );
}
