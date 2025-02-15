import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useSendMessage = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["chat", "send"],
        mutationFn: async ({ chatId, message, messageType, jobId }) => {
            // if (!token) throw new Error("Unauthorized: No token found.");

            let body = { content: message };

            if (messageType === "REQUEST" && jobId) {
                body = { ...body, jobId, messageType }
                
            }



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
            return response.data.data;
        },
        onSuccess: (data) => {
            console.log("Message sent successfully:", data);
        },
        onError: (error) => {
            console.error(
                "Error sending message:",
                error.response?.data?.message || error.message
            );
        },
    });
};

export default useSendMessage;
