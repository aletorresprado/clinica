// components/ui/Input.jsx (actualizado)
import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  error, 
  icon,
  className = '', 
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`
            w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200 bg-white text-gray-900 placeholder-gray-500
            ${error ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'}
            ${icon ? 'pl-10' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;