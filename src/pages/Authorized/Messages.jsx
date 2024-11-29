import React, { useState, useRef, useEffect } from "react";
import { ChatWindow, ChatList } from "../../components";
import useMessagesStore from "../../store/useMessagesStore";
import useGetMessages from "../../hooks/chat/useGetMessages";
import useAuthStore from "../../store/userTokenStore";
import { io } from "socket.io-client";

const Messages = () => {
    const [currentChat, setCurrentChat] = useState(null);
    const messagesEndRef = useRef(null);
    const {
        receivedMessage,
        setReceivedMessage,
        messagesList,
        setMessagesList,
    } = useMessagesStore((state) => state);

    const { mutateAsync: getMessages } = useGetMessages();

    const token = useAuthStore((state) => state.authToken);

    // const handleOpenChat = (id) => {
    //     const chat = receivedMessages.filter((i) => i.chatId === id);
    //     setCurrentChat(...chat);
    // };

    useEffect(() => {
        if (!receivedMessage) return;

        getMessages({
            targetId: receivedMessage.chatId,
            message: receivedMessage.content,
        })
            .then((res) => {
                const messages = res.data.items;
                setMessagesList(messages);
            })
            .catch((err) => {
                console.error("Error fetching messages:", err);
            });
    }, []);

    useEffect(() => {
        const socket = io("https://api.quickr.tech", {
            transports: ["polling", "websocket"],
            extraHeaders: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        socket.on("connect", () => {
            console.log(socket);

            console.log("Socket connected:", socket.id);
        });

        socket.on("CREATE_MESSAGE", (data) => {
            console.log(data);
        });
    }, []);

    return (
        <section className="w-full h-[calc(100vh-60px)] flex justify-center items-center pb-7">
            <div className="container mx-auto by-5 h-full flex pt-5 gap-10">
                {/* Chat List */}
                <ChatList
                    // handleOpenChat={handleOpenChat}
                    currentChat={currentChat}
                />

                {/* Chat Window */}
                <ChatWindow
                    currentChat={currentChat}
                    messagesEndRef={messagesEndRef}
                    setReceivedMessage={setReceivedMessage}
                />
            </div>
        </section>
    );
};

export default Messages;
