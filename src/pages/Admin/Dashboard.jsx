import { Loading } from "../../components";
import AdminSidebar from "../../components/admin/AdminSidebar";
import StatisticsCard from "../../components/admin/StatisticsCard";
import useAdminStatistics from "../../hooks/admin/useAdminStatistics";
import { useI18n } from "../../hooks/useI18n";

const Dashboard = () => {
	const { t } = useI18n();
	const { data: statistics, isLoading } = useAdminStatistics();

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loading />
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-[#121417] text-white">
			<AdminSidebar />
			<div className="flex-1 p-8">
				<div className="container mx-auto">
					<h1 className="text-3xl font-bold mb-8">{t("admin.dashboard.title")}</h1>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						<StatisticsCard
							title={t("admin.dashboard.totalUsers")}
							value={statistics?.totalUsers || 0}
							subtitle={`${statistics?.totalIndividuals || 0} ${t("admin.dashboard.individuals")}, ${statistics?.totalOrganizations || 0} ${t("admin.dashboard.organizations")}`}
							icon="👥"
						/>
						<StatisticsCard
							title={t("admin.dashboard.activeUsers")}
							value={statistics?.activeUsers || 0}
							subtitle={t("admin.dashboard.last30Days")}
							icon="✅"
						/>
						<StatisticsCard
							title={t("admin.dashboard.totalJobs")}
							value={statistics?.totalJobs || 0}
							subtitle={`${statistics?.activeJobs || 0} ${t("admin.dashboard.active")}, ${statistics?.completedJobs || 0} ${t("admin.dashboard.finished")}`}
							icon="💼"
						/>
						<StatisticsCard
							title={t("admin.dashboard.blockedUsers")}
							value={statistics?.blockedUsers || 0}
							icon="🚫"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
						<StatisticsCard
							title={t("admin.dashboard.recentRegistrations")}
							value={`${statistics?.recentRegistrations7Days || 0} / ${statistics?.recentRegistrations30Days || 0}`}
							subtitle={`${t("admin.dashboard.days7")} / ${t("admin.dashboard.days30")}`}
							icon="📈"
						/>
						<StatisticsCard
							title={t("admin.dashboard.onboardingCompletion")}
							value={`${statistics?.onboardingCompletionRate || 0}%`}
							icon="✓"
						/>
					</div>

					{statistics?.usersByCategory && statistics.usersByCategory.length > 0 && (
						<div className="bg-[#27292C] rounded-lg p-6">
							<h2 className="text-xl font-bold mb-4">{t("admin.dashboard.usersByCategory")}</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
								{statistics.usersByCategory.map((item) => (
									<div
										key={item.category}
										className="bg-[#121417] rounded-lg p-4 text-center"
									>
										<div className="text-2xl font-bold">{item.count}</div>
										<div className="text-sm text-white/60 mt-1">{item.category}</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
