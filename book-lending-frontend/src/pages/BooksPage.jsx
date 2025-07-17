import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import { getBooks, createBook, updateBook, deleteBook } from '../api/books';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const BooksPage = () => {
  // State management
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError('');
      const booksData = await getBooks();
      setBooks(booksData);
    } catch {
      setError('Failed to fetch books.');
    } finally {
      setLoading(false);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Form handlers
  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
    setError('');
  };

  const handleEdit = (book) => {
    setEditing(book);
    setShowForm(true);
    setError('');
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setError('');
  };

  // CRUD operations
  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      if (editing) {
        await updateBook(editing.id, data);
      } else {
        await createBook(data);
      }

      // Reset form state
      setShowForm(false);
      setEditing(null);
      
      // Refresh the book list
      await fetchBooks();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (err && err.title) {
        setError(err.title + (err.errors ? ': ' + JSON.stringify(err.errors) : ''));
      } else {
        setError(editing ? 'Failed to update book.' : 'Failed to create book.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await deleteBook(id);
      await fetchBooks();
    } catch {
      setError('Failed to delete book.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to determine form title
  const getFormTitle = () => editing ? 'Edit Book' : 'Add New Book';

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg">
        {/* Header Section */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-blue-700 mb-1">
              Books Management
            </h2>
            <p className="text-gray-600">
              Manage your book collection
            </p>
          </div>
          
          <Button 
            onClick={handleAdd} 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Add New Book'}
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4">
            <Alert variant="error">
              {error}
            </Alert>
          </div>
        )}

        {/* Book Form */}
        {showForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {getFormTitle()}
            </h3>
            <BookForm
              onSubmit={handleSubmit}
              initialData={editing}
              onCancel={handleCancel}
              isLoading={loading}
            />
          </div>
        )}

        {/* Books List */}
        <div className="space-y-4">
          {loading && !showForm ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading books...</p>
            </div>
          ) : (
            <BookList 
              books={books} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              isLoading={loading}
            />
          )}
        </div>

        {/* Empty State */}
        {!loading && books.length === 0 && !showForm && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No books found
            </h3>
            <p className="text-gray-600 mb-4">
              Start building your library by adding your first book.
            </p>
            <Button 
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Add Your First Book
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BooksPage;