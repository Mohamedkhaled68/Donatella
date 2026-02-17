import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { useI18n } from "../../../hooks/useI18n";
import { getLanguagePath } from "../../../hooks/useLanguageNavigate";
import { getVideographerProfileFormGroupData, initialVideographerProfileFormValues } from "../../../utils/constants";
import FormButton from "../../shared/ui/FormButton";
import FormGroup from "../../shared/ui/FormGroup";

const VideographerProfileForm = ({ imageUrls, loading, setLoading }) => {
	const [formValues, setFormValues] = useState(initialVideographerProfileFormValues);
	const [disabled, setDisabled] = useState(true);
	const { t } = useI18n();

	const { mutateAsync } = useOnboarding();

	const handleInputChange = (e) => {
		const { id, value } = e.target;

		const newValue = value === "true" ? true : value === "false" ? false : value;

		setFormValues({ ...formValues, [id]: newValue });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const userProfile = await JSON.parse(localStorage.getItem("USER_EXPERIENCE_FORM_DATA"));
		try {
			const portfolio1 = imageUrls.portfolio1;
			const portfolio2 = imageUrls.portfolio2;
			const profile = imageUrls.profile;
			const reel = imageUrls.reel;

			console.log({
				individualProfile: {
					role: "VIDEOGRAPHER",
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
					role: "VIDEOGRAPHER",
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
			setLoading(false);
			console.log(error.message);
		} finally {
			console.log({
				individualProfile: {
					role: "VIDEOGRAPHER",
					...userProfile,
					specialtyInfo: { ...formValues },
				},
			});
			setLoading(false);
			setFormValues(initialVideographerProfileFormValues);
		}
	};

	useEffect(() => {
		const isInputsFilled = Object.values(formValues).every((value) => value !== "");

		const isImagesFilled = Object.values(imageUrls).every((value) => value !== null);

		// const errors = validateForm(formValues);
		// setErrors(errors);

		setDisabled(!isInputsFilled || !isImagesFilled);
	}, [formValues, imageUrls]);
	return (
		<div className="flex flex-col gap-8">
			<div>
				<h1 className="capitalize text-5xl font-display font-bold">{t("profileForms.videographer.title")}</h1>
				<p className="text-gray-400 mt-2 text-md">{t("profileForms.common.createYourProfile")}</p>
			</div>
			<form
				className="flex flex-col items-start"
				onSubmit={handleSubmit}
			>
				<div className="w-[80%] flex flex-col gap-4">
					{getVideographerProfileFormGroupData(t).map(
						({ label, type, name, id, value, className, placeholder }, idx) => (
							<motion.div
								initial={{ opacity: 0, x: -40, y: 10 }}
								animate={{ opacity: 1, x: 0, y: 0 }}
								transition={{
									duration: 0.5,
									delay: idx * 0.1,
								}}
								key={id}
								className={className ? className : "col-span-4"}
							>
								<FormGroup
									label={label}
									type={type}
									name={name}
									id={id}
									value={value(formValues)}
									onChange={handleInputChange}
									placeholder={placeholder}
									validate={false}
								>
									<option value="">{t("profileForms.common.select")}</option>
									<option value={true}>{t("profileForms.common.yes")}</option>
									<option value={false}>{t("profileForms.common.no")}</option>
								</FormGroup>
							</motion.div>
						),
					)}
				</div>
				<div className="flex flex-col mt-10 gap-4">
					<FormButton
						text={t("profileForms.common.createAccount")}
						disabled={disabled}
						loading={loading}
						className={"max-w-[250px] py-4"}
					/>
					<p className="text-right text-sm text-[#64748B]">
						{t("profileForms.common.dontHaveAccount")}{" "}
						<Link
							className="text-blue-primary"
							to={getLanguagePath(`/login`)}
						>
							{t("profileForms.common.clickHereToCreateOne")}
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default VideographerProfileForm;
