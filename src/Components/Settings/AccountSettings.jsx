import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useAuth } from '../../Contexts/AuthContext';
import { changePassword } from '../../Services/authService';

const AccountSettings = () => {
  const { user } = useAuth();
  const provider = user?.provider || 'local';

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changing, setChanging] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
    setMessage('');
    setError('');
    if (provider !== 'local') {
      setError('Password change is only available for local accounts');
      return;
    }
    if (!currentPassword || !newPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }
    setChanging(true);
    try {
      const res = await changePassword({ currentPassword, newPassword });
      if (res.ok) {
        setMessage('Password changed');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(res.error || 'Failed to change password');
      }
    } catch (e) {
      setError('Failed to change password');
    } finally {
      setChanging(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-400">Provider: {provider}</div>
      <Input
        type="password"
        label="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        disabled={provider !== 'local'}
      />
      <Input
        type="password"
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        disabled={provider !== 'local'}
      />
      <Input
        type="password"
        label="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={provider !== 'local'}
      />
      {message && <div className="text-emerald-500 text-sm">{message}</div>}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button onClick={handleChangePassword} disabled={changing || provider !== 'local'} className="bg-emerald-600 hover:bg-emerald-500">
        {changing ? 'Updating...' : 'Change Password'}
      </Button>
    </div>
  );
};

export default AccountSettings;