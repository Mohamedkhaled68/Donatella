import { create } from "zustand";

const useUserStore = create((set) => ({
    userId: null,
    setUserData: (data) => set({ userData: data }),
}));

export default useUserStore;
