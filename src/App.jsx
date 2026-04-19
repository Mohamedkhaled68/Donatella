import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaAnglesUp } from "react-icons/fa6";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "./components";
import SelectCategory from "./components/onBoarding/SelectCategory";
import { useI18n } from "./hooks/useI18n";
import {
	AboutUs,
	Categories,
	Contact,
	CreateUser,
	Dashboard,
	ExperienceFormSection,
	Explore,
	ForgotPassword,
	Landing,
	Login,
	Messages,
	Notifications,
	OrgProfileForm,
	Payments,
	PayoutDetail,
	Payouts,
	Privacy,
	Profile,
	ProfileFormSection,
	Services,
	Signup,
	UserEdit,
	Users,
	VerifyForgotOTP,
	VerifyingPage,
} from "./pages";
import {
	AdminProtectedRoute,
	ChangeEmail,
	ChangePassword,
	IndividualView,
	JobView,
	PostJob,
	ProtectedRoute,
	SendChangeOTP,
} from "./routes";
import { useUserStore } from "./store/userStore";
import useAuthStore from "./store/userTokenStore";

const NotFoundRedirect = () => {
	const { lang } = useParams();
	const currentLang = lang && ["en", "ar"].includes(lang) ? lang : "en";
	return (
		<Navigate
			to={`/${currentLang}/landing`}
			replace
		/>
	);
};

const App = () => {
	const location = useLocation();
	const [isVisible, setIsVisible] = useState(false);
	const [popup, setPopup] = useState(false);
	const { userStatus, clearUserStatus } = useUserStore((state) => state);
	const { signOut } = useAuthStore((state) => state);
	const navigate = useNavigate();
	const { t } = useI18n();

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const cancelCompletion = () => {
		setPopup(false);
		clearUserStatus();
		signOut();
		localStorage.removeItem("DONATELLA_USER_DATA");
		localStorage.removeItem("USER_EXPERIENCE_FORM_DATA");
		localStorage.removeItem("USER_ROLE");
	};

	const continueOnboarding = () => {
		if (!userStatus) return;

		// Get current language from URL
		const pathSegments = location.pathname.split("/").filter(Boolean);
		const currentLang = ["en", "ar"].includes(pathSegments[0]) ? pathSegments[0] : "en";

		// Redirect admins to dashboard
		if (userStatus?.role === "ADMIN") {
			navigate(`/${currentLang}/admin/dashboard`, { replace: true });
			setPopup(false);
			return;
		}

		const userExperienceData = localStorage.getItem("USER_EXPERIENCE_FORM_DATA");
		if (
			userStatus?.verifiedEmail &&
			!userStatus?.onboardingCompleted &&
			!userExperienceData &&
			userStatus?.role === "INDIVIDUAL"
		) {
			navigate(`/${currentLang}/select-category`, { replace: true });
		} else if (
			userStatus?.verifiedEmail &&
			userExperienceData &&
			!userStatus?.onboardingCompleted &&
			userStatus?.role === "INDIVIDUAL"
		) {
			const category = localStorage.getItem("USER_ROLE");
			navigate(`/${currentLang}/profile-form`, {
				replace: true,
				state: { category },
			});
		} else if (userStatus?.verifiedEmail && !userStatus?.onboardingCompleted && userStatus?.role === "ORGANIZATION") {
			navigate(`/${currentLang}/organization-form`, {
				replace: true,
			});
		} else if (userStatus.unVerifiedEmail) {
			navigate(`/${currentLang}/verifying-page`);
		}
		setPopup(false);
	};
	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 200) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	useEffect(() => {
		// Check if we're on landing page (with any language prefix)
		const pathSegments = location.pathname.split("/").filter(Boolean);
		const isLandingPage = pathSegments.length >= 2 && pathSegments[1] === "landing";

		if (userStatus && isLandingPage) {
			setPopup(!userStatus.onboardingCompleted);
		}
	}, [location.pathname, userStatus]);

	useEffect(() => {
		if (popup) {
			document.documentElement.style.overflowY = "hidden";
		} else {
			document.documentElement.style.overflowY = "unset";
		}
		return () => {
			document.documentElement.style.overflowY = "unset";
		};
	}, [popup]);

	return (
		<>
			<AnimatePresence mode="wait">
				<PageContainer pathname={location.pathname}>
					{popup && (
						<div className=" w-full h-screen bg-black/70 absolute z-[50000] top-0 left-0 flex justify-center items-center">
							<div className="rounded-md bg-blue-primary p-4 flex flex-col gap-3 items-center text-center text-white-base">
								<p className="text-lg font-body">
									{t("app.onboarding.title")}
									<br />
									{t("app.onboarding.message")}
								</p>
								<div className="flex justify-center items-center gap-2">
									<button
										onClick={cancelCompletion}
										className="px-10 py-2 text-background-dark bg-white-base rounded-xl"
									>
										{t("app.onboarding.cancel")}
									</button>
									<button
										onClick={continueOnboarding}
										className="px-10 py-2 bg-background-dark text-white-base rounded-xl"
									>
										{t("app.onboarding.complete")}
									</button>
								</div>
							</div>
						</div>
					)}
					<Routes location={location}>
						{/* Redirect root to /en/landing */}
						<Route
							path="/"
							element={
								<Navigate
									to="/en/landing"
									replace
								/>
							}
						/>

						{/* Language-prefixed routes */}
						<Route path="/:lang">
							{/* Redirect base language route to landing */}
							<Route
								index
								element={
									<Navigate
										to="landing"
										replace
									/>
								}
							/>
							{/* UNAUTHORIZED */}
							<Route
								path="about"
								element={<AboutUs />}
							/>
							<Route
								path="contact"
								element={<Contact />}
							/>
							<Route
								path="services"
								element={<Services />}
							/>
							<Route
								path="privacy"
								element={<Privacy />}
							/>
							<Route
								path="landing"
								element={<Landing />}
							/>
							<Route
								path="forgot-password"
								element={<ForgotPassword />}
							/>
							<Route
								path="verify-otp"
								element={<VerifyForgotOTP />}
							/>

							<Route
								path="login"
								element={<Login />}
							/>
							<Route
								path="signup"
								element={<Signup />}
							/>
							<Route
								path="verifying-page"
								element={<VerifyingPage />}
							/>

							{/* ONBOARDING */}
							<Route
								path="select-category"
								element={<SelectCategory />}
							/>
							<Route
								path="experience-form"
								element={<ExperienceFormSection />}
							/>
							<Route
								path="profile-form"
								element={<ProfileFormSection />}
							/>
							<Route
								path="organization-form"
								element={<OrgProfileForm />}
							/>

							{/* AUTHORIZED */}
							<Route element={<ProtectedRoute redirectPath="landing" />}>
								<Route
									path="profile"
									element={<Profile />}
								/>
								<Route
									path="explore"
									element={<Explore />}
								/>
								<Route
									path="explore/post-job"
									element={<PostJob />}
								/>
								<Route
									path="explore/jobs/:jobId"
									element={<JobView />}
								/>
								<Route
									path="explore/individuals/:individualId"
									element={<IndividualView />}
								/>
								<Route
									path="messages"
									element={<Messages />}
								/>
								<Route
									path="payments"
									element={<Payments />}
								/>
								<Route
									path="change-email"
									element={<ChangeEmail />}
								/>
								<Route
									path="change-password"
									element={<ChangePassword />}
								/>
								<Route
									path="send-change-otp"
									element={<SendChangeOTP />}
								/>
							</Route>

							{/* ADMIN */}
							<Route element={<AdminProtectedRoute />}>
								<Route
									path="admin/dashboard"
									element={<Dashboard />}
								/>
								<Route
									path="admin/categories"
									element={<Categories />}
								/>
								<Route
									path="admin/users"
									element={<Users />}
								/>
								<Route
									path="admin/users/create"
									element={<CreateUser />}
								/>
								<Route
									path="admin/users/:id/edit"
									element={<UserEdit />}
								/>
								<Route
									path="admin/notifications"
									element={<Notifications />}
								/>
								<Route
									path="admin/payouts"
									element={<Payouts />}
								/>
								<Route
									path="admin/payouts/:id"
									element={<PayoutDetail />}
								/>
							</Route>

							{/* Catch-all route for unmatched paths within language route */}
							<Route
								path="*"
								element={<NotFoundRedirect />}
							/>
						</Route>

						{/* Catch-all route for unmatched paths at root level */}
						<Route
							path="*"
							element={
								<Navigate
									to="/en/landing"
									replace
								/>
							}
						/>
					</Routes>
				</PageContainer>
			</AnimatePresence>

			{isVisible && (
				<motion.div
					className="fixed bottom-10 right-10 flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#121417] shadow-sm shadow-white-base/80 text-white-base cursor-pointer"
					animate={{
						y: [0, -10, 0],
					}}
					transition={{
						duration: 0.6,
						repeat: Infinity,
						repeatType: "loop",
					}}
					onClick={handleScrollToTop}
				>
					<FaAnglesUp size={25} />
				</motion.div>
			)}
			<div className="absolute z-[9999999]">
				<Toaster
					position="top-center"
					reverseOrder={false}
				/>
			</div>
		</>
	);
};

export default App;
