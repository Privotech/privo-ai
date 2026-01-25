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

  // Build OAuth start URLs (uses VITE_API_BASE_URL in production, relative in dev)
  const oauthUrl = (provider) => {
    const base = import.meta.env.VITE_API_BASE_URL || '';
    const redirect = encodeURIComponent(window.location.origin + '/oauth/callback');
    const path = `/api/auth/${provider}?redirect=${redirect}`;
    return base ? `${base}${path}` : path;
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center">
        {/* Centered actions container when unauthenticated */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/profile" aria-label="Profile" className="hover:opacity-90">
              <Avatar name={user.name} email={user.email} />
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-3 bg-gray-800/80 border border-gray-700 rounded-lg p-3">
              <Link to="/signup" className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-500 w-48 text-center">Signup</Link>
              <Link to="/login" className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 w-48 text-center">Login</Link>
              <div className="flex items-center gap-3">
                <a
                  href={oauthUrl('google')}
                  aria-label="Sign in with Google"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 hover:bg-gray-100"
                >
                  {/* Google G logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
                    <path fill="#4285F4" d="M23.49 12.27c0-.82-.07-1.64-.2-2.43H12v4.59h6.46a5.51 5.51 0 0 1-2.38 3.61v2.99h3.85c2.25-2.07 3.56-5.12 3.56-8.76Z"/>
                    <path fill="#34A853" d="M12 24c3.22 0 5.93-1.07 7.91-2.97l-3.85-2.99c-1.07.72-2.45 1.14-4.06 1.14-3.12 0-5.77-2.1-6.71-4.93H1.35v3.1A12 12 0 0 0 12 24Z"/>
                    <path fill="#FBBC05" d="M5.29 14.24A7.18 7.18 0 0 1 4.91 12c0-.78.13-1.54.38-2.24V6.66H1.35A12 12 0 0 0 0 12c0 1.93.46 3.76 1.35 5.34l3.94-3.1Z"/>
                    <path fill="#EA4335" d="M12 4.75c1.75 0 3.33.6 4.57 1.78l3.43-3.43C17.93 1.18 15.22 0 12 0A12 12 0 0 0 1.35 6.66l3.94 3.1C6.23 6.93 8.88 4.75 12 4.75Z"/>
                  </svg>
                </a>
                <a
                  href={oauthUrl('github')}
                  aria-label="Sign in with GitHub"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gray-900">
                    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58l-.01-2.26c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.63-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.39 1.24-3.24-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.24 2.86.12 3.16.77.85 1.24 1.93 1.24 3.24 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;