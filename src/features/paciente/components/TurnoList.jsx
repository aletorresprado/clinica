import TurnoCard from "./TurnoCard";

export default function TurnoList({ turnos, onCancelar }) {
  if (turnos.length === 0)
    return <p className="text-center text-gray-600">No hay turnos registrados.</p>;

  return (
    <div className="max-w-md mx-auto">
      {turnos.map((t) => (
        <TurnoCard key={t.id} turno={t} onCancelar={onCancelar} />
      ))}
    </div>
  );
}
