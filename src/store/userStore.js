import { create } from "zustand";

export const useUserStore = create((set) => ({
    userStatus: null,

    setUserStatus: (user) => {
        localStorage.setItem("DONATELLA_USER_DATA", JSON.stringify(user));
        set(() => ({ userStatus: user }));
    },

    rehydrate: () => {
        const storedUserStatus = JSON.parse(
            localStorage.getItem("DONATELLA_USER_DATA")
        );
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
