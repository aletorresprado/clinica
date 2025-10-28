import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../context/DataContext";

export default function LoginPaciente() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { pacientes } = useData();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = pacientes.find((p) => p.email === email && p.password === password);
    if (!user) return alert("Credenciales inválidas.");
    if (user.estado === "pendiente") return alert("Tu cuenta aún no fue aprobada.");
    navigate("/paciente/dashboard", { state: { email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="max-w-sm bg-white shadow p-6 rounded">
        <h2 className="text-xl font-semibold mb-4 text-center">Login Paciente</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-2"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2 mb-3"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Ingresar
        </button>
      </form>
    </div>
  );
}
