import React from "react";
import useAdminStatistics from "../../hooks/admin/useAdminStatistics";
import StatisticsCard from "../../components/admin/StatisticsCard";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Loading } from "../../components";

const Dashboard = () => {
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
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatisticsCard
                        title="Total Users"
                        value={statistics?.totalUsers || 0}
                        subtitle={`${statistics?.totalIndividuals || 0} Individuals, ${statistics?.totalOrganizations || 0} Organizations`}
                        icon="👥"
                    />
                    <StatisticsCard
                        title="Active Users"
                        value={statistics?.activeUsers || 0}
                        subtitle="Last 30 days"
                        icon="✅"
                    />
                    <StatisticsCard
                        title="Total Jobs"
                        value={statistics?.totalJobs || 0}
                        subtitle={`${statistics?.activeJobs || 0} Active, ${statistics?.completedJobs || 0} Finished`}
                        icon="💼"
                    />
                    <StatisticsCard
                        title="Blocked Users"
                        value={statistics?.blockedUsers || 0}
                        icon="🚫"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <StatisticsCard
                        title="Recent Registrations"
                        value={`${statistics?.recentRegistrations7Days || 0} / ${statistics?.recentRegistrations30Days || 0}`}
                        subtitle="7 days / 30 days"
                        icon="📈"
                    />
                    <StatisticsCard
                        title="Onboarding Completion"
                        value={`${statistics?.onboardingCompletionRate || 0}%`}
                        icon="✓"
                    />
                </div>

                {statistics?.usersByCategory && statistics.usersByCategory.length > 0 && (
                    <div className="bg-[#27292C] rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Users by Category</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {statistics.usersByCategory.map((item) => (
                                <div
                                    key={item.category}
                                    className="bg-[#121417] rounded-lg p-4 text-center"
                                >
                                    <div className="text-2xl font-bold">{item.count}</div>
                                    <div className="text-sm text-white/60 mt-1">
                                        {item.category}
                                    </div>
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



