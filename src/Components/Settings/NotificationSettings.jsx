import React, { useState } from 'react';
import Button from '../Button';

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleUpdateSettings = () => {
    // Handle notification settings update logic here
    console.log('Updating notification settings with:', {
      emailNotifications,
      pushNotifications,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="email-notifications" className="text-gray-700">
            Email Notifications
          </label>
          <input
            type="checkbox"
            id="email-notifications"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="push-notifications" className="text-gray-700">
            Push Notifications
          </label>
          <input
            type="checkbox"
            id="push-notifications"
            checked={pushNotifications}
            onChange={() => setPushNotifications(!pushNotifications)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <Button onClick={handleUpdateSettings}>Update Notifications</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;