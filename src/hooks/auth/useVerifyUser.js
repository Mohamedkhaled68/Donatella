import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/userTokenStore";

const useVerifyUser = () => {
    const setToken = useAuthStore((state) => state.signIn);
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["user"],
        mutationFn: async (data) => {
            const response = await axios.patch(
                `${baseUrl}/auth/verify-account`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data.data.token);
            setToken(response.data.data.token);
            return response.data;
        },
        onSuccess: () => {
            navigate("/selectCategory", { replace: true });
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            throw new Error(errorMessage);
        },
    });
};

export default useVerifyUser;
