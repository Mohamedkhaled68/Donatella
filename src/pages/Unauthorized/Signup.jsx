import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { formVideo } from "../../assets";
import { BackButton, IndividualRegisterForm, Loading, OrganizationRegisterForm } from "../../components";
import LogoHeader from "../../components/shared/ui/LogoHeader";
import { useI18n } from "../../hooks/useI18n";

const Signup = () => {
	const [role, setRole] = useState("Individual");
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const { t, isRtl } = useI18n();

	useEffect(() => {
		document.documentElement.dir = isRtl ? "rtl" : "ltr";
	}, [isRtl]);

	const handleRoleChange = (selectedRole) => {
		setRole(selectedRole);
	};

	useEffect(() => {
		if (location.state?.role) {
			setRole(location.state.role);
		} else {
			setRole("Individual");
		}
	}, [location.state?.role]);

	return (
		<>
			{loading && (
				<div className="fixed inset-0 flex justify-center items-center z-[10000] bg-black/50">
					<Loading />
				</div>
			)}
			<section className="min-h-screen pb-8 sm:pb-[30px] w-full bg-[#121417]">
				<LogoHeader />
				<div className="container min-h-[calc(100vh-56px)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 lg:gap-y-0 mt-6 sm:mt-10 px-4 sm:px-6">
					<div className="flex flex-col gap-4 lg:gap-[5%]">
						<div className={`flex gap-4 sm:gap-10 ${isRtl ? "flex-row-reverse" : ""} items-start`}>
							<BackButton />
							<div className={`flex flex-col gap-2 sm:gap-3 flex-1 min-w-0 ${isRtl ? "text-right" : ""}`}>
								<h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white-base">
									{t("signup.title")}
								</h1>
								<p className="text-sm text-white-base/40 w-full lg:w-[70%]">
									{t("signup.subtitle")}
								</p>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full">
							{/* Organization Button */}
							<div className="relative group w-full sm:w-1/2">
								<button
									key={"Organization"}
									type="button"
									onClick={() => handleRoleChange("Organization")}
									className={`${
										role === "Organization" ? "bg-white-base text-gray-deep" : "bg-[#27292C] text-white-base"
									} w-full px-4 sm:px-5 py-3 sm:py-4 border-medium border-white-base text-sm sm:text-medium font-bold rounded-xl transition-all duration-300`}
								>
									{t("signup.organization")}
								</button>
								<div
									className={`absolute w-[280px] sm:w-[300px] bottom-full ${isRtl ? "right-0 sm:right-1/2 sm:translate-x-1/2" : "left-0 sm:left-1/2 sm:-translate-x-1/2"} mb-2 hidden sm:group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md ${isRtl ? "text-right" : ""} z-10`}
								>
									{t("signup.organizationTooltip")}
								</div>
							</div>

							{/* Individual Button */}
							<div className="relative group w-full sm:w-1/2">
								<button
									key={"Individual"}
									type="button"
									onClick={() => handleRoleChange("Individual")}
									className={`${
										role === "Individual" ? "bg-white-base text-gray-deep" : "bg-[#27292C] text-white-base"
									} w-full px-4 sm:px-5 py-3 sm:py-4 border-medium border-white-base text-sm sm:text-medium font-bold rounded-xl transition-all duration-300`}
								>
									{t("signup.individual")}
								</button>
								<div
									className={`absolute w-[280px] sm:w-[350px] bottom-full ${isRtl ? "left-0 sm:left-[-100%]" : "right-0 sm:-right-[100%]"} z-[1000] sm:transform sm:-translate-x-1/2 mb-2 hidden sm:group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md duration-300 ${isRtl ? "text-right" : ""}`}
								>
									{t("signup.individualTooltip")}
								</div>
							</div>
						</div>

						{role === "Organization" ? (
							<OrganizationRegisterForm
								key={"Organization"}
								role={role}
								loading={loading}
								setLoading={setLoading}
							/>
						) : (
							<IndividualRegisterForm
								key={"Individual"}
								role={role}
								loading={loading}
								setLoading={setLoading}
							/>
						)}
					</div>

					<div className="w-full max-w-[400px] lg:max-w-none mx-auto lg:mx-0 flex-shrink-0">
						<div className="relative rounded-2xl sm:rounded-3xl border-2 sm:border-[4px] border-[#ffffff46] w-full overflow-hidden aspect-video lg:aspect-auto lg:max-h-[500px]">
							<video
								className="w-full h-full object-cover grayscale"
								autoPlay
								muted
								loop
								playsInline
							>
								<source src={formVideo} />
							</video>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Signup;
