

interface Props {
  onNavigate: (page: string) => void;
}

export default function ForgotPassword({ onNavigate }: Props) {
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
        
        <form onSubmit={(e) => { e.preventDefault(); onNavigate('verify'); }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              value="abc@hitocore.co.jp"
              readOnly
            />
          </div>
          
          <button type="submit" className="btn-primary">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
