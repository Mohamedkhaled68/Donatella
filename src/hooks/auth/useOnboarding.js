import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/userTokenStore";

const useOnboarding = () => {
    const token = useAuthStore((state) => state.authToken);

    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["user", "completeData"],
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
            console.log(response.data);
            return response.data;
        },
        onSuccess: () => {
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
