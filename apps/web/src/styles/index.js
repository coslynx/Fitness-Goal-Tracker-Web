import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@emotion/react';

function globalStyles() {
  return {
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      fontFamily: 'Roboto, sans-serif',
      backgroundColor: '#121212',
      color: '#fff',
      margin: 0,
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    h1, h2, h3, h4, h5, h6: {
      fontWeight: 700,
    },
  };
}

function buttonStyles() {
  return {
    '.MuiButton-root': {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '1rem 2rem',
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: '#0056b3',
      },
    },
  };
}

function inputStyles() {
  return {
    '.MuiTextField-root': {
      marginBottom: '1rem',
      width: '100%',
    },
    '.MuiOutlinedInput-root': {
      borderRadius: '4px',
    },
  };
}

export default function AppStyles({ children }) {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#007bff',
      },
      secondary: {
        main: '#673ab7',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <style jsx>{globalStyles()}</style>
      {children}
      <style jsx>{buttonStyles()}</style>
      <style jsx>{inputStyles()}</style>
    </ThemeProvider>
  );
}