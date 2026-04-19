import { Link, useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "../../hooks/useI18n";
import { getLanguagePath } from "../../hooks/useLanguageNavigate";
import { useUserStore } from "../../store/userStore";
import useAuthStore from "../../store/userTokenStore";

const AdminSidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { signOut } = useAuthStore((state) => state);
	const { clearUserStatus } = useUserStore((state) => state);
	const { t } = useI18n();

	const handleLogout = () => {
		signOut();
		clearUserStatus();
		navigate("/login");
	};

	const isActive = (path) => location.pathname === path;

	const navItems = [
		{ path: "/admin/dashboard", label: t("admin.sidebar.dashboard"), icon: "📊" },
		{ path: "/admin/categories", label: t("admin.sidebar.categories"), icon: "📁" },
		{ path: "/admin/users", label: t("admin.sidebar.users"), icon: "👥" },
		{ path: "/admin/notifications", label: t("admin.sidebar.notifications"), icon: "🔔" },
		{ path: "/admin/payouts", label: t("admin.sidebar.payouts"), icon: "💰" },
	];

	return (
		<div className="w-64 bg-[#27292C] min-h-screen p-6 flex flex-col">
			<div className="mb-8">
				<h2 className="text-xl font-bold text-white">{t("admin.sidebar.adminPanel")}</h2>
			</div>

			<nav className="flex-1">
				{navItems.map((item) => (
					<Link
						key={item.path}
						to={getLanguagePath(item.path)}
						className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
							isActive(item.path) ? "bg-blue-500 text-white" : "text-white/60 hover:bg-[#2d2f33] hover:text-white"
						}`}
					>
						<span>{item.icon}</span>
						<span>{item.label}</span>
					</Link>
				))}
			</nav>

			<button
				onClick={handleLogout}
				className="w-full px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
			>
				{t("admin.sidebar.logout")}
			</button>
		</div>
	);
};

export default AdminSidebar;
