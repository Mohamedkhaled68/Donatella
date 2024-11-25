import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiLaughing } from "react-icons/bs";
import { CiCamera } from "react-icons/ci";
import { chatImage1 } from "../../assets";

const Chat = ({ chatData, messagesEndRef, currentChat }) => {
    return (
        <>
            <div className="w-[70%] h-full p-4 rounded-lg bg-[#313131] flex flex-col">
                {!currentChat ? (
                    <>
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="flex flex-col items-center justify-center gap-5">
                                <h1 className="text-5xl text-white/90 font-display italic font-bold">
                                    Welcom to Donatella Chat
                                </h1>
                                <p className="text-sm font-light text-center italic w-[70%] mx-auto font-body text-white-base/50">
                                    Stay connected with your friends and
                                    colleagues in one seamless platform. Start
                                    meaningful conversations, share updates, and
                                    make every interaction count
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Header */}
                        <div className="border-b-thin border-white-base flex items-center gap-3 pb-2">
                            <img
                                src={currentChat.image}
                                alt="userImage"
                                className="w-[40px] h-[40px] rounded-full"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-white-base font-display text-[16px] font-bold">
                                    {currentChat.name}
                                </h1>
                                <p className="text-white-base/70 font-body text-sm font-extralight">
                                    online
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow overflow-y-auto px-3 custom-scrollbar">
                            {Object.keys(currentChat.messages).length === 0 ? (
                                <>
                                    <div className="w-full h-full flex justify-center items-center">
                                        <div className="text-[20px] text-white-base/95 font-display">
                                            No messages here yet. Say hello to
                                            start the conversation!
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col justify-end gap-2 w-full h-full">
                                        <div className="flex flex-col w-fit max-w-[70%] my-3 gap-1 self-end">
                                            <p className="bg-blue-primary text-white-base text-md font-300 py-[10px] px-[20px] rounded-3xl w-full">
                                                {currentChat.messages.me}
                                            </p>
                                            <span className="text-[#a1a1a1] text-sm font-light self-end">
                                                {currentChat.time}
                                            </span>
                                        </div>
                                        <div className="flex flex-col w-fit max-w-[70%] my-3 gap-1 self-start">
                                            <p className="bg-white-base text-black text-md font-300 py-[10px] px-[20px] rounded-3xl w-full">
                                                {currentChat.messages.other}
                                            </p>
                                            <span className="text-[#a1a1a1] text-sm font-light">
                                                {currentChat.time}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="flex items-center gap-4 pt-3">
                            <div className="flex items-center w-full bg-[#EFF6FCDE] rounded-md h-[50px] px-5 gap-5">
                                <GrAttachment size={25} />
                                <input
                                    className="bg-transparent outline-none border-none grow h-full text-lg font-body font-medium"
                                    type="text"
                                    placeholder="Type your message here..."
                                />
                                <BsEmojiLaughing size={25} />
                                <CiCamera size={25} />
                            </div>
                            <div className="flex items-center justify-center p-3 rounded-md bg-blue-primary">
                                <FaMicrophone size={25} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Chat;
