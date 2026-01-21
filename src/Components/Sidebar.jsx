import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4">
      <div className="text-2xl font-bold mb-4">PRIVOAI</div>
      <ul>
        <li className="mb-2">
          <Link to="/chat" className="block hover:text-gray-400">
            Chat
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/profile" className="block hover:text-gray-400">
            Profile
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/settings" className="block hover:text-gray-400">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;