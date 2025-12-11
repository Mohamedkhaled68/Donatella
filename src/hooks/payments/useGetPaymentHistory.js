import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

const useGetPaymentHistory = (filters = {}) => {
    const token = useAuthStore((state) => state.authToken);
    return useQuery({
        queryKey: ["payments", "history", filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters.type) params.append("type", filters.type);
            if (filters.status) params.append("status", filters.status);

            const response = await axios.get(
                `${baseUrl}/payments/history?${params.toString()}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;
        },
        enabled: !!token,
    });
};

export default useGetPaymentHistory;
