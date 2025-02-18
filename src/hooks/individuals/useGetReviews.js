import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../store/userTokenStore";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const useGetReviews = () => {
    const token = useAuthStore((state) => state.authToken);
    return useMutation({
        mutationKey: ["individuals", "getReviews"],
        mutationFn: async (id) => {
            const response = await axios.get(
                `${baseUrl}/individuals/${id}/reviews`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data.data.reviews;
        },
        onSuccess: () => {},
        onError: (error) => {
            console.error("Mutation failed:", error);
        },
    });
};

export default useGetReviews;
