import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  if (!user) {
    return null; // Don't show header if not authenticated
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/dashboard">
            <h2>🚢 CruiseManager</h2>
          </Link>
        </div>
        
        <nav className="nav-menu">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActiveLink('/dashboard')}`}
          >
            Dashboard
          </Link>
          
          {user.role === 'admin' && (
            <Link 
              to="/admin" 
              className={`nav-link ${isActiveLink('/admin')}`}
            >
              Admin Panel
            </Link>
          )}
          
          <Link 
            to="/profile" 
            className={`nav-link ${isActiveLink('/profile')}`}
          >
            Profile
          </Link>
        </nav>

        <div className="user-info">
          <span className="user-welcome">
            Welcome, {user.name || user.username}
          </span>
          <span className="user-role">({user.role})</span>
          <button 
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>

      <style jsx>{`
        .header {
          background: background: linear-gradient(135deg, #ff6ba3 0%, #ff3d81 100%);;
          color: white;
          padding: 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo h2 {
          margin: 0;
          color: white;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .logo a {
          text-decoration: none;
          color: white;
        }

        .nav-menu {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .nav-link:hover {
          background-color: rgba(255,255,255,0.1);
          transform: translateY(-1px);
        }

        .nav-link.active {
          background-color: rgba(255,255,255,0.2);
          font-weight: bold;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-welcome {
          font-weight: 500;
        }

        .user-role {
          font-size: 0.9rem;
          opacity: 0.8;
          font-style: italic;
        }

        .logout-btn {
          background: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .logout-btn:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .header-container {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }

          .nav-menu {
            order: 2;
            gap: 1rem;
          }

          .user-info {
            order: 1;
            font-size: 0.9rem;
          }

          .user-welcome {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;