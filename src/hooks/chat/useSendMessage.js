import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useSendMessage = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["chat", "send"],
        mutationFn: async ({ chatId, message }) => {
            const body = { content: message };
            const response = await axios.post(
                `${baseUrl}/chats/${chatId}/messages`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data.data);
            return response.data.data;
        },
        onSuccess: () => {},
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            throw new Error(errorMessage);
        },
    });
};

export default useSendMessage;
