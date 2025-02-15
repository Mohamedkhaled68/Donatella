import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useAcceptJob = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["jobs", "acceptJob"],
        mutationFn: async ({ jobId, requestId }) => {
            const response = await axios.patch(
                `${baseUrl}/jobs/${jobId}/accept`,
                { requestId },
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
            console.log("Error posting job:", errorMessage);
        },
    });
};

export default useAcceptJob;
