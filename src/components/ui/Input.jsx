// src/components/ui/Input.jsx
import React from 'react';

export default function Input({ label, type = 'text', value, onChange, name, placeholder }) {
  return (
    <label className="block mb-2">
      {label && <div className="text-sm font-medium mb-1">{label}</div>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
      />
    </label>
  );
}
