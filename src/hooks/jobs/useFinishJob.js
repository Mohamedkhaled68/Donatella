import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useFinishJob = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["jobs", "finishJob"],
        mutationFn: async ({ jobId, requestId }) => {
            const response = await axios.patch(
                `${baseUrl}/jobs/${jobId}/finish`,
                { requestId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
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

export default useFinishJob;
