import { createTheme } from '@material-ui/core/styles';

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

export default theme;