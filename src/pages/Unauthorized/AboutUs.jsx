import { useEffect } from "react";
import { BackButton, Footer } from "../../components";
import { useI18n } from "../../hooks/useI18n";

const AboutUs = () => {
	const { t, isRtl } = useI18n();

	useEffect(() => {
		document.documentElement.dir = isRtl ? "rtl" : "ltr";
	}, [isRtl]);

	return (
		<>
			<section className="min-h-screen bg-[#121417] text-white pb-10">
				<header className="flex items-center p-4">
					<BackButton />
				</header>
				<div className="container  mx-auto px-[1.2rem] flex flex-col items-center justify-center text-center pt-20">
					<h1 className="text-6xl font-[PlayfairDisplay] font-semibold italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]">
						{t("aboutUs.title")}
					</h1>
					<p className="text-xl font-[DMSans] text-white/70 mt-2">{t("aboutUs.subtitle")}</p>
					<div
						className={`mt-12 text-lg leading-relaxed font-[DMSans] text-white/80 max-w-3xl ${isRtl ? "text-right" : "text-left"}`}
					>
						<h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">{t("aboutUs.vision.title")}</h2>
						<p className="mt-4">{t("aboutUs.vision.content")}</p>

						<h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">{t("aboutUs.mission.title")}</h2>
						<p className="mt-4">{t("aboutUs.mission.content")}</p>

						<h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">{t("aboutUs.values.title")}</h2>
						<ul className={`list-disc ${isRtl ? "pr-6" : "pl-6"} mt-4 space-y-2`}>
							{t("aboutUs.values.items", { returnObjects: true }).map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>

						<h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">{t("aboutUs.promise.title")}</h2>
						<ul className={`list-disc ${isRtl ? "pr-6" : "pl-6"} mt-4 space-y-2`}>
							<li>{t("aboutUs.promise.toTalents")}</li>
							<li>{t("aboutUs.promise.toClients")}</li>
						</ul>

						<h2 className="text-3xl font-[PlayfairDisplay] mt-6 text-white">{t("aboutUs.whyUs.title")}</h2>
						<ul className={`list-disc ${isRtl ? "pr-6" : "pl-6"} mt-4 space-y-2`}>
							{t("aboutUs.whyUs.items", { returnObjects: true }).map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default AboutUs;
