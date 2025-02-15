import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { useUserStore } from "../../store/userStore";

const formatChatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    return date.toLocaleString(undefined, options);
};

const Message = ({ message, timestamp, isSender }) => (
    <div
        className={`my-[10px] max-w-[60%] w-fit ${
            isSender ? "self-end items-end" : "self-start items-start"
        } flex flex-col  gap-2`}
    >
        <div
            className={`px-[20px] py-[10px] ${
                isSender ? "bg-blue-primary" : "bg-zinc-700"
            } text-white-base text-[16px] font-light rounded-[19px] break-words max-w-full whitespace-pre-wrap`}
        >
            <p>{message}</p>
        </div>
        <span className="text-sm font-light text-[#707070]">{timestamp}</span>
    </div>
);

const ChatWindow = ({
    messagesEndRef,
    currentChat,
    chatMessages,
    handleSendMessage,
    input,
    setInput,
    isLoading,
    error,
    messagesContainerRef,
    scrollToBottom,
    setReviewModal,
}) => {
    const inputRef = useRef(null);
    const userStatus = useUserStore((state) => state.userStatus);

    useEffect(() => {
        setTimeout(() => scrollToBottom(), 6000);
    }, [currentChat]);

    // Focus input on chat change
    // useEffect(() => {
    //     inputRef.current?.focus();
    // }, [currentChat]);

    const breakLongWords = (text, maxWordLength = 20) => {
        if (!text) return "";
        return text
            .split(" ")
            .map((word) =>
                word.length > maxWordLength
                    ? word
                          .match(new RegExp(`.{1,${maxWordLength}}`, "g"))
                          .join(" ")
                    : word
            )
            .join(" ");
    };

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
                            <FaUser className="text-[#9e9e9ebd]" size={20} />
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
                {userStatus?.organization && (
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
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="w-full border-t-thin border-white-base pt-3">
                <form
                    onSubmit={handleSendMessage}
                    className="flex items-center gap-4"
                >
                    <div className="flex items-center grow px-[15px] py-[11px] rounded-[19px] bg-[#EFF6FCDE]">
                        <button
                            type="button"
                            className="hover:opacity-70 transition-opacity"
                            onClick={() => {
                                /* Handle attachment */
                            }}
                        >
                            <GrAttachment size={22} />
                        </button>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="grow text-black bg-transparent border-none outline-none mx-[20px]"
                            // disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        // disabled={!input.trim()}
                        className="bg-blue-primary rounded-[14px] p-3 cursor-pointer disabled:bg-slate-500 duration-300 hover:opacity-90"
                    >
                        <IoSend className="text-white-base" size={25} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;
