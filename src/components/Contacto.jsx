import React from 'react';

// Datos de contacto
const infoContacto = [
  { 
    id: 1, 
    titulo: 'Ubicación Principal', 
    contenido: 'Av. Siempre Viva 742, Springfield. (Lun - Sab: 8 a 20 hs)',
    icono: '📍' 
  },
  { 
    id: 2, 
    titulo: 'Teléfono de Contacto', 
    contenido: '+54 9 11 5555-5555',
    icono: '📞'
  },
  { 
    id: 3, 
    titulo: 'Correo Electrónico', 
    contenido: 'contacto@clinicasm.com',
    icono: '📧'
  },
];

const Contacto = () => {
  return (
    <section className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-blue-400 mb-10 text-center">
        Contacto y Ubicación
      </h1>

      {/* Sección principal: mapa + info al costado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-center">
        {/* Mapa */}
        <div className="shadow-xl rounded-lg overflow-hidden h-[400px]">
          <iframe
            title="Mapa de la Clínica San Miguel"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10241.68096164375!2d-65.20086205020407!3d-26.824418420052844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c2ee592a3c7%3A0x808e493da9089a4f!2sSanatorio%209%20de%20Julio%20S.A.!5e0!3m2!1ses-419!2sar!4v1762111916565!5m2!1ses-419!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Datos de contacto */}
        <div className="bg-red-50 rounded-xl shadow-lg p-8 border-l-4 border--blue">
          <h2 className="text-3xl font-semibold text-blue-500 mb-6 border-b pb-2">
            Datos de Contacto
          </h2>
          <div className="space-y-6">
            {infoContacto.map((item) => (
              <div key={item.id} className="flex items-start space-x-4">
                <div className="text-3xl">{item.icono}</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-500">{item.titulo}</h3>
                  <p className="text-gray-700">{item.contenido}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Especialidades */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-500 mb-4 border-b pb-2">
          Nuestras Especialidades
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Clínica S.M. ofrece una cobertura integral de salud con profesionales altamente calificados
          en diversas áreas. Contamos con tecnología de vanguardia para garantizar el mejor diagnóstico y tratamiento.
        </p>
        <ul className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-lg text-gray-800">
          <li><span className="text-red-500 font-bold">🩺</span> Medicina General</li>
          <li><span className="text-red-500 font-bold">👶</span> Pediatría</li>
          <li><span className="text-red-500 font-bold">❤️</span> Cardiología</li>
          <li><span className="text-red-500 font-bold">🧠</span> Neurología</li>
          <li><span className="text-red-500 font-bold">🦴</span> Traumatología</li>
          <li><span className="text-red-500 font-bold">🔬</span> Laboratorio Clínico</li>
        </ul>
      </div>
    </section>
  );
};

export default Contacto;
