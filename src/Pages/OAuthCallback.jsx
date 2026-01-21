import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Loader from '../Components/Loader';

export default function OAuthCallback() {
  const { signinWithToken } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    const token = params.get('token');
    async function run() {
      if (token) {
        const res = await signinWithToken(token);
        if (res.ok) nav('/chat');
        else nav('/login');
      } else {
        nav('/login');
      }
    }
    run();
  }, [loc.search]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
  );
}