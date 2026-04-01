import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { useI18n } from "../../../hooks/useI18n";
import { getLanguagePath } from "../../../hooks/useLanguageNavigate";
import { initialMusicianProfileFormValues } from "../../../utils/constants";
import { isNotEmailOrLink } from "../../../utils/helpers";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";

const getTypeOfClients = (t) => [
	{ id: "recordLabels", label: t("profileForms.musician.typeOfClients.recordLabels") },
	{ id: "audioPostProduction", label: t("profileForms.musician.typeOfClients.audioPostProduction") },
	{ id: "corporateClients", label: t("profileForms.musician.typeOfClients.corporateClients") },
	{ id: "eventPlanners", label: t("profileForms.musician.typeOfClients.eventPlanners") },
	{ id: "advertisingAgencies", label: t("profileForms.musician.typeOfClients.advertisingAgencies") },
];
const getProfessionalCategory = (t) => [
	{ id: "musicProducer", label: t("profileForms.musician.professionalCategories.musicProducer") },
	{ id: "soundEngineer", label: t("profileForms.musician.professionalCategories.soundEngineer") },
	{ id: "audioPostProduction", label: t("profileForms.musician.professionalCategories.audioPostProduction") },
	{ id: "composer", label: t("profileForms.musician.professionalCategories.composer") },
	{ id: "voiceover", label: t("profileForms.musician.professionalCategories.voiceover") },
	{ id: "dj", label: t("profileForms.musician.professionalCategories.dj") },
];

const MusicianProfileForm = ({ imageUrls, loading, setLoading }) => {
	const { t } = useI18n();
	const [formValues, setFormValues] = useState(initialMusicianProfileFormValues);
	const [disabled, setDisabled] = useState(true);
	const formRef = useRef(null);

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
		if (isNotEmailOrLink(formValues.portfolioUrl)) {
			toast.error(t("validators.invalidUrlOrEmail"));
			return;
		}
		setLoading(true);
		const userProfile = JSON.parse(localStorage.getItem("USER_EXPERIENCE_FORM_DATA"));
		try {
			const profile = imageUrls.profile;
			console.log({
				individualProfile: {
					role: "MUSIC_AND_SOUND_ENGINEER",
					...userProfile,
					specialtyInfo: {
						...formValues,
						profilePicture: profile,
					},
				},
			});

			await mutateAsync({
				individualProfile: {
					role: "MUSIC_AND_SOUND_ENGINEER",
					...userProfile,
					specialtyInfo: {
						...formValues,
						profilePicture: profile,
					},
				},
			});
		} catch (error) {
			toast.error(error?.response?.data?.message || t("profileForms.common.unexpectedError"));
		} finally {
			setLoading(false);
			setFormValues(initialMusicianProfileFormValues);
		}
	};

	useEffect(() => {
		const isInputsFilled = Object.values(formValues).every((value) => value !== "");

		const isImagesFilled = Object.values(imageUrls).every((value) => value !== null);

		setDisabled(!isInputsFilled || !isImagesFilled);
	}, [formValues, imageUrls]);

	const typeOfClients = getTypeOfClients(t);
	const professionalCategory = getProfessionalCategory(t);

	return (
		<div className="flex flex-col gap-5">
			<div>
				<h1 className="capitalize text-5xl font-display font-bold">{t("profileForms.musician.title")}</h1>
				<p className="text-gray-400 mt-2 text-md">{t("profileForms.common.createYourProfile")}</p>
			</div>
			<form
				ref={formRef}
				className="flex flex-col items-start"
				onSubmit={handleSubmit}
			>
				<div className="w-[90%] flex flex-col gap-8">
					{/* Professional Category */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<div className="text-white-base text-lg font-body font-normal">
								{t("profileForms.musician.professionalCategory")}{" "}
								<span className="text-white-base text-sm font-normal italic font-display tracking-widest">
									{t("profileForms.musician.selectOne")}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-5 flex-wrap pl-2">
							{professionalCategory.map(({ id, label }) => (
								<div
									key={id}
									className="flex items-center gap-2"
								>
									<input
										type="radio"
										name="professionalCategory"
										id={id}
										className="cursor-pointer"
										onChange={() =>
											setFormValues({
												...formValues,
												category: [id],
											})
										}
									/>
									<label
										className="select-none capitalize cursor-pointer text-sm"
										htmlFor={id}
									>
										{label}
									</label>
								</div>
							))}
						</div>
					</motion.div>

					{/* Have you worked on major projects or with well-known artists? */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-lg font-body font-normal"
								htmlFor={"majorProjects"}
							>
								{t("profileForms.musician.majorProjects")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.majorProjects}
							name={"majorProjects"}
							id={"majorProjects"}
							type={"text"}
							placeholder={t("profileForms.musician.majorProjectsPlaceholder")}
						/>
					</motion.div>

					{/* What type of clients do you prefer working with? */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<div className="text-white-base text-lg font-body font-normal">
								{t("profileForms.musician.preferWorkingWith")}
							</div>
						</div>
						<div className="flex items-center gap-5 flex-wrap pl-2">
							{typeOfClients.map(({ id, label }) => (
								<div
									key={id}
									className="flex items-center gap-2"
								>
									<input
										type="radio"
										name="typeOfClients"
										id={id}
										className="cursor-pointer"
										onChange={() =>
											setFormValues({
												...formValues,
												preferWorkingWith: [id],
											})
										}
									/>
									<label
										className="select-none capitalize cursor-pointer text-sm"
										htmlFor={id}
									>
										{label}
									</label>
								</div>
							))}
						</div>
					</motion.div>

					<div className="grid grid-cols-2 gap-x-3">
						{/* Do you have experience handling high-profile clients or live events? */}
						<motion.div
							className="flex flex-col gap-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							<div className="flex justify-between items-center">
								<label
									className="text-white-base text-sm font-body font-normal"
									htmlFor={"experienceHandlingHighProfileClients"}
								>
									{t("profileForms.musician.experienceHandlingHighProfileClients")}
								</label>
							</div>
							<select
								className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
								name="experienceHandlingHighProfileClients"
								id="experienceHandlingHighProfileClients"
								onChange={handleSelectInput}
								value={formValues.experienceHandlingHighProfileClients}
							>
								<option value="">{t("profileForms.common.select")}</option>
								<option value={true}>{t("profileForms.common.yes")}</option>
								<option value={false}>{t("profileForms.common.no")}</option>
							</select>
						</motion.div>

						{/* Have your works won any awards or been nominated? */}
						<motion.div
							className="flex flex-col gap-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							<div className="flex justify-between items-center">
								<label
									className="text-white-base text-sm font-body font-normal"
									htmlFor={"wonAwards"}
								>
									{t("profileForms.musician.wonAwards")}
								</label>
							</div>
							<select
								className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
								name="wonAwards"
								id="wonAwards"
								onChange={handleSelectInput}
								value={formValues.wonAwards}
							>
								<option value="">{t("profileForms.common.select")}</option>
								<option value={true}>{t("profileForms.common.yes")}</option>
								<option value={false}>{t("profileForms.common.no")}</option>
							</select>
						</motion.div>
					</div>

					{/* Share your Instagram / ArtStation / Behance / Website (Links) */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-lg font-body font-normal"
								htmlFor={"portfolioUrl"}
							>
								{t("profileForms.musician.portfolioLinks")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.portfolioUrl}
							name={"portfolioUrl"}
							id={"portfolioUrl"}
							type={"text"}
							placeholder={t("profileForms.musician.portfolioPlaceholder")}
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

export default MusicianProfileForm;
