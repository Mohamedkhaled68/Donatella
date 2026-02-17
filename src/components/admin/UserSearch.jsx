import { useState } from "react";
import { useI18n } from "../../hooks/useI18n";
import FormButton from "../shared/ui/FormButton";
import FormGroup from "../shared/ui/FormGroup";

const UserSearch = ({ onSearch }) => {
	const { t } = useI18n();
	const [filters, setFilters] = useState({
		searchKey: "",
		role: "",
		individualCategory: "",
		isBlocked: "",
		onboardingCompleted: "",
	});

	const handleChange = (field, value) => {
		setFilters({ ...filters, [field]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
			if (value !== "" && value !== "all") {
				if (key === "isBlocked" || key === "onboardingCompleted") {
					acc[key] = value === "true";
				} else {
					acc[key] = value;
				}
			}
			return acc;
		}, {});
		onSearch(cleanFilters);
	};

	const handleReset = () => {
		setFilters({
			searchKey: "",
			role: "",
			individualCategory: "",
			isBlocked: "",
			onboardingCompleted: "",
		});
		onSearch({});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-[#27292C] rounded-lg p-6 mb-6"
		>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
				<FormGroup
					label={t("admin.userSearch.search")}
					type="text"
					placeholder={t("admin.userSearch.searchPlaceholder")}
					value={filters.searchKey}
					onChange={(e) => handleChange("searchKey", e.target.value)}
				/>

				<div>
					<label className="block text-white/60 text-sm mb-2">{t("admin.userSearch.role")}</label>
					<select
						value={filters.role}
						onChange={(e) => handleChange("role", e.target.value)}
						className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
					>
						<option value="all">{t("admin.userSearch.allRoles")}</option>
						<option value="INDIVIDUAL">{t("admin.userSearch.individual")}</option>
						<option value="ORGANIZATION">{t("admin.userSearch.organization")}</option>
						<option value="ADMIN">{t("admin.userSearch.admin")}</option>
					</select>
				</div>

				<div>
					<label className="block text-white/60 text-sm mb-2">{t("admin.userSearch.individualCategory")}</label>
					<select
						value={filters.individualCategory}
						onChange={(e) => handleChange("individualCategory", e.target.value)}
						className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
					>
						<option value="all">{t("admin.userSearch.allCategories")}</option>
						<option value="MODEL">{t("admin.userSearch.model")}</option>
						<option value="PHOTOGRAPHER">{t("admin.userSearch.photographer")}</option>
						<option value="VIDEOGRAPHER">{t("admin.userSearch.videographer")}</option>
						<option value="EDITOR">{t("admin.userSearch.editor")}</option>
						<option value="BEAUTY">{t("admin.userSearch.beauty")}</option>
						<option value="TOURISM">{t("admin.userSearch.tourism")}</option>
						<option value="ATHLETE">{t("admin.userSearch.athlete")}</option>
						<option value="ARTIST">{t("admin.userSearch.artist")}</option>
						<option value="FASHION">{t("admin.userSearch.fashion")}</option>
						<option value="MUSIC_AND_SOUND_ENGINEER">{t("admin.userSearch.musicAndSoundEngineer")}</option>
					</select>
				</div>

				<div>
					<label className="block text-white/60 text-sm mb-2">{t("admin.userSearch.blockedStatus")}</label>
					<select
						value={filters.isBlocked}
						onChange={(e) => handleChange("isBlocked", e.target.value)}
						className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
					>
						<option value="all">{t("admin.userSearch.all")}</option>
						<option value="true">{t("admin.userSearch.blocked")}</option>
						<option value="false">{t("admin.userSearch.notBlocked")}</option>
					</select>
				</div>

				<div>
					<label className="block text-white/60 text-sm mb-2">{t("admin.userSearch.onboardingStatus")}</label>
					<select
						value={filters.onboardingCompleted}
						onChange={(e) => handleChange("onboardingCompleted", e.target.value)}
						className="w-full px-4 py-2 bg-[#121417] text-white rounded-lg border border-white/10 focus:outline-none focus:border-blue-primary"
					>
						<option value="all">{t("admin.userSearch.all")}</option>
						<option value="true">{t("admin.userSearch.completed")}</option>
						<option value="false">{t("admin.userSearch.notCompleted")}</option>
					</select>
				</div>
			</div>

			<div className="flex space-x-4">
				<FormButton
					type="submit"
					text={t("admin.userSearch.searchButton")}
				/>
				<button
					type="button"
					onClick={handleReset}
					className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
				>
					{t("admin.userSearch.reset")}
				</button>
			</div>
		</form>
	);
};

export default UserSearch;
