import { create } from "zustand";

const useMessagesStore = create((set) => ({
    receivedMessage: null,
    messagesList: [],
    setReceivedMessage: (message) => set({ receivedMessage: message }),
    setMessagesList: (messages) =>
        set((state) => ({
            messagesList: [...state.messagesList, ...messages], // Append the new messages to the old ones
        })),
}));

export default useMessagesStore;
