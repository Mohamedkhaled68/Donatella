import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";
import { baseUrl } from "../../utils/baseUrl";

const useGetStars = () => {
	const token = useAuthStore((state) => state.authToken);
	return useMutation({
		mutationKey: ["individuals", "getStars"],
		mutationFn: async (id) => {
			const response = await axios.get(`${baseUrl}/individuals/${id}/stars`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			return response.data.data;
		},
		onSuccess: () => {},
		onError: (error) => {
			console.error("Mutation failed:", error);
		},
	});
};

export default useGetStars;
