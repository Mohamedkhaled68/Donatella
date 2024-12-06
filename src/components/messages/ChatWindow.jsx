import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaUser } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { formatChatTimestamp } from "../../utils/helpers";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiGrin } from "react-icons/bs";
import { IoCameraOutline } from "react-icons/io5";

const ChatWindow = ({ messagesEndRef, currentChat }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesContainerRef = useRef(null);
    const [sendingStatus, setSendingStatus] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() !== "") {
            const newMessages = [...messages, input];
            setMessages(newMessages);
            setInput("");

            // Scroll to bottom after sending message
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        }
    };

    // Scroll to bottom function
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    };

    // Auto-scroll when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-scroll on component mount
    useEffect(() => {
        scrollToBottom();
    }, [currentChat]);

    // Function to break long words
    const breakLongWords = (text, maxWordLength = 20) => {
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

    return (
        <>
            <div className="w-[70%] relative overflow-hidden h-full p-4 rounded-lg bg-[#313131] flex flex-col">
                {!currentChat ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="flex flex-col items-center justify-center gap-5">
                            <h1 className="drop-shadow text-5xl text-white/90 font-display italic font-bold">
                                Welcome to Donatella Chat
                            </h1>
                            <p className="text-sm font-light text-center italic w-[70%] mx-auto font-body text-white-base/70">
                                Stay connected with your friends and colleagues
                                in one seamless platform. Start meaningful
                                conversations, share updates, and make every
                                interaction count.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col w-full h-full">
                        {/* Header */}
                        <div className="border-b-thin border-white-base flex items-center gap-3 pb-2">
                            <div className="relative w-[50px] h-[50px] rounded-full flex justify-center items-center bg-zinc-700">
                                {currentChat.image ? (
                                    <img
                                        src={currentChat.sender.image}
                                        alt={currentChat.sender.name}
                                        className="max-w-full object-cover"
                                    />
                                ) : (
                                    <FaUser
                                        className="text-[#9e9e9ebd]"
                                        size={20}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-white-base font-display text-[16px] font-bold">
                                    {currentChat.sender.name}
                                </h1>
                                <p className="text-white-base/70 font-body text-sm font-extralight">
                                    online
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            ref={messagesContainerRef}
                            className="relative h-full w-full grow overflow-y-auto px-3 custom-scrollbar scroll-smooth"
                        >
                            <div className="flex w-full flex-col justify-end">
                                {messages.map((message, idx) => (
                                    <div
                                        key={idx}
                                        className="my-[10px] max-w-[60%] w-fit self-end flex flex-col items-end gap-2"
                                    >
                                        <div className="px-[20px] py-[10px] bg-blue-primary text-white-base text-[16px] font-light rounded-[19px] break-words max-w-full whitespace-pre-wrap">
                                            <p>{breakLongWords(message)}</p>
                                        </div>
                                        <span className="text-sm font-light text-[#707070]">
                                            {formatChatTimestamp(
                                                new Date().toLocaleString()
                                            )}
                                        </span>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />{" "}
                                {/* Anchor for scroll */}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="w-full border-t-thin border-white-base pt-3">
                            <form
                                onSubmit={handleSendMessage}
                                className="flex items-center gap-4"
                            >
                                <div className="flex items-center grow px-[15px] py-[11px] rounded-[19px] bg-[#EFF6FCDE]">
                                    <GrAttachment size={22} />
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                        placeholder="Type your message..."
                                        className="grow text-black bg-transparent border-none outline-none mx-[20px]"
                                    />
                                    <BsEmojiGrin
                                        className="cursor-pointer"
                                        size={22}
                                    />
                                    <IoCameraOutline
                                        className="ml-[10px] cursor-pointer"
                                        size={23}
                                    />
                                </div>
                                <div className="bg-blue-primary rounded-[14px] p-3 cursor-pointer">
                                    {input ? (
                                        <IoSend
                                            className={`text-white-base`}
                                            size={25}
                                            onClick={handleSendMessage}
                                        />
                                    ) : (
                                        <FaMicrophone
                                            size={25}
                                            className="text-white-base"
                                        />
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ChatWindow;
