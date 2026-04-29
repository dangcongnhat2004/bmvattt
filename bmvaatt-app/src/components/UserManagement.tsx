import { useState, useEffect } from 'react';
import '../dashboard.css';
import api from '../api/axios';

export default function UserManagement() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Edit state
  const [editingAccount, setEditingAccount] = useState<any>(null);
  const [editStatus, setEditStatus] = useState('');
  const [editRoleCodes, setEditRoleCodes] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [accRes, roleRes] = await Promise.all([
        api.get('/accounts'),
        api.get('/roles')
      ]);
      setAccounts(accRes.data.data);
      setRoles(roleRes.data.data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (acc: any) => {
    setEditingAccount(acc);
    setEditStatus(acc.status);
    setEditRoleCodes(acc.roles.map((r: any) => r.role.code));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.patch(`/accounts/${editingAccount.id}`, {
        status: editStatus,
        roleCodes: editRoleCodes
      });
      alert('Account updated successfully');
      setEditingAccount(null);
      fetchData();
    } catch (err: any) {
      alert(`Failed to update: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = (code: string) => {
    setEditRoleCodes(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  return (
    <div>
      <div className="top-header">
        <div className="header-date">Account Management</div>
      </div>

      {editingAccount ? (
        <div className="detail-card" style={{marginTop: 20}}>
          <div className="detail-header">
            <button className="back-btn" onClick={() => setEditingAccount(null)}>
              ← Back to List
            </button>
            <h2 className="detail-title">Edit Account: {editingAccount.email}</h2>
          </div>
          
          <div className="detail-form" style={{padding: 24}}>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-input" value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="LOCKED">Locked</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>

            <div className="form-group" style={{marginTop: 20}}>
              <label className="form-label">Assigned Roles</label>
              <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10}}>
                {roles.map(r => (
                  <label key={r.code} style={{display: 'flex', alignItems: 'center', gap: 5, padding: '8px 12px', background: '#f5f5f5', borderRadius: 4, cursor: 'pointer'}}>
                    <input 
                      type="checkbox" 
                      checked={editRoleCodes.includes(r.code)} 
                      onChange={() => toggleRole(r.code)}
                    />
                    {r.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-actions" style={{marginTop: 30}}>
              <button className="btn-secondary" onClick={() => setEditingAccount(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="table-container" style={{marginTop: 20}}>
          {loading ? <p>Loading...</p> : (
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Roles</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map(acc => (
                  <tr key={acc.id}>
                    <td>{acc.employee?.fullName || 'N/A'}</td>
                    <td>{acc.email}</td>
                    <td>
                      <span style={{
                        padding: '4px 8px', borderRadius: 12, fontSize: '0.8rem',
                        backgroundColor: acc.status === 'ACTIVE' ? '#e6f7ff' : '#fff1f0',
                        color: acc.status === 'ACTIVE' ? '#1890ff' : '#f5222d'
                      }}>
                        {acc.status}
                      </span>
                    </td>
                    <td>
                      <div style={{display: 'flex', gap: 5}}>
                        {acc.roles.map((r: any) => (
                          <span key={r.role.code} className="role-badge" style={{background: '#f0f0ff', color: '#722ed1'}}>
                            {r.role.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <button className="btn-primary" style={{padding: '6px 12px', fontSize: '0.8rem'}} onClick={() => handleEdit(acc)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
