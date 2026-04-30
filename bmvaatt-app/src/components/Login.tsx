import React, { useState } from 'react';
import api from '../api/axios';

interface Props {
  onNavigate: (page: string) => void;
}

export default function Login({ onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onNavigate('dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="app-container">
      <div className="auth-card">
        <div className="logo-container">
          <div className="logo-text">
            HITOCORE
          </div>
        </div>
        
        <div className="auth-subtitle-group">
          <div className="auth-subtitle">Human Resources Management System</div>
          <div className="auth-subtitle-secondary">Login</div>
        </div>
        
        <form onSubmit={handleLogin}>
          {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="Please enter your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
        
        <a className="auth-link-center" onClick={() => onNavigate('forgot')}>
          Forgot your password? Click here
        </a>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <span style={{ color: '#666' }}>Don't have an account? </span>
          <a className="auth-link-inline" onClick={() => onNavigate('register')} style={{ cursor: 'pointer', color: '#0066cc' }}>
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}
