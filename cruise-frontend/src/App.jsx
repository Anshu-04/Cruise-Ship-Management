import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/common/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BookingsManagement from './components/dashboards/BookingsManagement';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import OrdersPage from './pages/Orders';
import Movie from './pages/Movie';
import Resort from './pages/Resort';
import Party from './pages/Party';
import Stationery from './pages/Stationery';
import Fitness from './pages/Fitness';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/orders/catering' element={<OrdersPage/>}/>
          <Route path='/orders/stationery' element={<Stationery/>}/>
          <Route path='/bookings/movie' element={<Movie/>}/>
          <Route path='/bookings/resort' element={<Resort/>}/>
          <Route path='/bookings/fitness' element={<Fitness/>}/>
          <Route path='/bookings/party' element={<Party/>}/>
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Header />
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Header />
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/bookings" element={
            <ProtectedRoute>
              <Header />
              <BookingsManagement />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <Header />
              <AdminPanel />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Header />
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;