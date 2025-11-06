import Card from '../components/Card';
import { DOCTORES_DATA as InfoDoc } from '../utils/infoDocs';

function Profesionales() {
    return (
    <div className="min-h-screen">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center mt-5">Nuestros Profesionales</h1>
            <p className="text-gray-600 text-center mb-12">Conoce a nuestro equipo médico especializado</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {InfoDoc.map((doctor, id) => (
                    <Card key={id} doctor={doctor} />
            ))}
            </div>
        </div>
    </div>
    )
}

export default Profesionales