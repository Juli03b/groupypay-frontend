import { Typography } from "@mui/material";
import { FC, useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
import AppContext from "./AppContext";
import Dashboard from "./Dashboard";
import Group from "./Group";
import GroupPayment from "./GroupPayment";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Profile";
import { UserTokenProps } from "./interfaces";
import NotFound from "./NotFound";

const Router: FC = () => {
    const { user }: {user: UserTokenProps | undefined} = useContext(AppContext);
    const paths: {path: string, signedIn: boolean, component: FC}[] = [
        {path: "/sign-up", signedIn: false, component: SignUp}, 
        {path: "/sign-in", signedIn: false, component: SignIn}, 
        {path: "/dashboard", signedIn: true, component: Dashboard},        
        {path: "/profile/:email", signedIn: true, component: () => <Profile />},        
    ]
    return (
    <Routes>
        {paths.map((path, idx) => {
            if (!path.signedIn && !user){
                // Non restricted path, not signed in -> load component
                return <Route path={path.path} element={<path.component />} key={idx} />
            }
            if ((!path.signedIn && user) || (path.signedIn && !user)) {
                // Non restricted path, signed in or restricted path, not signed in -> redirect to home page
                return <Route path={path.path} element={<Navigate replace to={"/"} />} key={idx} />
            }
            // Restricted path, signed in
             return <Route path={path.path} element={<path.component />} key={idx} />

        })}
        {user && <Route path="/users/:email/groups/:groupId/payments/:paymentId" element={<GroupPayment />} />}        
        {<Route path="/users/:email/groups/:groupId" element={<Group />} />}
        {!user && <Route path="/" element={<Home/>} />} // Signed in are redirected to /dashboard
        {user && <Route path="/" element={<Navigate replace to={"/dashboard"}/>} />} // Signed in are redirected to /dashboard
        
        <Route path="*" element={<NotFound />} />
    </Routes>)

} 

export default  Router;