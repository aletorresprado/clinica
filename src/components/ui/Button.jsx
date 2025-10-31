// src/components/ui/Button.jsx
import React from 'react';

export default function Button({ children, onClick, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}
