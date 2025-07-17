import React from 'react';

const base = 'inline-flex items-center px-4 py-2 rounded font-medium focus:outline-none transition';
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
} 