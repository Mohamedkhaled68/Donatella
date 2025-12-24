import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";
import toast from "react-hot-toast";

const useSendNotification = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["admin", "notifications", "send"],
        mutationFn: async (data) => {
            const response = await axios.post(
                `${baseUrl}/admin/notifications`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.data;
        },
        onSuccess: (data) => {
            toast.success(
                `Notification sent to ${data.sentTo} user(s) successfully!`
            );
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.data?.message ||
                "Failed to send notification";
            toast.error(errorMessage);
        },
    });
};

export default useSendNotification;



