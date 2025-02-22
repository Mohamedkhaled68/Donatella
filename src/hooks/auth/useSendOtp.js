import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useUserStore } from "../../store/userStore";

const useSendOtp = () => {
    const { userStatus } = useUserStore((state) => state);

    return useMutation({
        mutationKey: ["otp", "send-otp"],
        mutationFn: async (useCase) => {
            const response = await axios.post(
                `${baseUrl}/otp`,
                {
                    userId: userStatus.id,
                    useCase,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        },
        onSuccess: () => {},
        onError: (error) => {
            const errorMessage =
                error.response?.data?.data?.message ||
                "An unexpected error occurred.";
            throw new Error(errorMessage);
        },
    });
};

export default useSendOtp;
