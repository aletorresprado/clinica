import React from 'react'
import { id } from 'zod/locales'

function Input({ label, type = 'text', error, register, name, placeholder }) {
  return (
    <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
      </label>
      <input
        {...register(name)}
          type={type}
          id={name}
          placeholder={placeholder}
          className= "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}   

        </div>
  )
}

export default Input