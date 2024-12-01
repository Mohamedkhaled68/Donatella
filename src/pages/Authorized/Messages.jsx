import React, { useState, useRef, useEffect } from "react";
import { ChatWindow, ChatList } from "../../components";
import useMessagesStore from "../../store/useMessagesStore";
import useGetMessages from "../../hooks/chat/useGetMessages";

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
    }, [receivedMessage, getMessages, setMessagesList]);

    return (
        <section className="w-full h-[calc(100vh-60px)] flex justify-center items-center pb-7">
            <div className="container mx-auto by-5 h-full flex pt-5 gap-10">
                <ChatList
                    currentChat={currentChat}
                    messagesList={messagesList}
                />
                <ChatWindow
                    currentChat={currentChat}
                    messagesEndRef={messagesEndRef}
                />
            </div>
        </section>
    );
};

export default Messages;
