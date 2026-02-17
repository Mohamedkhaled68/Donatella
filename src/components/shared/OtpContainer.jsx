import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import useResetPassword from "../../hooks/auth/useResetPassword";
import useUpdateEmail from "../../hooks/auth/useUpdateEmail";
import useVerfiyForgot from "../../hooks/auth/useVerifyForgot";
import { useI18n } from "../../hooks/useI18n";
import { useUserStore } from "../../store/userStore";

const OtpContainer = ({ length = 4, otp, setOtp, useCase, setOtpView }) => {
	const inputRefs = useRef([]);
	const { userStatus } = useUserStore((state) => state);
	const { mutateAsync: resetPassword } = useResetPassword();
	const { mutateAsync: updateEmail } = useUpdateEmail();
	const { mutateAsync: verifyForgot } = useVerfiyForgot();
	const { t } = useI18n();

	const handleChange = async (value, index) => {
		if (value === " ") return;
		if (!/^\d+$/.test(value)) return;
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Move to next input if a digit was entered
		if (value && index < length - 1) {
			inputRefs.current[index + 1].focus();
		}

		// Trigger onComplete callback when OTP is fully entered
		if (newOtp.join("").length === length) {
			if (useCase === "RESET_EMAIL") {
				try {
					localStorage.setItem("OTP", newOtp.join(""));

					await updateEmail({
						otp: localStorage.getItem("OTP"),
						newEmail: localStorage.getItem("NEW_USER_ENTITY"),
					});

					toast.success(t("otp.emailChangedSuccess"));
					setOtpView(false);
					localStorage.removeItem("NEW_USER_ENTITY");
					localStorage.removeItem("OTP");
				} catch (error) {
					toast.error(error?.response?.data?.message || t("otp.failedToVerifyOTP"));
				}
			} else if (useCase === "FORGOT_PASSWORD") {
				try {
					await verifyForgot({
						email: localStorage.getItem("USER_EMAIL"),
						otp: newOtp.join(""),
						password: localStorage.getItem("NEW_USER_PASSWORD"),
					});

					toast.success(t("otp.passwordChangedSuccess"));
					localStorage.removeItem("NEW_USER_PASSWORD");
					localStorage.removeItem("USER_EMAIL");
				} catch (error) {
					toast.error(error?.response?.data?.message || t("otp.failedToVerifyOTP"));
				}
			} else {
				try {
					localStorage.setItem("OTP", newOtp.join(""));

					await resetPassword({
						userId: userStatus.id,
						otp: localStorage.getItem("OTP"),
						password: localStorage.getItem("NEW_USER_ENTITY"),
					});

					toast.success(t("otp.passwordChangedSuccess"));
					localStorage.removeItem("NEW_USER_ENTITY");
					localStorage.removeItem("OTP");
				} catch (error) {
					toast.error(error?.response?.data?.message || t("otp.failedToVerifyOTP"));
				}
			}
		}
	};
	const handleBackspace = (event, index) => {
		if (event.key === "Backspace") {
			const newOtp = [...otp];

			// If the current input has a value, clear it
			if (newOtp[index]) {
				newOtp[index] = "";
				setOtp(newOtp);
				return;
			}

			// If the current input is empty, move to the previous one and clear its value
			if (index > 0) {
				newOtp[index - 1] = "";
				setOtp(newOtp);
				inputRefs.current[index - 1].focus();
			}
		}
	};
	useEffect(() => {
		inputRefs.current[0].focus();
	}, []);
	return (
		<div className="flex flex-col justify-center items-center bg-blue-primary rounded-md py-8 w-[50%]">
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-white-base font-display font-bold text-4xl">{t("otp.enterOTP")}</h1>
				<p className="text-[#ffffffb6] mt-4 text-center italic">{t("otp.receiveOTPMessage")}</p>
				<div className="grid grid-cols-4 justify-items-center items-center gap-5 w-full mt-10">
					{otp.map((_, index) => (
						<input
							key={index}
							ref={(el) => (inputRefs.current[index] = el)}
							type="text"
							maxLength="1"
							value={otp[index]}
							onChange={(e) => handleChange(e.target.value, index)}
							onKeyDown={(e) => handleBackspace(e, index)}
							className="w-[60px] outline-none  border-b-4 border-white-base text-white-base bg-transparent text-center font-display font-bold text-[60px]"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default OtpContainer;
