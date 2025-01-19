import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useUploadImage = () => {
    const token = useAuthStore((state) => state.authToken);

    return useMutation({
        mutationKey: ["user", "uploadImage"],
        mutationFn: async (file) => {
            const formData = new FormData();
            formData.append("file", file); // Replace "image" with the key expected by your backend
            const response = await axios.post(
                `${baseUrl}/upload/images`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data", // Axios will handle the boundary
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
                error.response?.data?.data?.message ||
                "An unexpected error occurred.";
            throw new Error(errorMessage);
        },
    });
};

export default useUploadImage;
