import React, { useEffect, useState } from 'react';
import Button from '../Button';

const PrivacySettings = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const sp = localStorage.getItem('privacy_show_profile');
    const ps = localStorage.getItem('privacy_personalized_suggestions');
    if (sp !== null) setShowProfile(sp === 'true');
    if (ps !== null) setPersonalizedSuggestions(ps === 'true');
  }, []);

  const handleSave = () => {
    localStorage.setItem('privacy_show_profile', String(showProfile));
    localStorage.setItem('privacy_personalized_suggestions', String(personalizedSuggestions));
    setMessage('Privacy preferences saved');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span>Show profile to other users</span>
        <input
          type="checkbox"
          checked={showProfile}
          onChange={(e) => setShowProfile(e.target.checked)}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Enable personalized suggestions</span>
        <input
          type="checkbox"
          checked={personalizedSuggestions}
          onChange={(e) => setPersonalizedSuggestions(e.target.checked)}
        />
      </div>
      {message && <div className="text-emerald-500 text-sm">{message}</div>}
      <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-500">Save Privacy Settings</Button>
    </div>
  );
};

export default PrivacySettings;