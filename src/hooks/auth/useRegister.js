import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { baseUrl } from "../../utils/baseUrl";
import { useI18n } from "../useI18n";

const useRegister = () => {
	const navigate = useNavigate();
	const { currentLanguage } = useI18n();
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
			navigate(`/${currentLanguage}/verifying-page`, { replace: true });
		},
		onError: (error) => {
			return error?.response?.data?.message;
		},
	});
};

export default useRegister;
