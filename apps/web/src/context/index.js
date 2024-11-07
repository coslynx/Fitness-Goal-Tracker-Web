import React from 'react';
import { AuthContext, AuthProvider } from './AuthContext';
import { ThemeContext, ThemeProvider } from './ThemeContext';

const ContextsWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default ContextsWrapper;