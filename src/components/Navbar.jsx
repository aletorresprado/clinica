import React, { useState } from 'react';

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

      
    </div>
  );
}

export default HamburgerMenu;