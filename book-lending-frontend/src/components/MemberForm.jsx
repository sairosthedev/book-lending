import React, { useState, useEffect } from 'react';

const MemberForm = ({ onSubmit, initialData, onCancel }) => {
  const [FullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName || initialData.FullName || '');
      setEmail(initialData.email || '');
    }
  }, [initialData]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ FullName, email });
    setFullName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <h3 className="text-lg font-semibold text-blue-700 mb-2">{initialData ? 'Edit Member' : 'Add Member'}</h3>
      <div>
        <label className="block text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Full Name"
          value={FullName}
          onChange={e => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">{initialData ? 'Update' : 'Add'}</button>
        {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">Cancel</button>}
      </div>
    </form>
  );
};

export default MemberForm; 