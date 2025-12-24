import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../store/userTokenStore";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signOut } = useAuthStore((state) => state);
    const { clearUserStatus } = useUserStore((state) => state);

    const handleLogout = () => {
        signOut();
        clearUserStatus();
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
        { path: "/admin/users", label: "Users", icon: "👥" },
        { path: "/admin/categories", label: "Categories", icon: "📂" },
        { path: "/admin/notifications", label: "Notifications", icon: "🔔" },
        { path: "/admin/payouts", label: "Payouts", icon: "💰" },
    ];

    return (
        <div className="w-64 bg-[#27292C] min-h-screen p-6 flex flex-col">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            </div>

            <nav className="flex-1">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                            isActive(item.path)
                                ? "bg-blue-500 text-white"
                                : "text-white/60 hover:bg-[#2d2f33] hover:text-white"
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
                Logout
            </button>
        </div>
    );
};

export default AdminSidebar;

