import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../store/userTokenStore";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const useAddTag = () => {
    const token = useAuthStore((state) => state.authToken);
    return useMutation({
        mutationKey: ["explore", "addTag"],
        mutationFn: async (title) => {
            const response = await axios.post(`${baseUrl}/tags`, title, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log(response.data.data);
        },
        onSuccess: () => {},
        onError: (error) => {
            console.error("Mutation failed:", error);
        },
    });
};

export default useAddTag;
