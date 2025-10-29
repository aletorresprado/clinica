import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [pacientes, setPacientes] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [userLogged, setUserLogged] = useState(
    JSON.parse(localStorage.getItem("userLogged")) || null
  );

  // Persistir usuario logueado
  useEffect(() => {
    localStorage.setItem("userLogged", JSON.stringify(userLogged));
  }, [userLogged]);

  // ✅ AGREGAR ESTA FUNCIÓN - Función para registrar paciente
  const registrarPaciente = async (pacienteData) => {
    try {
      console.log('Registrando paciente:', pacienteData);
      
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nuevoPaciente = {
        id: Date.now(),
        ...pacienteData,
        estado: 'pendiente', // Estado inicial para aprobación del admin
        fechaRegistro: new Date().toISOString()
      };

      // Agregar a la lista de pacientes
      setPacientes(prev => [...prev, nuevoPaciente]);
      
      return { success: true, paciente: nuevoPaciente };
    } catch (error) {
      console.error('Error al registrar paciente:', error);
      throw new Error('Error en el registro del paciente');
    }
  };

  // ✅ Función para login (si la necesitas)
  const loginPaciente = async (credentials) => {
    try {
      // Simulación de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Buscar paciente por email
      const paciente = pacientes.find(p => p.email === credentials.email);
      
      if (!paciente) {
        throw new Error('Usuario no encontrado');
      }
      
      if (paciente.password !== credentials.password) {
        throw new Error('Contraseña incorrecta');
      }

      setUserLogged(paciente);
      return { success: true, user: paciente };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // ✅ Función para logout
  const logoutPaciente = () => {
    setUserLogged(null);
  };

  return (
    <DataContext.Provider
      value={{
        pacientes,
        setPacientes,
        turnos,
        setTurnos,
        userLogged,
        setUserLogged,
        registrarPaciente, // ✅ AGREGAR AL VALUE
        loginPaciente,     // ✅ Opcional: para login
        logoutPaciente,    // ✅ Opcional: para logout
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}