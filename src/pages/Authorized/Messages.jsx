import React, { useState, useEffect } from "react";
import { ChatWindow, ChatList } from "../../components";
import { useLocation } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import MessageFilterDropdown from "../../components/messages/MessageFilterDropdown";
import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { motion } from "framer-motion";

const filterAnimationVariants = {
    open: { height: "auto" },
    closed: { height: 0 },
    up: { rotate: "180deg" },
    down: { rotate: 0 },
};

const Messages = () => {
    const [currentChat, setCurrentChat] = useState(null);
    const [reviewModal, setReviewModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [messageFilters, setMessageFilters] = useState({});
    const [chats, setChats] = useState([]);
    const location = useLocation();
    const { userStatus } = useUserStore((state) => state);

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

    // Show filters for both individuals and organizations
    const showFilters = userStatus?.role === "INDIVIDUAL" || userStatus?.role === "ORGANIZATION";

    return (
        <section className="relative w-full h-screen flex justify-center">
            <div className="container mx-auto py-5 h-[90%] flex flex-col pt-5">
                {showFilters && (
                    <div className="mb-4">
                        <div className="flex items-center gap-4 mb-2">
                            <div
                                onClick={() => setOpenFilter((prev) => !prev)}
                                className="px-4 cursor-pointer py-2 flex items-center gap-3 border-thin border-white-base text-white-base rounded-lg"
                            >
                                <IoMenu size={20} className="text-white-base" />
                                <div className="flex items-center justify-between gap-[5px]">
                                    <p>Filters</p>
                                    <motion.div
                                        initial="down"
                                        animate={openFilter ? "up" : "down"}
                                        variants={filterAnimationVariants}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="flex justify-center items-center"
                                    >
                                        <FaAngleDown />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                        <MessageFilterDropdown
                            isOpen={openFilter}
                            onFilterChange={setMessageFilters}
                            chats={chats}
                        />
                    </div>
                )}
                <div className="flex gap-10 flex-1">
                    <ChatList
                        currentChat={currentChat}
                        setCurrentChat={setCurrentChat}
                        filters={messageFilters}
                        onChatsUpdate={setChats}
                    />
                    <ChatWindow
                        setReviewModal={setReviewModal}
                        reviewModal={reviewModal}
                        key={currentChat?.id}
                        currentChat={currentChat}
                    />
                </div>
            </div>
        </section>
    );
};

export default Messages;
