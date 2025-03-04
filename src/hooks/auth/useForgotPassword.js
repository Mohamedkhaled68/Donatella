import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";

const useForgotPassword = () => {
    return useMutation({
        mutationKey: ["auth", "forget-password"],
        mutationFn: async (data) => {
            const response = await axios.patch(
                `${baseUrl}/auth/forgot-password`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.data;
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

export default useForgotPassword;
