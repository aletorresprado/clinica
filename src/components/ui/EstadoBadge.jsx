// src/components/ui/EstadoBadge.jsx
import React from 'react';

export default function EstadoBadge({ estado }) {
  const map = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    aprobado: 'bg-green-100 text-green-800',
    rechazado: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${map[estado] ?? 'bg-gray-100 text-gray-800'}`}>
      {estado}
    </span>
  );
}
