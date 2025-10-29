// components/ui/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  loading = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500'
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
        ${loading ? 'opacity-50 cursor-wait' : ''}
      `}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
          Cargando...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;