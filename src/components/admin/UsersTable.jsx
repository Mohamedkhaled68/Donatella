import React from "react";

const UsersTable = ({
    users,
    total,
    page,
    limit,
    onPageChange,
    onEdit,
    onDelete,
}) => {
    const totalPages = Math.ceil(total / limit);

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case "ADMIN":
                return "bg-red-500/20 text-red-400";
            case "ORGANIZATION":
                return "bg-blue-500/20 text-blue-400";
            case "INDIVIDUAL":
                return "bg-green-500/20 text-green-400";
            default:
                return "bg-gray-500/20 text-gray-400";
        }
    };

    const getUserName = (user) => {
        if (user.organization?.name) {
            return user.organization.name;
        }
        if (user.individual?.firstName || user.individual?.lastName) {
            return `${user.individual?.firstName || ""} ${user.individual?.lastName || ""}`.trim();
        }
        return user.verifiedEmail || "N/A";
    };

    return (
        <div className="bg-[#27292C] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#121417]">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                                Role
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                                Onboarding
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                                Created
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-[#2d2f33]">
                                <td className="px-6 py-4 text-sm text-white">
                                    {user.verifiedEmail || user.unVerifiedEmail}
                                </td>
                                <td className="px-6 py-4 text-sm text-white">
                                    {getUserName(user)}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${getRoleBadgeColor(
                                            user.role
                                        )}`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {user.isBlocked ? (
                                        <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400">
                                            Blocked
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400">
                                            Active
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {user.onboardingCompleted ? (
                                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400">
                                            Completed
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400">
                                            Pending
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-white/60">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onEdit(user.id)}
                                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/30"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(user.id)}
                                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="px-6 py-4 bg-[#121417] flex items-center justify-between">
                    <div className="text-sm text-white/60">
                        Showing {(page - 1) * limit + 1} to{" "}
                        {Math.min(page * limit, total)} of {total} users
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onPageChange(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 bg-[#27292C] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2d2f33]"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-white">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => onPageChange(page + 1)}
                            disabled={page >= totalPages}
                            className="px-4 py-2 bg-[#27292C] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2d2f33]"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersTable;

