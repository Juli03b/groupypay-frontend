import { FC, useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
import AppContext from "./AppContext";
import Dashboard from "./Dashboard";
import Group from "./Group";
import GroupPayment from "./GroupPayment";
import Home from "./Home";
import { useAlert } from "./hooks";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Router: FC = () => {
    const { user } = useContext(AppContext);
    const alert = useAlert();
    const paths: {path: string, signedIn: boolean, component: FC}[] = [
        {path: "/sign-up", signedIn: false, component: SignUp}, 
        {path: "/sign-in", signedIn: false, component: SignIn}, 
        {path: "/dashboard", signedIn: true, component: Dashboard},        
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
        {user && <Route path="/groups/:groupId/payments/:paymentId" element={<GroupPayment />} />}        
        {user && <Route path="/users/:email/groups/:groupId" element={<Group />} />}        
        {!user && <Route path="/" element={<Home/>} />} // Signed in are redirected to /dashboard
        {user && <Route path="/" element={<Navigate replace to={"/dashboard"}/>} />} // Signed in are redirected to /dashboard
        
        <Route path="*" />
    </Routes>)

} 

export default  Router;