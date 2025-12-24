import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

const useGetJobHistory = () => {
    const token = useAuthStore((state) => state.authToken);
    return useMutation({
        mutationKey: ["organization", "job-history"],
        mutationFn: async ({ page = 1, limit = 10, filters = {} } = {}) => {
            const { jobName, jobStatus } = filters;
            let url = `${baseUrl}/organization/me/job-history?paginate[page]=${page}&paginate[limit]=${limit}`;
            
            if (jobName) {
                url += `&filter[jobName]=${encodeURIComponent(jobName)}`;
            }
            if (jobStatus) {
                url += `&filter[jobStatus]=${jobStatus}`;
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

export default useGetJobHistory;




