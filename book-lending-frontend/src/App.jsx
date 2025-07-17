import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import MembersPage from './pages/MembersPage';
import LoansPage from './pages/LoansPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-white shadow mb-6">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-700 tracking-tight">Library Book Lending System</h1>
            <nav className="space-x-4">
              <Link to="/books" className="text-gray-700 hover:text-blue-600 font-medium">Books</Link>
              <Link to="/members" className="text-gray-700 hover:text-blue-600 font-medium">Members</Link>
              <Link to="/loans" className="text-gray-700 hover:text-blue-600 font-medium">Loans</Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 flex-1">
          <Routes>
            <Route path="/books" element={<BooksPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="*" element={<BooksPage />} />
          </Routes>
        </main>
        <footer className="text-center text-gray-400 text-sm py-4 mt-8">
          &copy; {new Date().getFullYear()} Library Book Lending System
        </footer>
      </div>
    </Router>
  );
}

export default App;
