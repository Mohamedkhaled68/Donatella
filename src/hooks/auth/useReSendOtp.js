import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useUserStore } from "../../store/userStore";

const useReSendOtp = () => {
    const { userStatus } = useUserStore((state) => state);
    return useMutation({
        mutationKey: ["auth", "resend-otp"],
        mutationFn: async () => {
            const response = await axios.post(
                `${baseUrl}/otp`,
                {
                    userId: userStatus.id,
                    useCase: "VERIFY_ACCOUNT",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
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

export default useReSendOtp;
