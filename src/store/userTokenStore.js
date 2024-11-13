import { create } from "zustand";
import Cookies from "js-cookie";

const useAuthStore = create((set) => ({
    authToken: Cookies.get("Donatella_Token") || null,
    signIn: (token) => {
        Cookies.set("Donatella_Token", token, { expires: 7 });
        set({ authToken: token });
    },
    signOut: () => {
        Cookies.remove("Donatella_Token");
        set({ authToken: null });
    },
}));

export default useAuthStore;
