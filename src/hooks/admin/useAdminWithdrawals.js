import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

export const useAdminWithdrawals = (filters = {}, paginate = { page: 1, limit: 20 }) => {
    const token = useAuthStore((state) => state.authToken);

    return useQuery({
        queryKey: ["admin", "withdrawals", filters, paginate],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters.status) params.append("status", filters.status);
            if (filters.userId) params.append("userId", filters.userId);
            if (filters.startDate) params.append("startDate", filters.startDate);
            if (filters.endDate) params.append("endDate", filters.endDate);
            if (paginate.page) params.append("paginate[page]", paginate.page.toString());
            if (paginate.limit) params.append("paginate[limit]", paginate.limit.toString());

            const response = await axios.get(
                `${baseUrl}/admin/payments/withdraw?${params.toString()}`,
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

export const useAdminUpdateWithdrawal = () => {
    const token = useAuthStore((state) => state.authToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }) => {
            const response = await axios.patch(
                `${baseUrl}/admin/payments/withdraw/${id}`,
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "withdrawals"] });
        },
    });
};
