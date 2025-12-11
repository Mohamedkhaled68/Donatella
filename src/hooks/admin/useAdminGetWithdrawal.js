import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

const useAdminGetWithdrawal = (withdrawalId) => {
    const token = useAuthStore((state) => state.authToken);

    return useQuery({
        queryKey: ["admin", "withdrawal", withdrawalId],
        queryFn: async () => {
            const response = await axios.get(
                `${baseUrl}/admin/payments/withdraw/${withdrawalId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;
        },
        enabled: !!token && !!withdrawalId,
    });
};

export default useAdminGetWithdrawal;
