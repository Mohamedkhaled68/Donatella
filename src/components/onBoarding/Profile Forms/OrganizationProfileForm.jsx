import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useOnboarding from "../../../hooks/auth/useOnboarding";
import { useI18n } from "../../../hooks/useI18n";
import { countryCodes } from "../../../utils/CountryCodes";
import { CountryEnum, initialOrgProfileFormValues } from "../../../utils/constants";
import FormButton from "../../shared/ui/FormButton";
import TextInput from "../../shared/ui/TextInput";

const formatUrl = (url) => {
	if (!url) return "";
	if (!url.startsWith("http://") && !url.startsWith("https://")) {
		return `https://${url}`;
	}
	return url;
};

const OrganizationProfileForm = ({ loading, setLoading, imageUrl, setPreviewUrl, setMedia }) => {
	const [formValues, setFormValues] = useState(initialOrgProfileFormValues);
	const [disabled, setDisabled] = useState(true);
	const [countryCode, setCountryCode] = useState("");
	const { t } = useI18n();

	const { mutateAsync } = useOnboarding();

	const handleInputChange = (e) => {
		const { id, value } = e.target;

		setFormValues({ ...formValues, [id]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const conCode = countryCodes.find((c) => c.code === countryCode).dial_code;

		if (conCode.endsWith("0") && formValues.phone.startsWith("0")) {
			formValues.phone = formValues.phone.slice(1);
		}

		const tikTokUrl = formatUrl(formValues.tiktok);
		const instagramUrl = formatUrl(formValues.instagram);
		const websiteUrl = formatUrl(formValues.website);

		try {
			if (!tikTokUrl.includes("tiktok.com")) {
				toast.error(t("profileForms.organization.invalidTikTokUrl"));
				return;
			}

			if (!instagramUrl.includes("instagram.com")) {
				toast.error(t("profileForms.organization.invalidInstagramUrl"));
				return;
			}
			const updatedFormValues = {
				...formValues,
				instagram: formatUrl(formValues.instagram),
				website: websiteUrl,
				tiktok: formatUrl(formValues.tiktok),
				phone: `${conCode}${formValues.phone}`,
			};

			await mutateAsync({
				organizationProfile: {
					...updatedFormValues,
					logo: imageUrl,
				},
			});

			toast.success(t("profileForms.organization.profileCreatedSuccess"));
			setFormValues(initialOrgProfileFormValues);
			setPreviewUrl(null);
			setMedia(null);
		} catch (error) {
			toast.error(error?.response?.data?.message || t("profileForms.common.unexpectedError"));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const isInputsFilled = Object.values(formValues).every((value) => value !== "");

		setDisabled(!isInputsFilled || !imageUrl);
	}, [formValues, imageUrl]);

	useEffect(() => {
		if (formValues.location) {
			const code = countryCodes.find((c) => c.code === formValues.location);

			setCountryCode(code.code);
		}
	}, [formValues.location]);
	return (
		<div className="flex flex-col gap-8">
			<div>
				<h1 className="capitalize text-5xl font-display font-bold">{t("profileForms.organization.title")}</h1>
				<p className="text-gray-400 mt-2 text-md">{t("profileForms.common.createYourProfile")}</p>
			</div>
			<form
				className="flex flex-col items-start"
				onSubmit={handleSubmit}
			>
				<div className="w-[95%] grid grid-cols-2 gap-4">
					{/* BIO */}
					<div className={`flex flex-col gap-2 col-span-2`}>
						<div className="flex justify-between items-center">
							<label
								className={`text-white-base text-sm font-body font-normal `}
								htmlFor="bio"
							>
								{t("profileForms.organization.bio")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.bio}
							name={"bio"}
							id={"bio"}
							type={"text"}
							placeholder={"i.e. Devion"}
						/>
					</div>
					{/* NAME */}
					<div className={`flex flex-col gap-2 col-span-1`}>
						<div className="flex justify-between items-center">
							<label
								className={`text-white-base text-sm font-body font-normal `}
								htmlFor="name"
							>
								{t("profileForms.organization.organizationName")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.name}
							name={"name"}
							id={"name"}
							type={"text"}
							placeholder={"i.e. Devion"}
						/>
					</div>
					{/* LOCATION */}
					<div className={`flex flex-col gap-2 col-span-1`}>
						<div className="flex justify-between items-center">
							<label
								className={`text-white-base text-sm font-body font-normal `}
								htmlFor="location"
							>
								{t("profileForms.organization.location")}
							</label>
						</div>
						<select
							className={`cursor-pointer rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[18px] py-[14px] w-full`}
							onChange={handleInputChange}
							value={formValues.location}
							name="location"
							id="location"
						>
							<option value="">{t("profileForms.organization.selectLocation")}</option>
							{Object.entries(CountryEnum.enums).map(([country, code]) => (
								<option
									key={code}
									value={code}
								>
									{country.replace(/([A-Z])/g, " $1").trim()}
								</option>
							))}
						</select>
					</div>
					{/* INSTAGRAM */}
					<div className={`flex flex-col gap-2 col-span-1`}>
						<div className="flex justify-between items-center">
							<label
								className={`text-white-base text-sm font-body font-normal `}
								htmlFor="instagram"
							>
								{t("profileForms.organization.instagram")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.instagram}
							name={"instagram"}
							id={"instagram"}
							type={"text"}
							placeholder={"i.e. Devion"}
						/>
					</div>
					{/* TIK TOK */}
					<div className={`flex flex-col gap-2 col-span-1`}>
						<div className="flex justify-between items-center">
							<label
								className={`text-white-base text-sm font-body font-normal `}
								htmlFor="tiktok"
							>
								{t("profileForms.organization.tiktok")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.tiktok}
							name={"tiktok"}
							id={"tiktok"}
							type={"text"}
							placeholder={"i.e. Devion"}
						/>
					</div>
					{/* WEBSITE */}
					<div className={`flex flex-col gap-2 col-span-1`}>
						<div className="flex justify-between items-center">
							<label
								className={`text-white-base text-sm font-body font-normal `}
								htmlFor="website"
							>
								{t("profileForms.organization.website")}
							</label>
						</div>
						<TextInput
							onChange={handleInputChange}
							value={formValues.website}
							name={"website"}
							id={"website"}
							type={"text"}
							placeholder={"i.e. Devion"}
						/>
					</div>
					{/* PHONE */}
					<div className={`flex flex-col gap-2 col-span-1`}>
						<div className="flex justify-between items-center">
							<label
								className={`text-white-base text-sm font-body font-normal `}
								htmlFor="phone"
							>
								{t("profileForms.organization.phoneNumber")}
							</label>
						</div>
						<div className="grid grid-cols-6 gap-x-2">
							<select
								className={`col-span-2 cursor-pointer rounded-[28px] bg-transparent border-extra-thin border-[#94A3B8] text-[#94A3B8] text-medium font-body px-[5px] py-[1px] w-full`}
								onChange={(event) => {
									setCountryCode(event.target.value);
								}}
								value={countryCode}
								name="countryCode"
								id="countryCode"
							>
								{countryCodes.map((code) => (
									<option
										value={code.code}
										key={code.code}
									>
										{code.dial_code}
									</option>
								))}
							</select>

							<TextInput
								onChange={handleInputChange}
								value={formValues.phone}
								name={"phone"}
								id={"phone"}
								type={"text"}
								placeholder={"i.e. Devion"}
								className={"col-span-4"}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col mt-10 gap-4 pb-5">
					<FormButton
						text={t("profileForms.common.createAccount")}
						disabled={disabled}
						loading={loading}
						className={"max-w-[250px] py-4"}
					/>
				</div>
			</form>
		</div>
	);
};

export default OrganizationProfileForm;
