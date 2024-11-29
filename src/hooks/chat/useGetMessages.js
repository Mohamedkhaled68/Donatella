import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useGetMessages = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["chat", "getMessages"],
        mutationFn: async () => {
            const response = await axios.get(
                `${baseUrl}/chats?filter[searchKey]=&paginate[page]=1&paginate[limit]=5`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Fetched messages:", data);
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            console.log("Error fetching messages:", errorMessage);
        },
    });
};

export default useGetMessages;
