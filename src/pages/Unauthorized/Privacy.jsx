import { useEffect } from "react";
import { privacyImage } from "../../assets";
import { BackButton, Footer } from "../../components";
import { useI18n } from "../../hooks/useI18n";

const Privacy = () => {
	const { t, isRtl } = useI18n();

	useEffect(() => {
		document.documentElement.dir = isRtl ? "rtl" : "ltr";
	}, [isRtl]);

	const policies = t("privacy.sections", { returnObjects: true });

	return (
		<>
			<section className="min-h-screen bg-[#121417] text-white pb-10">
				<header className="flex items-center p-4">
					<BackButton />
				</header>
				<div className="container mx-auto px-[1.2rem] flex flex-col items-center justify-center text-center pt-20">
					<h1 className="text-6xl font-[PlayfairDisplay] font-semibold italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]">
						{t("privacy.title")}
					</h1>
					<p className="text-xl font-[DMSans] text-white/70 mt-2">{t("privacy.subtitle")}</p>
					<div className="w-full my-5">
						<div className="w-[50%] h-[300px] mx-auto rounded-lg border-[3px] border-[#ffffff5d]">
							<img
								className="w-full h-full object-cover"
								src={privacyImage}
								alt="privacy"
								loading="lazy"
							/>
						</div>
					</div>
					<h2 className={`text-3xl font-[PlayfairDisplay] mt-6 ${isRtl ? "text-right" : "text-left"} w-full max-w-3xl`}>
						{t("privacy.policyTitle")}
					</h2>
					<div
						className={`mt-4 text-lg leading-relaxed font-[DMSans] text-white/80 max-w-3xl ${isRtl ? "text-right" : "text-left"}`}
					>
						<p>{t("privacy.intro")}</p>
						<p className="mt-4">{t("privacy.intro2")}</p>
						{policies.map((policy, index) => (
							<div key={index}>
								<h3 className="text-2xl font-[PlayfairDisplay] mt-6 text-white">{policy.head}</h3>
								{policy.des && (
									<p className={`my-2 ${isRtl ? "pr-3" : "pl-3"} text-lg text-white-base`}>{policy.des}</p>
								)}
								<ul className={`list-disc ${isRtl ? "pr-6" : "pl-6"}`}>
									{policy.points.map((point, idx) => (
										<li key={idx}>{point}</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Privacy;
