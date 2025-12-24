import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

const useGetOrganizationJobs = () => {
    const token = useAuthStore((state) => state.authToken);
    return useMutation({
        mutationKey: ["organization", "jobs"],
        mutationFn: async () => {
            const response = await axios.get(
                `${baseUrl}/organization/me/jobs`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;
        },
        onError: (error) => {
            return (
                error?.message ||
                error?.response?.data?.message ||
                "Failed to get organization jobs"
            );
        },
    });
};

export default useGetOrganizationJobs;




