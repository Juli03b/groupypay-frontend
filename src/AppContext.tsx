import { createContext } from "react";
import { UserTokenProps } from "./interfaces";

interface AppContextProps {
    user: UserTokenProps | undefined;
    // userToken: UserTokenProps | undefined;
    // token?: string | undefined;
    signIn: Function;
    signUp: Function;
    signOut: Function;
    patchUser: Function;
}

export default createContext<AppContextProps>({
    user: undefined,
    // userToken: undefined,
    signIn: Function,
    signUp: Function,
    signOut: Function,
    patchUser: Function
});