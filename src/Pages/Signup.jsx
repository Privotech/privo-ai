import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Input from '../Components/Input';
import Button from '../Components/Button';
import useAuth from '../Hooks/useAuth';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const n = params.get('name');
    const e = params.get('email');
    if (n) setName(n);
    if (e) setEmail(e);
  }, [location.search]);

  const handleSignup = async () => {
    setError(null);
    try {
      const res = await signup(name, email, password);
      if (res.ok) navigate('/chat');
      else setError(res.error || 'Signup failed');
    } catch (e) {
      setError('Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Create an account</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSignup} className="w-full">
            Sign up
          </Button>
        </form>

        <div className="mt-4 space-y-3">
          <a href={`/api/auth/google?redirect=${encodeURIComponent(window.location.origin + '/oauth/callback')}`} className="block w-full text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded">Continue with Google</a>
          <div className="flex items-center justify-center gap-4">
            <a
              href={`/api/auth/github?redirect=${encodeURIComponent(window.location.origin + '/oauth/callback')}`}
              aria-label="Continue with GitHub"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              {/* Simple GitHub logo (octocat silhouette) via SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gray-900">
                <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58l-.01-2.26c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.63-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.39 1.24-3.24-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.24 2.86.12 3.16.77.85 1.24 1.93 1.24 3.24 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;