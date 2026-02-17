import { useI18n } from "../../hooks/useI18n";

const activeStyle =
	"bg-white-base text-center w-full xl:py-[17px] py-[15px] text-black text-[14px] font-bold rounded-xl transition-all duration-300";
const inActiveStyle =
	"bg-[#27292C] text-center  w-full xl:py-[17px] py-[15px] text-white-base text-sm font-light rounded-xl transition-all duration-300 border-2 border-white-base";

const FilterButtons = ({ setFilter, filter }) => {
	const { t } = useI18n();

	const filterBtns = [
		{
			id: "modeling",
			name: t("explore.filters.modeling"),
			category: "MODEL",
			activeStyle,
			inActiveStyle,
		},
		{
			id: "videographing",
			name: t("explore.filters.videographing"),
			category: "VIDEOGRAPHER",
			activeStyle,
			inActiveStyle,
		},
		{
			id: "photographing",
			name: t("explore.filters.photographing"),
			category: "PHOTOGRAPHER",

			activeStyle,
			inActiveStyle,
		},
		{
			id: "photo & Video Editing",
			name: t("explore.filters.photoVideoEditing"),
			category: "EDITOR",

			activeStyle,
			inActiveStyle,
		},
		{
			id: "tourism & Historical Advising",
			name: t("explore.filters.tourismHistoricalAdvising"),
			category: "TOURISM",

			activeStyle,
			inActiveStyle,
		},
		{
			id: "music & Sound Engineers",
			name: t("explore.filters.musicSoundEngineering"),
			category: "MUSIC_AND_SOUND_ENGINEER",

			activeStyle,
			inActiveStyle,
		},
		{
			id: "athleteic & fitness coaching",
			name: t("explore.filters.athleteicFitnessCoaching"),
			category: "ATHLETE",

			activeStyle,
			inActiveStyle,
		},
		{
			id: "beauty & cosmetics",
			name: t("explore.filters.beautyCosmetics"),
			category: "BEAUTY",

			activeStyle,
			inActiveStyle,
		},
		{
			id: "visual arting & design",
			name: t("explore.filters.visualArtingDesign"),
			category: "ARTIST",

			activeStyle,
			inActiveStyle,
		},
		{
			id: "fashion design",
			name: t("explore.filters.fashionDesign"),
			category: "FASHION",

			activeStyle,
			inActiveStyle,
		},
	];

	const handleFilterChange = (filterCategory) => {
		setFilter(filterCategory);
	};

	return (
		<div className="grid grid-cols-5 gap-10 justify-items-center my-12">
			{filterBtns.map((btn) => (
				<button
					key={btn.id}
					className={btn.category === filter ? btn.activeStyle : btn.inActiveStyle}
					onClick={() => handleFilterChange(btn.category)}
				>
					{btn.name}
				</button>
			))}
		</div>
	);
};

export default FilterButtons;
