import { create } from "zustand";

const useUserStore = create((set) => ({
    userId: null,
    setUserData: (id) => set({ userId: id }),
}));

export default useUserStore;
