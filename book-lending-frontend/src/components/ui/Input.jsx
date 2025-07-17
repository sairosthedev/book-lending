import React from 'react';

export default function Input({ label, type = 'text', className = '', ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 mb-1 font-medium">{label}</label>}
      <input
        type={type}
        className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`}
        {...props}
      />
    </div>
  );
} 