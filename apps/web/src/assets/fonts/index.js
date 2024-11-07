import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { GlobalStyles } from '@emotion/react';
import { styled } from '@emotion/styled'; 

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif', 
  },
});

const GlobalStyle = styled(GlobalStyles)`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
`; 

const FontProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default FontProvider;