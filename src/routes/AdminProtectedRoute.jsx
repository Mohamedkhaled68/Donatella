import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/userTokenStore";
import { useUserStore } from "../store/userStore";

const AdminProtectedRoute = ({ redirectPath = "/login" }) => {
    const token = useAuthStore((state) => state.authToken);
    const { userStatus } = useUserStore((state) => state);

    if (!token) {
        return <Navigate to={redirectPath} replace />;
    }

    if (!userStatus || userStatus.role !== "ADMIN") {
        return <Navigate to={redirectPath} replace />;
    }

    return (
        <>
            <Outlet />
        </>
    );
};

export default AdminProtectedRoute;
