import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";

const useRegister = () => {
    const navigate = useNavigate();
    const { setUserId } = useUserStore();

    return useMutation({
        mutationKey: ["user"],
        mutationFn: async (user) => {
            const response = await axios.post(`${baseUrl}/auth/signup`, user, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data.data.id);
            setUserId(response.data.data.id);
            return response.data;
        },
        onSuccess: () => {
            navigate("/verifying-page", { replace: true });
        },
        onError: (error) => {
            const errorMessage =
            error.response?.data?.data?.message ||
            "An unexpected error occurred.";
            throw new Error(errorMessage);
        },
    });
};

export default useRegister;
