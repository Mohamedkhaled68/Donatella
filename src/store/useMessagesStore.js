import { create } from "zustand";

const useMessagesStore = create((set) => ({
    receivedMessage: null,
    messagesList: [
        {
            id: 1,
            sender: {
                name: "John Doe",
                profilePicture: "https://via.placeholder.com/150",
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
