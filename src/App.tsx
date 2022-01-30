import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { colors, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import Navigation from './Nav';
import Router from './Router';
import { makeStyles } from '@mui/styles';
import { SnackbarProvider } from 'notistack';
import AppContext from './AppContext';
import { GroupCreateProps, UserCreateProps, UserPatchProps, UserSignInProps, UserTokenProps } from './interfaces';
import GroupypayApi from './GroupypayApi';
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";

const setLocalStorageToken = (token: string): void => localStorage.setItem("token", JSON.stringify(token));

const customStyle = createTheme({
  palette: {
    action: {
      active: colors.common.black,
    },
    primary: {
      main: '#000000',
      contrastText: 'white',
    },
  },
  typography: {
    fontSize: 18,
    caption: {
      fontSize: 17
    }
  },
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
  const [token, setTokenState] = useState<string | undefined>(GroupypayApi.token || undefined);
  const [user, setUser] = useState<UserTokenProps | undefined>(token ? jwtDecode<UserTokenProps>(token): undefined);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    setTokenState(GroupypayApi.token || undefined)
    if (token) {
      const {sub}: {sub: any} = jwtDecode(token)

      setUser(sub);
    };

  }, [token]);

  const setToken = (token: any) => {
    setTokenState(token);
    GroupypayApi.token = token;
  }

  // Sign up - use api to create user with form data,
  // api retrieves token, which is stored in react state and local storage
  const signUp = async (formData: UserCreateProps, setMessage: any): Promise<void> => {
    try {
      const { token, warning }: {token: string, warning: string | undefined} = await GroupypayApi.signUp(formData);
      warning && setMessage(warning, "warning");
      setLocalStorageToken(token);
      setToken(token);
      navigate("/dashboard");
    } catch ([msg]: any) {
      setMessage(msg, "error")
    }
  }

  // Sign in - use api to retrieve user token,
  // set token state, and set token in LocalStorage
  const signIn = async (formData: UserSignInProps, setError: (msg: string) => void): Promise<void> => {
    try {
      const {token, warning}: {token: string, warning: string | undefined} = await GroupypayApi.signIn(formData);
      setLocalStorageToken(token);
      setToken(token);
      navigate("/")
    } catch ([msg]: any) {
      if (typeof(msg) == "string") {
        setError(msg);
      }
    }
  }

  // Sign out - set user state and token state to undefined,
  // remove token from local storage, then navigate to home page
  const signOut = (): void => {
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem("token");
    navigate("/");
  }

  // Patch user - change user's information,
  // api retrieves new user's info
  const patchUser = async (formData: UserPatchProps, setError: (msg: string) => void, setSuccess: () => void): Promise<void> => {
    if(!user) return;
    try{
      const { user: patchedUser }: { user: UserPatchProps } = await GroupypayApi.patchUser(user.email, formData);
      const fullUser: UserTokenProps = {
        name: patchedUser.name,
        email: patchedUser.email,
        phoneNumber: patchedUser.phoneNumber
      }
      setUser(fullUser);
      setSuccess();
    }catch([msg]){
      if (typeof(msg) == "string") {
        setError(msg);
      }
    }
  }

  // Create group
  const makeGroup = async (groupFromForm: GroupCreateProps) => {
    if (!user) return;
    try{
      console.log(groupFromForm)
      const group = await GroupypayApi.makeGroup(user?.email, groupFromForm);
      return group;

    }catch(msg){
      console.log("msg", msg)
      
    }
  }

  return (
    <AppContext.Provider value={{user, signUp, signIn, patchUser, signOut, makeGroup}}>
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
    </AppContext.Provider>
  );
}

export default App;