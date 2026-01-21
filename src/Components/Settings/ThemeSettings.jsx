import React, { useState } from 'react';
import Button from '../Button';

const ThemeSettings = () => {
  const [theme, setTheme] = useState('light');

  const handleUpdateTheme = () => {
    // Handle theme update logic here
    console.log('Updating theme to:', theme);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Theme Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="theme" className="text-gray-700">
            Theme
          </label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="form-select mt-1 block w-full"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <Button onClick={handleUpdateTheme}>Update Theme</Button>
      </div>
    </div>
  );
};

export default ThemeSettings;