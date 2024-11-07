import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Material Blue
    },
    secondary: {
      main: '#673ab7', // Purple
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </ThemeProvider>
  );
};

const MainContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/goals" element={<Goals />} />
      {/* Add more routes for other pages */}
    </Routes>
  );
};

export default Layout;