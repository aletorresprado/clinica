import { Facebook, Instagram, Mail, Phone, } from "lucide-react";

export default function Footer() {
return (
    <footer className=" text-ski-100  py-10 mt-10">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
        {/* Logo de la clínica */}
        <img
            src="/logo-clinica.png"
            alt="Logo Clínica San Miguel"
            className="w-32 mx-auto mb-4"
        />

        </div>
        {/* Info de la clínica */}
        <div>
        <h2 className="text-2xl font-bold mb-3 text-blue-400 text-600 footer-title">Clínica San Miguel</h2>
        <p className="text-sm   font-bold mb-4">
            Cuidamos tu bienestar con atención profesional y personalizada.
        </p>
        </div>

        {/*  Contacto */}
            <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400 text-600 ">Contacto</h3>
            <ul className="space-y-2 text-sm text-800">
                <li className="flex items-center gap-2  font-bold">
                <Phone size={16} /> +54 9 299 123 4567
                </li>
                <li className="flex items-center gap-2  font-bold">
                <Mail size={16} /> contacto@clinicasanmiguel.com
                </li>
                {(() => {
                const address = "Av. 25 de Mayo 123, San Miguel, Provincia";
                return (
                <li className="flex items-center gap-2  font-bold">
                <span role="img" aria-label="ubicación">📍</span>
                <span className="ml-1">{address}</span>
                </li>
                );
                })()}
            </ul>
            </div>

            {/*  Redes sociales */}
        <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-3 text-center text-600">Seguinos</h3>
        <div className="flex gap-4">
            <a
            href="#"
            className="hover:text-blue-400 transition-colors duration-300"
            >
            <Facebook size={24} />
            </a>
            <a
            href="#"
            className="hover:text-pink-400 transition-colors duration-300"
            >
            <Instagram size={24} />
            </a>
        </div>
        </div>
    </div>

    <div className="text-center text-gray-800 text-sm  font-bold mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Clínica San Miguel, Todos los derechos
        reservados.
    </div>
    </footer>
);
}

