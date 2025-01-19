import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../store/userTokenStore";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const useGetJobs = () => {
    const token = useAuthStore((state) => state.authToken);
    return useMutation({
        mutationKey: ["explore", "jobs"],
        mutationFn: async ([category, searchKey]) => {
            const response = await axios.get(
                `${baseUrl}/jobs?filter[jobCategory]=${category}&filter[searchKey]=${searchKey}&paginate[page]=1&paginate[limit]=15`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data.data;
        },
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.error("Mutation failed:", error);
        },
    });
};

export default useGetJobs;
