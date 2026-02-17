import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { useI18n } from "../../../hooks/useI18n";
import { getLanguagePath } from "../../../hooks/useLanguageNavigate";
import { initialTourismProfileFormValues } from "../../../utils/constants";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";

const specializations = [
	{ id: "Cultural Tourism" },
	{ id: "Historical Site Tours" },
	{ id: "Archeological Tours" },
	{ id: "Religious Tourism" },
	{ id: "Local Heritage & Traditions" },
	{ id: "Adventure & Ecotourism" },
	{ id: "Face & Body Painting" },
];

const TourismProfileForm = ({ imageUrls, loading, setLoading }) => {
	const [formValues, setFormValues] = useState(initialTourismProfileFormValues);
	const [disabled, setDisabled] = useState(true);
	const { mutateAsync } = useOnboarding();
	const { t } = useI18n();

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
			const certificateProof = imageUrls.certificateProof;

			console.log({
				individualProfile: {
					role: "TOURISM",
					...userProfile,
					specialtyInfo: {
						...formValues,
						profilePicture: profile,
						certificates: [certificateProof],
					},
				},
			});

			await mutateAsync({
				individualProfile: {
					role: "TOURISM",
					...userProfile,
					specialtyInfo: {
						...formValues,
						yearsofExperience: 1,
						profilePicture: profile,
						certificates: [certificateProof],
					},
				},
			});
		} catch (error) {
			toast.error(error?.response?.data?.message || t("profileForms.common.unexpectedError"));
		} finally {
			setLoading(false);
			setFormValues(initialTourismProfileFormValues);
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
				<h1 className="capitalize text-5xl font-display font-bold">{t("profileForms.tourism.title")}</h1>
				<p className="text-gray-400 mt-2 text-md">{t("profileForms.common.createYourProfile")}</p>
			</div>
			<form
				className="flex flex-col items-start"
				onSubmit={handleSubmit}
			>
				<div className="w-[90%] flex flex-col gap-8">
					{/* What is your specializations */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<div className="text-white-base text-lg font-body font-normal">
								{t("profileForms.tourism.specializations")}{" "}
								<span className="text-white-base text-sm font-normal italic font-display tracking-widest">
									{t("profileForms.tourism.selectAllThatApply")}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-5 flex-wrap pl-2">
							{specializations.map(({ id }) => {
								return (
									<div
										key={id}
										className="flex items-center gap-2"
									>
										<input
											type="checkbox"
											name="specializations"
											id={id}
											className="cursor-pointer"
											onChange={() => {
												setFormValues({
													...formValues,
													specializations: [...formValues.specializations, id],
												});
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

					{/* Do you have experience managing travel logistics (transportations, hotels, etc.)? */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-lg font-body font-normal"
								htmlFor={"experienceManagingTravelLogistics"}
							>
								{t("profileForms.tourism.travelLogistics")}
							</label>
						</div>
						<select
							className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
							name="experienceManagingTravelLogistics"
							id="experienceManagingTravelLogistics"
							onChange={handleSelectInput}
							value={formValues.experienceManagingTravelLogistics}
						>
							<option value="">{t("profileForms.common.select")}</option>
							<option value={true}>{t("profileForms.common.yes")}</option>
							<option value={false}>{t("profileForms.common.no")}</option>
						</select>
					</motion.div>

					{/* What is your current or most recent employer?*/}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-lg font-body font-normal"
								htmlFor={"currentOrMostRecentEmployer"}
							>
								{t("profileForms.tourism.currentEmployer")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.currentOrMostRecentEmployer}
							name={"currentOrMostRecentEmployer"}
							id={"currentOrMostRecentEmployer"}
							type={"text"}
							placeholder={t("profileForms.tourism.employerPlaceholder")}
						/>
					</motion.div>

					{/* Do you have a valid tour guide licence or any offical certifications? */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-sm font-body font-normal"
								htmlFor={"license"}
							>
								{t("profileForms.tourism.license")}
							</label>
						</div>
						<select
							className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
							name="license"
							id="license"
							onChange={handleSelectInput}
							value={formValues.license}
						>
							<option value="">{t("profileForms.common.select")}</option>
							<option value={true}>{t("profileForms.common.yes")}</option>
							<option value={false}>{t("profileForms.common.no")}</option>
						</select>
					</motion.div>

					{/* Do you speak more than one language? */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-sm font-body font-normal"
								htmlFor={"otherLanguage"}
							>
								{t("profileForms.tourism.otherLanguage")}
							</label>
						</div>
						<select
							className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
							name="otherLanguage"
							id="otherLanguage"
							onChange={handleSelectInput}
							value={formValues.otherLanguage}
						>
							<option value="">{t("profileForms.common.select")}</option>
							<option value={true}>{t("profileForms.common.yes")}</option>
							<option value={false}>{t("profileForms.common.no")}</option>
						</select>
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

export default TourismProfileForm;
