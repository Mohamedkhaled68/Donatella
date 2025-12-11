import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

const useGetWithdrawalHistory = (withdrawalId) => {
    const token = useAuthStore((state) => state.authToken);
    
    return useQuery({
        queryKey: ["withdrawal-history", withdrawalId],
        queryFn: async () => {
            const response = await axios.get(
                `${baseUrl}/payments/withdraw/${withdrawalId}/history`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;
        },
        enabled: !!withdrawalId,
        onError: (error) => {
            console.error("Failed to fetch withdrawal history:", error);
        },
    });
};

export default useGetWithdrawalHistory;
