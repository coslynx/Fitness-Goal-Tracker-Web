import React, { createContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

// Define the initial theme (light mode as an example)
const initialTheme = createTheme({
  palette: {
    mode: 'light', // 'light' or 'dark'
    primary: {
      main: '#007bff', // Your primary color
    },
    secondary: {
      main: '#673ab7', // Your secondary color
    },
  },
});

// Create the context
const ThemeContext = createContext({
  theme: initialTheme,
  setTheme: () => {},
});

// Create the provider component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme);

  // Function to change the theme
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };