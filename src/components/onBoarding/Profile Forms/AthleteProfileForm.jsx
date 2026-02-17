import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { useI18n } from "../../../hooks/useI18n";
import { getLanguagePath } from "../../../hooks/useLanguageNavigate";
import { initialAthleteProfileFormValues } from "../../../utils/constants";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";

const professionalCategory = [
	{ id: "Proffessional Athlete" },
	{ id: "Retired Athlete / Sports Ambassador" },
	{ id: "Public Figure / Sports Influencer" },
	{ id: "Coach / trainer" },
	{ id: "Fitness Blogger" },
	{ id: "Health & Wellness Expert" },
	{ id: "Body Builder" },
];

const AthleteProfileForm = ({ imageUrls, loading, setLoading }) => {
	const [formValues, setFormValues] = useState(initialAthleteProfileFormValues);
	const [disabled, setDisabled] = useState(true);
	const _location = useLocation();
	const { t } = useI18n();

	const { mutateAsync } = useOnboarding();

	const handleInputChange = (e) => {
		const { id, value } = e.target;

		setFormValues({ ...formValues, [id]: value });
	};

	const handleSelectInput = (e) => {
		const { id, value } = e.target;
		setFormValues({
			...formValues,
			[id]: value === "true" ? true : value === "false" ? false : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const userProfile = JSON.parse(localStorage.getItem("USER_EXPERIENCE_FORM_DATA"));
		try {
			const profile = imageUrls.profile;
			const fullbody = imageUrls.fullbody;
			const trophies = imageUrls.trophies;
			console.log({
				individualProfile: {
					role: "ATHLETE",
					...userProfile,
					specialtyInfo: {
						...formValues,
						profilePicture: profile,
						bodyPictures: [fullbody],
						trophiePictures: [trophies],
					},
				},
			});

			await mutateAsync({
				individualProfile: {
					role: "ATHLETE",
					...userProfile,
					specialtyInfo: {
						...formValues,
						AchievementsOrTitles: [formValues.AchievementsOrTitles],
						yearsofExperience: 1,
						profilePicture: profile,
						bodyPictures: [fullbody],
						trophiePictures: [trophies],
					},
				},
			});
		} catch (error) {
			toast.error(error?.response?.data?.message || t("profileForms.common.unexpectedError"));
		} finally {
			setLoading(false);
			setFormValues(initialAthleteProfileFormValues);
		}
	};

	useEffect(() => {
		const isInputsFilled = Object.values(formValues).every((value) => value !== "");

		const isImagesFilled = Object.values(imageUrls).every((value) => value !== null);

		setDisabled(!isInputsFilled || !isImagesFilled);
	}, [formValues, imageUrls]);

	return (
		<div className="flex flex-col gap-5">
			<div>
				<h1 className="capitalize text-5xl font-display font-bold">{t("profileForms.athlete.title")}</h1>
				<p className="text-gray-400 mt-2 text-md">{t("profileForms.common.createYourProfile")}</p>
			</div>
			<form
				className="flex flex-col items-start"
				onSubmit={handleSubmit}
			>
				<div className="w-[90%] flex flex-col gap-8">
					{/* Professional Category (Select up to 3 relevant styles) */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<div className="text-white-base text-lg font-body font-normal">
								{t("profileForms.athlete.professionalCategory")}{" "}
								<span className="text-white-base text-sm font-normal italic font-display tracking-widest">
									{t("profileForms.athlete.selectUpTo3")}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-5 flex-wrap pl-2">
							{professionalCategory.map(({ id }) => {
								const isChecked = formValues.category.includes(id);

								return (
									<div
										key={id}
										className="flex items-center gap-2"
									>
										<input
											type="checkbox"
											name="professionalCategory"
											id={id}
											className="cursor-pointer"
											checked={isChecked}
											onChange={() => {
												if (isChecked) {
													// Remove from selection
													setFormValues({
														...formValues,
														category: formValues.category.filter((item) => item !== id),
													});
												} else {
													// Add to selection, but limit to 3
													if (formValues.category.length >= 3) {
														toast.error(t("profileForms.athlete.selectUpTo3Error"));
														return;
													}
													setFormValues({
														...formValues,
														category: [...formValues.category, id],
													});
												}
											}}
										/>
										<label
											className="select-none capitalize cursor-pointer text-sm"
											htmlFor={id}
										>
											{id}
										</label>
									</div>
								);
							})}
						</div>
					</motion.div>

					{/* Top Achievements or Titles */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-lg font-body font-normal"
								htmlFor={"AchievementsOrTitles"}
							>
								{t("profileForms.athlete.achievementsOrTitles")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.AchievementsOrTitles}
							name={"AchievementsOrTitles"}
							id={"AchievementsOrTitles"}
							type={"text"}
							placeholder={t("profileForms.athlete.achievementsPlaceholder")}
						/>
					</motion.div>

					{/* Are you affiliated with any clubs, organizations, or brands? */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-sm font-body font-normal"
								htmlFor={"affiliated"}
							>
								{t("profileForms.athlete.affiliated")}
							</label>
						</div>
						<select
							className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
							name="affiliated"
							id="affiliated"
							onChange={handleSelectInput}
							value={formValues.affiliated}
						>
							<option value="">{t("profileForms.common.select")}</option>
							<option value={true}>{t("profileForms.common.yes")}</option>
							<option value={false}>{t("profileForms.common.no")}</option>
						</select>
					</motion.div>

					{/* Instagram / ArtStation / Behance / Website (links)*/}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-lg font-body font-normal"
								htmlFor={"portfolio"}
							>
								{t("profileForms.athlete.portfolioLinks")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.portfolio}
							name={"portfolio"}
							id={"portfolio"}
							type={"text"}
							placeholder={t("profileForms.athlete.portfolioPlaceholder")}
						/>
					</motion.div>
				</div>

				<div className="flex flex-col items-center mt-10 gap-4">
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

export default AthleteProfileForm;
