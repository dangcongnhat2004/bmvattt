import { useState, useEffect } from 'react';
import '../dashboard.css';
import api from '../api/axios';

export default function RoleManagement() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Create state
  const [isCreating, setIsCreating] = useState(false);
  const [newRole, setNewRole] = useState({ code: '', name: '', description: '' });
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [roleRes, permRes] = await Promise.all([
        api.get('/roles'),
        api.get('/permissions')
      ]);
      setRoles(roleRes.data.data);
      setPermissions(permRes.data.data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePermission = (key: string) => {
    setSelectedPerms(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      await api.post('/roles', {
        ...newRole,
        permissionKeys: selectedPerms
      });
      alert('Role created successfully!');
      setIsCreating(false);
      setNewRole({ code: '', name: '', description: '' });
      setSelectedPerms([]);
      fetchData();
    } catch (err: any) {
      alert(`Failed to create role: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Group permissions by 'group' field
  const groupedPerms = permissions.reduce((acc: any, p: any) => {
    if (!acc[p.group]) acc[p.group] = [];
    acc[p.group].push(p);
    return acc;
  }, {});

  return (
    <div>
      <div className="top-header">
        <div className="header-date">Role & Permission Management</div>
      </div>

      {isCreating ? (
        <div className="detail-card" style={{marginTop: 20}}>
          <div className="detail-header">
            <button className="back-btn" onClick={() => setIsCreating(false)}>
              ← Back to Roles
            </button>
            <h2 className="detail-title">Create New Role</h2>
          </div>
          
          <div className="detail-form" style={{padding: 24}}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Role Code (e.g. MANAGER)</label>
                <input className="form-input" value={newRole.code} onChange={e => setNewRole({...newRole, code: e.target.value.toUpperCase()})} />
              </div>
              <div className="form-group">
                <label className="form-label">Role Name</label>
                <input className="form-input" value={newRole.name} onChange={e => setNewRole({...newRole, name: e.target.value})} />
              </div>
              <div className="form-group" style={{gridColumn: '1 / -1'}}>
                <label className="form-label">Description</label>
                <input className="form-input" value={newRole.description} onChange={e => setNewRole({...newRole, description: e.target.value})} />
              </div>
            </div>

            <div style={{marginTop: 30}}>
              <h3 className="form-section-title">Assign Permissions</h3>
              {Object.keys(groupedPerms).map(group => (
                <div key={group} style={{marginBottom: 20}}>
                  <h4 style={{marginBottom: 10, color: '#555'}}>{group}</h4>
                  <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
                    {groupedPerms[group].map((p: any) => (
                      <label key={p.key} style={{display: 'flex', alignItems: 'center', gap: 5, padding: '8px 12px', background: '#f5f5f5', borderRadius: 4, cursor: 'pointer', fontSize: '0.9rem'}}>
                        <input 
                          type="checkbox" 
                          checked={selectedPerms.includes(p.key)} 
                          onChange={() => togglePermission(p.key)}
                        />
                        {p.name}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="form-actions" style={{marginTop: 30}}>
              <button className="btn-secondary" onClick={() => setIsCreating(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleCreate} disabled={loading}>
                {loading ? 'Creating...' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{marginTop: 20}}>
          <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 15}}>
            <button className="btn-primary" onClick={() => setIsCreating(true)}>+ Add New Role</button>
          </div>
          
          <div className="table-container">
            {loading ? <p>Loading...</p> : (
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Permissions</th>
                    <th>Assigned Users</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map(role => (
                    <tr key={role.id}>
                      <td><strong style={{color: '#1890ff'}}>{role.code}</strong></td>
                      <td>{role.name}</td>
                      <td>{role.description}</td>
                      <td>
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 400}}>
                          {role.permissions.map((rp: any) => (
                            <span key={rp.permission.key} style={{background: '#f0f0ff', color: '#722ed1', padding: '2px 6px', borderRadius: 4, fontSize: '0.75rem'}}>
                              {rp.permission.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>{role.users.length} users</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
