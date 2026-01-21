import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

function Avatar({ name = '', email = '' }) {
  const source = name || email || 'User';
  const initials = source
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-semibold">
      {initials || 'U'}
    </div>
  );
}

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-end">
        {/* Right-aligned actions like ChatGPT */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/profile" aria-label="Profile" className="hover:opacity-90">
              <Avatar name={user.name} email={user.email} />
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-300 hover:text-white text-sm">Login</Link>
              <Link to="/signup" className="text-gray-300 hover:text-white text-sm">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;