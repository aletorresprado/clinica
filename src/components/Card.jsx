import { MapPin, Phone, Clock, Star, Calendar, Cross, GraduationCap } from 'lucide-react';

function Card({doctor}) {
  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Header con foto del médico */}
      <div className="bg-green-300 p-6 pb-20">
        <div className="flex justify-between items-start">
          <div className="bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-800">{doctor.rating}</span>
            <span className="text-gray-500 text-sm">({doctor.reviews})</span>
          </div>
          <Cross className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Foto del médico superpuesta */}
      <div className="px-6 -mt-16 mb-4">
        <div className="relative inline-block">
          <img 
            src={doctor.imagen}
            alt={doctor.nombre}
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Información del médico */}
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-bold text-gray-800">{doctor.nombre}</h2>
        <p className="text-green-600 font-semibold text-lg mb-1">{doctor.especialidad}</p>

        {/* Credenciales */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
          <div className="flex items-center gap-2 text-gray-700">
            <Cross className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">{doctor.experiencia}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <GraduationCap className="w-4 h-4 text-green-500" />
            <span className="text-sm">{doctor.educacion}</span>
          </div>
        </div>

        {/* Especialidades */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Especialidades:</h3>
          <div className="flex flex-wrap gap-2">
            {doctor.especializaciones.map((espec, index) => (
              <span 
                key={index}
                className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {espec}
              </span>
            ))}
          </div>
        </div>

        {/* Información de contacto */}
        <div className="space-y-2 mb-5 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-4 h-4 text-green-500" />
            <span className="text-sm">{doctor.telefono}</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <Clock className="w-4 h-4 text-green-500" />
            <span className="text-sm">{doctor.agenda}</span>
          </div>
        </div>

        {/* Agendar cita */}
        <div className="flex gap-3">
          <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            Agendar Cita
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

{/* Uso de las cards en la página

import Card from '../components/Card';

const doctores = [
    {
      nombre: "Dr. Julio González",
      especialidad: "Cardiología",
      imagen: "https://cdn.pixabay.com/photo/2023/12/21/06/23/doctor-8461303_1280.jpg",
      rating: 4.5,
      reviews: 58,
      experiencia: "15 años de experiencia",
      educacion: "Universidad de Buenos Aires",
      telefono: "+54 2966 123-456",
      agenda: "Lun, Mié, Vie: 14:00 - 20:00",
      especializaciones: ["Ecocardiografía"]
    },
    {
      nombre: "Dra. María López",
      especialidad: "Pediatría",
      imagen: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80",
      rating: 4.8,
      reviews: 127,
      experiencia: "12 años de experiencia",
      educacion: "Universidad Nacional de La Plata",
      telefono: "+54 2966 789-012",
      agenda: "Mar, Jue: 09:00 - 17:00",
      especializaciones: ["Nutrición", "Vacunación"]
    },
    {
      nombre: "Dr. Carlos Ruiz",
      especialidad: "Traumatología",
      imagen: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
      rating: 4.7,
      reviews: 94,
      experiencia: "20 años de experiencia",
      educacion: "Universidad de Córdoba",
      telefono: "+54 2966 345-678",
      agenda: "Lun, Mié, Vie: 10:00 - 18:00",
      especializaciones: ["Cirugía Ortopédica"]
    }
  ];
  
  function Doctores() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center mt-5">Nuestros Profesionales</h1>
        <p className="text-gray-600 text-center mb-12">Conoce a nuestro equipo médico especializado</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctores.map((doctor, index) => (
            <Card key={index} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}
*/}