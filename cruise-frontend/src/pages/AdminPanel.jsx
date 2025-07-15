import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [cruises, setCruises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Fetch data
  useEffect(() => {
    fetchUsers();
    fetchCruises();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const fetchCruises = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/cruises', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCruises(data.cruises || []);
      }
    } catch (err) {
      console.error('Error fetching cruises:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setUsers(users.filter(u => u.id !== userId));
      } else {
        setError('Failed to delete user');
      }
    } catch (err) {
      setError('Error deleting user');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ role: newRole })
      });

      if (response.ok) {
        setUsers(users.map(u => 
          u.id === userId ? { ...u, role: newRole } : u
        ));
      } else {
        setError('Failed to update user role');
      }
    } catch (err) {
      setError('Error updating user role');
    }
  };

  const UserManagement = () => (
    <div className="management-section">
      <h3>User Management</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Users</h4>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h4>Admins</h4>
          <p>{users.filter(u => u.role === 'admin').length}</p>
        </div>
        <div className="stat-card">
          <h4>Managers</h4>
          <p>{users.filter(u => u.role === 'manager').length}</p>
        </div>
        <div className="stat-card">
          <h4>Staff</h4>
          <p>{users.filter(u => u.role === 'staff').length}</p>
        </div>
      </div>
      
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="role-select"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="staff">Staff</option>
                    <option value="voyager">Voyager</option>
                  </select>
                </td>
                <td>
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CruiseManagement = () => (
    <div className="management-section">
      <h3>Cruise Management</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Cruises</h4>
          <p>{cruises.length}</p>
        </div>
        <div className="stat-card">
          <h4>Active</h4>
          <p>{cruises.filter(c => c.status === 'active').length}</p>
        </div>
        <div className="stat-card">
          <h4>Completed</h4>
          <p>{cruises.filter(c => c.status === 'completed').length}</p>
        </div>
        <div className="stat-card">
          <h4>Cancelled</h4>
          <p>{cruises.filter(c => c.status === 'cancelled').length}</p>
        </div>
      </div>
      
      <div className="table-container">
        <table className="cruises-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Destination</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {cruises.map(cruise => (
              <tr key={cruise.id}>
                <td>{cruise.id}</td>
                <td>{cruise.name}</td>
                <td>{cruise.destination}</td>
                <td>{cruise.startDate}</td>
                <td>{cruise.endDate}</td>
                <td>
                  <span className={`status-badge ${cruise.status}`}>
                    {cruise.status}
                  </span>
                </td>
                <td>{cruise.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <p>Manage users, cruises, and system settings</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={`tab ${activeTab === 'cruises' ? 'active' : ''}`}
          onClick={() => setActiveTab('cruises')}
        >
          Cruises
        </button>
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'cruises' && <CruiseManagement />}
        {activeTab === 'settings' && (
          <div className="management-section">
            <h3>System Settings</h3>
            <p>Settings panel coming soon...</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-panel {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-header {
          margin-bottom: 2rem;
        }

        .admin-header h2 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .admin-header p {
          color: #7f8c8d;
        }

        .tabs {
          display: flex;
          border-bottom: 2px solid #ecf0f1;
          margin-bottom: 2rem;
        }

        .tab {
          padding: 1rem 2rem;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: #7f8c8d;
          transition: all 0.3s ease;
        }

        .tab:hover {
          color: #2c3e50;
        }

        .tab.active {
          color: #3498db;
          border-bottom-color: #3498db;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: center;
        }

        .stat-card h4 {
          margin-bottom: 0.5rem;
          color: #7f8c8d;
          font-size: 0.9rem;
        }

        .stat-card p {
          font-size: 2rem;
          font-weight: bold;
          color: #2c3e50;
          margin: 0;
        }

        .table-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .users-table, .cruises-table {
          width: 100%;
          border-collapse: collapse;
        }

        .users-table th, .cruises-table th {
          background: #f8f9fa;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #2c3e50;
          border-bottom: 1px solid #dee2e6;
        }

        .users-table td, .cruises-table td {
          padding: 1rem;
          border-bottom: 1px solid #dee2e6;
        }

        .users-table tr:hover, .cruises-table tr:hover {
          background: #f8f9fa;
        }

        .role-select {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        }

        .delete-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .delete-btn:hover {
          background: #c0392b;
        }

        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .status-badge.active {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.completed {
          background: #cce5ff;
          color: #004085;
        }

        .status-badge.cancelled {
          background: #f8d7da;
          color: #721c24;
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          font-size: 1.2rem;
          color: #7f8c8d;
        }

        @media (max-width: 768px) {
          .admin-panel {
            padding: 1rem;
          }

          .tabs {
            flex-direction: column;
          }

          .tab {
            padding: 0.75rem;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .table-container {
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;