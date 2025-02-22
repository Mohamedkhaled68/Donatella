import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const useUpdateEmail = () => {
    const token = useAuthStore((state) => state.authToken);
    const { setUserStatus } = useUserStore((state) => state);
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["auth", "update-email"],
        mutationFn: async (data) => {
            const response = await axios.patch(
                `${baseUrl}/auth/update-email`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUserStatus(response.data.data.user);
            return response.data.data;
        },
        onSuccess: () => {
            navigate("/");
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.data?.message ||
                "An unexpected error occurred.";
            throw new Error(errorMessage);
        },
    });
};

export default useUpdateEmail;
