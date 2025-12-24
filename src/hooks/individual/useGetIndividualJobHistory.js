import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

const useGetIndividualJobHistory = () => {
    const token = useAuthStore((state) => state.authToken);
    return useMutation({
        mutationKey: ["individual", "job-history"],
        mutationFn: async ({ page = 1, limit = 10, filters = {} } = {}) => {
            const { jobName, proposalStatus } = filters;
            let url = `${baseUrl}/individuals/me/job-history?paginate[page]=${page}&paginate[limit]=${limit}`;
            
            if (jobName) {
                url += `&filter[jobName]=${encodeURIComponent(jobName)}`;
            }
            if (proposalStatus) {
                url += `&filter[proposalStatus]=${proposalStatus}`;
            }
            
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data;
        },
        onError: (error) => {
            return (
                error?.message ||
                error?.response?.data?.message ||
                "Failed to get job history"
            );
        },
    });
};

export default useGetIndividualJobHistory;



