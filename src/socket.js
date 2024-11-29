import { io } from "socket.io-client";


export const createSocketConnection = (token) => {
    if (!token) {
        console.warn("No authentication token found.");
        return null;
    }

    try {
        const socket = io("https://api.quickr.tech", {
            transports: ["polling", "websocket"],
            extraHeaders: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected.");
        });

        return socket;
    } catch (error) {
        console.error("Error establishing WebSocket connection:", error);
        return null;
    }
};
