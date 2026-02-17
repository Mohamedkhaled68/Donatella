import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { useI18n } from "../../../hooks/useI18n";
import { getLanguagePath } from "../../../hooks/useLanguageNavigate";
import { initialEditorProfileFormValues } from "../../../utils/constants";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";

const EditorProfileForm = ({ imageUrls, loading, setLoading }) => {
	const [formValues, setFormValues] = useState(initialEditorProfileFormValues);
	const [disabled, setDisabled] = useState(true);
	const { t } = useI18n();

	const { mutateAsync } = useOnboarding();

	const handleInputChange = (e) => {
		const { id, value } = e.target;

		setFormValues({ ...formValues, [id]: value });
	};

	const handleSelectChange = (e) => {
		const { id, value } = e.target;
		const booleanValue = value === "yes";

		setFormValues({ ...formValues, [id]: booleanValue });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const userProfile = JSON.parse(localStorage.getItem("USER_EXPERIENCE_FORM_DATA"));
		try {
			const portfolio1 = imageUrls.portfolio1;
			const portfolio2 = imageUrls.portfolio2;
			const profile = imageUrls.profile;
			const reel = imageUrls.reel;

			console.log({
				individualProfile: {
					role: "EDITOR",
					...userProfile,
					specialtyInfo: {
						...formValues,
						portfolioPictures: [portfolio1, portfolio2],
						profilePicture: profile,
						reels: [reel],
					},
				},
			});

			await mutateAsync({
				individualProfile: {
					role: "EDITOR",
					...userProfile,
					specialtyInfo: {
						...formValues,
						portfolioPictures: [portfolio1, portfolio2],
						profilePicture: profile,
						reels: [reel],
					},
				},
			});
		} catch (error) {
			toast.error(error?.response?.data?.message || t("profileForms.common.unexpectedError"));
		} finally {
			setLoading(false);
			setFormValues(initialEditorProfileFormValues);
		}
	};

	useEffect(() => {
		const isInputsFilled = Object.values(formValues).every((value) => value !== "");

		const isImagesFilled = Object.values(imageUrls).every((value) => value !== null);

		setDisabled(!isInputsFilled || !isImagesFilled);
	}, [formValues, imageUrls]);

	return (
		<div className="flex flex-col gap-8">
			<div>
				<h1 className="capitalize text-5xl font-display font-bold">{t("profileForms.editor.title")}</h1>
				<p className="text-gray-400 mt-2 text-md">{t("profileForms.common.createYourProfile")}</p>
			</div>
			<form
				className="flex flex-col items-start"
				onSubmit={handleSubmit}
			>
				<div className="w-[80%] flex flex-col gap-5">
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-sm font-body font-normal"
								htmlFor={"editingSoftware"}
							>
								{t("profileForms.editor.mainSoftware")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.editingSoftware}
							name={"editingSoftware"}
							id={"editingSoftware"}
							type={"text"}
							placeholder={t("profileForms.editor.softwarePlaceholder")}
						/>
					</motion.div>

					{/* Color Grading Select */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-sm font-body font-normal"
								htmlFor={"colorGrading"}
							>
								{t("profileForms.editor.colorGrading")}
							</label>
						</div>
						<select
							className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
							name="colorGrading"
							id="colorGrading"
							value={formValues.colorGrading ? "yes" : "no"} // Ensure it shows 'yes' or 'no'
							onChange={handleSelectChange}
						>
							<option value="">{t("profileForms.common.select")}</option>
							<option value="yes">{t("profileForms.common.yes")}</option>
							<option value="no">{t("profileForms.common.no")}</option>
						</select>
					</motion.div>

					{/* Sound Effects Select */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-sm font-body font-normal"
								htmlFor={"soundEditing"}
							>
								{t("profileForms.editor.soundEffects")}
							</label>
						</div>
						<select
							className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
							name="soundEditing"
							id="soundEditing"
							value={formValues.soundEditing ? "yes" : "no"}
							onChange={handleSelectChange}
						>
							<option value="">{t("profileForms.common.select")}</option>
							<option value="yes">{t("profileForms.common.yes")}</option>
							<option value="no">{t("profileForms.common.no")}</option>
						</select>
					</motion.div>

					<div className="w-full flex justify-between items-center gap-5">
						<motion.div
							className="flex flex-col gap-2 w-1/2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							<div className="flex justify-between items-center">
								<label
									className="text-white-base text-sm font-body font-normal"
									htmlFor={"visualEffects"}
								>
									{t("profileForms.editor.visualEffects")}
								</label>
							</div>
							<select
								className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
								name="visualEffects"
								id="visualEffects"
								value={formValues.visualEffects ? "yes" : "no"}
								onChange={handleSelectChange}
							>
								<option value="">{t("profileForms.common.select")}</option>
								<option value="yes">{t("profileForms.common.yes")}</option>
								<option value="no">{t("profileForms.common.no")}</option>
							</select>
						</motion.div>

						<motion.div
							className="flex flex-col gap-2 w-1/2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							<div className="flex justify-between items-center">
								<label
									className="text-white-base text-sm font-body font-normal"
									htmlFor={"motionGraphics"}
								>
									{t("profileForms.editor.motionGraphics")}
								</label>
							</div>
							<select
								className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
								name="motionGraphics"
								id="motionGraphics"
								value={formValues.motionGraphics ? "yes" : "no"}
								onChange={handleSelectChange}
							>
								<option value="">{t("profileForms.common.select")}</option>
								<option value="yes">{t("profileForms.common.yes")}</option>
								<option value="no">{t("profileForms.common.no")}</option>
							</select>
						</motion.div>
					</div>
				</div>

				<div className="flex flex-col mt-10 gap-4">
					<FormButton
						text={t("profileForms.common.createAccount")}
						disabled={disabled}
						loading={loading}
						className={"max-w-[250px] py-4"}
					/>
					<p className="text-right text-sm text-[#64748B]">
						{t("profileForms.common.alreadyHaveAccount")}{" "}
						<Link
							className="text-blue-primary"
							to={getLanguagePath(`/login`)}
						>
							{t("profileForms.common.login")}
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default EditorProfileForm;
