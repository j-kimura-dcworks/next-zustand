'use client';

import { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';

const AuthPage = () => {
  const { user, isLoggedIn, login, logout, updateUser } = useAuthStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    login({
      id: Date.now().toString(),
      username,
      email,
    });
  };

  const handleUpdateEmail = (newEmail: string) => {
    updateUser({ email: newEmail });
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="p-4">
          <h2 className="text-xl">Profile</h2>
          <div className="mb-4">
            <p>
              <strong>ID:</strong> {user?.id}
            </p>
            <p>
              <strong>Username:</strong> {user?.username}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="New Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="p-2"
            />
            <button
              onClick={() => handleUpdateEmail(email)}
              className="bg-green-500 rounded-md px-4 py-2"
            >
              Send
            </button>
          </div>
          <button className="bg-red-400 rounded-md px-4 py-2" onClick={logout}>
            logout
          </button>
        </div>
      ) : (
        <div className="p-4 border m-auto">
          <h2 className="text-xl">Login</h2>
          <div>
            <input
              type="text"
              placeholder="username"
              className="p-2 mb-2  border-white box-border block"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="email"
              className="p-2 block mb-4 border-white  box-border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md disabled:bg-gray-300"
              disabled={!username || !email}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthPage;
