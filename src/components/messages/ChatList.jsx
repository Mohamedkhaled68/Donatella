import React from "react";
import TextExpander from "../shared/TextExpander";

const ChatList = ({ chatData, currentChat, handleOpenChat }) => {
    return (
        <>
            <div className="w-[30%] h-full rounded-lg bg-[#313131] overflow-y-auto custom-scrollbar">
                {chatData.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => {
                            handleOpenChat(chat.id);
                        }}
                        className={`flex items-center gap-4 w-full h-[16.66666666666667%] p-4 hover:bg-white-base/10 cursor-pointer duration-200 ${
                            currentChat?.id === chat.id
                                ? "bg-white-base/10"
                                : ""
                        }`}
                    >
                        <img
                            src={chat.image}
                            alt={chat.name}
                            className="w-[50px] h-[50px] rounded-full"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-white-base font-display text-[20px] font-semibold">
                                {chat.name}
                            </h1>
                            <p className="text-white-base font-body text-sm font-extralight">
                                <TextExpander text={chat?.messages?.other} />
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ChatList;
