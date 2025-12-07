import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useGetMessages = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["chat", "getMessages"],
        mutationFn: async (filters = {}) => {
            const { organizationId, jobName, proposalStatus, searchKey } = filters;
            let url = `${baseUrl}/chats?paginate[page]=1&paginate[limit]=5`;
            
            if (searchKey) {
                url += `&filter[searchKey]=${encodeURIComponent(searchKey)}`;
            }
            if (organizationId) {
                url += `&filter[organizationId]=${organizationId}`;
            }
            if (jobName) {
                url += `&filter[jobName]=${encodeURIComponent(jobName)}`;
            }
            if (proposalStatus) {
                url += `&filter[proposalStatus]=${proposalStatus}`;
            }
            
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
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

export default useGetMessages;
