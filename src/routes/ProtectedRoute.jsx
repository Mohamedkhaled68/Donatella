import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/userTokenStore";
import { Navbar } from "../components";

const ProtectedRoute = ({ redirectPath = "/" }) => {
    const token = useAuthStore((state) => state.authToken);

    if (!token) {
        return <Navigate to={redirectPath} replace />;
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default ProtectedRoute;
