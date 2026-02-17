import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { CiLogout } from "react-icons/ci";
import { MdLanguage, MdOutlineMarkEmailRead } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import useLogout from "../hooks/auth/useLogout";
import { useI18n } from "../hooks/useI18n";
import { useLanguageNavigate } from "../hooks/useLanguageNavigate";

const DropMenu = ({ setShowDrop }) => {
	const dropMenuRef = useRef(null);
	const { navigate } = useLanguageNavigate();
	const { t, currentLanguage, changeLanguage, isRtl } = useI18n();

	const toggleLanguage = () => {
		const newLanguage = currentLanguage === "en" ? "ar" : "en";
		changeLanguage(newLanguage);
		setShowDrop(false);
	};

	const { mutateAsync: logout } = useLogout();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropMenuRef.current && !dropMenuRef.current.contains(event.target)) {
				setShowDrop(false);
			}
		};

		// Add event listener
		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup function
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setShowDrop]); // Only re-run if setShowDrop changes

	const handleLogout = async () => {
		try {
			setShowDrop(false);
			await logout();
			localStorage.removeItem("DONATELLA_USER_DATA");
			localStorage.removeItem("USER_ROLE");
		} catch (err) {
			toast.error(err?.response?.data?.message || "Failed to logout");
		}
	};

	return (
		<motion.div
			initial={{ y: -10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.3 }}
			ref={dropMenuRef}
			className={`absolute bg-slate-600 rounded-md z-[10000] top-[52px] min-w-[150px] overflow-hidden shadow-lg ${isRtl ? "left-10" : "right-10"}`}
		>
			<div className="flex flex-col">
				<div
					onClick={toggleLanguage}
					className="text-white-base flex items-center gap-3 text-sm font-body font-normal py-3 px-3 hover:bg-slate-800 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
				>
					<MdLanguage size={25} />
					{t("dropMenu.changeLanguage")} ({t(`constants.language.${currentLanguage.toUpperCase()}`)})
				</div>
				<div
					onClick={handleLogout}
					className="text-white-base flex items-center gap-3 text-sm font-body font-normal py-3 px-3 hover:bg-slate-800 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
				>
					<CiLogout size={25} />
					{t("dropMenu.logout")}
				</div>
				<div
					onClick={() => {
						navigate("send-change-otp", { state: "changeEmail" });
						setShowDrop(false);
					}}
					className="text-white-base flex items-center gap-3 text-sm font-body font-normal py-3 px-3 hover:bg-slate-800 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
				>
					<MdOutlineMarkEmailRead size={25} />
					{t("dropMenu.changeEmail")}
				</div>
				<div
					onClick={() => {
						navigate("send-change-otp", { state: "changePassword" });
						setShowDrop(false);
					}}
					className="text-white-base flex items-center gap-3 text-sm font-body font-normal py-3 px-3 hover:bg-slate-800 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
				>
					<RiLockPasswordLine size={25} />
					{t("dropMenu.changePassword")}
				</div>
			</div>
		</motion.div>
	);
};

export default DropMenu;
