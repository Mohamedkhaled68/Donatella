// import React from "react";
// import { chatImage1, chatImage2 } from "../../assets";
// import { FaMicrophone } from "react-icons/fa";
// import { GrAttachment } from "react-icons/gr";
// import { BsEmojiLaughing } from "react-icons/bs";
// import { CiCamera } from "react-icons/ci";

// const chatData = [
//     {
//         name: "Lima Johnson",
//         message: "We’re working on a ne...",
//         time: "Today, 9:52pm",
//         image: chatImage1, // Replace with actual image path
//         numberOfMessages: 3,
//     },
//     {
//         name: "Sofia Martinez",
//         message: "I came across your pr...",
//         time: "Today, 9:52pm",
//         image: chatImage2, // Replace with actual image path
//         numberOfMessages: 2,
//     },
//     {
//         name: "Noah Patel",
//         message: "Hi! I’m interested in yo...",
//         time: "Today, 9:52pm",
//         image: chatImage1, // Replace with actual image path
//         numberOfMessages: 4,
//     },
//     {
//         name: "Olivia Brown",
//         message: "I represent a brand th...",
//         time: "Today, 9:52pm",
//         image: chatImage2, // Replace with actual image path
//         numberOfMessages: 1,
//     },
//     {
//         name: "Mia Garcia",
//         message: "I’m reaching out beca...",
//         time: "Today, 9:52pm",
//         image: chatImage1, // Replace with actual image path
//         numberOfMessages: 5,
//     },
//     {
//         name: "Maya Berry",
//         message: "Hi! I’m interested in yo...",
//         time: "Today, 9:52pm",
//         image: chatImage1, // Replace with actual image path
//         numberOfMessages: 2,
//     },
//     {
//         name: "Maya Berry",
//         message: "Hi! I’m interested in yo...",
//         time: "Today, 9:52pm",
//         image: chatImage1, // Replace with actual image path
//         numberOfMessages: 2,
//     },
//     {
//         name: "Maya Berry",
//         message: "Hi! I’m interested in yo...",
//         time: "Today, 9:52pm",
//         image: chatImage1, // Replace with actual image path
//         numberOfMessages: 2,
//     },
//     {
//         name: "Maya Berry",
//         message: "Hi! I’m interested in yo...",
//         time: "Today, 9:52pm",
//         image: chatImage1, // Replace with actual image path
//         numberOfMessages: 2,
//     },
//     {
//         name: "Maya Berry",
//         message: "Hi! I’m interested in yo...",
//         time: "Today, 9:52pm",
//         image: chatImage1, // Replace with actual image path
//         numberOfMessages: 2,
//     },
//     {
//         name: "Maya Berry",
//         message: "Hi! I’m interested in yo...",
//         time: "Today, 9:52pm",
//         image: chatImage1, // Replace with actual image path
//         numberOfMessages: 2,
//     },
//     {
//         name: "Maya Berry",
//         message: "Hi! I’m interested in yo...",
//         time: "Today, 9:52pm",
//         image: chatImage1, // Replace with actual image path
//         numberOfMessages: 2,
//     },
//     {
//         name: "Maya Berry",
//         message: "Hi! I’m interested in yo...",
//         time: "Today, 9:52pm",
//         image: chatImage1, // Replace with actual image path
//         numberOfMessages: 2,
//     },
//     {
//         name: "Maya Berry",
//         message: "Hi! I’m interested in yo...",
//         time: "Today, 9:52pm",
//         image: chatImage1, // Replace with actual image path
//         numberOfMessages: 2,
//     },
// ];

// const Messages = () => {
//     return (
//         <>
//             <section className="w-full h-full flex justify-center items-center pb-7">
//                 <div className="container mx-auto by-5 flex pt-5 gap-10">
//                     <div className="w-[30%] h-screen rounded-lg bg-[#313131] overflow-y-scroll">
//                         {chatData.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center gap-4 w-full p-4 hover:bg-white-base/10 cursor-pointer duration-200"
//                             >
//                                 <img
//                                     src={item.image}
//                                     alt={item.name}
//                                     className="w-[50px] h-[50px] rounded-full"
//                                 />
//                                 <div className="flex flex-col">
//                                     <h1 className="text-white-base font-display text-[20px] font-semibold">
//                                         {item.name}
//                                     </h1>
//                                     <p className="text-white-base font-body text-sm font-extralight">
//                                         {item.message}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="w-[70%] h-screen p-4 rounded-lg bg-[#313131]">
//                         <div className="border-b-thin border-white-base flex items-center gap-3 pb-2 mb-3">
//                             <img
//                                 src={chatImage1}
//                                 alt=""
//                                 className="w-[50px] h-[50px] rounded-full"
//                             />
//                             <div className="flex flex-col ">
//                                 <h1 className="text-white-base font-display text-[23px] font-bold">
//                                     Maya Berry
//                                 </h1>
//                                 <p className="text-white-base/70 font-body text-sm font-extralight">
//                                     online
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="pt-5 max-h-[100%] overflow-y-scroll px-3">
//                             <div className="space-y-3 ">
//                                 <div className="flex items-start">
//                                     <div className="bg-gray-700 p-3 rounded-lg max-w-xs">
//                                         Hi there! I’m interested in your
//                                         photography services for an event.
//                                     </div>
//                                 </div>
//                                 <div className="flex items-end justify-end">
//                                     <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
//                                         Awesome! What kind of event are you
//                                         planning?
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start">
//                                     <div className="bg-gray-700 p-3 rounded-lg max-w-xs">
//                                         It’s a luxury wedding in December.
//                                     </div>
//                                 </div>
//                                 <div className="flex items-end justify-end">
//                                     <div className="mt-5 w-[50%] bg-blue-600 text-white p-4 rounded-lg shadow-md">
//                                         <h2 className="text-lg font-semibold mb-2">
//                                             New Contract:
//                                         </h2>
//                                         <p className="text-sm">
//                                             $17/HR - Cairo - 7 Days
//                                         </p>
//                                         <p className="text-sm mt-1">
//                                             It's an honor to have you join our
//                                             team! I hope we serve you well
//                                             during your time with us.
//                                         </p>
//                                         <div className="flex items-center justify-between mt-4">
//                                             <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
//                                                 Decline
//                                             </button>
//                                             <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 hover:text-white">
//                                                 Accept
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="space-y-3 ">
//                                 <div className="flex items-start">
//                                     <div className="bg-gray-700 p-3 rounded-lg max-w-xs">
//                                         Hi there! I’m interested in your
//                                         photography services for an event.
//                                     </div>
//                                 </div>
//                                 <div className="flex items-end justify-end">
//                                     <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
//                                         Awesome! What kind of event are you
//                                         planning?
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start">
//                                     <div className="bg-gray-700 p-3 rounded-lg max-w-xs">
//                                         It’s a luxury wedding in December.
//                                     </div>
//                                 </div>
//                                 <div className="flex items-end justify-end">
//                                     <div className="mt-5 w-[50%] bg-blue-600 text-white p-4 rounded-lg shadow-md">
//                                         <h2 className="text-lg font-semibold mb-2">
//                                             New Contract:
//                                         </h2>
//                                         <p className="text-sm">
//                                             $17/HR - Cairo - 7 Days
//                                         </p>
//                                         <p className="text-sm mt-1">
//                                             It's an honor to have you join our
//                                             team! I hope we serve you well
//                                             during your time with us.
//                                         </p>
//                                         <div className="flex items-center justify-between mt-4">
//                                             <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
//                                                 Decline
//                                             </button>
//                                             <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 hover:text-white">
//                                                 Accept
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-4 pt-5">
//                             <div className="flex items-center w-full bg-[#EFF6FCDE] rounded-md h-[60px] p-5 gap-5">
//                                 <GrAttachment size={25} />
//                                 <input
//                                     className="bg-transparent outline-none border-none grow h-full text-lg font-body font-medium"
//                                     type="text"
//                                     placeholder="Type your message here..."
//                                 />
//                                 <BsEmojiLaughing size={25} />
//                                 <CiCamera size={25} />
//                             </div>
//                             <div className="flex items-center justify-center p-3 rounded-md bg-blue-primary">
//                                 <FaMicrophone size={25} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default Messages;

import React, { useEffect, useRef } from "react";
import { chatImage1, chatImage2 } from "../../assets";
import { FaMicrophone } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiLaughing } from "react-icons/bs";
import { CiCamera } from "react-icons/ci";

const chatData = [
    {
        name: "Lima Johnson",
        message: "We’re working on a ne...",
        time: "Today, 9:52pm",
        image: chatImage1, // Replace with actual image path
        numberOfMessages: 3,
    },
    {
        name: "Sofia Martinez",
        message: "I came across your pr...",
        time: "Today, 9:52pm",
        image: chatImage2, // Replace with actual image path
        numberOfMessages: 2,
    },
    {
        name: "Noah Patel",
        message: "Hi! I’m interested in yo...",
        time: "Today, 9:52pm",
        image: chatImage1, // Replace with actual image path
        numberOfMessages: 4,
    },
    {
        name: "Olivia Brown",
        message: "I represent a brand th...",
        time: "Today, 9:52pm",
        image: chatImage2, // Replace with actual image path
        numberOfMessages: 1,
    },
    {
        name: "Mia Garcia",
        message: "I’m reaching out beca...",
        time: "Today, 9:52pm",
        image: chatImage1, // Replace with actual image path
        numberOfMessages: 5,
    },
    {
        name: "Maya Berry",
        message: "Hi! I’m interested in yo...",
        time: "Today, 9:52pm",
        image: chatImage1, // Replace with actual image path
        numberOfMessages: 2,
    },
    {
        name: "Maya Berry",
        message: "Hi! I’m interested in yo...",
        time: "Today, 9:52pm",
        image: chatImage1, // Replace with actual image path
        numberOfMessages: 2,
    },
    {
        name: "Maya Berry",
        message: "Hi! I’m interested in yo...",
        time: "Today, 9:52pm",
        image: chatImage1, // Replace with actual image path
        numberOfMessages: 2,
    },
    {
        name: "Maya Berry",
        message: "Hi! I’m interested in yo...",
        time: "Today, 9:52pm",
        image: chatImage1, // Replace with actual image path
        numberOfMessages: 2,
    },
    {
        name: "Maya Berry",
        message: "Hi! I’m interested in yo...",
        time: "Today, 9:52pm",
        image: chatImage1, // Replace with actual image path
        numberOfMessages: 2,
    },
    {
        name: "Maya Berry",
        message: "Hi! I’m interested in yo...",
        time: "Today, 9:52pm",
        image: chatImage1, // Replace with actual image path
        numberOfMessages: 2,
    },
    {
        name: "Maya Berry",
        message: "Hi! I’m interested in yo...",
        time: "Today, 9:52pm",
        image: chatImage1, // Replace with actual image path
        numberOfMessages: 2,
    },
    {
        name: "Maya Berry",
        message: "Hi! I’m interested in yo...",
        time: "Today, 9:52pm",
        image: chatImage1, // Replace with actual image path
        numberOfMessages: 2,
    },
    {
        name: "Maya Berry",
        message: "Hi! I’m interested in yo...",
        time: "Today, 9:52pm",
        image: chatImage1, // Replace with actual image path
        numberOfMessages: 2,
    },
];

const Messages = () => {
    const messagesEndRef = useRef(null);

    // Function to scroll to the bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatData]); // Automatically scroll when chatData changes

    return (
        <section className="w-full h-full flex justify-center items-center pb-7">
            <div className="container mx-auto by-5 flex pt-5 gap-10">
                {/* Chat List */}
                <div className="w-[30%] h-screen rounded-lg bg-[#313131] overflow-y-auto custom-scrollbar">
                    {chatData.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 w-full p-4 hover:bg-white-base/10 cursor-pointer duration-200"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-[50px] h-[50px] rounded-full"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-white-base font-display text-[20px] font-semibold">
                                    {item.name}
                                </h1>
                                <p className="text-white-base font-body text-sm font-extralight">
                                    {item.message}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Window */}
                <div className="w-[70%] h-screen p-4 rounded-lg bg-[#313131] flex flex-col">
                    {/* Header */}
                    <div className="border-b-thin border-white-base flex items-center gap-3 pb-2 mb-3">
                        <img
                            src={chatImage1}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-white-base font-display text-[23px] font-bold">
                                Maya Berry
                            </h1>
                            <p className="text-white-base/70 font-body text-sm font-extralight">
                                online
                            </p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-grow pt-5 overflow-y-auto px-3 custom-scrollbar">
                        {chatData.map((_, index) => (
                            <div key={index} className="space-y-3">
                                <div className="flex items-start">
                                    <div className="bg-gray-700 p-3 rounded-lg max-w-xs">
                                        Hi there! I’m interested in your
                                        photography services for an event.
                                    </div>
                                </div>
                                <div className="flex items-end justify-end">
                                    <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                                        Awesome! What kind of event are you
                                        planning?
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-4 pt-5">
                        <div className="flex items-center w-full bg-[#EFF6FCDE] rounded-md h-[60px] p-5 gap-5">
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
                </div>
            </div>
        </section>
    );
};

export default Messages;
