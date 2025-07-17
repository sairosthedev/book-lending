// members.js - API for Member endpoints
const API_BASE = 'http://localhost:5066'; // Updated port and base

export async function getMembers() {
  const res = await fetch(`${API_BASE}/api/Members`);
  return res.json();
}

export async function getMember(id) {
  const res = await fetch(`${API_BASE}/api/Members/${id}`);
  return res.json();
}

export async function createMember(member) {
  const res = await fetch(`${API_BASE}/api/Members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(member),
  });
  return res.json();
}

export async function updateMember(id, member) {
  const res = await fetch(`${API_BASE}/api/Members/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(member),
  });
  return res.json();
}

export async function deleteMember(id) {
  await fetch(`${API_BASE}/api/Members/${id}`, { method: 'DELETE' });
} 