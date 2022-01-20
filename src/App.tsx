import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { colors, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC } from 'react';
import Navigation from './Nav';
import Router from './Router';
import { makeStyles } from '@mui/styles';
import { SnackbarProvider } from 'notistack';

const customStyle = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: 'white'
    },
  },
  typography: {
    fontSize: 15
  }
});
const useStyles = makeStyles({
  warning: {
    backgroundColor: colors.yellow[500],
  },
  info: {
    background: colors.blue[900]
  }
});
const App: FC = () => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={customStyle}>
      <CssBaseline enableColorScheme />
        <SnackbarProvider 
          classes={{
            variantWarning: classes.warning,
            variantInfo: classes.info,
          }}
          maxSnack={1}
        >
          <Navigation />
          <Container>
            <Router />
          </Container>
        </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;