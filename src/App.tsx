import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC } from 'react';
import Nav from './Nav';
import Router from './Router';

const customStyle = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: 'white'
    },
  },
  typography: {
    fontSize: 20
  }
});

const App: FC = () => {
  return (
    <ThemeProvider theme={customStyle}>
      <CssBaseline enableColorScheme />
        <Nav />
          <Router />


    </ThemeProvider>
  );
}

export default App;