import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const useVerifyActions = () => {
	return useMutation({
		mutationKey: ["otp", "verifyActions"],
		mutationFn: async (data) => {
			const response = await axios.post(`${baseUrl}/otp/verify`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		},
		onSuccess: () => {},
		onError: (error) => {
			const errorMessage = error.response?.data?.data?.message || "An unexpected error occurred.";
			throw new Error(errorMessage);
		},
	});
};

export default useVerifyActions;
