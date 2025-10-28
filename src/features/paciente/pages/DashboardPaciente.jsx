import { useLocation } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import TurnoForm from "../components/TurnoForm";
import TurnoList from "../components/TurnoList";

export default function DashboardPaciente() {
  const { state } = useLocation();
  const { turnos, cancelarTurno } = useData();
  const email = state?.email;

  const turnosPaciente = turnos.filter((t) => t.paciente === email);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Bienvenido {email}</h1>

      <TurnoForm pacienteEmail={email} />

      <h2 className="text-xl font-semibold mt-8 mb-2 text-center">Mis Turnos</h2>
      <TurnoList turnos={turnosPaciente} onCancelar={cancelarTurno} />
    </div>
  );
}
