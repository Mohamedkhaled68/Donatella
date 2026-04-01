import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { useI18n } from "../../../hooks/useI18n";
import { getLanguagePath } from "../../../hooks/useLanguageNavigate";
import {
	getArtistExpertiseOptions,
	getArtistProfessionalCategories,
	initialArtistProfileFormValues,
} from "../../../utils/constants";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";

const FashionProfileForm = ({ imageUrls, loading, setLoading }) => {
	const [formValues, setFormValues] = useState(initialArtistProfileFormValues);
	const [disabled, setDisabled] = useState(true);
	const _location = useLocation();
	const { t } = useI18n();

	const { mutateAsync } = useOnboarding();

	const professionalCategory = getArtistProfessionalCategories(t);
	const Expertise = getArtistExpertiseOptions(t);

	const handleInputChange = (e) => {
		const { id, value } = e.target;

		setFormValues({ ...formValues, [id]: value });
	};

	const _handleSelectInput = (e) => {
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
			const previousWork1 = imageUrls.previousWork1;
			const previousWork2 = imageUrls.previousWork2;

			console.log({
				individualProfile: {
					role: "ARTIST",
					...userProfile,
					specialtyInfo: {
						...formValues,
						profilePicture: profile,
						previousWork: [previousWork1, previousWork2],
					},
				},
			});

			await mutateAsync({
				individualProfile: {
					role: "ARTIST",
					...userProfile,
					specialtyInfo: {
						...formValues,
						profilePicture: profile,
						previousWork: [previousWork1, previousWork2],
					},
				},
			});
		} catch (error) {
			toast.error(error?.response?.data?.message || t("profileForms.common.unexpectedError"));
		} finally {
			setLoading(false);
			setFormValues(initialArtistProfileFormValues);
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
				<h1 className="capitalize text-5xl font-display font-bold">{t("profileForms.artist.title")}</h1>
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
								{t("profileForms.artist.professionalCategory")}{" "}
								<span className="text-white-base text-sm font-normal italic font-display tracking-widest">
									{t("profileForms.artist.selectOne")}
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

					{/* Notable Exhibitions, Publications, or Awards */}
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
								{t("profileForms.artist.notableExhibitions")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.publications}
							name={"publications"}
							id={"publications"}
							type={"text"}
							placeholder={t("profileForms.artist.exhibitionsPlaceholder")}
						/>
					</motion.div>

					{/* Have you collaborated with brands or clients?*/}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<label
								className="text-white-base text-lg font-body font-normal"
								htmlFor={"previousClients"}
							>
								{t("profileForms.artist.collaboratedWithBrands")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.previousClients}
							name={"previousClients"}
							id={"previousClients"}
							type={"text"}
							placeholder={t("profileForms.artist.collaboratedPlaceholder")}
						/>
					</motion.div>

					{/* Artistic style & Expertise (Select up to 3 relevant styles) */}
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-between items-center">
							<div className="text-white-base text-lg font-body font-normal">
								{t("profileForms.artist.artisticStyle")}{" "}
								<span className="text-white-base text-sm font-normal italic font-display tracking-widest">
									{t("profileForms.artist.selectUpTo3")}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-5 flex-wrap pl-2">
							{Expertise.map(({ id }) => {
								const isChecked = formValues.expertise.includes(id);

								return (
									<div
										key={id}
										className="flex items-center gap-2"
									>
										<input
											type="checkbox"
											name="expertise"
											id={id}
											className="cursor-pointer"
											checked={isChecked}
											onChange={() => {
												if (isChecked) {
													// Remove from selection
													setFormValues({
														...formValues,
														expertise: formValues.expertise.filter((item) => item !== id),
													});
												} else {
													// Add to selection, but limit to 3
													if (formValues.expertise.length >= 3) {
														toast.error(t("profileForms.artist.selectUpTo3Error"));
														return;
													}
													setFormValues({
														...formValues,
														expertise: [...formValues.expertise, id],
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
								{t("profileForms.artist.portfolioLinks")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.portfolio}
							name={"portfolio"}
							id={"portfolio"}
							type={"text"}
							placeholder={t("profileForms.artist.portfolioPlaceholder")}
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

export default FashionProfileForm;
