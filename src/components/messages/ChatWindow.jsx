// import React, { useEffect, useState } from "react";
// import { FaMicrophone, FaUser } from "react-icons/fa";
// import { GrAttachment } from "react-icons/gr";
// import { BsEmojiLaughing } from "react-icons/bs";
// import { CiCamera } from "react-icons/ci";
// import { IoSend } from "react-icons/io5";
// import useSendMessage from "../../hooks/chat/useSendMessage";

// const ChatWindow = ({ messagesEndRef, currentChat, setReceivedMessage }) => {
//     const [input, setInput] = useState("");
//     const [sendingStatus, setSendingStatus] = useState(false);
//     const { mutateAsync } = useSendMessage();

//     const handleSendMessage = async (e) => {
//         e.preventDefault();

//         try {
//             await mutateAsync({ chatId: currentChat.chatId, message: input });
//         } catch (err) {
//             console.log(err);
//         } finally {
//             setInput("");
//         }
//     };

//     const handleSend = async () => {
//         try {
//             await mutateAsync({
//                 chatId: "0193758b-f266-f957-d35c-544e758932d8",
//                 message: "from organization  to individual",
//             }).then((res) => {
//                 setReceivedMessage(res.data);
//             });
//         } catch (err) {
//             console.log(err);
//         } finally {
//             setInput("");
//         }
//     };

//     useEffect(() => {
//         if (input) {
//             setSendingStatus(true);
//         } else {
//             setSendingStatus(false);
//         }
//     }, [input]);

//     return (
//         <>
//             <button onClick={handleSend} className="text-white bg-blue-primary">
//                 Click
//             </button>
//             <div className="w-[70%] relative overflow-hidden h-full p-4 rounded-lg bg-[#313131] flex flex-col">
//                 {!currentChat ? (
//                     <div className="w-full h-full flex justify-center items-center">
//                         <div className="flex flex-col items-center justify-center gap-5">
//                             <h1 className="drop-shadow text-5xl text-white/90 font-display italic font-bold">
//                                 Welcome to Donatella Chat
//                             </h1>
//                             <p className="text-sm font-light text-center italic w-[70%] mx-auto font-body text-white-base/70">
//                                 Stay connected with your friends and colleagues
//                                 in one seamless platform. Start meaningful
//                                 conversations, share updates, and make every
//                                 interaction count.
//                             </p>
//                         </div>
//                     </div>
//                 ) : (
//                     <>
//                         {/* Header */}
//                         <div className="border-b-thin border-white-base flex items-center gap-3 pb-2">
//                             <div className="relative w-[50px] h-[50px] rounded-full flex justify-center items-center bg-zinc-700">
//                                 {currentChat.image ? (
//                                     <img
//                                         src={currentChat.sender.image}
//                                         alt={currentChat.sender.name}
//                                         className="max-w-full object-cover"
//                                     />
//                                 ) : (
//                                     <FaUser
//                                         className="text-[#9e9e9ebd]"
//                                         size={20}
//                                     />
//                                 )}
//                             </div>
//                             <div className="flex flex-col">
//                                 <h1 className="text-white-base font-display text-[16px] font-bold">
//                                     {currentChat.sender.name}
//                                 </h1>
//                                 <p className="text-white-base/70 font-body text-sm font-extralight">
//                                     online
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Messages */}
//                         <div className="relative flex-grow overflow-y-auto px-3 custom-scrollbar">
//                             <div ref={messagesEndRef} className="flex flex-col">
//                                 {/* Render Messages */}
//                                 {Object.entries(currentChat.messages).map(
//                                     ([sender, { message }], idx) => (
//                                         <div
//                                             key={idx}
//                                             className={`flex flex-col w-fit max-w-[70%] my-3 gap-1 ${
//                                                 sender === "me"
//                                                     ? "self-end"
//                                                     : "self-start"
//                                             }`}
//                                         >
//                                             <p
//                                                 className={`text-md font-300 py-[10px] px-[20px] rounded-3xl w-full ${
//                                                     sender === "me"
//                                                         ? "bg-blue-primary text-white-base"
//                                                         : "bg-white-base text-black"
//                                                 }`}
//                                             >
//                                                 {message}
//                                             </p>
//                                             <span className="text-[#a1a1a1] text-sm font-light self-end">
//                                                 {time}
//                                             </span>
//                                         </div>
//                                     )
//                                 )}
//                             </div>
//                         </div>

//                         {/* Input Area */}
//                         <div className="absolute bottom-0 left-0 w-full border-t-thin border-white-base p-3">
//                             <form
//                                 onSubmit={handleSendMessage}
//                                 className="flex items-center gap-4"
//                             >
//                                 <FaMicrophone className="text-[#9e9e9ebd]" />
//                                 <input
//                                     type="text"
//                                     value={input}
//                                     onChange={(e) => setInput(e.target.value)}
//                                     placeholder="Type your message..."
//                                     className="flex-grow p-2 rounded-lg text-white-base bg-[#454545] border-none"
//                                 />
//                                 <IoSend
//                                     className={`text-[#9e9e9ebd] ${
//                                         sendingStatus && "text-blue-primary"
//                                     }`}
//                                     size={25}
//                                     onClick={handleSendMessage}
//                                 />
//                             </form>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </>
//     );
// };

// export default ChatWindow;

// // const MessageBubble = ({ message, sender, time }) => (
// //     <div className={`flex flex-col w-fit max-w-[70%] my-3 gap-1 ${sender === "me" ? "self-end" : "self-start"}`}>
// //         <p className={`text-md font-300 py-[10px] px-[20px] rounded-3xl w-full ${sender === "me" ? "bg-blue-primary text-white-base" : "bg-white-base text-black"}`}>
// //             {message}
// //         </p>
// //         <span className="text-[#a1a1a1] text-sm font-light self-end">{time}</span>
// //     </div>
// // );

// // export default MessageBubble;




import React, { useEffect, useState } from "react";
import { FaMicrophone, FaUser } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiLaughing } from "react-icons/bs";
import { CiCamera } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/chat/useSendMessage";

const ChatWindow = ({ messagesEndRef, currentChat, setReceivedMessage }) => {
    const [input, setInput] = useState("");
    const [sendingStatus, setSendingStatus] = useState(false);
    const { mutateAsync } = useSendMessage();

    const handleSendMessage = async (e) => {
        e.preventDefault();

        try {
            await mutateAsync({ chatId: currentChat.chatId, message: input });
        } catch (err) {
            console.log(err);
        } finally {
            setInput("");
        }
    };

    const handleSend = async () => {
        try {
            await mutateAsync({
                chatId: "0193758b-f266-f957-d35c-544e758932d8",
                message: "from organization to individual",
            }).then((res) => {
                setReceivedMessage(res.data); // This triggers the socket event
            });
        } catch (err) {
            console.log(err);
        } finally {
            setInput("");
        }
    };

    useEffect(() => {
        if (input) {
            setSendingStatus(true);
        } else {
            setSendingStatus(false);
        }
    }, [input]);

    return (
        <>
            <button onClick={handleSend} className="text-white bg-blue-primary">
                Click
            </button>
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
                    <>
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
                                    <FaUser className="text-[#9e9e9ebd]" size={20} />
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
                        <div className="relative flex-grow overflow-y-auto px-3 custom-scrollbar">
                            <div ref={messagesEndRef} className="flex flex-col">
                                {/* Render Messages */}
                                {Object.entries(currentChat.messages).map(
                                    ([sender, { message }], idx) => (
                                        <div
                                            key={idx}
                                            className={`flex flex-col w-fit max-w-[70%] my-3 gap-1 ${
                                                sender === "me"
                                                    ? "self-end"
                                                    : "self-start"
                                            }`}
                                        >
                                            <p
                                                className={`text-md font-300 py-[10px] px-[20px] rounded-3xl w-full ${
                                                    sender === "me"
                                                        ? "bg-blue-primary text-white-base"
                                                        : "bg-white-base text-black"
                                                }`}
                                            >
                                                {message}
                                            </p>
                                            <span className="text-[#a1a1a1] text-sm font-light self-end">
                                                {/* Add timestamp here if necessary */}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="absolute bottom-0 left-0 w-full border-t-thin border-white-base p-3">
                            <form
                                onSubmit={handleSendMessage}
                                className="flex items-center gap-4"
                            >
                                <FaMicrophone className="text-[#9e9e9ebd]" />
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-grow p-2 rounded-lg text-white-base bg-[#454545] border-none"
                                />
                                <IoSend
                                    className={`text-[#9e9e9ebd] ${
                                        sendingStatus && "text-blue-primary"
                                    }`}
                                    size={25}
                                    onClick={handleSendMessage}
                                />
                            </form>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ChatWindow;

