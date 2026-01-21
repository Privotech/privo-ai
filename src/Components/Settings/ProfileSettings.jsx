import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useAuth } from '../../Contexts/AuthContext';
import { updateMe } from '../../Services/authService';

const ProfileSettings = () => {
  const { user, token, signinWithToken } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = async () => {
    setMessage('');
    setError('');
    setSaving(true);
    try {
      const res = await updateMe({ name: name.trim() });
      if (res.ok) {
        setMessage('Profile updated');
        if (token) await signinWithToken(token);
      } else {
        setError(res.error || 'Failed to update');
      }
    } catch (e) {
      setError('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Email" type="email" value={email} readOnly />
      {message && <div className="text-emerald-500 text-sm">{message}</div>}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-500">
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default ProfileSettings;