import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";

const useVerfiyForgot = () => {
	const navigate = useNavigate();
	return useMutation({
		mutationKey: ["auth", "verify-forget-password"],
		mutationFn: async (data) => {
			const response = await axios.patch(`${baseUrl}/auth/verify-forgot-password`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data.data;
		},
		onSuccess: () => {
			navigate("/");
		},
		onError: (error) => {
			const errorMessage = error.response?.data?.data?.message || "An unexpected error occurred.";
			throw new Error(errorMessage);
		},
	});
};

export default useVerfiyForgot;
