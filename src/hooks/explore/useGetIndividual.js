import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../store/userTokenStore";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const useGetIndividual = () => {
    const token = useAuthStore((state) => state.authToken);
    return useMutation({
        mutationKey: ["explore", "getIndividual"],
        mutationFn: async (id) => {
            const response = await axios.get(`${baseUrl}/individuals/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return response.data.data;
        },
        onSuccess: () => {},
        onError: (error) => {
            console.error("Mutation failed:", error);
        },
    });
};

export default useGetIndividual;
