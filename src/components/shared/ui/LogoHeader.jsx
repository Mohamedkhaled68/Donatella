import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { donatellaLogo } from "../../../assets";
import { getLanguagePath } from "../../../hooks/useLanguageNavigate";

const LogoHeader = () => {
	return (
		<div className="relative w-full h-[60px] flex justify-center items-center bg-transparent ">
			<Link to={getLanguagePath("/landing")}>
				<img
					className="w-[150px]"
					src={donatellaLogo}
					alt="logo"
				/>
			</Link>
			<motion.div
				initial={{ width: 0 }}
				animate={{ width: "100%" }}
				transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
				className="absolute right-0 bottom-0 h-[1px] w-full bg-white-base"
			/>
		</div>
	);
};

export default LogoHeader;
