import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

const useGetUnreadCount = () => {
    const token = useAuthStore((state) => state.authToken);

    return useQuery({
        queryKey: ["notifications", "unreadCount"],
        queryFn: async () => {
            const { data } = await axios.get(`${baseUrl}/notifications/unread-count`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.data.count;
        },
        staleTime: 1000 * 30, // Cache for 30 seconds
        refetchInterval: 1000 * 60, // Refetch every minute
        retry: 1,
    });
};

export default useGetUnreadCount;
