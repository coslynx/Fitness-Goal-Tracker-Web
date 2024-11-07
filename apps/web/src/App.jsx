import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@components/layout/Header.jsx';
import Footer from '@components/layout/Footer.jsx';
import Home from '@components/pages/Home.jsx';
import Goals from '@components/pages/Goals.jsx';
import GoalDetails from '@components/pages/GoalDetails.jsx';
import Dashboard from '@components/pages/Dashboard.jsx';
import Settings from '@components/pages/Settings.jsx';
import Profile from '@components/pages/Profile.jsx';
import NotFound from '@components/pages/NotFound.jsx';
import { useAuth } from '@hooks/useAuthContext';
import './App.css';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/goals/:goalId" element={<GoalDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;