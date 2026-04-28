import React, { useState, useEffect } from 'react';
import '../dashboard.css';
import EmployeeDetail from './EmployeeDetail';
import CreateUser from './CreateUser';
import UserManagement from './UserManagement';
import RoleManagement from './RoleManagement';
import api from '../api/axios';

interface Props {
  onNavigate: (page: string) => void;
}

// Icon helper components
const IconHome = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const IconUsers = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconCircleUser = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M6.3 19.3a7.9 7.9 0 0 1 11.4 0"></path></svg>;
const IconAward = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>;
const IconBrain = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path><path d="M17.599 6.5A3 3 0 0 0 13.6 4"></path><path d="M6.401 6.5A3 3 0 0 1 10.4 4"></path></svg>;
const IconIdCard = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"></path><circle cx="8" cy="12" r="2"></circle><line x1="14" y1="10" x2="18" y2="10"></line><line x1="14" y1="14" x2="18" y2="14"></line></svg>;

const IconGrid = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconUserCog = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><circle cx="19" cy="11" r="2"></circle><path d="M19 8v1"></path><path d="M19 13v1"></path><path d="M21.6 9.5l-.87.5"></path><path d="M17.27 12l-.87.5"></path><path d="M21.6 12.5l-.87-.5"></path><path d="M17.27 10l-.87-.5"></path></svg>;
const IconUserPlus = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>;
const IconSliders = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>;
const IconShield = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const IconShieldKey = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><circle cx="12" cy="11" r="2"></circle><path d="M12 13v2.5"></path></svg>;
const IconReset = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><rect x="10" y="10" width="4" height="5" rx="1" ry="1"></rect><path d="M12 10V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1"></path></svg>;

const IconLogout = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;

const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="5" r="3" fill="#ff4d4f" />
  </svg>
);

const IconEdit = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const IconTrash = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const IconCalendar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;

export default function Dashboard({ onNavigate }: Props) {
  const [activePage, setActivePage] = useState<'admin_dashboard' | 'create_user' | 'user_management' | 'role_management'>('admin_dashboard');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [employees, setEmployees] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });

  useEffect(() => {
    if (activePage === 'admin_dashboard') {
      fetchEmployees();
    }
  }, [activePage]);

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees');
      const backendData = res.data.data;
      const mapped = backendData.map((backend: any, i: number) => ({
        id: backend.id,
        name: backend.fullNameKana || backend.fullName,
        email: backend.email,
        fullName: backend.fullName,
        department: backend.department || 'N/A',
        deptColor: i % 2 === 0 ? '#1890ff' : '#f5222d',
        grade: backend.grade || '-',
        joinDate: backend.joinDate ? new Date(backend.joinDate).toLocaleDateString() : '-',
        empId: backend.employeeCode,
        role: backend.account?.roles?.[0]?.role?.name || backend.position || 'User',
        roleBg: i % 2 === 0 ? '#f0f0ff' : '#e6f7ff',
        roleText: i % 2 === 0 ? '#722ed1' : '#1890ff',
        image: backend.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(backend.fullName)}&background=random`
      }));
      setEmployees(mapped);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error('Failed to fetch employees', error);
    }
  };

  const handleDelete = (e: React.MouseEvent, empId: number) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== empId));
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">HITOCORE</div>
        
        <div className="sidebar-menu">
          <div className="menu-section">
            <div className="menu-section-title">Main Menu</div>
            <div className="menu-item">
              <span className="menu-icon"><IconHome /></span> Homepage
            </div>
            <div className="menu-item">
              <span className="menu-icon"><IconUsers /></span> Employee List
            </div>
            <div className="menu-item">
              <span className="menu-icon"><IconCircleUser /></span> My Profile
            </div>
            <div className="menu-item">
              <span className="menu-icon"><IconAward /></span> Qualifications
            </div>
            <div className="menu-item">
              <span className="menu-icon"><IconBrain /></span> Skills
            </div>
            <div className="menu-item">
              <span className="menu-icon"><IconIdCard /></span> Emergency Contacts
            </div>
          </div>

          <div className="menu-section">
            <div className="menu-section-title">Management Functions</div>
            <div className={`menu-item ${activePage === 'admin_dashboard' ? 'active' : ''}`} onClick={() => { setActivePage('admin_dashboard'); setSelectedUser(null); }}>
              <span className="menu-icon"><IconGrid /></span> Admin Dashboard
            </div>
            <div className={`menu-item ${activePage === 'user_management' ? 'active' : ''}`} onClick={() => { setActivePage('user_management'); setSelectedUser(null); }}>
              <span className="menu-icon"><IconUserCog /></span> User Management
            </div>
            <div className={`menu-item ${activePage === 'create_user' ? 'active' : ''}`} onClick={() => { setActivePage('create_user'); setSelectedUser(null); }}>
              <span className="menu-icon"><IconUserPlus /></span> Create User
            </div>
            <div className="menu-item">
              <span className="menu-icon"><IconSliders /></span> Profile Settings
            </div>
            <div className="menu-item">
              <span className="menu-icon"><IconShield /></span> Privacy Settings
            </div>
            <div className={`menu-item ${activePage === 'role_management' ? 'active' : ''}`} onClick={() => { setActivePage('role_management'); setSelectedUser(null); }}>
              <span className="menu-icon"><IconShieldKey /></span> Permissions
            </div>
            <div className="menu-item">
              <span className="menu-icon"><IconReset /></span> Password Reset
            </div>
          </div>
          
          <div className="menu-section">
            <div className="menu-item" onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              onNavigate('login');
            }}>
              <span className="menu-icon"><IconLogout /></span> Logout
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div style={{ backgroundColor: '#2563eb', color: 'white', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: 12 }}>
              AD
            </div>
            <div className="user-info">
              <span className="user-name">Manager Taro</span>
              <span className="user-role">Senior Manager</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activePage === 'create_user' ? (
          <CreateUser onBack={() => setActivePage('admin_dashboard')} />
        ) : activePage === 'user_management' ? (
          <UserManagement onBack={() => setActivePage('admin_dashboard')} />
        ) : activePage === 'role_management' ? (
          <RoleManagement onBack={() => setActivePage('admin_dashboard')} />
        ) : selectedUser ? (
          <EmployeeDetail user={selectedUser} onBack={() => setSelectedUser(null)} />
        ) : (
          <>
            <div className="top-header">
              <div className="header-date">Sept 8, 2025 09:00</div>
              <div className="header-bell"><IconBell /></div>
            </div>

            <div className="toolbar">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input type="text" className="search-input" placeholder="Search members..." />
              </div>
              
              <select className="filter-select">
                <option>Department</option>
              </select>
              
              <select className="filter-select active">
                <option>April</option>
              </select>
              
              <div className="sort-container">
                <div className="filter-select" onClick={() => setIsSortOpen(!isSortOpen)}>
                  Sort: Role <span style={{fontSize:'0.7rem', marginLeft:4}}>▼</span>
                </div>
                
                {isSortOpen && (
                  <div className="sort-popover">
                    <div className="sort-popover-title">Select Condition</div>
                    <div className="sort-option">
                      <div className="sort-checkbox checked">✓</div>
                      <span className="sort-label">Role</span>
                      <span className="sort-arrow">↓</span>
                    </div>
                    <div className="sort-option">
                      <div className="sort-checkbox"></div>
                      <span className="sort-label">Name</span>
                      <span className="sort-arrow">↓</span>
                    </div>
                    <div className="sort-option">
                      <div className="sort-checkbox"></div>
                      <span className="sort-label">Join Date</span>
                      <span className="sort-arrow">↓↑</span>
                    </div>
                    <div className="sort-option">
                      <div className="sort-checkbox"></div>
                      <span className="sort-label">Birth Month</span>
                      <span className="sort-arrow">↓</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="toolbar-spacer"></div>

              <div className="total-count">Total: {pagination.total}</div>
              
              <div className="view-toggles">
                <button className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                  ≡ List
                </button>
                <button className={`view-toggle ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}>
                  ⊞ Card
                </button>
              </div>
            </div>

            {viewMode === 'card' ? (
              <div className="employee-grid">
                {employees.map((emp) => (
                  <div key={emp.id} className="employee-card" onClick={() => setSelectedUser(emp)} style={{cursor: 'pointer'}}>
                    <div className="card-header">
                      <span className="role-badge" style={{ backgroundColor: emp.roleBg, color: emp.roleText }}>
                        {emp.role}
                      </span>
                      <div style={{display: 'flex', gap: 5}}>
                        <button className="action-btn" onClick={(e) => { e.stopPropagation(); setSelectedUser(emp); }}><IconEdit /></button>
                        <button className="action-btn" style={{color: '#ff4d4f'}} onClick={(e) => handleDelete(e, emp.id)}><IconTrash /></button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="card-user">
                        <img src={emp.image} alt={emp.name} className="card-avatar" />
                        <div className="card-user-info">
                          <span className="card-name">{emp.name}</span>
                          <span className="card-email">{emp.email}</span>
                        </div>
                      </div>
                      <div className="card-dept">
                        <span className="card-dept-badge">
                          <span className="dept-dot" style={{ backgroundColor: emp.deptColor }}></span>
                          {emp.department}
                        </span>
                        <span>| {emp.grade}</span>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="card-info-row">
                        <span className="card-info-label">Employee ID</span>
                        <span className="card-info-value">{emp.empId}</span>
                      </div>
                      <div className="card-info-row">
                        <span className="card-info-label">Join Date</span>
                        <span className="card-info-value">{emp.joinDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="table-container" style={{marginBottom: 20}}>
                <table className="employee-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Full Name (English)</th>
                      <th>Department</th>
                      <th>Join Date</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr key={emp.id} onClick={() => setSelectedUser(emp)} style={{cursor: 'pointer'}}>
                        <td>
                          <div className="td-user">
                            <img src={emp.image} alt={emp.name} className="td-avatar" />
                            <div className="td-user-info">
                              <span className="td-name">{emp.name}</span>
                              <span className="td-email">{emp.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>{emp.fullName}</td>
                        <td>
                          <span className="dept-dot" style={{ backgroundColor: emp.deptColor }}></span>
                          {emp.department}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconCalendar />
                            {emp.joinDate}
                          </div>
                        </td>
                        <td>
                          <span className="role-badge" style={{ backgroundColor: emp.roleBg, color: emp.roleText }}>
                            {emp.role}
                          </span>
                        </td>
                        <td>
                          <div style={{display: 'flex', gap: 10}}>
                            <button className="action-btn" onClick={(e) => { e.stopPropagation(); setSelectedUser(emp); }}><IconEdit /></button>
                            <button className="action-btn" style={{color: '#ff4d4f'}} onClick={(e) => handleDelete(e, emp.id)}><IconTrash /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Common Pagination */}
            <div className="pagination" style={{ borderRadius: viewMode === 'card' ? 8 : 0 }}>
              <div className="pagination-info">Showing 1~10 of 100 items</div>
              <div className="pagination-controls">
                <button className="page-btn">« Back</button>
                <div className="page-num active">1</div>
                <div className="page-num">2</div>
                <div className="page-num">3</div>
                <div className="page-num">4</div>
                <div className="page-num">5</div>
                <div className="page-num" style={{pointerEvents: 'none'}}>...</div>
                <div className="page-num">10</div>
                <button className="page-btn">Next »</button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
