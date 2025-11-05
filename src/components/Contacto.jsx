import React from 'react';

// Array de datos para las tarjetas de información de contacto
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
            <h1 className="text-4xl font-extrabold text-red-700 mb-8 text-center">
                Contacto y Ubicación
            </h1>
            <div className="mb-12 shadow-xl rounded-lg overflow-hidden">
                <h2 className="text-3xl font-semibold text-red-600 mb-4 border-b pb-2">Encuéntranos</h2>
                <div className="aspect-w-16 aspect-h-9" style={{ height: '400px' }}>
                    <iframe 
                    title="Mapa de la Clínica San Miguel"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10241.68096164375!2d-65.20086205020407!3d-26.824418420052844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c2ee592a3c7%3A0x808e493da9089a4f!2sSanatorio%209%20de%20Julio%20S.A.!5e0!3m2!1ses-419!2sar!4v1762111916565!5m2!1ses-419!2sar"
                    width="100%"
                    height="100%"
                    style={{border:0}}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div className="mb-12 p-6 bg-red-50 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-red-600 mb-4 border-b pb-2">
                    Nuestras Especialidades
                </h2>
                <p className="text-gray-700 leading-relaxed">Clínica S.M. ofrece una cobertura integral de salud con profesionales altamente calificados en diversas áreas. Contamos con tecnología de vanguardia para garantizar el mejor diagnóstico y tratamiento.</p>
                <ul className="mt-4 columns-2 md:columns-3 text-lg text-gray-800 space-y-2">
                    <li><span className="text-red-500 font-bold">🩺</span> Medicina General</li>
                    <li><span className="text-red-500 font-bold">👶</span> Pediatría</li>
                    <li><span className="text-red-500 font-bold">❤️</span> Cardiología</li>
                    <li><span className="text-red-500 font-bold">🧠</span> Neurología</li>
                    <li><span className="text-red-500 font-bold">🦴</span> Traumatología</li>
                    <li><span className="text-red-500 font-bold">🔬</span> Laboratorio Clínico</li>
                </ul>
            </div>
            <div className="mb-12">
                <h2 className="text-3xl font-semibold text-red-600 mb-6 border-b pb-2 text-center">
                    Datos de Contacto
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {infoContacto.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-red-500"
                        >
                            <div className="text-4xl mb-3"></div>
                            <h3 className="text-xl font-bold text-red-600 mb-2">{item.icono}{item.titulo}</h3>
                            <p className="text-gray-600">{item.contenido}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contacto;