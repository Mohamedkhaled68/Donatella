import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useUpdateOrg = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["user", "updateOrg"],
        mutationFn: async (data) => {
            const response = await axios.patch(
                `${baseUrl}/organization/me`,
                data,
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
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            console.log("Error", errorMessage);
        },
    });
};

export default useUpdateOrg;
