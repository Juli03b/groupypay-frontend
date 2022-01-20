import { Dashboard } from "@mui/icons-material";
import { FC } from "react";
import { Route, Routes } from "react-router";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Router: FC = () => {
    const isAuth: boolean = false;
    return (
    <Routes>
        {!isAuth && <Route path="/sign-up" element={<SignUp/>} />} // Users must be signed out
        {!isAuth && <Route path="/sign-in" element={<SignIn/>} />} // Users must be signed out
        {isAuth && <Route path="/dashboard" element={<Dashboard/>} />} // Users must be signed in
        {!isAuth && <Route path="/" element={<Home/>} />} // Signed in are redirected to /dashboard
        {isAuth && <Route path="/" element={<Dashboard/>} />} // Signed in are redirected to /dashboard
        
        {/* <404/> */}
    </Routes>)

} 

export default  Router;