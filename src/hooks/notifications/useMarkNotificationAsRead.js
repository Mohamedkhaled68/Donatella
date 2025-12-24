import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useMarkNotificationAsRead = () => {
    const token = useAuthStore((state) => state.authToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["notifications", "markAsRead"],
        mutationFn: async (notificationId) => {
            const response = await axios.patch(
                `${baseUrl}/notifications/${notificationId}/read`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.data;
        },
        onSuccess: () => {
            // Invalidate notifications queries to refetch
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["notifications", "unreadCount"] });
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            console.log("Error marking notification as read:", errorMessage);
        },
    });
};

export default useMarkNotificationAsRead;



