import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Components/Input';
import Button from '../Components/Button';
import useAuth from '../Hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await signin(email, password);
      if (res.ok) navigate('/chat');
      else setError(res.error || 'Login failed');
    } catch (e) {
      setError('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Login to PRIVOAI</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </form>

        <div className="mt-4 text-xs text-gray-600 text-center">
          <p>Note: Social sign-in is available on Signup.</p>
        </div>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;