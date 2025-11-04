import React from "react";

export default function Banner() {
  return (
    <section className="relative w-full h-[450px] md:h-[550px] flex items-center overflow-hidden rounded-b-2xl">
      <img
        src="/banner-clinica.jpg" 
        alt="Clínica San Miguel banner"
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />
      {/* Capa de color translúcido con los colores del footer */}
      <div className="absolute inset-0 bg-emerald-900/50"></div>
      <div className="relative z-10 max-w-4xl px-8 md:px-16 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md">
          Clínica San Miguel - Portal del Paciente
        </h1>
        <p className="text-lg md:text-xl text-gray-100 font-medium mb-8 leading-relaxed max-w-2xl">
          Llevamos la atención médica al siguiente nivel.
          Accedé a tus estudios y turnos desde cualquier lugar, con total seguridad y confianza.
        </p>
        <button className="bg-red-400 hover:bg-red-500 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-300">
          Acceder
        </button>
      </div>
    </section>
    );
}