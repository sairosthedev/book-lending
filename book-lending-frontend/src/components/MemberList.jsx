import React from 'react';

const MemberList = ({ members, onEdit, onDelete }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-blue-700">Members</h2>
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Full Name</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Email</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, idx) => (
            <tr key={member.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-2">{member.fullName || member.FullName}</td>
              <td className="px-4 py-2">{member.email}</td>
              <td className="px-4 py-2 space-x-2">
                <button onClick={() => onEdit(member)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Edit</button>
                <button onClick={() => onDelete(member.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default MemberList; 