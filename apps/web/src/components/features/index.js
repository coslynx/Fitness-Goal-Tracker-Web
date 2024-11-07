import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 

// Import pages
import Home from '@components/pages/Home.jsx';
import Goals from '@components/pages/Goals.jsx';
import GoalDetails from '@components/pages/GoalDetails.jsx';
import Dashboard from '@components/pages/Dashboard.jsx';
import Settings from '@components/pages/Settings.jsx';
import Profile from '@components/pages/Profile.jsx';
import NotFound from '@components/pages/NotFound.jsx';

// Import Auth context
import { useAuth } from '@hooks/useAuthContext';

const Pages = () => {
  const { isAuthenticated, loading } = useAuth(); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} /> 

      {/* Protected routes */
      <Route 
        path="/goals" 
        element={isAuthenticated ? <Goals /> : <Navigate to="/" replace />} 
      />

      <Route 
        path="/goals/:goalId" 
        element={isAuthenticated ? <GoalDetails /> : <Navigate to="/" replace />} 
      />

      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />} 
      />

      <Route 
        path="/settings" 
        element={isAuthenticated ? <Settings /> : <Navigate to="/" replace />} 
      />

      <Route 
        path="/profile" 
        element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} 
      />

      {/* Catch-all route */
      <Route path="*" element={<NotFound />} /> 
    </Routes>
  );
};

export default Pages;