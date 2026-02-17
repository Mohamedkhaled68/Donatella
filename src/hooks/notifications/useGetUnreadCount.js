import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";
import { baseUrl } from "../../utils/baseUrl";

const useGetUnreadCount = (isEnabled = true) => {
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
		enabled: !!token && !!isEnabled, // Only run if token exists
		staleTime: 1000 * 30, // Cache for 30 seconds
		refetchInterval: (query) => {
			// Only refetch if query is successful, otherwise stop refetching
			if (query.state.status === "error") {
				return false; // Stop refetching on error
			}
			return 1000 * 60; // Refetch every minute if successful
		},
		retry: 1,
		retryOnMount: false, // Don't retry on mount if it previously failed
		refetchOnWindowFocus: false, // Don't refetch on window focus
		refetchOnReconnect: false, // Don't refetch on reconnect
	});
};

export default useGetUnreadCount;
