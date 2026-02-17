import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import useAuthStore from "../../store/userTokenStore";
import { baseUrl } from "../../utils/baseUrl";
import { useI18n } from "../useI18n";

const useVerifyUser = () => {
	const setToken = useAuthStore((state) => state.signIn);
	const { setUserStatus, userStatus } = useUserStore((state) => state);
	const { currentLanguage } = useI18n();
	const navigate = useNavigate();
	return useMutation({
		mutationKey: ["auth", "verify"],
		mutationFn: async (data) => {
			const response = await axios.patch(`${baseUrl}/auth/verify-account`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			setUserStatus(response.data.data.user);
			setToken(response.data.data.token);
			return response.data;
		},
		onSuccess: () => {
			if (userStatus.role === "INDIVIDUAL") {
				navigate(`/${currentLanguage}/select-category`, { replace: true });
			} else {
				navigate(`/${currentLanguage}/organization-form`, { replace: true });
			}
		},
		onError: (error) => {
			const errorMessage = error.response?.data?.data?.message || "An unexpected error occurred.";
			throw new Error(errorMessage);
		},
	});
};

export default useVerifyUser;
