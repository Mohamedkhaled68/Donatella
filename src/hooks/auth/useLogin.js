import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/userTokenStore";
import useUserStore from "../../store/userStore";

const useLogin = () => {
    const setToken = useAuthStore((state) => state.signIn);
    const navigate = useNavigate();
    const { setUserData } = useUserStore();

    return useMutation({
        mutationKey: ["user"],
        mutationFn: async (user) => {
            const response = await axios.post(`${baseUrl}/auth/login`, user, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setUserData(response.data.data);
            setToken(response.data.data.token);
            return response.data;
        },
        onSuccess: () => {
            navigate("/", { replace: true });
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.data?.message ||
                "An unexpected error occurred.";
            throw new Error(errorMessage);
        },
    });
};

export default useLogin;
