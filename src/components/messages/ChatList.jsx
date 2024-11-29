import React from "react";
import TextExpander from "../shared/TextExpander";
import { FaUser } from "react-icons/fa";

const ChatList = ({ currentChat, handleOpenChat, receivedMessages }) => {
    return (
        <div className="w-[30%] h-full rounded-lg bg-[#313131] overflow-y-auto custom-scrollbar">
            {receivedMessages?.map((chat) => (
                <div
                    key={chat.chatId}
                    // onClick={() => {
                    //     handleOpenChat(chat.chatId);
                    // }}
                    className={`flex items-center gap-4 w-full h-[16.66666666666667%] p-4 hover:bg-white-base/10 cursor-pointer duration-200 ${
                        currentChat?.chatId === chat.chatId
                            ? "bg-white-base/10"
                            : ""
                    }`}
                >
                    <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full flex justify-center items-center bg-zinc-700">
                        {chat.sender.profilePicture ? (
                            <img
                                src={chat.sender.profilePicture}
                                alt={chat.sender.name}
                                className="max-w-full h-full object-cover"
                            />
                        ) : (
                            <FaUser className="text-[#9e9e9ebd]" size={20} />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white-base font-display text-[20px] font-semibold">
                            {chat.sender.name}
                        </h1>
                        <p className="text-white-base font-body text-sm font-extralight">
                            <TextExpander text={chat?.content} />
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
