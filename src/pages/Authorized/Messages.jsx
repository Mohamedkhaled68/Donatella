import React, { useState, useEffect } from "react";
import { ChatWindow, ChatList } from "../../components";
import { useLocation } from "react-router-dom";

const Messages = () => {
    const [currentChat, setCurrentChat] = useState(null);
    const [reviewModal, setReviewModal] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Set the overflow style immediately when the component mounts
        if (location.pathname === "/messages") {
            document.documentElement.style.overflowY = "hidden";
        }

        return () => {
            document.documentElement.style.overflowY = "unset";
        };
    }, []); // Run only once on mount

    useEffect(() => {
        window.scrollTo(0, 0);

        if (location.pathname === "/messages") {
            document.documentElement.style.overflowY = "hidden";
        } else {
            document.documentElement.style.overflowY = "unset";
        }

        return () => {
            document.documentElement.style.overflowY = "unset";
        };
    }, [location.pathname]); // Run on route change

    return (
        <section className="relative w-full h-screen flex justify-center">
            <div className="container mx-auto py-5 h-[90%] flex pt-5 gap-10">
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
