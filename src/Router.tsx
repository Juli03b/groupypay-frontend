import { FC, useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
import AppContext from "./AppContext";
import Dashboard from "./Dashboard";
import Group from "./Group";
import GroupPayment from "./GroupPayment";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Router: FC = () => {
    const { user } = useContext(AppContext);
    return (
    <Routes>
        {!user && <Route path="/sign-up" element={<SignUp/>} />} // Users must be signed out
        {!user && <Route path="/sign-in" element={<SignIn/>} />} // Users must be signed out
        {user && <Route path="/dashboard" element={<Dashboard/>} />} // Users must be signed in
        {user && <Route path="/groups/:groupId/payments/:paymentId" element={<GroupPayment />} />}        
        {user && <Route path="/users/:email/groups/:groupId" element={<Group />} />}        
        {!user && <Route path="/" element={<Home/>} />} // Signed in are redirected to /dashboard
        {user && <Route path="/" element={<Navigate replace to={"/dashboard"}/>} />} // Signed in are redirected to /dashboard
        
        <Route path="*" />
        {/* <404/> */}
    </Routes>)

} 

export default  Router;