import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useDeleteAllUsers = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["user"],
        mutationFn: async () => {
            const response = await axios.delete(`${baseUrl}/users/all`);
            console.log(response.data);
            return response.data;
        },
        onSuccess: () => {
            console.log("Users deleted successfully!!");
            navigate("/landing");
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            throw new Error(errorMessage);
        },
    });
};

export default useDeleteAllUsers;
