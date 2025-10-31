// src/components/ui/Modal.jsx
import React from 'react';

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-4 w-full max-w-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-600">Cerrar</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
