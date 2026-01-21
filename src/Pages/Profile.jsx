import React, { useEffect, useState } from 'react';
import ChatHistorySidebar from '../Components/ChatHistorySidebar';
import Input from '../Components/Input';
import Button from '../Components/Button';
import { useAuth } from '../Contexts/AuthContext';
import { updateMe, changePassword } from '../Services/authService';

const ProfilePage = () => {
  const { user, token, signinWithToken } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [provider, setProvider] = useState('local');

  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changing, setChanging] = useState(false);
  const [changeMsg, setChangeMsg] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setProvider(user.provider || 'local');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setSaving(true);
    setSaveMsg('');
    setErrorMsg('');
    try {
      const res = await updateMe({ name: name.trim() });
      if (res.ok) {
        setSaveMsg('Profile updated');
        if (token) await signinWithToken(token); // refresh user
      } else {
        setErrorMsg(res.error || 'Failed to update profile');
      }
    } catch (e) {
      setErrorMsg('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setChangeMsg('');
    setErrorMsg('');
    if (provider !== 'local') {
      setErrorMsg('Password change is only available for local accounts');
      return;
    }
    if (!currentPassword || !newPassword) {
      setErrorMsg('Please fill in all password fields');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('New password and confirmation do not match');
      return;
    }
    setChanging(true);
    try {
      const res = await changePassword({ currentPassword, newPassword });
      if (res.ok) {
        setChangeMsg('Password updated');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setErrorMsg(res.error || 'Failed to change password');
      }
    } catch (e) {
      setErrorMsg('Failed to change password');
    } finally {
      setChanging(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <ChatHistorySidebar />
      <div className="flex-1">
        <main className="p-4 max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

          <div className="space-y-4 border rounded p-4 mb-6 border-gray-800 bg-gray-950">
            <h2 className="text-lg font-semibold">Account</h2>
            <Input
              type="text"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              label="Email"
              value={email}
              readOnly
            />
            <div className="text-sm text-gray-400">Provider: {provider}</div>
            {saveMsg && <div className="text-emerald-500 text-sm">{saveMsg}</div>}
            {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}
            <Button onClick={handleUpdateProfile} disabled={saving} className="bg-emerald-600 hover:bg-emerald-500">
              {saving ? 'Saving...' : 'Update Profile'}
            </Button>
          </div>

          <div className="space-y-4 border rounded p-4 border-gray-800 bg-gray-950">
            <h2 className="text-lg font-semibold">Change Password</h2>
            {provider !== 'local' && (
              <div className="text-sm text-yellow-500">
                Password change is only available for local accounts.
              </div>
            )}
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
            {changeMsg && <div className="text-emerald-500 text-sm">{changeMsg}</div>}
            {errorMsg && !saveMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}
            <Button onClick={handleChangePassword} disabled={changing || provider !== 'local'} className="bg-emerald-600 hover:bg-emerald-500">
              {changing ? 'Updating...' : 'Change Password'}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;