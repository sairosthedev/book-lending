import React from 'react';

const variants = {
  error: 'bg-red-100 text-red-700 border border-red-300',
  success: 'bg-green-100 text-green-700 border border-green-300',
  info: 'bg-blue-100 text-blue-700 border border-blue-300',
};

export default function Alert({ children, variant = 'info', className = '' }) {
  return (
    <div className={`rounded px-4 py-3 mb-4 ${variants[variant]} ${className}`}>{children}</div>
  );
} 