import React, { useState, useRef, useEffect } from "react";
import { ChatWindow, ChatList } from "../../components";
import useGetMessages from "../../hooks/chat/useGetMessages";
import useGetChatMessages from "../../hooks/chat/useGetChatMessages";
import useSendMessage from "../../hooks/chat/useSendMessage";

const Messages = () => {
    const [currentChat, setCurrentChat] = useState(null);
    const [messagesList, setMessagesList] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [input, setInput] = useState("");

    const messagesEndRef = useRef(null);

    const messagesContainerRef = useRef(null);

    const { mutateAsync: getMessages } = useGetMessages();

    const { mutateAsync: getChatMessages } = useGetChatMessages();
    const { mutateAsync: sendMessage } = useSendMessage();

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    // const scrollToBottom = () => {
    //     if (messagesContainerRef.current) {
    //         const element = messagesContainerRef.current;
    //         requestAnimationFrame(() => {
    //             element.scrollTop = element.scrollHeight;
    //         });
    //     }
    // };

    const fetchMessages = async () => {
        if (!currentChat) return;
        setIsLoading(true);
        try {
            const chatData = await getChatMessages(currentChat?.id);
            setChatMessages(chatData?.items?.reverse());
        } catch (err) {
            console.error("Error fetching messages:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) return;
        setIsLoading(true);
        setError(null);
        try {
            setInput("");
            await sendMessage({
                chatId: currentChat.friend.id,
                message: trimmedInput,
            })
                .then(() => {
                    fetchMessages();
                })
                .then(() => {
                    setTimeout(() => scrollToBottom(), 2000);
                    console.log("scrolled");
                });
        } catch (err) {
            setError("Failed to send message. Please try again.");
            console.error("Send message error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChat = (id) => {
        const currentChat = messagesList.find((chat) => {
            const chatData = Array.isArray(chat) ? chat[0] : chat;
            return chatData.id === id;
        });
        setCurrentChat(currentChat[0]);
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getMessages();
                console.log(data.items);
                setMessagesList([data.items]);
            } catch (err) {
                console.log(err);
            }
        };

        // Initial fetch
        fetchMessages();

        // Set interval to fetch messages every 2 seconds
        const intervalId = setInterval(fetchMessages, 2000);

        // Cleanup: clear the interval when the component is unmounted
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const fetchMessagesInterval = setInterval(() => {
            fetchMessages();
        }, 2000); // Run every 2 seconds

        // Cleanup the interval when the component unmounts or currentChat changes
        return () => {
            clearInterval(fetchMessagesInterval);
        };
    }, [currentChat]); // Dependency array to run the effect when currentChat changes

    return (
        <section className="w-full h-[calc(100vh-60px)] flex justify-center items-center">
            <div className="container mx-auto py-5 h-full flex pt-5 gap-10">
                <ChatList
                    currentChat={currentChat}
                    messagesList={messagesList}
                    handleOpenChat={handleOpenChat}
                />
                <ChatWindow
                    key={currentChat?.id}
                    currentChat={currentChat}
                    messagesEndRef={messagesEndRef}
                    chatMessages={chatMessages}
                    handleSendMessage={handleSendMessage}
                    input={input}
                    setInput={setInput}
                    isLoading={isLoading}
                    error={error}
                    messagesContainerRef={messagesContainerRef}
                    scrollToBottom={scrollToBottom}
                />
            </div>
        </section>
    );
};

export default Messages;
