import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

const useCreateWithdrawal = () => {
    const token = useAuthStore((state) => state.authToken);
    return useMutation({
        mutationKey: ["payments", "create-withdrawal"],
        mutationFn: async (data) => {
            const response = await axios.post(
                `${baseUrl}/payments/withdraw`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;
        },
        onError: (error) => {
            return (
                error?.message ||
                error?.response?.data?.message ||
                "Failed to create withdrawal request"
            );
        },
    });
};

export default useCreateWithdrawal;
