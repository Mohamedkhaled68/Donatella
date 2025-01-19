import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useGetChatMessages = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["chat", "getChatMessages"],
        mutationFn: async (chatId) => {
            const response = await axios.get(
                `${baseUrl}/chats/${chatId}/messages?paginate[limit]=20&paginate[direction]=AFTER`,
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
            console.log("Error fetching messages:", errorMessage);
        },
    });
};

export default useGetChatMessages;
