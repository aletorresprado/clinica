import React, { useState } from 'react'

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Botón de Hamburguesa */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed top-4 right-4 z-50 p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md lg:hidden" // Ocultar en pantallas grandes
      >
        <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
      </button>

      {/* Función Condicional del Botón*/}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-green-300 bg-opacity-25 z-40 lg:hidden" // Ocultar en pantallas grandes
        ></div>
      )}

      {/* Panel Lateral del Menú */}
      <div 
        className={`fixed top-0 right-0 w-64 h-full bg-green-200 shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} // Si está abierto, no se mueve; si está cerrado, se mueve fuera de pantalla
      >
        <div className="p-4 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Menú</h2>
          <ul className='flex flex-col items-center'>
            {/* Charlar para cambar las "a" por Link */}
            <li className="mb-2"><a href="#" className="mx-3 font-bold text-green-600 hover:text-sky-600">Iniciar Sesión</a></li> 
            <li className="mb-2"><a href="#" className="mx-3 font-bold text-green-600 hover:text-sky-600">Registro</a></li>
            <li className="mb-2"><a href="#" className="mx-3 font-bold text-green-600 hover:text-sky-600">Profecionales</a></li>
            <li className="mb-2"><a href="#" className="mx-3 font-bold text-green-600 hover:text-sky-600">Acerca de</a></li>
            <li className="mb-2"><a href="#" className="mx-3 font-bold text-green-600 hover:text-sky-600">Contacto</a></li>
          </ul>
        </div>
      </div>

      {/* Contenido que siempre es visible en pantallas grandes */}
      <nav className="hidden bg-green-200 lg:flex justify-center p-4">
        {/* Cambiar los "a" por link */}
        <a href="#" className="mx-3 font-bold text-green-600 hover:text-sky-600">Iniciar Sesión</a>
        <a href="#" className="mx-3 font-bold text-green-600 hover:text-sky-600">Registro</a>
        <a href="#" className="mx-3 font-bold text-green-600 hover:text-sky-600">Profecionales</a>
        <a href="#" className="mx-3 font-bold text-green-600 hover:text-sky-600">Acerca de</a>
        <a href="#" className="mx-3 font-bold text-green-600 hover:text-sky-600">Contacto</a>
      </nav>
    </div>
  );
}

export default HamburgerMenu;