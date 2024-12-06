import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const usePostJob = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["jobs", "postJobs"],
        mutationFn: async () => {
            console.log(token);

            const response = await axios.post(`${baseUrl}/jobs`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            console.log("Error posting job:", errorMessage);
        },
    });
};

export default usePostJob;
