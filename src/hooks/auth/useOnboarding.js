import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/userTokenStore";
import { useUserStore } from "../../store/userStore";

const useOnboarding = () => {
    const token = useAuthStore((state) => state.authToken);
    const { setUserStatus } = useUserStore((state) => state);

    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["user", "onboarding"],
        mutationFn: async (data) => {
            const response = await axios.patch(
                `${baseUrl}/users/onboarding`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUserStatus(response.data.data);
            console.log(response.data.data);
            return response.data;
        },
        onSuccess: () => {
            navigate("/", { replace: true });
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.data?.message ||
                "An unexpected error occurred.";
            throw new Error(errorMessage);
        },
    });
};

export default useOnboarding;
