import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useUserStore } from "../../store/userStore";
import { breakLongWords, formatChatDate } from "../../utils/helpers";
import Message from "./Message";
import useGetChatMessages from "../../hooks/chat/useGetChatMessages";
import SendMessageContainer from "./SendMessageContainer";
import ReviewModal from "./ReviewModal";

const ChatWindow = ({ currentChat, error, setReviewModal, reviewModal }) => {
    const [jobRequest, setJobRequest] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);

    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const userStatus = useUserStore((state) => state.userStatus);
    const { mutateAsync: getChatMessages } = useGetChatMessages();

    const fetchMessages = async () => {
        if (!currentChat) return;
        try {
            const chatData = await getChatMessages(currentChat?.id);
            setChatMessages(chatData?.items?.reverse());
        } catch (err) {
            console.error("Error fetching messages:", err);
        }
    };

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        setTimeout(() => scrollToBottom(), 6000);
    }, [currentChat]);

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
        if (chatMessages.length > 0) {
            chatMessages.forEach((message) => {
                if (message.messageType === "REQUEST" && message.jobRequest.requestStatus !== "PENDING") {
                    setJobRequest((prevJobRequests) => {
                        if (
                            prevJobRequests.every(
                                (req) =>
                                    req.job.id !== message.jobRequest.job.id
                            )
                        ) {
                            return [...prevJobRequests, message.jobRequest];
                        }
                        return prevJobRequests;
                    });
                }
            });
        }
    }, [chatMessages]);

    // useEffect(() => {
    //     console.log(jobRequest);
    // });

    if (!currentChat) {
        return (
            <div className="w-[70%] h-full flex justify-center items-center p-4 rounded-lg bg-[#313131]">
                <div className="flex flex-col items-center justify-center gap-5 text-center">
                    <h1 className="drop-shadow text-5xl text-white/90 font-display italic font-bold">
                        Welcome to Donatella Chat
                    </h1>
                    <p className="text-sm font-light italic w-[70%] mx-auto font-body text-white-base/70">
                        Stay connected with your friends and colleagues in one
                        seamless platform. Start meaningful conversations, share
                        updates, and make every interaction count.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            {reviewModal && <ReviewModal setReviewModal={setReviewModal} jobRequest={jobRequest}/>}
            <div className="w-[70%] relative overflow-hidden h-full p-4 rounded-lg bg-[#313131] flex flex-col">
                {/* Header */}
                <div className="border-b-thin border-white-base flex justify-between items-center pb-2 w-full">
                    <div className="flex items-center  gap-3">
                        <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full flex justify-center items-center bg-zinc-700">
                            {currentChat.friend.profilePicture ? (
                                <img
                                    src={currentChat.friend.profilePicture}
                                    alt={currentChat.friend.name}
                                    className="max-w-full h-full object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = "none";
                                    }}
                                />
                            ) : (
                                <FaUser
                                    className="text-[#9e9e9ebd]"
                                    size={20}
                                />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-white-base font-display text-[16px] font-bold">
                                {currentChat.friend.name}
                            </h2>
                            <p className="text-white-base/70 font-body text-sm font-extralight">
                                online
                            </p>
                        </div>
                    </div>
                    {userStatus?.organization && jobRequest.length === 0 && (
                        <button
                            type="button"
                            onClick={() => setReviewModal(true)}
                            className="bg-background-dark rounded-3xl py-3 px-12 text-white-base"
                        >
                            Finish Job
                        </button>
                    )}
                </div>

                {/* Messages */}
                <div
                    ref={messagesContainerRef}
                    className="relative h-full w-full grow overflow-y-auto px-3 custom-scrollbar scroll-smooth"
                >
                    <div className="flex w-full flex-col justify-end">
                        {error && (
                            <div className="text-red-500 text-center py-2 text-sm">
                                {error}
                            </div>
                        )}
                        {chatMessages.map((message) => (
                            <Message
                                key={message?.id}
                                message={breakLongWords(message?.content)}
                                timestamp={formatChatDate(message?.createdAt)}
                                isSender={message?.sender?.id === userStatus.id}
                                type={message?.messageType}
                                jobRequest={message?.jobRequest}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <SendMessageContainer
                    inputRef={inputRef}
                    fetchMessages={fetchMessages}
                />
            </div>
        </>
    );
};

export default ChatWindow;
