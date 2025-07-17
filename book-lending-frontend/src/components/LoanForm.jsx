import React, { useState, useEffect } from 'react';

const LoanForm = ({ onSubmit, initialData, books, members, onCancel }) => {
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setBookId(initialData.bookId || initialData.Book?.id || initialData.book?.id || '');
      setMemberId(initialData.memberId || initialData.Member?.id || initialData.member?.id || '');
      setLoanDate(initialData.loanDate || initialData.lendDate || '');
      setReturnDate(initialData.returnDate || '');
    }
  }, [initialData]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      bookId: Number(bookId),
      memberId: Number(memberId),
      loanDate,
      returnDate
    });
    setBookId('');
    setMemberId('');
    setLoanDate('');
    setReturnDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <h3 className="text-lg font-semibold text-blue-700 mb-2">{initialData ? 'Edit Loan' : 'Add Loan'}</h3>
      <div>
        <label className="block text-gray-700 mb-1">Book</label>
        <select
          value={bookId}
          onChange={e => setBookId(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
        >
          <option value="">Select Book</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>{book.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Member</label>
        <select
          value={memberId}
          onChange={e => setMemberId(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
        >
          <option value="">Select Member</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>{member.fullName || member.FullName}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Loan Date</label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={loanDate}
          onChange={e => setLoanDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Return Date</label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={returnDate}
          onChange={e => setReturnDate(e.target.value)}
          placeholder="Return Date"
        />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">{initialData ? 'Update' : 'Add'}</button>
        {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">Cancel</button>}
      </div>
    </form>
  );
};

export default LoanForm; 