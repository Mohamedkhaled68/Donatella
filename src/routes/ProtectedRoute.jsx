import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/userTokenStore";
import useGetCurrentUser from "../hooks/auth/useGetCurrentUser";
import { Loading, Navbar } from "../components";

const ProtectedRoute = ({ redirectPath = "/" }) => {
    const token = useAuthStore((state) => state.authToken);
    const { data: user } = useGetCurrentUser();

    if (!token) {
        return <Navigate to={redirectPath} replace />;
    }

    if (user && user.verifiedEmail) {
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        );
    } else {
        return (
            <div className="w-full h-screen flex justify-center items-center absolute top-0 left-0 z-[10000]">
                <Loading dimensions={{ width: "90", height: "90" }} />;
            </div>
        );
    }
};

export default ProtectedRoute;
