import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BackButton, FormButton, Loading } from "../components";
import useResetPassword from "../hooks/auth/useResetPassword";
import { useI18n } from "../hooks/useI18n";
import { useUserStore } from "../store/userStore";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const ChangePassword = () => {
	const { t } = useI18n();
	const [input, setinput] = useState("");
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const { mutateAsync: resetPassword } = useResetPassword();
	const userStatus = useUserStore((state) => state.userStatus);
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setinput(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!input.trim()) return;
		const validatePassword = (password) => {
			return passwordRegex.test(password);
		};

		if (!validatePassword(input.trim())) {
			toast.error(t("changePassword.passwordRequirements"));
			return;
		} else {
			setLoading(true);
			try {
				await resetPassword({
					userId: userStatus.id,
					password: input.trim(),
					otp: localStorage.getItem("OTP"),
				});
				toast.success(t("changePassword.passwordChangedSuccess"));
				localStorage.removeItem("OTP");
				navigate("/");
			} catch (err) {
				toast.error(err?.response?.data?.message || t("changePassword.failedToChangePassword"));
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		if (input.trim()) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [input]);

	return (
		<section className="h-[calc(100vh-60px)] relative">
			{loading && (
				<div className="absolute w-full h-full flex justify-center items-center z-[10000] bg-black/50">
					<Loading />
				</div>
			)}
			<div className="container mx-auto pt-20 text-white-base h-full relative">
				<div className="absolute top-10 bottom-5">
					<BackButton />
				</div>
				<div className="flex justify-center mb-5">
					<div className="flex flex-col col-span-2 justify-center items-center gap-3">
						<h1 className="font-display text-[46px] font-bold text-center">{t("changePassword.title")}</h1>
						<p className="font-body text-center text-[#94A3B8] w-[70%] mx-auto text-md font-light">
							{t("changePassword.subtitle")}
						</p>
					</div>
				</div>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-center items-center h-[30%] 2xl:h-[60%]"
				>
					<div className="w-[70%] mx-auto">
						<input
							value={input}
							onChange={handleInputChange}
							type="password"
							className="w-full outline-none text-4xl border-b-2 border-white-base bg-transparent text-center pb-2"
							placeholder={t("changePassword.enterNewPassword")}
						/>
					</div>
					<div className="mt-12 flex justify-center">
						<FormButton
							loading={loading}
							disabled={loading || disabled}
							text={t("changePassword.changePassword")}
						/>
					</div>
				</form>
			</div>
		</section>
	);
};

export default ChangePassword;
