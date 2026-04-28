import React, { useState } from 'react';
import '../dashboard.css';
import api from '../api/axios';

interface Props {
  onBack: () => void;
}

const IconCamera = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;

export default function CreateUser({ onBack }: Props) {
  const [formData, setFormData] = useState({
    employeeCode: '',
    fullNameKana: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    department: 'Finance Dept',
    position: 'General',
    grade: 'II',
    joinDate: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        joinDate: formData.joinDate ? new Date(formData.joinDate).toISOString() : undefined
      };
      const res = await api.post('/employees', payload);
      
      // Auto create account with user-provided password and basic role
      const employeeId = res.data.data.id;
      await api.post('/accounts', {
        employeeId,
        email: formData.email,
        password: formData.password || 'Password@123',
        status: 'ACTIVE',
        roleCodes: ['HR_MANAGER'] // Since 'HR_MANAGER' exists in SEED
      });

      alert('Employee and Account created successfully!');
      onBack();
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.details || err.message || 'Unknown error';
      alert(`Failed to create employee: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="top-header">
        <div className="header-date">Sept 8, 2025 09:00</div>
      </div>

      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1 className="detail-title">Create New Employee</h1>
      </div>

      <div className="detail-card">
        <div className="detail-profile-header">
          <div className="detail-avatar-container">
            <div className="detail-avatar" style={{backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <span style={{color: '#aaa', fontSize: '3rem'}}>👤</span>
            </div>
            <div className="detail-avatar-edit">
              <IconCamera />
            </div>
          </div>
          <div className="detail-profile-info">
            <h2>New Employee</h2>
            <p>Upload profile picture</p>
          </div>
        </div>

        <div className="detail-form">
          <form onSubmit={handleSubmit}>
            <h3 className="form-section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name (Japanese)</label>
                <input type="text" name="fullNameKana" value={formData.fullNameKana} onChange={handleChange} className="form-input" placeholder="e.g. ヤマダ・タロウ" />
              </div>
              <div className="form-group">
                <label className="form-label">Full Name (English)*</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-input" placeholder="e.g. YAMADA TARO" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address*</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="email@hitocore.co.jp" required />
              </div>
              <div className="form-group">
                <label className="form-label">Login Password*</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-input" placeholder="Enter password (min 8 chars)" required minLength={8} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="form-input" placeholder="090-XXXX-XXXX" />
              </div>
            </div>

            <h3 className="form-section-title">Employment Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Employee ID*</label>
                <input type="text" name="employeeCode" value={formData.employeeCode} onChange={handleChange} className="form-input" placeholder="Enter ID..." required />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select name="department" value={formData.department} onChange={handleChange} className="form-input">
                  <option value="Finance Dept">Finance Dept</option>
                  <option value="Engineering Dept">Engineering Dept</option>
                  <option value="Sales Dept">Sales Dept</option>
                  <option value="HR Dept">HR Dept</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select name="position" value={formData.position} onChange={handleChange} className="form-input">
                  <option value="General">General</option>
                  <option value="Director">Director</option>
                  <option value="Manager">Manager</option>
                  <option value="TL">Team Leader</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Grade</label>
                <select name="grade" value={formData.grade} onChange={handleChange} className="form-input">
                  <option value="II">II</option>
                  <option value="X">X</option>
                  <option value="Z">Z</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Join Date</label>
                <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} className="form-input" />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={onBack}>Cancel</button>
              <button type="submit" disabled={loading} className="btn-primary" style={{width: 'auto', padding: '10px 24px'}}>
                {loading ? 'Creating...' : 'Create Employee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
