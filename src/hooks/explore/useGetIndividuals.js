import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../store/userTokenStore";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const useGetIndividuals = () => {
    const token = useAuthStore((state) => state.token);
    return useMutation({
        mutationKey: ["explore", "individuals"],
        mutationFn: async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/individuals?paginate[page]=1&paginate[limit]=15&filter[individualCategory]=MODEL`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            // "Content-Type": "application/json",
                        },
                    }
                );

                console.log(response.data);

                return response.data;
            } catch (error) {
                console.error("Error fetching individuals:", error);
                throw new Error(
                    error.response?.data?.message ||
                        "Failed to fetch individuals"
                );
            }
        },
        onSuccess: (data) => {
            console.log("Data fetched successfully:", data);
        },
        onError: (error) => {
            console.error("Mutation failed:", error);
        },
    });
};

export default useGetIndividuals;
