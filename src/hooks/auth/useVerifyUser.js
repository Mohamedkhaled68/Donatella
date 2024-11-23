import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const useVerifyUser = () => {
    const setToken = useAuthStore((state) => state.signIn);

    const { setUserStatus, userStatus } = useUserStore((state) => state);

    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["auth", "verify"],
        mutationFn: async (data) => {
            const response = await axios.patch(
                `${baseUrl}/auth/verify-account`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setUserStatus(response.data.data.user);
            setToken(response.data.data.token);
            return response.data;
        },
        onSuccess: () => {
            if (userStatus.role === "INDIVIDUAL") {
                navigate("/select-category");
            } else {
                navigate("/organization-form");
            }
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.data?.message ||
                "An unexpected error occurred.";
            throw new Error(errorMessage);
        },
    });
};

export default useVerifyUser;
