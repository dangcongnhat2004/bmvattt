import { useState, useEffect } from 'react';
import '../dashboard.css';
import api from '../api/axios';

interface Props {
  user: any;
  onBack: () => void;
}

const IconCamera = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;
const IconFile = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const IconDownload = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;

export default function EmployeeDetail({ user, onBack }: Props) {
  const [activeTab, setActiveTab] = useState('personal');
  const [fullData, setFullData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFullData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/employees/${user.id}`);
        setFullData(res.data.data);
      } catch (err) {
        console.error('Failed to fetch full employee data', err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) {
      fetchFullData();
    }
  }, [user.id]);

  const handleAddContract = async () => {
    try {
      const payload = {
        contractNumber: `CON-${Date.now().toString().slice(-6)}`,
        type: 'LABOR',
        startDate: new Date().toISOString(),
        status: 'ACTIVE'
      };
      await api.post(`/contracts/${user.id}`, payload);
      const res = await api.get(`/employees/${user.id}`);
      setFullData(res.data.data);
      alert('Contract added successfully!');
    } catch (err) {
      alert('Failed to add contract');
    }
  };

  const handleAddPayroll = async () => {
    try {
      const payload = {
        period: `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`,
        basicSalary: 3000,
        allowances: 500,
        deductions: 200,
        netSalary: 3300,
        status: 'PAID'
      };
      await api.post(`/payrolls/${user.id}`, payload);
      const res = await api.get(`/employees/${user.id}`);
      setFullData(res.data.data);
      alert('Payroll record added successfully!');
    } catch (err) {
      alert('Failed to add payroll');
    }
  };

  const handleAddDocument = async () => {
    try {
      const payload = {
        fileName: `Document_${Date.now().toString().slice(-4)}.pdf`,
        type: 'CV',
        fileUrl: 'https://example.com/demo.pdf'
      };
      await api.post(`/employees/${user.id}/documents`, payload);
      const res = await api.get(`/employees/${user.id}`);
      setFullData(res.data.data);
      alert('Document uploaded successfully!');
    } catch (err) {
      alert('Failed to upload document');
    }
  };

  if (!user) return null;

  const renderPersonal = () => (
    <div className="detail-form">
      <form onSubmit={(e) => { e.preventDefault(); onBack(); }}>
        <h3 className="form-section-title">Personal Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" defaultValue={fullData?.fullName || user.fullName} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" defaultValue={fullData?.email || user.email} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-input" defaultValue={fullData?.phoneNumber || "090-1234-5678"} />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input type="text" className="form-input" defaultValue={fullData?.address || "Tokyo, Japan"} />
          </div>
        </div>

        <h3 className="form-section-title">Employment Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Employee ID</label>
            <input type="text" defaultValue={fullData?.employeeCode || user.empId} readOnly className="form-input readonly" />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input type="text" className="form-input" defaultValue={fullData?.department || user.department} />
          </div>
          <div className="form-group">
            <label className="form-label">Position</label>
            <input type="text" className="form-input" defaultValue={fullData?.position || user.role} />
          </div>
          <div className="form-group">
            <label className="form-label">Join Date</label>
            <input type="text" className="form-input" defaultValue={fullData?.joinDate ? new Date(fullData.joinDate).toLocaleDateString() : user.joinDate} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>Cancel</button>
          <button type="submit" className="btn-primary" style={{width: 'auto', padding: '10px 24px'}}>Save Changes</button>
        </div>
      </form>
    </div>
  );

  const renderContracts = () => (
    <div className="detail-form">
      <div className="section-header">
        <h3 className="form-section-title" style={{border: 'none', marginBottom: 0}}>Contracts</h3>
        <button className="btn-primary" style={{width: 'auto', padding: '6px 15px', fontSize: '0.8rem'}} onClick={handleAddContract}>+ Add Contract</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Contract No.</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fullData?.contracts?.length > 0 ? fullData.contracts.map((c: any) => (
            <tr key={c.id}>
              <td>{c.contractNumber}</td>
              <td>{c.type}</td>
              <td>{new Date(c.startDate).toLocaleDateString()}</td>
              <td>{c.endDate ? new Date(c.endDate).toLocaleDateString() : 'N/A'}</td>
              <td><span className={`status-badge status-${c.status.toLowerCase()}`}>{c.status}</span></td>
              <td><button className="action-btn"><IconDownload /></button></td>
            </tr>
          )) : (
            <tr><td colSpan={6} style={{textAlign: 'center', padding: '20px'}}>No contracts found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderPayroll = () => (
    <div className="detail-form">
      <div className="section-header">
        <h3 className="form-section-title" style={{border: 'none', marginBottom: 0}}>Payroll History</h3>
        <button className="btn-primary" style={{width: 'auto', padding: '6px 15px', fontSize: '0.8rem'}} onClick={handleAddPayroll}>+ Add Record</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Period</th>
            <th>Basic Salary</th>
            <th>Allowances</th>
            <th>Deductions</th>
            <th>Net Salary</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {fullData?.payrolls?.length > 0 ? fullData.payrolls.map((p: any) => (
            <tr key={p.id}>
              <td>{p.period}</td>
              <td>${p.basicSalary.toLocaleString()}</td>
              <td>${p.allowances.toLocaleString()}</td>
              <td>${p.deductions.toLocaleString()}</td>
              <td style={{fontWeight: 'bold'}}>${p.netSalary.toLocaleString()}</td>
              <td><span className={`status-badge status-${p.status.toLowerCase()}`}>{p.status}</span></td>
            </tr>
          )) : (
            <tr><td colSpan={6} style={{textAlign: 'center', padding: '20px'}}>No payroll history found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderDocuments = () => (
    <div className="detail-form">
      <div className="section-header">
        <h3 className="form-section-title" style={{border: 'none', marginBottom: 0}}>Documents</h3>
        <button className="btn-primary" style={{width: 'auto', padding: '6px 15px', fontSize: '0.8rem'}} onClick={handleAddDocument}>+ Upload File</button>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px'}}>
        {fullData?.skillDocuments?.length > 0 ? fullData.skillDocuments.map((doc: any) => (
          <div key={doc.id} style={{display: 'flex', alignItems: 'center', padding: '12px', border: '1px solid #f0f0f0', borderRadius: '8px'}}>
            <div style={{backgroundColor: '#f0f4ff', color: '#2563eb', padding: '10px', borderRadius: '6px', marginRight: '12px'}}>
              <IconFile />
            </div>
            <div style={{flex: 1}}>
              <div style={{fontWeight: 600, fontSize: '0.9rem'}}>{doc.fileName}</div>
              <div style={{fontSize: '0.75rem', color: '#666'}}>{doc.type} • {new Date(doc.uploadedAt).toLocaleDateString()}</div>
            </div>
            <button className="action-btn" style={{color: '#666'}}><IconDownload /></button>
          </div>
        )) : (
          <div style={{gridColumn: '1 / span 2', textAlign: 'center', padding: '20px', color: '#999'}}>No documents found.</div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="top-header">
        <div className="header-date">Sept 8, 2025 09:00</div>
      </div>

      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1 className="detail-title">Employee Details</h1>
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
            <h2>{fullData?.fullName || user.fullName || user.name}</h2>
            <p>{fullData?.email || user.email}</p>
            <div style={{marginTop: 8}}>
               <span className="role-badge status-active">{fullData?.workingStatus || 'Active'}</span>
            </div>
          </div>
        </div>

        <div className="detail-tabs">
          <div className={`detail-tab ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>Personal</div>
          <div className={`detail-tab ${activeTab === 'contracts' ? 'active' : ''}`} onClick={() => setActiveTab('contracts')}>Contracts</div>
          <div className={`detail-tab ${activeTab === 'payroll' ? 'active' : ''}`} onClick={() => setActiveTab('payroll')}>Payroll</div>
          <div className={`detail-tab ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => setActiveTab('documents')}>Documents</div>
        </div>

        {loading ? (
          <div style={{padding: '50px', textAlign: 'center'}}>Loading employee details...</div>
        ) : (
          <>
            {activeTab === 'personal' && renderPersonal()}
            {activeTab === 'contracts' && renderContracts()}
            {activeTab === 'payroll' && renderPayroll()}
            {activeTab === 'documents' && renderDocuments()}
          </>
        )}
      </div>
    </div>
  );
}
