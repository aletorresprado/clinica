// src/components/ui/Textarea.jsx
import React from 'react';

export default function Textarea({ label, value, onChange, name, placeholder }) {
  return (
    <label className="block mb-2">
      {label && <div className="text-sm font-medium mb-1">{label}</div>}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
        rows={4}
      />
    </label>
  );
}
