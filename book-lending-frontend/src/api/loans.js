// loans.js - API for Loan endpoints
const API_BASE = 'http://localhost:5066'; // Updated port and base

export async function getLoans() {
  const res = await fetch(`${API_BASE}/api/Loans`);
  return res.json();
}

export async function getLoan(id) {
  const res = await fetch(`${API_BASE}/api/Loans/${id}`);
  return res.json();
}

export async function createLoan(loan) {
  const res = await fetch(`${API_BASE}/api/Loans`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loan),
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
  return res.json();
}

export async function updateLoan(id, loan) {
  const res = await fetch(`${API_BASE}/api/Loans/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loan),
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
  return res.json();
}

export async function deleteLoan(id) {
  await fetch(`${API_BASE}/api/Loans/${id}`, { method: 'DELETE' });
}

export async function returnLoan(id) {
  const res = await fetch(`${API_BASE}/api/Loans/${id}/return`, {
    method: 'POST',
  });
  return res.json();
} 