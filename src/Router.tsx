import { FC } from "react";
import { Route, Routes } from "react-router";
import Home from "./Home";

const Router: FC = () => {
    return (
    <Routes>
        <Route path="/" element={<Home/>} />
    </Routes>)

} 

export default  Router;