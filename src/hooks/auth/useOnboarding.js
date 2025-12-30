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
            return response.data;
        },
        onSuccess: () => {
            localStorage.removeItem("USER_EXPERIENCE_FORM_DATA");
            navigate("/", { replace: true });
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            throw new Error(errorMessage);
        },
    });
};

export default useOnboarding;
