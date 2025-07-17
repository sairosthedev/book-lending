# Book Lending Frontend

This is a React + Vite frontend for the Book Lending System.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. The app will run at [http://localhost:5173](http://localhost:5173)

## Backend Connection
- The frontend expects the backend API to be running at `http://localhost:5000`.
- If your backend runs on a different port, update the `API_BASE` variable in `src/api/books.js`, `src/api/members.js`, and `src/api/loans.js`.

## Features
- Manage Books, Members, and Loans
- Add, edit, and delete records
- Simple navigation with React Router

---

Feel free to customize the UI and extend functionality as needed!
