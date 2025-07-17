// books.js - API for Book endpoints
const API_BASE = 'http://localhost:5066'; // Updated port and base

export async function getBooks() {
  const res = await fetch(`${API_BASE}/api/Books`);
  return res.json();
}

export async function getBook(id) {
  const res = await fetch(`${API_BASE}/api/Books/${id}`);
  return res.json();
}

export async function createBook(book) {
  const res = await fetch(`${API_BASE}/api/Books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  return res.json();
}

export async function updateBook(id, book) {
  const res = await fetch(`${API_BASE}/api/Books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  const contentType = res.headers.get('content-type');
  if (!res.ok) {
    if (contentType && contentType.includes('application/json')) {
      const error = await res.json();
      throw error;
    } else {
      const errorText = await res.text();
      throw new Error(errorText);
    }
  }
  // If response is 204 No Content, just return
  if (res.status === 204) return;
  // If response has content, parse as JSON
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }
  // Otherwise, return nothing
  return;
}

export async function deleteBook(id) {
  await fetch(`${API_BASE}/api/Books/${id}`, { method: 'DELETE' });
} 