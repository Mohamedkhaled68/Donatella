import { MdLanguage } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { donatellaLogo, headerVideo } from "../../assets";
import { useI18n } from "../../hooks/useI18n";
import { getLanguagePath } from "../../hooks/useLanguageNavigate";
import useAuthStore from "../../store/userTokenStore";
import Button from "../shared/ui/Button";
import Sidebar from "../shared/ui/sidebar/Sidebar";

const Hero = () => {
	const token = useAuthStore((state) => state.authToken);
	const { t, currentLanguage, changeLanguage, isRtl } = useI18n();
	console.log(currentLanguage);

	const toggleLanguage = () => {
		const newLanguage = currentLanguage === "en" ? "ar" : "en";
		changeLanguage(newLanguage);
	};

	return (
		<section className="pb-10 relative">
			<Sidebar />
			<button
				onClick={toggleLanguage}
				className={`size-[45px] rounded-full z-[1001] absolute top-[25px] ${isRtl ? "right-[85px]" : "left-[85px]"} bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer flex justify-center items-center hover:bg-white/20 transition-colors duration-200`}
				aria-label="Switch language"
			>
				<MdLanguage
					className="text-white"
					size={24}
				/>
			</button>
			<div className="min-h-screen relative rounded-b-[3.5rem] overflow-hidden flex justify-center items-center">
				<video
					muted
					autoPlay
					loop
					className="absolute top-0 w-full h-full object-cover filter grayscale"
				>
					<source
						src={headerVideo}
						type="video/mp4"
					/>
				</video>
				<div className="absolute top-0 w-full h-[calc(100vh-5px)] bg-[#1F2224B2]/70 rounded-b-[3.5rem]" />

				<nav className="w-full flex justify-center items-center z-10 absolute top-0 left-0 text-white-base font-body">
					<div className="container mx-auto py-8 grid grid-cols-3 w-full">
						<div className="col-span-1" />
						<div className="flex mt-[5px] justify-center items-center">
							<img
								className="w-[150px]"
								src={donatellaLogo}
								alt="logo"
								loading="lazy"
							/>
						</div>
						{!token && (
							<div className="hidden lg:flex items-center justify-end gap-10">
								<NavLink
									className={"text-white/75 text-sm"}
									to={getLanguagePath("/login")}
								>
									{t("hero.login")}
								</NavLink>
								<NavLink to={getLanguagePath("/signup")}>
									<Button className={"border-thin border-white-base"}>{t("hero.getStarted")}</Button>
								</NavLink>
							</div>
						)}
					</div>
				</nav>

				<div className="px-[6px] md:w-[70%] pt-[66px] mx-auto text-center flex flex-col justify-center items-center gap-1 text-white-base z-50">
					<h1 className="drop-shadow text-[45px] md:text-[86px] italic font-semibold font-display">
						{t("hero.title")}
					</h1>
					<p className="text-white-base/75 text-[22px] italic font-extralight leading-[33.907px]">
						{t("hero.description")}
					</p>
				</div>
			</div>
		</section>
	);
};

export default Hero;
