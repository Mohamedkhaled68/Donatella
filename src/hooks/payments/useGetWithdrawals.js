import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

const useGetWithdrawals = () => {
    const token = useAuthStore((state) => state.authToken);
    return useQuery({
        queryKey: ["payments", "withdrawals"],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/payments/withdraw`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data;
        },
        enabled: !!token,
    });
};

export default useGetWithdrawals;
