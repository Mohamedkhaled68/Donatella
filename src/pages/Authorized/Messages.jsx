import React, { useState, useRef, useEffect } from "react";
import { ChatWindow, ChatList, Rating, ToRating } from "../../components";
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
    const [reviewModal, setReviewModal] = useState(false);

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
            return chat.id === id;
        });
        setCurrentChat(currentChat);
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getMessages();
                console.log(data.items);
                setMessagesList([...data.items]);
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

    useEffect(() => {
        if (reviewModal) {
            document.documentElement.style.overflowY = "hidden";
        } else {
            document.documentElement.style.overflowY = "unset";
        }

        return () => {
            document.documentElement.style.overflowY = "unset";
        };
    }, [reviewModal]);

    return (
        <section className="relative w-full h-[calc(100vh-60px)] flex justify-center items-center">
            {reviewModal && (
                <div className="absolute z-[100000] top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-[30%] p-4 bg-blue-600 text-white rounded-xl shadow-lg">
                        <div className="flex justify-between items-center space-x-1 my-2">
                            <div className="text-2xl font-bold">
                                Review Client:
                            </div>
                            <ToRating maxRating={5} size={28} />
                        </div>
                        <div className="text-sm">$17/HR - Cairo - 7 Days</div>
                        <textarea
                            className="mt-2 text-black text-sm w-full resize-none rounded-md outline-none border-none p-2"
                            rows={7}
                        />
                        <p className="mt-2 text-gray-300 text-xs">
                            Sending a review will mark payment as complete,
                            close, and end the contract.
                        </p>
                        <div className="mt-4 flex justify-between">
                            <button
                                className="bg-background-dark rounded-3xl py-2 px-12 text-white-base"
                                onClick={() => setReviewModal(false)}
                            >
                                Back
                            </button>
                            <button className="bg-white-base rounded-3xl py-2 px-12 text-background-dark">
                                Accept & Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="container mx-auto py-5 h-full flex pt-5 gap-10">
                <ChatList
                    currentChat={currentChat}
                    messagesList={messagesList}
                    handleOpenChat={handleOpenChat}
                />
                <ChatWindow
                    setReviewModal={setReviewModal}
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
