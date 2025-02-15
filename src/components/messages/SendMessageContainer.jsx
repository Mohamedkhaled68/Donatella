import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/chat/useSendMessage";

const SendMessageContainer = ({ inputRef, fetchMessages }) => {
    const [input, setInput] = useState("");

    const { mutateAsync: sendMessage } = useSendMessage();
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

    return (
        <>
            <div className="w-full border-t-thin border-white-base pt-3">
                <form
                    onSubmit={handleSendMessage}
                    className="flex items-center gap-4"
                >
                    <div className="flex items-center grow px-[15px] py-[11px] rounded-[19px] bg-[#EFF6FCDE]">
                        <button
                            type="button"
                            className="hover:opacity-70 transition-opacity"
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
        </>
    );
};

export default SendMessageContainer;
