import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useAdminStatistics = () => {
    const token = useAuthStore((state) => state.authToken);

    return useQuery({
        queryKey: ["admin", "statistics"],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/admin/statistics`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },
        enabled: !!token,
        refetchOnWindowFocus: true,
    });
};

export default useAdminStatistics;
