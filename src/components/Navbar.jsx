import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white flex justify-between p-4">
      <h1 className="font-bold text-lg">Clínica Salud+</h1>
      <div className="flex gap-4">
        <Link to="/paciente/login" className="hover:underline">Paciente</Link>
        <Link to="/admin/dashboard" className="hover:underline">Admin</Link>
      </div>
    </nav>
  );
}
