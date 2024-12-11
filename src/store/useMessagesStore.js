import { create } from "zustand";

const useMessagesStore = create((set) => ({
    receivedMessage: null,
    messagesList: [
        {
            id: 1,
            sender: {
                name: "John Doe",
                profilePicture: "https://images.pexels.com/photos/28178032/pexels-photo-28178032/free-photo-of-a-man-with-a-beard-and-a-black-shirt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            message: "Hello, how are you?",
            timestamp: "2023-08-01T12:34:56",
        },
        {
            id: 2,
            sender: {
                name: "Emma Smith",
                profilePicture: "https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            message: "Hello, how are you?",
            timestamp: "2023-08-01T12:34:56",
        },
        {
            id: 3,
            sender: {
                name: "Leo Doe",
                profilePicture: "https://images.pexels.com/photos/7250522/pexels-photo-7250522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            message: "Hello, how are you?",
            timestamp: "2023-08-01T12:34:56",
        },
        {
            id: 4,
            sender: {
                name: "Kievn Goren",
                profilePicture: "https://images.pexels.com/photos/2380795/pexels-photo-2380795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            message: "Hello, how are you?",
            timestamp: "2023-08-01T12:34:56",
        },
    ],
    setReceivedMessage: (message) => set({ receivedMessage: message }),
    setMessagesList: (messages) =>
        set((state) => ({
            messagesList: [...state.messagesList, ...messages], // Append the new messages to the old ones
        })),
}));

export default useMessagesStore;
