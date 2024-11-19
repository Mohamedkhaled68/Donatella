import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/userTokenStore";

const ProtectedRoute = ({ redirectPath = "/", children }) => {
    const token = useAuthStore((state) => state.authToken);

    if (!token) {
        return <Navigate to={redirectPath} replace />;

    }

    // If children are provided, render them; otherwise, render an Outlet for nested routes
    return children || <Outlet />;
};

export default ProtectedRoute;
