import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const useRegister = () => {
    const navigate = useNavigate();
    const { setUserStatus } = useUserStore((state) => state);

    return useMutation({
        mutationKey: ["auth", "register"],
        mutationFn: async (user) => {
            const response = await axios.post(`${baseUrl}/auth/signup`, user, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setUserStatus(response.data.data);
            console.log(response);
            return response.data;
        },
        onSuccess: () => {
            navigate("/verifying-page", { replace: true });
        },
        onError: (error) => {
            return error?.response?.data?.message;
        },
    });
};

export default useRegister;
