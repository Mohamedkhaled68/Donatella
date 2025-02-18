import React, { useState, useEffect } from "react";
import { ChatWindow, ChatList } from "../../components";

const Messages = () => {
    const [currentChat, setCurrentChat] = useState(null);
    const [reviewModal, setReviewModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.style.overflowY = "hidden";
        return () => {
            document.documentElement.style.overflowY = "unset";
        };
    }, []);

    return (
        <section className="relative w-full h-[calc(100vh-60px)] flex justify-center items-center">
            <div className="container mx-auto py-5 h-full flex pt-5 gap-10">
                <ChatList
                    currentChat={currentChat}
                    setCurrentChat={setCurrentChat}
                />
                <ChatWindow
                    setReviewModal={setReviewModal}
                    reviewModal={reviewModal}
                    key={currentChat?.id}
                    currentChat={currentChat}
                />
            </div>
        </section>
    );
};

export default Messages;
