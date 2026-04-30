import React, { useState } from 'react';
import api from '../api/axios';

interface Props {
  onNavigate: (page: string) => void;
}

export default function Register({ onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      const response = await api.post('/auth/register', { 
        email, 
        password, 
        fullName, 
        employeeCode 
      });
      if (response.status === 201) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          onNavigate('login');
        }, 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <div className="auth-card">
        <div className="logo-container">
          <div className="logo-text">HITOCORE</div>
        </div>
        
        <div className="auth-subtitle-group">
          <div className="auth-subtitle">Human Resources Management System</div>
          <div className="auth-subtitle-secondary">Register</div>
        </div>
        
        <form onSubmit={handleRegister}>
          {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
          {success && <div style={{color: 'green', marginBottom: '10px'}}>{success}</div>}
          
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Employee Code</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Employee Code (e.g. EX0001)"
              value={employeeCode}
              onChange={e => setEmployeeCode(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="Email"
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
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>
        
        <a className="auth-link-center" onClick={() => onNavigate('login')}>
          Already have an account? Login here
        </a>
      </div>
    </div>
  );
}
