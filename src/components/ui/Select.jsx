// src/components/ui/Select.jsx
import React from 'react';

export default function Select({ label, name, value, onChange, options = [] }) {
  return (
    <label className="block mb-2">
      {label && <div className="text-sm font-medium mb-1">{label}</div>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        <option value="">-- seleccionar --</option>
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </label>
  );
}
