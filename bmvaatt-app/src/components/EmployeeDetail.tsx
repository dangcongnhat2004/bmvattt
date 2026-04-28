import React from 'react';
import '../dashboard.css';

interface Props {
  user: any;
  onBack: () => void;
}

const IconCamera = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;

export default function EmployeeDetail({ user, onBack }: Props) {
  if (!user) return null;

  return (
    <div>
      <div className="top-header">
        <div className="header-date">Sept 8, 2025 09:00</div>
      </div>

      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1 className="detail-title">Edit Employee</h1>
      </div>

      <div className="detail-card">
        <div className="detail-profile-header">
          <div className="detail-avatar-container">
            <img src={user.image} alt={user.name} className="detail-avatar" />
            <div className="detail-avatar-edit">
              <IconCamera />
            </div>
          </div>
          <div className="detail-profile-info">
            <h2>{user.fullName || user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="detail-form">
          <form onSubmit={(e) => { e.preventDefault(); onBack(); }}>
            <h3 className="form-section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name (Japanese)</label>
                <input type="text" className="form-input" defaultValue={user.name} />
              </div>
              <div className="form-group">
                <label className="form-label">Full Name (English)</label>
                <input type="text" className="form-input" defaultValue={user.fullName} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" defaultValue={user.email} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="text" className="form-input" defaultValue="090-1234-5678" />
              </div>
            </div>

            <h3 className="form-section-title">Employment Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Employee ID</label>
                <input type="text" className="form-input" defaultValue={user.empId} readOnly className="form-input readonly" />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select className="form-input" defaultValue={user.department}>
                  <option value="Finance Dept">Finance Dept</option>
                  <option value="Engineering Dept">Engineering Dept</option>
                  <option value="Sales Dept">Sales Dept</option>
                  <option value="HR Dept">HR Dept</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select className="form-input" defaultValue={user.role}>
                  <option value="General">General</option>
                  <option value="Director">Director</option>
                  <option value="Manager">Manager</option>
                  <option value="TL">Team Leader</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Grade</label>
                <select className="form-input" defaultValue={user.grade}>
                  <option value="II">II</option>
                  <option value="X">X</option>
                  <option value="Z">Z</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Join Date</label>
                <input type="text" className="form-input" defaultValue={user.joinDate} />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={onBack}>Cancel</button>
              <button type="submit" className="btn-primary" style={{width: 'auto', padding: '10px 24px'}}>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
