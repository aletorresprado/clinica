import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // 🔹 Inicializa desde localStorage
  const [pacientes, setPacientes] = useState(() => {
    const stored = localStorage.getItem("pacientes");
    return stored ? JSON.parse(stored) : [];
  });

  const [turnos, setTurnos] = useState(() => {
    const stored = localStorage.getItem("turnos");
    return stored ? JSON.parse(stored) : [];
  });

  // 🔹 Guarda automáticamente cada vez que cambian los datos
  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  useEffect(() => {
    localStorage.setItem("turnos", JSON.stringify(turnos));
  }, [turnos]);

  // 👉 Registrar paciente (pendiente hasta aprobación)
  const registrarPaciente = (paciente) => {
    const nuevo = { ...paciente, estado: "pendiente" };
    setPacientes((prev) => [...prev, nuevo]);
  };

  // 👉 Admin aprueba paciente
  const aprobarPaciente = (email) => {
    setPacientes((prev) =>
      prev.map((p) =>
        p.email === email ? { ...p, estado: "activo" } : p
      )
    );
  };

  // 👉 Solicitar turno
  const solicitarTurno = (turno) => {
    const nuevoTurno = {
      id: Date.now(),
      ...turno,
      estado: "pendiente",
    };
    setTurnos((prev) => [...prev, nuevoTurno]);
  };

  // 👉 Admin aprueba turno
  const aprobarTurno = (id) => {
    setTurnos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, estado: "aprobado" } : t))
    );
  };

  // 👉 Cancelar turno (paciente o admin)
  const cancelarTurno = (id) => {
    setTurnos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, estado: "cancelado" } : t))
    );
  };

  // 👉 Eliminar todo (por si querés limpiar el almacenamiento)
  const resetData = () => {
    setPacientes([]);
    setTurnos([]);
    localStorage.removeItem("pacientes");
    localStorage.removeItem("turnos");
  };

  return (
    <DataContext.Provider
      value={{
        pacientes,
        turnos,
        registrarPaciente,
        aprobarPaciente,
        solicitarTurno,
        aprobarTurno,
        cancelarTurno,
        resetData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
