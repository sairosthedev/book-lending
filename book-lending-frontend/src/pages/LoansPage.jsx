import React, { useEffect, useState } from 'react';
import LoanList from '../components/LoanList';
import LoanForm from '../components/LoanForm';
import { getLoans, createLoan, updateLoan, deleteLoan } from '../api/loans';
import { getBooks } from '../api/books';
import { getMembers } from '../api/members';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const LoansPage = () => {
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    setLoans(await getLoans());
    setBooks(await getBooks());
    setMembers(await getMembers());
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
    setError('');
  };

  const handleEdit = (loan) => {
    setEditing(loan);
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id) => {
    await deleteLoan(id);
    fetchAll();
  };

  const handleSubmit = async (data) => {
    // Find the full Book and Member objects using numeric IDs
    try {
      const payload = {
        bookId: Number(data.bookId),
        memberId: Number(data.memberId),
        lendDate: data.loanDate,
        returnDate: data.returnDate
      };
      if (editing) {
        await updateLoan(editing.id, payload);
      } else {
        await createLoan(payload);
      }
      setShowForm(false);
      setEditing(null);
      setError('');
      fetchAll();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (err && err.title) {
        setError(err.title + (err.errors ? ': ' + JSON.stringify(err.errors) : ''));
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <Card>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-2xl font-bold text-blue-700">Loans</h2>
        <Button onClick={handleAdd} className="w-full sm:w-auto">Add Loan</Button>
      </div>
      {showForm && (
        <div>
          {error && <Alert variant="error">{error}</Alert>}
          <LoanForm
            onSubmit={handleSubmit}
            initialData={editing}
            books={books}
            members={members}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
      <LoanList loans={loans} onEdit={handleEdit} onDelete={handleDelete} />
    </Card>
  );
};

export default LoansPage; 