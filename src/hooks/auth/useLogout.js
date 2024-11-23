import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/userTokenStore";
import { useUserStore } from "../../store/userStore";

const useLogout = () => {
    const token = useAuthStore((state) => state.authToken);
    const signOut = useAuthStore((state) => state.signOut);
    const { clearUserStatus } = useUserStore((state) => state);
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["auth", "logout"],
        mutationFn: async () => {
            const response = await axios.delete(`${baseUrl}/sessions`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            signOut();
            clearUserStatus();
            return response.data;
        },
        onSuccess: () => {
            navigate("/landing");
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.data?.message ||
                "An unexpected error occurred.";
            throw new Error(errorMessage);
        },
    });
};

export default useLogout;
