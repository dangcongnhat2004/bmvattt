import { useState } from 'react'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import VerifyIdentity from './components/VerifyIdentity'
import ResetPassword from './components/ResetPassword'
import Dashboard from './components/Dashboard'
import Register from './components/Register'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('token') ? 'dashboard' : 'login';
  });

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onNavigate={setCurrentPage} />
      case 'register':
        return <Register onNavigate={setCurrentPage} />
      case 'forgot':
        return <ForgotPassword onNavigate={setCurrentPage} />
      case 'verify':
        return <VerifyIdentity status="default" onNavigate={setCurrentPage} />
      case 'verify_success':
        return <VerifyIdentity status="success" onNavigate={setCurrentPage} />
      case 'verify_error':
        return <VerifyIdentity status="error" onNavigate={setCurrentPage} />
      case 'reset':
        return <ResetPassword onNavigate={setCurrentPage} />
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />
      default:
        return <Login onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className={currentPage === 'dashboard' ? "app-root-dashboard" : "auth-wrapper"}>
      {renderPage()}
    </div>
  )
}

export default App

