import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useGetJob = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["jobs", "getJob"],
        mutationFn: async (jobId) => {
            const response = await axios.get(`${baseUrl}/jobs/${jobId}`, {
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
            console.log("Error posting job:", errorMessage);
        },
    });
};

export default useGetJob;
