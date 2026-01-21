import React from 'react';
import ChatHistorySidebar from '../Components/ChatHistorySidebar';
import ProfileSettings from '../Components/Settings/ProfileSettings';
import NotificationSettings from '../Components/Settings/NotificationSettings';
import ThemeSettings from '../Components/Settings/ThemeSettings';
import PrivacySettings from '../Components/Settings/PrivacySettings';
import AccountSettings from '../Components/Settings/AccountSettings';

const SettingsPage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <ChatHistorySidebar />
      <div className="flex-1">
        <main className="p-4 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>

          <section className="space-y-4 border rounded p-4 mb-6 border-gray-800 bg-gray-950">
            <h2 className="text-lg font-semibold">Profile</h2>
            <ProfileSettings />
          </section>

          <section className="space-y-4 border rounded p-4 mb-6 border-gray-800 bg-gray-950">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <NotificationSettings />
          </section>

          <section className="space-y-4 border rounded p-4 mb-6 border-gray-800 bg-gray-950">
            <h2 className="text-lg font-semibold">Theme</h2>
            <ThemeSettings />
          </section>

          <section className="space-y-4 border rounded p-4 mb-6 border-gray-800 bg-gray-950">
            <h2 className="text-lg font-semibold">Privacy</h2>
            <PrivacySettings />
          </section>

          <section className="space-y-4 border rounded p-4 border-gray-800 bg-gray-950">
            <h2 className="text-lg font-semibold">Account</h2>
            <AccountSettings />
          </section>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
