import React, { useEffect, useState } from 'react';
import MemberList from '../components/MemberList';
import MemberForm from '../components/MemberForm';
import { getMembers, createMember, updateMember, deleteMember } from '../api/members';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const fetchMembers = async () => {
    setMembers(await getMembers());
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
    setError('');
  };

  const handleEdit = (member) => {
    setEditing(member);
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id) => {
    try {
      await deleteMember(id);
      fetchMembers();
    } catch (err) {
      setError('Failed to delete member.');
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editing) {
        await updateMember(editing.id, data);
      } else {
        await createMember(data);
      }
      setShowForm(false);
      setEditing(null);
      setError('');
      fetchMembers();
    } catch (err) {
      setError('Failed to save member.');
    }
  };

  return (
    <Card>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-2xl font-bold text-blue-700">Members</h2>
        <Button onClick={handleAdd} className="w-full sm:w-auto">Add Member</Button>
      </div>
      {error && <Alert variant="error">{error}</Alert>}
      {showForm && (
        <MemberForm
          onSubmit={handleSubmit}
          initialData={editing}
          onCancel={() => setShowForm(false)}
        />
      )}
      <MemberList members={members} onEdit={handleEdit} onDelete={handleDelete} />
    </Card>
  );
};

export default MembersPage; 