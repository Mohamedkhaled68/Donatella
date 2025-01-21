import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/userTokenStore";
import { useUserStore } from "../store/userStore";

const ProtectedRoute = ({ redirectPath = "/" }) => {
    const token = useAuthStore((state) => state.authToken);
    const { userStatus } = useUserStore((state) => state);

    if (!token || !userStatus.onboardingCompleted) {
        return <Navigate to={redirectPath} replace />;
    }

    return (
        <>
            <Outlet />
        </>
    );
};

export default ProtectedRoute;
