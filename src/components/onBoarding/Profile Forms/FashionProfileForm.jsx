import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { useI18n } from "../../../hooks/useI18n";
import { getLanguagePath } from "../../../hooks/useLanguageNavigate";
import { initialFashionProfileFormValues } from "../../../utils/constants";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";

const professionalCategory = [
	{ id: "Fashion Stylist" },
	{ id: "Jewelry Stylist" },
	{ id: "Wardrobe Consultant / Image Consultant" },
	{ id: "Runway & Fashion Show Stylist" },
	{ id: "Bridal & Occasion Stylist" },
];

const FashionProfileForm = ({ imageUrls, loading, setLoading }) => {
	const [formValues, setFormValues] = useState(initialFashionProfileFormValues);
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
			const certificateProof = imageUrls.certificateProof;
			const previousWork1 = imageUrls.previousWork1;
			const previousWork2 = imageUrls.previousWork2;
			console.log({
				individualProfile: {
					role: "FASHION",
					...userProfile,
					specialtyInfo: {
						...formValues,
						profilePicture: profile,
						certificates: [certificateProof],
						previousWork: [previousWork1, previousWork2],
					},
				},
			});

			await mutateAsync({
				individualProfile: {
					role: "FASHION",
					...userProfile,
					specialtyInfo: {
						...formValues,
						yearsOfExperience: 1,
						profilePicture: profile,
						certificates: [certificateProof],
						previousWork: [previousWork1, previousWork2],
					},
				},
			});
		} catch (error) {
			toast.error(error?.response?.data?.message || t("profileForms.common.unexpectedError"));
		} finally {
			setLoading(false);
			setFormValues(initialFashionProfileFormValues);
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
				<h1 className="capitalize text-5xl font-display font-bold">{t("profileForms.fashion.title")}</h1>
				<p className="text-gray-400 mt-2 text-md">{t("profileForms.common.createYourProfile")}</p>
			</div>
			<form
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
								{t("profileForms.fashion.professionalCategory")}{" "}
								<span className="text-white-base text-sm font-normal italic font-display tracking-widest">
									{t("profileForms.fashion.selectOne")}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-5 flex-wrap pl-2">
							{professionalCategory.map(({ id }) => (
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
										{id}
									</label>
								</div>
							))}
						</div>
					</motion.div>

					{/* Notable Clients, Brands, or Publications */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-lg font-body font-normal"
								htmlFor={"publications"}
							>
								{t("profileForms.fashion.notableClients")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.publications}
							name={"publications"}
							id={"publications"}
							type={"text"}
							placeholder={t("profileForms.fashion.clientsPlaceholder")}
						/>
					</motion.div>

					{/* Do you have a personal styling portfolio or Instagram page showcasing your work?*/}
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
								{t("profileForms.fashion.portfolioQuestion")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.portfolio}
							name={"portfolio"}
							id={"portfolio"}
							type={"text"}
							placeholder={t("profileForms.fashion.portfolioPlaceholder")}
						/>
					</motion.div>

					<div className="grid grid-cols-2 gap-x-3">
						{/* Do you have formal training or certifications in fashion styling? */}
						<motion.div
							className="flex flex-col gap-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							<div className="flex justify-between items-center">
								<label
									className="text-white-base text-sm font-body font-normal"
									htmlFor={"formalTrainingOrCertifications"}
								>
									{t("profileForms.fashion.formalTraining")}
								</label>
							</div>
							<select
								className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
								name="formalTrainingOrCertifications"
								id="formalTrainingOrCertifications"
								onChange={handleSelectInput}
								value={formValues.formalTrainingOrCertifications}
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
									htmlFor={"workedWithCelebrities"}
								>
									{t("profileForms.fashion.workedWithCelebrities")}
								</label>
							</div>
							<select
								className="rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full"
								name="workedWithCelebrities"
								id="workedWithCelebrities"
								onChange={handleSelectInput}
								value={formValues.workedWithCelebrities}
							>
								<option value="">{t("profileForms.common.select")}</option>
								<option value={true}>{t("profileForms.common.yes")}</option>
								<option value={false}>{t("profileForms.common.no")}</option>
							</select>
						</motion.div>
					</div>
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

export default FashionProfileForm;
