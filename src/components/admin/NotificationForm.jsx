import { useState } from "react";
import { useI18n } from "../../hooks/useI18n";
import FormButton from "../shared/ui/FormButton";
import FormGroup from "../shared/ui/FormGroup";

const NotificationForm = ({ onSubmit }) => {
	const { t } = useI18n();
	const [formData, setFormData] = useState({
		target: "SPECIFIC_USER",
		email: "",
		userRole: "",
		individualCategory: "",
		title: "",
		body: "",
	});

	const handleChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			target: formData.target,
			title: formData.title,
			body: formData.body,
		};

		if (formData.target === "SPECIFIC_USER") {
			data.email = formData.email;
		} else if (formData.target === "BY_USER_ROLE") {
			data.userRole = formData.userRole;
		} else if (formData.target === "BY_INDIVIDUAL_CATEGORY") {
			data.individualCategory = formData.individualCategory;
		}

		onSubmit(data);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-[#27292C] rounded-lg p-6 space-y-6"
		>
			<div>
				<label className="block text-white/60 text-sm mb-2">{t("admin.notification.targetAudience")}</label>
				<select
					value={formData.target}
					onChange={(e) => handleChange("target", e.target.value)}
					className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
				>
					<option value="SPECIFIC_USER">{t("admin.notification.specificUser")}</option>
					<option value="ALL_USERS">{t("admin.notification.allUsers")}</option>
					<option value="BY_USER_ROLE">{t("admin.notification.byUserRole")}</option>
					<option value="BY_INDIVIDUAL_CATEGORY">{t("admin.notification.byIndividualCategory")}</option>
				</select>
			</div>

			{formData.target === "SPECIFIC_USER" && (
				<FormGroup
					label={t("admin.notification.email")}
					type="email"
					placeholder={t("admin.notification.enterUserEmail")}
					value={formData.email}
					onChange={(e) => handleChange("email", e.target.value)}
					required
				/>
			)}

			{formData.target === "BY_USER_ROLE" && (
				<div>
					<label className="block text-white/60 text-sm mb-2">{t("admin.notification.userRole")}</label>
					<select
						value={formData.userRole}
						onChange={(e) => handleChange("userRole", e.target.value)}
						className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
						required
					>
						<option value="">{t("admin.notification.selectRole")}</option>
						<option value="INDIVIDUAL">{t("admin.notification.individual")}</option>
						<option value="ORGANIZATION">{t("admin.notification.organization")}</option>
					</select>
				</div>
			)}

			{formData.target === "BY_INDIVIDUAL_CATEGORY" && (
				<div>
					<label className="block text-white/60 text-sm mb-2">{t("admin.notification.individualCategory")}</label>
					<select
						value={formData.individualCategory}
						onChange={(e) => handleChange("individualCategory", e.target.value)}
						className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
						required
					>
						<option value="">{t("admin.notification.selectCategory")}</option>
						<option value="MODEL">{t("admin.notification.model")}</option>
						<option value="PHOTOGRAPHER">{t("admin.notification.photographer")}</option>
						<option value="VIDEOGRAPHER">{t("admin.notification.videographer")}</option>
						<option value="EDITOR">{t("admin.notification.editor")}</option>
						<option value="BEAUTY">{t("admin.notification.beauty")}</option>
						<option value="TOURISM">{t("admin.notification.tourism")}</option>
						<option value="ATHLETE">{t("admin.notification.athlete")}</option>
						<option value="ARTIST">{t("admin.notification.artist")}</option>
						<option value="FASHION">{t("admin.notification.fashion")}</option>
						<option value="MUSIC_AND_SOUND_ENGINEER">{t("admin.notification.musicAndSoundEngineer")}</option>
					</select>
				</div>
			)}

			<FormGroup
				label={`${t("admin.notification.title")} *`}
				type="text"
				placeholder={t("admin.notification.titlePlaceholder")}
				value={formData.title}
				onChange={(e) => handleChange("title", e.target.value)}
				required
			/>

			<div>
				<label className="block text-white/60 text-sm mb-2">{t("admin.notification.body")} *</label>
				<textarea
					value={formData.body}
					onChange={(e) => handleChange("body", e.target.value)}
					placeholder={t("admin.notification.bodyPlaceholder")}
					className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary min-h-[100px]"
					required
				/>
			</div>

			<FormButton
				type="submit"
				text={t("admin.notification.sendNotification")}
			/>
		</form>
	);
};

export default NotificationForm;
