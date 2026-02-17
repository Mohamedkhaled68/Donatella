import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BackButton, FormButton, Loading } from "../components";
import useUpdateEmail from "../hooks/auth/useUpdateEmail";
import { useI18n } from "../hooks/useI18n";
import { useUserStore } from "../store/userStore";

const EmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const ChangeEmail = () => {
	const { t } = useI18n();
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [input, setinput] = useState("");
	const { mutateAsync: updateEmail } = useUpdateEmail();
	const { userStatus } = useUserStore((state) => state);
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setinput(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!input.trim()) return;
		const validateEmail = (email) => {
			return EmailRegex.test(email);
		};

		if (!validateEmail(input.trim())) {
			toast.error(t("changeEmail.invalidEmail"));
			return;
		} else {
			setLoading(true);
			try {
				await updateEmail({
					newEmail: input.trim(),
					otp: localStorage.getItem("OTP"),
				});
				localStorage.removeItem("OTP");
				toast.success(t("changeEmail.emailChangedSuccess"));
				navigate("/");
			} catch (err) {
				toast.error(err?.response?.data?.message || t("changeEmail.failedToChangeEmail"));
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
					<div
						className="flex flex-col col-span-2
                         justify-center items-center gap-3"
					>
						<h1 className="font-display text-[46px] font-bold text-center">{t("changeEmail.title")}</h1>
						<p className="font-body text-center text-[#94A3B8] w-[70%] mx-auto text-md font-light">
							{t("changeEmail.subtitle")}
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
							type="text"
							className="w-full outline-none text-4xl border-b-2 border-white-base bg-transparent text-center pb-2"
							placeholder={userStatus?.verifiedEmail}
						/>
					</div>
					<div className="mt-12 flex justify-center">
						<FormButton
							loading={loading}
							disabled={loading || disabled}
							text={t("changeEmail.changeEmail")}
						/>
					</div>
				</form>
			</div>
		</section>
	);
};

export default ChangeEmail;
