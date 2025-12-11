import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

const useAdminPaymentAuditLogs = (filters = {}, paginate = { page: 1, limit: 20 }) => {
    const token = useAuthStore((state) => state.authToken);

    return useQuery({
        queryKey: ["admin", "payment-audit-logs", filters, paginate],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters.adminUserId) params.append("adminUserId", filters.adminUserId);
            if (filters.entityType) params.append("entityType", filters.entityType);
            if (filters.action) params.append("action", filters.action);
            if (filters.startDate) params.append("startDate", filters.startDate);
            if (filters.endDate) params.append("endDate", filters.endDate);
            if (paginate.page) params.append("paginate[page]", paginate.page.toString());
            if (paginate.limit) params.append("paginate[limit]", paginate.limit.toString());

            const response = await axios.get(
                `${baseUrl}/admin/payments/audit-logs?${params.toString()}`,
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

export default useAdminPaymentAuditLogs;
