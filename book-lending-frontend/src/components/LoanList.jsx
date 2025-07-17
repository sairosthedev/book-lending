import React from 'react';

const LoanList = ({ loans, onEdit, onDelete }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-blue-700">Loans</h2>
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Book</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Member</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Loan Date</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Return Date</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, idx) => (
            <tr key={loan.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-2">{loan.Book?.title || loan.Book?.Title || loan.book?.title || loan.book?.Title || ''}</td>
              <td className="px-4 py-2">{loan.Member?.fullName || loan.Member?.FullName || loan.member?.fullName || loan.member?.FullName || ''}</td>
              <td className="px-4 py-2">{loan.lendDate || loan.loanDate || ''}</td>
              <td className="px-4 py-2">{loan.returnDate || ''}</td>
              <td className="px-4 py-2 space-x-2">
                <button onClick={() => onEdit(loan)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Edit</button>
                <button onClick={() => onDelete(loan.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default LoanList; 