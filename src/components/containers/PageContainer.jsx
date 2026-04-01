import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../../hooks/useI18n";
import { useModal } from "../../store/useModal";
import { useUserStore } from "../../store/userStore";
import Navbar from "../Navbar";

const pageVariants = {
	initial: { opacity: 0, x: -1000 },
	animate: { opacity: 1, x: 0 },
	exit: { x: 1000, transition: { duration: 0.01, ease: "easeInOut" } },
	transition: { duration: 0.3, ease: "easeInOut" },
};

const PageContainer = ({ children, className, pathname }) => {
	const { userStatus } = useUserStore((state) => state);
	const _location = useLocation();
	const { modal } = useModal((state) => state);
	const { isRtl } = useI18n();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		document.documentElement.dir = isRtl ? "rtl" : "ltr";
	}, [isRtl]);

	useEffect(() => {
		console.log(userStatus);
	}, [userStatus]);

	useEffect(() => {
		if (modal) {
			document.documentElement.style.overflowY = "hidden";
		} else {
			document.documentElement.style.overflowY = "unset";
		}
		return () => {
			document.documentElement.style.overflowY = "unset";
		};
	}, [modal]);

	useEffect(() => {
		console.log(window.scrollY);
	}, []);

	return (
		<>
			{modal && (
				<div
					style={{
						top: `${window.scrollY}px`,
						left: 0,
						width: "100%",
						height: "100vh",
					}}
					className={`absolute left-0 w-full h-screen bg-black/70 z-[50000] flex justify-center items-center`}
				>
					{modal}
				</div>
			)}

			{userStatus?.onboardingCompleted && <Navbar />}
			<motion.div
				key={pathname}
				variants={pageVariants}
				initial="initial"
				animate="animate"
				exit="exit"
				className={`w-full min-h-[calc(100vh-60px] overflow-x-hidden ${className}`}
			>
				{children}
			</motion.div>
		</>
	);
};

export default PageContainer;
