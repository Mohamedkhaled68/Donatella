import { useI18n } from "../../hooks/useI18n";

const EditorSpecialtyInfo = ({ info }) => {
	const { colorGrading, editingSoftware, motionGraphics, soundEditing, visualEffects } = info;
	const { t } = useI18n();

	return (
		<div className="w-full grid grid-cols-4 gap-4">
			<div className="col-span-4 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
				<p className="text-center grow capitalize">{editingSoftware}</p>
			</div>
			<div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
				<p className="text-center grow capitalize">
					{colorGrading ? t("profileEdit.hasColorGrading") : t("profileEdit.hasNoColorGrading")}
				</p>
			</div>
			<div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
				<p className="text-center grow capitalize">
					{motionGraphics ? t("profileEdit.hasMotionGraphics") : t("profileEdit.hasNoMotionGraphics")}
				</p>
			</div>
			<div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
				<p className="text-center grow capitalize">
					{soundEditing ? t("profileEdit.hasSoundEditing") : t("profileEdit.hasNoSoundEditing")}
				</p>
			</div>
			<div className="col-span-2 px-[26px] py-[18px] relative bg-[#27292C] border-thin border-white-base/30 text-md font-light font-body flex justify-center items-center gap-2">
				<p className="text-center grow capitalize">
					{visualEffects ? t("profileEdit.hasVisualEffects") : t("profileEdit.hasNoVisualEffects")}
				</p>
			</div>
		</div>
	);
};

export default EditorSpecialtyInfo;
