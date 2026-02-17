import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BackButton, FormButton, Loading, LogoHeader } from "../../components";
import useForgotPassword from "../../hooks/auth/useForgotPassword";
import useVerfiyForgot from "../../hooks/auth/useVerifyForgot";
import { useI18n } from "../../hooks/useI18n";
import { getLanguagePath } from "../../hooks/useLanguageNavigate";

const EmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const ForgotPassword = () => {
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [view, setView] = useState("email");
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { mutateAsync: forgotPassword } = useForgotPassword();
	const { mutateAsync: verifyForgot } = useVerfiyForgot();
	const navigate = useNavigate();
	const { t, isRtl } = useI18n();

	useEffect(() => {
		document.documentElement.dir = isRtl ? "rtl" : "ltr";
	}, [isRtl]);

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setInputs({
			...inputs,
			[id]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (view === "email") {
			const validateEmail = (email) => {
				return EmailRegex.test(email);
			};

			if (!validateEmail(inputs.email.trim())) {
				toast.error(t("forgotPassword.enterValidEmail"));
				return;
			} else {
				try {
					await forgotPassword({ email: inputs.email.trim() });
					localStorage.setItem("USER_EMAIL", inputs.email.trim());
					navigate(getLanguagePath("/verify-otp"));
				} catch (err) {
					toast.error(err?.response?.data?.message || t("forgotPassword.requestOTPError"));
				} finally {
					setLoading(false);
				}
			}
		} else {
			const validatePassword = (password) => {
				return passwordRegex.test(password);
			};

			if (!validatePassword(inputs.password.trim())) {
				toast.error(t("forgotPassword.enterValidPassword"));
				return;
			} else {
				try {
					await verifyForgot({
						email: localStorage.getItem("USER_EMAIL"),
						password: inputs.password.trim(),
						otp: localStorage.getItem("OTP"),
					});
					localStorage.removeItem("USER_EMAIL");
					localStorage.removeItem("OTP");
					toast.success(t("forgotPassword.changePasswordSuccess"));
					navigate(getLanguagePath("/login"));
				} catch (err) {
					toast.error(err?.response?.data?.message || t("forgotPassword.changePasswordError"));
				} finally {
					setLoading(false);
				}
			}
		}
	};

	useEffect(() => {
		if (view === "email") {
			if (inputs.email.trim()) {
				setDisabled(false);
			} else {
				setDisabled(true);
			}
		}

		if (view === "password") {
			if (inputs.password.trim()) {
				setDisabled(false);
			} else {
				setDisabled(true);
			}
		}
	}, [inputs, view]);

	useEffect(() => {
		if (localStorage.getItem("USER_EMAIL")) {
			setView("password");
		} else {
			setView("email");
		}
	}, []);
	return (
		<section className="h-screen relative">
			<LogoHeader />
			{loading && (
				<div className="absolute w-full h-full flex justify-center items-center z-[10000] bg-black/50">
					<Loading />
				</div>
			)}
			<div className="container h-[calc(100vh-60px)] mx-auto text-white-base">
				<div className="flex items-center justify-center relative h-[20%]">
					<div className="absolute top-5 left-5">
						<BackButton />
					</div>
					<h1 className="font-display text-[35px] 2xl:text-[46px] font-bold text-center">
						{view === "email" ? t("forgotPassword.emailTitle") : t("forgotPassword.passwordTitle")}
					</h1>
				</div>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-around h-[70%] items-center"
				>
					{view === "email" ? (
						<div className="w-[70%] mx-auto">
							<input
								value={inputs.email}
								onChange={handleInputChange}
								type="text"
								id="email"
								className="w-full outline-none text-4xl border-b-2 border-white-base bg-transparent text-center pb-2"
								placeholder={t("forgotPassword.emailPlaceholder")}
							/>
						</div>
					) : (
						<div className="w-[70%] mx-auto mt-7">
							<input
								value={inputs.password}
								onChange={handleInputChange}
								type="password"
								id="password"
								className="w-full outline-none text-4xl border-b-2 border-white-base bg-transparent text-center pb-2"
								placeholder={t("forgotPassword.passwordPlaceholder")}
							/>
						</div>
					)}

					<div className="flex justify-center">
						<FormButton
							loading={loading}
							disabled={loading || disabled}
							text={view === "email" ? t("forgotPassword.requestOTP") : t("forgotPassword.changePassword")}
						/>
					</div>
				</form>
			</div>
		</section>
	);
};

export default ForgotPassword;
