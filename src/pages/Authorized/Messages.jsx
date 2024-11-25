import React, { useEffect, useRef, useState } from "react";
import {
    chatImage1,
    chatImage2,
    chatImage3,
    chatImage4,
    chatImage5,
    chatImage6,
} from "../../assets";
import { ChatWindow, ChatList } from "../../components";
import io from "socket.io-client";

// const socket = io.connect("https://api.quickr.tech");

const chatData = [
    {
        id: 1,
        name: "Lima Johnson",
        messages: {},
        time: "Today, 9:52pm",
        image: chatImage1,
        numberOfMessages: 3,
    },
    {
        id: 2,
        name: "Sofia Martinez",
        messages: {
            me: "Hi Sofia, what do you think about the proposal?",
            other: "I came across your proposal, and I really liked it! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum libero nemo earum obcaecati repellendus doloremque rem dicta quos provident, excepturi eos quia corporis repellat? Corporis optio excepturi dicta. Magni, odit?",
        },
        time: "Today, 9:52pm",
        image: chatImage2,
        numberOfMessages: 2,
    },
    {
        id: 3,
        name: "Noah Patel",
        messages: {
            me: "Hi Noah, did you check the latest update?",
            other: "Yes! I’m interested in your updates; they look amazing so far.",
        },
        time: "Today, 9:52pm",
        image: chatImage3,
        numberOfMessages: 4,
    },
    {
        id: 4,
        name: "Olivia Brown",
        messages: {
            me: "Hi Olivia, any feedback on the brand presentation?",
            other: "I represent a brand that's very impressed with your work!",
        },
        time: "Today, 9:52pm",
        image: chatImage4,
        numberOfMessages: 1,
    },
    {
        id: 5,
        name: "Mia Garcia",
        messages: {
            me: "Hey Mia, what's the reason for reaching out?",
            other: "I’m reaching out because your skills match a project we're planning!",
        },
        time: "Today, 9:52pm",
        image: chatImage5,
        numberOfMessages: 5,
    },
    {
        id: 6,
        name: "Maya Berry",
        messages: {
            me: "Hi Maya! Can you tell me more about your interest?",
            other: "Hi! I’m interested in your services for an upcoming project.",
        },
        time: "Today, 9:52pm",
        image: chatImage6,
        numberOfMessages: 2,
    },
];

const Messages = () => {
    const [currentChat, setCurrentChat] = useState(null);
    const messagesEndRef = useRef(null);

    // Function to scroll to the bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleOpenChat = (id) => {
        const chat = chatData.filter((i) => i.id === id);
        console.log(...chat);

        setCurrentChat(...chat);
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatData]); // Automatically scroll when chatData changes

    // useEffect(() => {
    //     // console.log(socket);
    // }, []);

    return (
        <section className="w-full h-[calc(100vh-60px)] flex justify-center items-center pb-7">
            <div className="container mx-auto by-5 h-full flex pt-5 gap-10">
                {/* Chat List */}
                <ChatList
                    handleOpenChat={handleOpenChat}
                    currentChat={currentChat}
                    chatData={chatData}
                />

                {/* Chat Window */}
                <ChatWindow
                    currentChat={currentChat}
                    messagesEndRef={messagesEndRef}
                    chatData={chatData}
                />
            </div>
        </section>
    );
};

export default Messages;
