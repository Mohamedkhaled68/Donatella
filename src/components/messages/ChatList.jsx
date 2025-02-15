import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import TextExpander from "../shared/TextExpander";
import useGetMessages from "../../hooks/chat/useGetMessages";
import toast from "react-hot-toast";

const ChatList = ({ currentChat, setCurrentChat }) => {
    const [messagesList, setMessagesList] = useState([]);
    const { mutateAsync: getMessages } = useGetMessages();

    const isEmpty = messagesList?.length === 0;

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
                setMessagesList([...data.items]);
            } catch (err) {
                toast.error(err?.response?.data?.message);
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
                // const chatData = Array.isArray(chat) ? chat[0] : chat;
                // console.log(chatData);
                return (
                    <div
                        key={chat?.id}
                        onClick={() => handleOpenChat(chat?.id)}
                        className={`flex items-center gap-4 w-full p-4 hover:bg-white-base/10 cursor-pointer duration-200 ${
                            currentChat?.id === chat?.id
                                ? "bg-white-base/10"
                                : ""
                        }`}
                    >
                        <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full flex justify-center items-center bg-zinc-700">
                            {chat?.friend?.profilePicture ? (
                                <img
                                    src={chat.friend.profilePicture}
                                    alt={chat.friend.name}
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
                                    {chat?.friend?.name || "Unknown User"}
                                </h2>
                                {chat?.latestMessage?.content && (
                                    <p className="text-white-base/70 font-body text-sm font-extralight truncate max-w-[200px]">
                                        <TextExpander
                                            text={chat.latestMessage.content}
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
