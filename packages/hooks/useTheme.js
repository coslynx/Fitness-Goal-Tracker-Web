import { useState, useMemo } from 'react';
import { createTheme } from '@material-ui/core/styles';

const initialTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#673ab7',
    },
  },
});

const useTheme = () => {
  const [theme, setTheme] = useState(initialTheme);

  const changeTheme = useMemo(() => (newTheme) => {
    try {
      setTheme(createTheme({ ...theme, palette: { ...theme.palette, mode: newTheme } }));
    } catch (error) {
      console.error('Error changing theme:', error);
    }
  }, [theme]);

  return { theme, setTheme: changeTheme };
};

export default useTheme;