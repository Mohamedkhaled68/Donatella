import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import useAuthStore from "../../store/userTokenStore";
import { baseUrl } from "../../utils/baseUrl";
import { useI18n } from "../useI18n";

const useLogout = () => {
	const { currentLanguage } = useI18n();
	const token = useAuthStore((state) => state.authToken);
	const signOut = useAuthStore((state) => state.signOut);
	const { clearUserStatus } = useUserStore((state) => state);
	const navigate = useNavigate();

	return useMutation({
		mutationKey: ["auth", "logout"],
		mutationFn: async () => {
			const response = await axios.delete(`${baseUrl}/sessions`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			signOut();
			clearUserStatus();
			return response.data;
		},
		onSuccess: () => {
			navigate(`/${currentLanguage}/landing`);
		},
		onError: (error) => {
			const errorMessage = error.response?.data?.data?.message || "An unexpected error occurred.";
			throw new Error(errorMessage);
		},
	});
};

export default useLogout;
