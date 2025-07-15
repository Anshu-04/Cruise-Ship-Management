import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-page">
      <div className="container">
        <div className="error-content">
          <div className="error-animation">
            <div className="ship">🚢</div>
            <div className="waves">
              <div className="wave wave1"></div>
              <div className="wave wave2"></div>
              <div className="wave wave3"></div>
            </div>
          </div>
          
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-message">
            Oops! It looks like you've sailed into uncharted waters. 
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="error-actions">
            <Link to="/dashboard" className="btn-primary">
              🏠 Go to Dashboard
            </Link>
            <button onClick={handleGoBack} className="btn-secondary">
              ← Go Back
            </button>
          </div>
          
          <div className="help-links">
            <h3>Need help navigating?</h3>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .not-found-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .container {
          max-width: 600px;
          width: 100%;
        }

        .error-content {
          background: white;
          border-radius: 20px;
          padding: 3rem;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: relative;
        }

        .error-animation {
          position: relative;
          height: 120px;
          margin-bottom: 2rem;
        }

        .ship {
          font-size: 4rem;
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          animation: float 3s ease-in-out infinite;
        }

        .waves {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40px;
          overflow: hidden;
        }

        .wave {
          position: absolute;
          bottom: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(45deg, #3498db, #5dade2);
          border-radius: 50%;
          animation: wave 2s ease-in-out infinite;
        }

        .wave1 {
          animation-delay: 0s;
          opacity: 0.3;
        }

        .wave2 {
          animation-delay: -0.5s;
          opacity: 0.5;
        }

        .wave3 {
          animation-delay: -1s;
          opacity: 0.7;
        }

        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }

        @keyframes wave {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-5px); }
        }

        .error-code {
          font-size: 6rem;
          font-weight: bold;
          color: #e74c3c;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .error-title {
          font-size: 2rem;
          color: #2c3e50;
          margin: 1rem 0;
          font-weight: 600;
        }

        .error-message {
          font-size: 1.1rem;
          color: #7f8c8d;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #3498db;
          color: white;
          text-decoration: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary:hover {
          background: #2980b9;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
        }

        .btn-secondary {
          background: #95a5a6;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-secondary:hover {
          background: #7f8c8d;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(149, 165, 166, 0.4);
        }

        .help-links {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #ecf0f1;
        }

        .help-links h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .help-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .help-links li {
          margin: 0;
        }

        .help-links a {
          color: #3498db;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .help-links a:hover {
          color: #2980b9;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .not-found-page {
            padding: 1rem;
          }

          .error-content {
            padding: 2rem;
          }

          .error-code {
            font-size: 4rem;
          }

          .error-title {
            font-size: 1.5rem;
          }

          .error-message {
            font-size: 1rem;
          }

          .error-actions {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            max-width: 250px;
            justify-content: center;
          }

          .help-links ul {
            flex-direction: column;
            gap: 1rem;
          }

          .ship {
            font-size: 3rem;
          }
        }

        @media (max-width: 480px) {
          .error-code {
            font-size: 3rem;
          }

          .error-title {
            font-size: 1.25rem;
          }

          .ship {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;