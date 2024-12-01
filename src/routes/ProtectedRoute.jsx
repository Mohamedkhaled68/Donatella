import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/userTokenStore";
import { Navbar } from "../components";
import useSocketStore from "../store/useSocketStore";
import { io } from "socket.io-client";

const ProtectedRoute = ({ redirectPath = "/" }) => {
    const token = useAuthStore((state) => state.authToken);
    const { setSocket } = useSocketStore((state) => state);

    if (!token) {
        return <Navigate to={redirectPath} replace />;
    }

    // useEffect(() => {
    //     const newSocket = io("https://api.quickr.tech", {
    //         transports: ["polling", "websocket"],
    //         extraHeaders: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //         },
    //     });

    //     newSocket.on("connect", () => {
    //         console.log("Socket connected:", newSocket.id);
    //     });

    //     setSocket(newSocket);

    //     console.log(
    //         newSocket.on("CREATE_MESSAGE", (data) => {
    //             console.log("New message received:", data);
    //         })
    //     );

    //     newSocket.on("CREATE_MESSAGE", (data) => {
    //         console.log("New message received:", data);
    //     });

    //     newSocket.on("disconnect", () => {
    //         console.log("Socket disconnected");
    //     });

    //     return () => {
    //         newSocket.disconnect();
    //     };
    // }, [token]);
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default ProtectedRoute;
