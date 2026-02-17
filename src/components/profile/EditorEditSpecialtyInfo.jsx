import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { useI18n } from "../../hooks/useI18n";
import useUpdateMe from "../../hooks/user/useUpdateMe";
import { useUserStore } from "../../store/userStore";
import Loading from "../shared/ui/Loading";

const EditorEditSpecialtyInfo = ({ setIsEditing }) => {
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const userSpecialtyInfo = useUserStore((state) => state.userStatus?.individual?.specialtyInfo || {});
	const { userStatus, setUserStatus } = useUserStore((state) => state);
	const { t } = useI18n();
	const [formState, setFormState] = useState({
		editingSoftware: userSpecialtyInfo.editingSoftware || "",
		colorGrading: userSpecialtyInfo.colorGrading || "",
		soundEditing: userSpecialtyInfo.soundEditing || "",
		visualEffects: userSpecialtyInfo.visualEffects || "",
		motionGraphics: userSpecialtyInfo.motionGraphics || "",
	});

	const { mutateAsync: updateMe } = useUpdateMe();

	const handleChange = (e) => {
		const { name, value } = e.target;
		const newValue = value === "true" ? true : value === "false" ? false : value;

		setFormState((prevState) => ({
			...prevState,
			[name]: newValue,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await updateMe({
				role: userStatus.individual.role,
				specialtyInfo: {
					...userStatus.individual.specialtyInfo,
					...formState,
				},
			});

			setUserStatus({
				...userStatus,
				individual: {
					...userStatus.individual,
					specialtyInfo: {
						...userStatus.individual.specialtyInfo,
						...formState,
					},
				},
			});
			toast.success(t("profileEdit.specialtyInfoUpdated"));
			setIsEditing(false);
		} catch (err) {
			toast.error(err?.response?.data?.message || t("profileEdit.failedToUpdate"));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const isFilled = Object.values(formState).every((value) => value !== "");

		setDisabled(!isFilled);
	}, [formState]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, delay: 0.2 }}
			exit={{ opacity: 0 }}
			className="bg-[#27292C] p-5 w-[70%] rounded-md left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] absolute z-[1000]"
		>
			<div className="flex justify-between items-center">
				<h1 className="text-white-base font-display font-bold text-[38px]">{t("profileEdit.editSpecialty")}</h1>
				<IoCloseSharp
					className="cursor-pointer text-white-base p-1 hover:bg-white-base/20 rounded-full duration-300"
					onClick={() => {
						setIsEditing(false);
					}}
					size={35}
				/>
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-5 mt-5"
			>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="editingSoftware"
						className="text-white-base font-body font-bold"
					>
						{t("profileEdit.editingSoftware")}
					</label>
					<input
						type="text"
						name="editingSoftware"
						value={formState.editingSoftware}
						onChange={handleChange}
						className="bg-[#313131] text-white-base font-body font-bold py-3 px-5 rounded-md"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="colorGrading"
						className="text-white-base font-body font-bold"
					>
						{t("profileEdit.colorGrading")}
					</label>
					<select
						className="bg-[#313131] text-white-base font-body font-bold py-3 px-5 rounded-md"
						value={formState.colorGrading}
						onChange={handleChange}
						id="colorGrading"
						name="colorGrading"
					>
						<option value="Nikon">{t("profileEdit.selectOption")}</option>
						<option value={true}>{t("profileEdit.yes")}</option>
						<option value={false}>{t("profileEdit.no")}</option>
					</select>
				</div>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="soundEditing"
						className="text-white-base font-body font-bold"
					>
						{t("profileEdit.soundEditing")}
					</label>
					<select
						className="bg-[#313131] text-white-base font-body font-bold py-3 px-5 rounded-md"
						value={formState.soundEditing}
						onChange={handleChange}
						id="soundEditing"
						name="soundEditing"
					>
						<option value="Nikon">{t("profileEdit.selectOption")}</option>
						<option value={true}>{t("profileEdit.yes")}</option>
						<option value={false}>{t("profileEdit.no")}</option>
					</select>
				</div>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="visualEffects"
						className="text-white-base font-body font-bold"
					>
						{t("profileEdit.visualEffects")}
					</label>
					<select
						className="bg-[#313131] text-white-base font-body font-bold py-3 px-5 rounded-md"
						value={formState.visualEffects}
						onChange={handleChange}
						id="visualEffects"
						name="visualEffects"
					>
						<option value="Nikon">{t("profileEdit.selectOption")}</option>
						<option value={true}>{t("profileEdit.yes")}</option>
						<option value={false}>{t("profileEdit.no")}</option>
					</select>
				</div>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="motionGraphics"
						className="text-white-base font-body font-bold"
					>
						{t("profileEdit.motionGraphics")}
					</label>
					<select
						className="bg-[#313131] text-white-base font-body font-bold py-3 px-5 rounded-md"
						value={formState.motionGraphics}
						onChange={handleChange}
						id="motionGraphics"
						name="motionGraphics"
					>
						<option value="Nikon">{t("profileEdit.selectOption")}</option>
						<option value={true}>{t("profileEdit.yes")}</option>
						<option value={false}>{t("profileEdit.no")}</option>
					</select>
				</div>

				{/* Save Button */}
				<button
					type="submit"
					disabled={disabled || loading}
					className={`${
						disabled ? "bg-[#494B4E]" : "bg-blue-primary"
					} text-white-base font-body font-bold py-3 px-5 rounded-md mt-5 self-end`}
				>
					{loading ? <Loading /> : t("profileEdit.saveChanges")}
				</button>
			</form>
		</motion.div>
	);
};

export default EditorEditSpecialtyInfo;
