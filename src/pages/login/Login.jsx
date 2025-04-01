import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }), // Sending role info
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful!');

        // Redirect based on role
        setTimeout(() => {
          if (role === 'admin') {
            navigate('/admin-dashboard'); // Redirect to admin dashboard
          } else {
            navigate('/info'); // Redirect to user info page
          }
        }, 1000);
      } else {
        setMessage(`Login failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error during login. Please try again.');
    }
  };

  return (
    <div className='Login'>
      <div className='card'>
        <div className='left'>
          <h1>Hello World</h1>
          <p>Welcome to BloodLink</p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>

        <div className='right'>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Role Selection */}
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit">Login</button>
          </form>
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
