import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

const useGetBalance = () => {
    const token = useAuthStore((state) => state.authToken);
    return useMutation({
        mutationKey: ["payments", "get-balance"],
        mutationFn: async () => {
            const response = await axios.get(`${baseUrl}/users/me/balance`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data;
        },
        onError: (error) => {
            return (
                error?.message ||
                error?.response?.data?.message ||
                "Failed to get balance"
            );
        },
    });
};

export default useGetBalance;
