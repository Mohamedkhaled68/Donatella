import { create } from "zustand";

const useUserStore = create((set) => ({
    userId: "",
    userData: {},
    setUserData: (data) => set({ userData: data }),
    setUserId: (id) => set({ userId: id }),
}));

export default useUserStore;
