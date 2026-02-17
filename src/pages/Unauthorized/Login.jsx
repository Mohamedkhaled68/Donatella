import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { login1, login2 } from "../../assets";
import { BackButton, FormButton, FormGroup, Loading } from "../../components";
import LogoHeader from "../../components/shared/ui/LogoHeader";
import useLogin from "../../hooks/auth/useLogin";
import { useI18n } from "../../hooks/useI18n";
import { getLanguagePath } from "../../hooks/useLanguageNavigate";
import { validateForm } from "../../utils/validators";

const initialFormValues = {
	email: "",
	password: "",
};
const Login = () => {
	const [formValues, setFormValues] = useState(initialFormValues);
	const [role, setRole] = useState("Individual");
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const { t, isRtl } = useI18n();

	const { mutateAsync } = useLogin();

	useEffect(() => {
		document.documentElement.dir = isRtl ? "rtl" : "ltr";
	}, [isRtl]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);
		await toast
			.promise(
				mutateAsync({ ...formValues, role: role.toUpperCase() }),
				{
					loading: t("login.loggingIn"),
					success: t("login.loginSuccess"),
					error: t("login.loginError"),
				},
				{
					success: {
						icon: "🚀",
					},
					error: {
						icon: "❌",
					},
				},
			)
			.then(() => {
				setFormValues(initialFormValues);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleRoleChange = (selectedRole) => {
		setRole(selectedRole);
	};

	useEffect(() => {
		const isFilled = Object.values(formValues).every((value) => value !== "");
		const errors = validateForm(formValues, t);
		setErrors(errors);

		setDisabled(!isFilled || Object.keys(errors).length !== 0);
	}, [formValues, t]);

	return (
		<div className="min-h-screen flex flex-col xl:flex-row xl:items-center relative">
			{loading && (
				<div className="absolute inset-0 flex justify-center items-center z-[10000] bg-black/50">
					<Loading />
				</div>
			)}
			{/* Left side - hidden on small/medium */}
			<div className="relative hidden xl:block xl:h-screen xl:w-1/3 xl:flex-shrink-0">
				<img
					className="w-full h-full object-cover filter grayscale"
					src={login1}
					alt="theme"
				/>
				<div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#101010] to-[#00000011]" />
			</div>

			<div className="flex-1 min-h-screen xl:min-h-0 xl:h-screen flex flex-col bg-[#121417] text-white overflow-y-auto">
				<LogoHeader />
				<div className="container mx-auto flex-1 flex flex-col px-4 sm:px-6 py-6 xl:py-0 xl:justify-center xl:h-[calc(100vh-60px)]">
					<div className="flex flex-col items-center gap-1 relative pt-2 xl:pt-0 xl:h-[15%] xl:flex-shrink-0">
						<div className={`absolute top-2 xl:top-[10%] 2xl:top-[15%] ${isRtl ? "right-4 xl:right-[5%]" : "left-4 xl:left-[5%]"}`}>
							<BackButton />
						</div>
						<h1 className="text-2xl sm:text-[28px] xl:text-[30px] 2xl:text-[40px] font-bold font-display mt-10 xl:mt-0 text-center">
							{t("login.title")}
						</h1>
						<p className="text-sm sm:text-[14px] 2xl:text-medium text-white-base/60 font-extralight w-full max-w-md xl:w-[50%] text-center px-2">
							{t("login.subtitle")}
						</p>
					</div>
					<form
						onSubmit={handleSubmit}
						className="w-full max-w-md xl:max-w-none xl:w-[60%] mx-auto flex flex-col gap-6 xl:gap-0 xl:justify-between flex-1 xl:h-[80%] xl:flex-initial py-6 xl:py-0"
					>
						<div className="flex flex-col gap-5 xl:justify-between xl:h-[50%]">
							<div className={`flex flex-col gap-1 ${isRtl ? "text-right" : ""}`}>
								<h2 className="text-base sm:text-medium 2xl:text-xl font-semibold font-display">{t("login.loginAs")}</h2>
								<div className="flex justify-center items-center gap-3 sm:gap-5 w-full relative flex-col sm:flex-row">
									<div className="relative group w-full sm:w-1/2">
										<button
											key={"Organization"}
											type="button"
											onClick={() => handleRoleChange("Organization")}
											className={`${
												role === "Organization" ? "bg-white-base text-gray-deep" : "bg-[#27292C] text-white-base"
											} w-full py-3 2xl:py-4 border-medium border-white-base text-sm sm:text-[14px] 2xl:text-medium font-bold rounded-xl transition-all duration-300`}
										>
											{t("login.organization")}
										</button>
										<div
											className={`absolute w-[280px] sm:w-[300px] bottom-full ${isRtl ? "right-0 sm:translate-x-1/2" : "left-0 sm:-translate-x-1/2"} mb-2 hidden sm:group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md ${isRtl ? "text-right" : ""} z-10`}
										>
											{t("login.organizationTooltip")}
										</div>
									</div>

									<div className="relative group w-full sm:w-1/2">
										<button
											key={"Individual"}
											type="button"
											onClick={() => handleRoleChange("Individual")}
											className={`${
												role === "Individual" ? "bg-white-base text-gray-deep" : "bg-[#27292C] text-white-base"
											} w-full py-3 px-5 2xl:py-4 border-medium border-white-base text-sm sm:text-[14px] 2xl:text-medium font-bold rounded-xl transition-all duration-300`}
										>
											{t("login.individual")}
										</button>
										<div
											className={`absolute w-[280px] sm:w-[300px] bottom-full ${isRtl ? "left-0 sm:translate-x-1/2" : "left-0 sm:-translate-x-1/2"} mb-2 hidden sm:group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md ${isRtl ? "text-right" : ""} z-10`}
										>
											{t("login.individualTooltip")}
										</div>
									</div>
								</div>
							</div>

							<div className={`flex flex-col gap-1 ${isRtl ? "text-right" : ""}`}>
								<div className="flex flex-col gap-4 sm:gap-5">
									<FormGroup
										label={t("login.email")}
										type="email"
										name="email"
										id="email"
										placeholder={t("login.emailPlaceholder")}
										value={formValues.email}
										onChange={handleInputChange}
										error={errors.email}
										validate={true}
									/>
									<FormGroup
										label={t("login.password")}
										type="password"
										name="password"
										id="password"
										placeholder={t("login.passwordPlaceholder")}
										value={formValues.password}
										onChange={handleInputChange}
										error={errors.password}
										validate={true}
									/>
								</div>
								<Link
									className="text-blue-primary text-sm"
									to={getLanguagePath("/forgot-password")}
								>
									{t("login.forgotPassword")}
								</Link>
							</div>
						</div>
						<div className="flex flex-col justify-center items-center gap-2 pt-2">
							<FormButton
								loading={loading}
								disabled={disabled}
								text={t("login.loginButton")}
							/>
							<p className="text-white-base/40 text-xs sm:text-sm text-center">
								{t("login.noAccount")}{" "}
								<NavLink
									className={"text-blue-primary"}
									to={getLanguagePath("/signup")}
								>
									{t("login.createAccount")}
								</NavLink>
							</p>
						</div>
					</form>
				</div>
			</div>

			{/* Right side - hidden on small/medium */}
			<div className="relative hidden xl:block xl:h-screen xl:w-1/3 xl:flex-shrink-0">
				<img
					className="w-full h-full object-cover filter grayscale"
					src={login2}
					alt="theme"
				/>
				<div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#101010] to-[#00000049]" />
			</div>
		</div>
	);
};

export default Login;
