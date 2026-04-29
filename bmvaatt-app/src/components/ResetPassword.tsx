

interface Props {
  onNavigate: (page: string) => void;
}

export default function ResetPassword({ onNavigate }: Props) {
  return (
    <div className="app-container">
      <div className="auth-card">
        <a className="back-link" onClick={() => onNavigate('login')}>
          ← Back to Login
        </a>

        <div className="logo-container">
          <div className="logo-text">
            HITOCORE
          </div>
        </div>
        
        <div className="auth-subtitle-group">
          <div className="auth-subtitle">Human Resources Management System</div>
          <div className="auth-subtitle-secondary">Password Reset</div>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onNavigate('login'); }}>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input type="password" className="form-input" placeholder="********" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <input type="password" className="form-input" placeholder="********" />
          </div>
          
          <button type="submit" className="btn-primary">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
