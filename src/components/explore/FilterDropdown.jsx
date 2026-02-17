import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { PiDressBold } from "react-icons/pi";
import { VscColorMode } from "react-icons/vsc";
import { blueHeadIcon } from "../../assets";
import { useI18n } from "../../hooks/useI18n";

const filterAnimationVariants = {
	open: { height: "auto" },
	closed: { height: 0 },
	up: { rotate: 0 },
	down: { rotate: "180deg" },
};
const FilterDropdown = ({ isOpen, onFilterChange }) => {
	const { t } = useI18n();

	const filterOptions = [
		{
			id: 0,
			icon: (
				<IoMaleFemaleSharp
					color="#197FE5"
					size={25}
				/>
			),
			label: t("explore.filters.gender"),
			options: [
				{ value: "", label: t("explore.filters.gender") },
				{ value: "MALE", label: t("explore.filters.male") },
				{ value: "FEMALE", label: t("explore.filters.female") },
				{ value: "OTHER", label: t("explore.filters.other") },
			],
		},
		{
			id: 1,
			icon: (
				<img
					width={25}
					src={blueHeadIcon}
					alt="Hair Color Icon"
				/>
			),
			label: t("explore.filters.hairColor"),
			options: [
				{ value: "", label: t("explore.filters.hairColor") },
				{ value: "BLACK", label: t("explore.filters.black") },
				{ value: "BROWN", label: t("explore.filters.brown") },
				{ value: "BLONDE", label: t("explore.filters.blonde") },
				{ value: "RED", label: t("explore.filters.red") },
			],
		},
		{
			id: 2,
			icon: (
				<VscColorMode
					color="#197FE5"
					size={25}
				/>
			),
			label: t("explore.filters.tone"),
			options: [
				{ value: "", label: t("explore.filters.tone") },
				{ value: "LIGHT", label: t("explore.filters.light") },
				{ value: "MEDIUM", label: t("explore.filters.medium") },
				{ value: "DARK", label: t("explore.filters.dark") },
			],
		},
		{
			id: 3,
			icon: (
				<FaEye
					color="#197FE5"
					size={25}
				/>
			),
			label: t("explore.filters.eyeColor"),
			options: [
				{ value: "", label: t("explore.filters.eyeColor") },
				{ value: "BLUE", label: t("explore.filters.blue") },
				{ value: "GREEN", label: t("explore.filters.green") },
				{ value: "BROWN", label: t("explore.filters.brown") },
				{ value: "HAZEL", label: t("explore.filters.hazel") },
			],
		},
		{
			id: 4,
			icon: (
				<GiRunningShoe
					color="#197FE5"
					size={25}
				/>
			),
			label: t("explore.filters.shoeSize"),
			options: Array.from({ length: 31 }, (_, i) => ({
				value: i + 20,
				label: `${i + 20} cm`,
			})),
		},
		{
			id: 5,
			icon: (
				<PiDressBold
					color="#197FE5"
					size={25}
				/>
			),
			label: t("explore.filters.dressSize"),
			options: Array.from({ length: 11 }, (_, i) => ({
				value: i + 10,
				label: `${i + 10} cm`,
			})),
		},
	];

	return (
		<motion.div
			initial="closed"
			animate={isOpen ? "open" : "closed"}
			variants={filterAnimationVariants}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="flex justify-between items-center mb-12 mt-5 overflow-hidden"
		>
			<div className="w-full rounded-3xl bg-[#27292C] flex justify-between items-center gap-[55px] px-[39px] py-2">
				{filterOptions.map((option) => (
					<div
						key={option.id}
						className="flex items-center"
					>
						{option.icon}
						<select
							className="bg-transparent p-3 outline-none border-none text-white-base"
							name={option.id}
							id={option.id}
							onChange={(e) => onFilterChange(option.id, e.target.value)}
						>
							{option.options.map((opt) => (
								<option
									key={opt.value}
									value={opt.value}
								>
									{opt.label}
								</option>
							))}
						</select>
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default FilterDropdown;
