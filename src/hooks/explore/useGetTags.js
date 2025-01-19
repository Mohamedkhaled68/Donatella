import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../store/userTokenStore";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const useGetTags = () => {
    const token = useAuthStore((state) => state.authToken);
    return useMutation({
        mutationKey: ["explore", "getTags"],
        mutationFn: async (searchKey) => {
            const response = await axios.get(
                `${baseUrl}/tags?searchKey=${searchKey || ""}`,
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
            console.error("Mutation failed:", error);
        },
    });
};

export default useGetTags;
