import { useLocation } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import TurnoForm from "../components/TurnoForm";
import TurnoList from "../components/TurnoList";
import { useEffect, useState } from "react";

export default function DashboardPaciente() {
  const { state } = useLocation();
  const { turnos, cancelarTurno } = useData();

  const [usuario, setUsuario] = useState({ email: "", nombre: "" });

  useEffect(() => {
    if (state?.email) {
      // Si viene desde navigate
      setUsuario({ email: state.email, nombre: state.nombre });
      localStorage.setItem("userData", JSON.stringify(state)); // opcional, para persistir
    } else {
      // Si se recarga la página, buscar en localStorage
      const storedUser = JSON.parse(localStorage.getItem("userData"));
      if (storedUser) setUsuario(storedUser);
    }
  }, [state]);

  const turnosPaciente = turnos.filter((t) => t.paciente === usuario.email);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Bienvenido {usuario.nombre || usuario.email}
      </h1>

      <TurnoForm pacienteEmail={usuario.email} />

      <h2 className="text-xl font-semibold mt-8 mb-2 text-center">Mis Turnos</h2>
      <TurnoList turnos={turnosPaciente} onCancelar={cancelarTurno} />
    </div>
  );
}
