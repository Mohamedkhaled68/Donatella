import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../store/userTokenStore";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const useGetJobs = () => {
    const token = useAuthStore((state) => state.authToken);
    return useMutation({
        mutationKey: ["explore", "jobs"],
        mutationFn: async ([category, searchKey, filters = {}]) => {
            const { organizationId, jobName, proposalStatus, jobStatus } = filters;
            let url = `${baseUrl}/jobs?filter[jobCategory]=${category}&filter[searchKey]=${searchKey || ''}`;
            
            if (organizationId) {
                url += `&filter[organizationId]=${organizationId}`;
            }
            if (jobStatus) {
                url += `&filter[jobStatus]=${jobStatus}`;
            }
            if (jobName) {
                url += `&filter[jobName]=${encodeURIComponent(jobName)}`;
            }
            if (proposalStatus) {
                url += `&filter[proposalStatus]=${proposalStatus}`;
            }
            
            url += `&paginate[page]=1&paginate[limit]=15`;
            
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return response.data.data;
        },
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.error("Mutation failed:", error);
        },
    });
};

export default useGetJobs;
