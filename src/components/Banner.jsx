import React, { useState, useEffect } from "react";

const imagenes = [
  "/images/img-clinica1.jpg",
  "/images/img-clinica2.webp",
  "/images/img-clinica4.png",
];

const Banner = () => {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="relative h-[500px] overflow-hidden">
      {/* Imagen de fondo con transición */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${imagenes[indice]})`,
        }}
      ></div>

      {/* Capa de color encima para oscurecer */}
      <div className="absolute inset-0 bg-opacity-40"></div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-400  text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Clínica San Miguel - Portal del Paciente
        </h1>
        <p className="text-lg mb-6 text-400 max-w-2xl">
          Accedé a tus estudios y turnos desde cualquier lugar, con total
          seguridad y confianza.
        </p>
        <button className="bg-blue-200 hover:bg-blue-600 px-6 py-2 rounded-lg shadow-md">
          Acceder
        </button>
      </div>

      {/* Indicadores (puntos) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {imagenes.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndice(i)}
            className={`w-3 h-3 rounded-full ${
              i === indice ? "bg-blue-500" : "bg-white/70"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};


export default Banner;
