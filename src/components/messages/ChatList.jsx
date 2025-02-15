import React from "react";
import { FaUser } from "react-icons/fa";
import TextExpander from "../shared/TextExpander";

const LoadingSkeleton = () => (
    <div className="animate-pulse">
        <div className="flex items-center gap-4 w-full p-4">
            <div className="w-[50px] h-[50px] rounded-full bg-zinc-700"></div>
            <div className="flex-1">
                <div className="h-5 bg-zinc-700 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
            </div>
        </div>
    </div>
);

const ChatList = ({ currentChat, handleOpenChat, messagesList }) => {
    const isLoading = !messagesList;
    const isEmpty = messagesList?.length === 0;

    if (isLoading) {
        return (
            <div className="w-[30%] h-full rounded-lg bg-[#313131] overflow-y-auto custom-scrollbar">
                {[...Array(5)].map((_, index) => (
                    <LoadingSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="w-[30%] h-full rounded-lg bg-[#313131] overflow-y-auto custom-scrollbar">
                <div className="flex flex-col items-center justify-center h-full text-white-base/60 p-4">
                    <FaUser size={40} className="mb-4 text-zinc-600" />
                    <p className="text-center">No messages yet</p>
                    <p className="text-sm text-center mt-2 text-zinc-500">
                        Start a conversation to see your chats here
                    </p>
                </div>
            </div>
        );
    }

    // Debug log to see the structure

    return (
        <div className="w-[30%] h-full rounded-lg bg-[#313131] overflow-y-auto custom-scrollbar">
            {messagesList.map((chat) => {
                // Check if chat is nested in an unexpected way
                const chatData = Array.isArray(chat) ? chat[0] : chat;
                console.log(chatData);

                return (
                    <div
                        key={chatData?.id}
                        onClick={() => handleOpenChat(chatData?.id)}
                        className={`flex items-center gap-4 w-full p-4 hover:bg-white-base/10 cursor-pointer duration-200 ${
                            currentChat?.id === chatData?.id
                                ? "bg-white-base/10"
                                : ""
                        }`}
                    >
                        <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full flex justify-center items-center bg-zinc-700">
                            {chatData?.friend?.profilePicture ? (
                                <img
                                    src={chatData.friend.profilePicture}
                                    alt={chatData.friend.name}
                                    className="max-w-full h-full object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = "none";
                                        e.target.parentElement.innerHTML =
                                            '<FaUser className="text-[#9e9e9ebd]" size={20} />';
                                    }}
                                />
                            ) : (
                                <FaUser
                                    className="text-[#9e9e9ebd]"
                                    size={20}
                                />
                            )}
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col">
                                <h2 className="text-white-base font-display text-[20px] font-semibold">
                                    {chatData?.friend?.name || "Unknown User"}
                                </h2>
                                {chatData?.latestMessage?.content && (
                                    <p className="text-white-base/70 font-body text-sm font-extralight truncate max-w-[200px]">
                                        <TextExpander
                                            text={
                                                chatData.latestMessage.content
                                            }
                                        />
                                    </p>
                                )}
                            </div>
                            {/* <div className="bg-blue-primary text-white-base flex justify-center items-center rounded-full w-[30px] h-[30px] p-2">
                                {currentChat?.unseenMessagesCount}
                            </div> */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatList;
