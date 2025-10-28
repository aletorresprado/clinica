import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pacienteSchema } from "../validation/pacienteSchema";
import { useData } from "../../../context/DataContext";

export default function PacienteForm() {
  const { registrarPaciente } = useData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(pacienteSchema),
  });

  const onSubmit = (data) => {
    registrarPaciente(data);
    alert("Registro enviado. Esperando aprobación del administrador.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4 text-center">Registro de Paciente</h2>

      <label className="block mb-2">
        Nombre completo
        <input {...register("nombre")} className="w-full border rounded p-2 mt-1" />
        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
      </label>

      <label className="block mb-2">
        Email
        <input {...register("email")} className="w-full border rounded p-2 mt-1" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </label>

      <label className="block mb-2">
        Contraseña
        <input type="password" {...register("password")} className="w-full border rounded p-2 mt-1" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </label>

      <button type="submit" className="w-full bg-blue-600 text-white rounded py-2 mt-3 hover:bg-blue-700">
        Registrarme
      </button>
    </form>
  );
}
