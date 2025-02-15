import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useReview = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["jobs", "review"],
        mutationFn: async ({ jobId, rating, comment }) => {
            const response = await axios.patch(
                `${baseUrl}/jobs/${jobId}/reviews`,
                { rating, comment },
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

export default useReview;
