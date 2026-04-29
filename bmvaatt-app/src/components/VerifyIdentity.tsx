

interface Props {
  onNavigate: (page: string) => void;
  status?: 'default' | 'success' | 'error';
}

export default function VerifyIdentity({ onNavigate, status = 'default' }: Props) {
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
        
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          if (status === 'default') onNavigate('verify_success');
          else if (status === 'success') onNavigate('verify_error');
          else onNavigate('reset');
        }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input readonly" 
              value="abc@hitocore.co.jp"
              readOnly
            />
          </div>

          <div className="form-group">
            <label className="form-label">Employee ID</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder={status === 'default' ? "Please enter your Employee ID" : ""}
              value={status !== 'default' ? "E10123" : undefined}
              readOnly={status !== 'default'}
            />
          </div>

          {status === 'success' && (
            <div className="message-success">
              A password reset link has been sent to your email
            </div>
          )}

          {status === 'error' && (
            <div className="message-error">
              Authentication failed<br />
              * If you enter incorrectly 3 times, your password will be automatically reset
            </div>
          )}
          
          <button type="submit" className="btn-primary">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
