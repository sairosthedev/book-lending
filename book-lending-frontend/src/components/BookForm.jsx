import React, { useState, useEffect } from 'react';

const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Fantasy',
  'Biography',
  'History',
  'Self-Help',
  'Other',
];

const BookForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setAuthor(initialData.author || '');
      setGenre(initialData.genre || '');
      setYear(initialData.year || '');
      setIsbn(initialData.isbn || '');
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ title, author, genre, year: Number(year), isbn, description });
    setTitle('');
    setAuthor('');
    setGenre('');
    setYear('');
    setIsbn('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <h3 className="text-lg font-semibold text-blue-700 mb-2">{initialData ? 'Edit Book' : 'Add Book'}</h3>
      <div>
        <label className="block text-gray-700 mb-1">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Author</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Genre</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          required
        >
          <option value="">Select genre</option>
          {GENRES.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Year</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Year"
          value={year}
          onChange={e => setYear(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">ISBN</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="ISBN"
          value={isbn}
          onChange={e => setIsbn(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
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

export default BookForm;