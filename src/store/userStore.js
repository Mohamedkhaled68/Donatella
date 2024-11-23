import { create } from "zustand";

export const useUserStore = create((set) => ({
    userStatus: {},

    setUserStatus: (user) => {
        localStorage.setItem("userStatus", JSON.stringify(user));
        set(() => ({ userStatus: user }));
    },

    rehydrate: () => {
        const storedUserStatus = JSON.parse(localStorage.getItem("userStatus"));
        if (storedUserStatus) {
            set(() => ({ userStatus: storedUserStatus }));
        }
    },

    clearUserStatus: () => {
        localStorage.removeItem("userStatus");
        set(() => ({ userStatus: null }));
    },
}));

// Call rehydrate at app start
useUserStore.getState().rehydrate();
