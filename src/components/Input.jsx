import React from "react";

const Input = ({ label, type = "text", name, register, error, ...rest }) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        {...register}
        {...rest}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
        ${error ? "border-red-500" : "border-gray-300"} 
        placeholder:text-gray-400`}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;
