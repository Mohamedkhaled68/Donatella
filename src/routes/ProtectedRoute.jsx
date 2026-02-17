import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import useAuthStore from "../store/userTokenStore";

const ProtectedRoute = ({ redirectPath = "landing" }) => {
	const token = useAuthStore((state) => state.authToken);
	const { userStatus } = useUserStore((state) => state);
	const location = useLocation();

	// Get current language from URL
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const currentLang = ["en", "ar"].includes(pathSegments[0]) ? pathSegments[0] : "en";

	// Exclude admin users from normal user routes
	if (userStatus?.role === "ADMIN") {
		return (
			<Navigate
				to={`/${currentLang}/admin/dashboard`}
				replace
			/>
		);
	}

	if (!token || !userStatus?.onboardingCompleted) {
		return (
			<Navigate
				to={`/${currentLang}/${redirectPath}`}
				replace
			/>
		);
	}

	return <Outlet />;
};

export default ProtectedRoute;
