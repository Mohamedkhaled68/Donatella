import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Loading } from "../../components";
import { useAdminWithdrawals, useAdminUpdateWithdrawal } from "../../hooks/admin/useAdminWithdrawals";
import useAdminPaymentAuditLogs from "../../hooks/admin/useAdminPaymentAuditLogs";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FaMoneyBillWave, 
    FaHistory, 
    FaSearch, 
    FaEye, 
    FaEdit,
    FaFilter,
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";

const Payouts = () => {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState("withdrawals");
    const [paginate, setPaginate] = useState({ page: 1, limit: 20 });
    const [filters, setFilters] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null,
    });
    const [editForm, setEditForm] = useState({
        status: "",
        amount: "",
        processedAmount: "",
        adminNotes: "",
    });

    const { data: withdrawals, isLoading, refetch } = useAdminWithdrawals(filters, paginate);
    const { data: auditLogs } = useAdminPaymentAuditLogs({}, paginate);
    const { mutateAsync: updateWithdrawal, isPending: isUpdating } = useAdminUpdateWithdrawal();

    // Calculate summary statistics
    const summaryStats = useMemo(() => {
        if (!withdrawals?.items) return { pending: 0, pendingAmount: 0, total: 0 };
        
        const pending = withdrawals.items.filter(w => w.status === "PENDING").length;
        const pendingAmount = withdrawals.items
            .filter(w => w.status === "PENDING")
            .reduce((sum, w) => sum + (parseFloat(w.amount) || 0), 0);
        
        return {
            pending,
            pendingAmount,
            total: withdrawals.items.length,
        };
    }, [withdrawals]);

    // Filter withdrawals by search query
    const filteredWithdrawals = useMemo(() => {
        if (!withdrawals?.items || !searchQuery) return withdrawals?.items || [];
        
        const query = searchQuery.toLowerCase();
        return withdrawals.items.filter(w => 
            w.userId?.toLowerCase().includes(query) ||
            w.iban?.toLowerCase().includes(query) ||
            w.accountName?.toLowerCase().includes(query) ||
            w.status?.toLowerCase().includes(query)
        );
    }, [withdrawals, searchQuery]);

    const handleEditClick = (withdrawal) => {
        setSelectedWithdrawal(withdrawal);
        setEditForm({
            status: withdrawal.status,
            amount: withdrawal.amount || "",
            processedAmount: withdrawal.processedAmount || withdrawal.amount,
            adminNotes: withdrawal.adminNotes || "",
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async () => {
        if (!selectedWithdrawal) return;

        // Validate status transition
        const currentStatus = selectedWithdrawal.status;
        const newStatus = editForm.status;

        if (newStatus && newStatus !== currentStatus) {
            const validTransitions = {
                PENDING: ["APPROVED", "REJECTED"],
                APPROVED: ["PROCESSED"],
                REJECTED: [],
                PROCESSED: [],
            };

            if (!validTransitions[currentStatus]?.includes(newStatus)) {
                toast.error(
                    `Invalid status transition: Cannot change from ${currentStatus} to ${newStatus}`
                );
                return;
            }
        }

        // Validate processed amount
        if (editForm.processedAmount !== undefined) {
            const processedAmount = parseFloat(editForm.processedAmount);
            if (processedAmount <= 0) {
                toast.error("Processed amount must be greater than 0");
                return;
            }
            if (processedAmount > selectedWithdrawal.amount) {
                toast.error("Processed amount cannot exceed requested amount");
                return;
            }
        }

        // Show confirmation modal for critical actions
        if (newStatus === "APPROVED" && currentStatus === "PENDING") {
            setConfirmationModal({
                isOpen: true,
                title: "Approve Withdrawal",
                message: `This will deduct $${selectedWithdrawal.amount} from the user's balance. Are you sure you want to continue?`,
                onConfirm: () => {
                    setConfirmationModal({ isOpen: false, title: "", message: "", onConfirm: null });
                    proceedWithUpdate();
                },
            });
            return;
        }

        if (newStatus === "REJECTED" && currentStatus === "PENDING") {
            setConfirmationModal({
                isOpen: true,
                title: "Reject Withdrawal",
                message: `This will release the reserved balance of $${selectedWithdrawal.amount} back to the user. Are you sure you want to continue?`,
                onConfirm: () => {
                    setConfirmationModal({ isOpen: false, title: "", message: "", onConfirm: null });
                    proceedWithUpdate();
                },
            });
            return;
        }

        proceedWithUpdate();
    };

    const proceedWithUpdate = async () => {
        if (!selectedWithdrawal) return;

        // Validate amount if being changed
        if (editForm.amount && parseFloat(editForm.amount) !== selectedWithdrawal.amount) {
            const newAmount = parseFloat(editForm.amount);
            if (newAmount < 50 || newAmount > 50000) {
                toast.error("Amount must be between $50 and $50,000");
                return;
            }
        }

        try {
            const updateData = {};
            if (editForm.status !== selectedWithdrawal.status) {
                updateData.status = editForm.status;
            }
            const currentAmount = parseFloat(selectedWithdrawal.amount) || 0;
            const newAmount = editForm.amount ? parseFloat(editForm.amount) : null;
            if (newAmount !== null && Math.abs(newAmount - currentAmount) > 0.01) {
                updateData.amount = newAmount;
            }
            if (parseFloat(editForm.processedAmount) !== (selectedWithdrawal.processedAmount || selectedWithdrawal.amount)) {
                updateData.processedAmount = parseFloat(editForm.processedAmount);
            }
            if (editForm.adminNotes !== (selectedWithdrawal.adminNotes || "")) {
                updateData.adminNotes = editForm.adminNotes;
            }

            await updateWithdrawal({
                id: selectedWithdrawal.id,
                data: updateData,
            });

            toast.success("Withdrawal updated successfully");
            setIsEditModalOpen(false);
            setSelectedWithdrawal(null);
            refetch();
        } catch (error) {
            toast.error(error?.message || "Failed to update withdrawal");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PROCESSED":
                return "bg-green-500/20 text-green-400 border-green-500/50";
            case "APPROVED":
                return "bg-blue-500/20 text-blue-400 border-blue-500/50";
            case "REJECTED":
                return "bg-red-500/20 text-red-400 border-red-500/50";
            default:
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "PROCESSED":
                return "✓";
            case "APPROVED":
                return "✓";
            case "REJECTED":
                return "✕";
            default:
                return "⏳";
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#121417]">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#121417] text-white">
            <AdminSidebar />
            <div className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="container mx-auto max-w-7xl">
                    {/* Page Header */}
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Payout Management</h1>
                        <p className="text-gray-400 text-sm md:text-base">
                            Manage withdrawal requests and view audit logs
                        </p>
                    </div>

                    {/* Summary Cards */}
                    {currentTab === "withdrawals" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-lg p-4 md:p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Pending Requests</p>
                                        <p className="text-2xl md:text-3xl font-bold text-yellow-400">
                                            {summaryStats.pending}
                                        </p>
                                    </div>
                                    <div className="text-3xl md:text-4xl opacity-50">⏳</div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-4 md:p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Pending Amount</p>
                                        <p className="text-2xl md:text-3xl font-bold text-blue-400">
                                            ${summaryStats.pendingAmount.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="text-3xl md:text-4xl opacity-50">💰</div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-lg p-4 md:p-6 sm:col-span-2 lg:col-span-1"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Total Requests</p>
                                        <p className="text-2xl md:text-3xl font-bold text-purple-400">
                                            {summaryStats.total}
                                        </p>
                                    </div>
                                    <div className="text-3xl md:text-4xl opacity-50">📊</div>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Modern Tabs */}
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row gap-2 bg-[#27292C] rounded-lg p-1 border border-gray-700">
                            <button
                                onClick={() => setCurrentTab("withdrawals")}
                                className={`flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-md font-semibold transition-all ${
                                    currentTab === "withdrawals"
                                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                                        : "text-gray-400 hover:text-white hover:bg-[#313131]"
                                }`}
                            >
                                <FaMoneyBillWave />
                                <span className="text-sm md:text-base">Withdrawal Requests</span>
                                {currentTab === "withdrawals" && withdrawals?.items && (
                                    <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                                        {withdrawals.items.length}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setCurrentTab("audit")}
                                className={`flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-md font-semibold transition-all ${
                                    currentTab === "audit"
                                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                                        : "text-gray-400 hover:text-white hover:bg-[#313131]"
                                }`}
                            >
                                <FaHistory />
                                <span className="text-sm md:text-base">Audit Logs</span>
                                {currentTab === "audit" && auditLogs?.items && (
                                    <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                                        {auditLogs.items.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    {currentTab === "withdrawals" && (
                        <div className="mb-6 space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Search Bar */}
                                <div className="flex-1 relative">
                                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by user ID, IBAN, account name, or status..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-[#27292C] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>

                                {/* Filter Toggle */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-2 px-4 py-3 bg-[#27292C] border border-gray-600 rounded-lg hover:bg-[#313131] transition-colors ${
                                        showFilters || filters.status ? "border-blue-500 bg-blue-500/10" : ""
                                    }`}
                                >
                                    <FaFilter />
                                    <span className="hidden sm:inline">Filters</span>
                                    {(filters.status || showFilters) && (
                                        <span className="px-2 py-0.5 bg-blue-500 rounded-full text-xs">
                                            {filters.status ? "1" : ""}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Filters Panel */}
                            <AnimatePresence>
                                {showFilters && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-[#27292C] border border-gray-600 rounded-lg p-4"
                                    >
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                                    Status
                                                </label>
                                                <select
                                                    value={filters.status || ""}
                                                    onChange={(e) =>
                                                        setFilters({
                                                            ...filters,
                                                            status: e.target.value || undefined,
                                                        })
                                                    }
                                                    className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                                >
                                                    <option value="">All Statuses</option>
                                                    <option value="PENDING">Pending</option>
                                                    <option value="APPROVED">Approved</option>
                                                    <option value="REJECTED">Rejected</option>
                                                    <option value="PROCESSED">Processed</option>
                                                </select>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Withdrawals Content */}
                    {currentTab === "withdrawals" && (
                        <div className="bg-[#27292C] rounded-lg border border-gray-700 overflow-hidden shadow-xl">
                            {/* Desktop Table View */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#1a1a1a] border-b border-gray-700">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                User
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                IBAN
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                Account Name
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {(searchQuery ? filteredWithdrawals : withdrawals?.items || []).map((withdrawal) => (
                                            <tr
                                                key={withdrawal.id}
                                                className="hover:bg-[#313131] transition-colors cursor-pointer"
                                                onClick={() => navigate(`/admin/payouts/${withdrawal.id}`)}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium">
                                                        {withdrawal.userId?.slice(0, 8)}...
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold">
                                                        ${parseFloat(withdrawal.amount || 0).toFixed(2)}
                                                    </div>
                                                    {withdrawal.processedAmount && (
                                                        <div className="text-xs text-gray-400">
                                                            Processed: ${parseFloat(withdrawal.processedAmount).toFixed(2)}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-mono text-gray-300">
                                                        {withdrawal.iban?.replace(/(.{4})/g, "$1 ").trim().slice(0, 20)}...
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-300">
                                                        {withdrawal.accountName}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
                                                            withdrawal.status
                                                        )}`}
                                                    >
                                                        <span>{getStatusIcon(withdrawal.status)}</span>
                                                        {withdrawal.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                    {new Date(withdrawal.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                navigate(`/admin/payouts/${withdrawal.id}`);
                                                            }}
                                                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                            title="View Details"
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEditClick(withdrawal);
                                                            }}
                                                            className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile/Tablet Card View */}
                            <div className="lg:hidden">
                                <div className="p-4 space-y-4">
                                    {(searchQuery ? filteredWithdrawals : withdrawals?.items || []).map((withdrawal) => (
                                        <motion.div
                                            key={withdrawal.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                                            onClick={() => navigate(`/admin/payouts/${withdrawal.id}`)}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span
                                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                                                withdrawal.status
                                                            )}`}
                                                        >
                                                            <span>{getStatusIcon(withdrawal.status)}</span>
                                                            {withdrawal.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-lg font-bold text-white mb-1">
                                                        ${parseFloat(withdrawal.amount || 0).toFixed(2)}
                                                    </p>
                                                    {withdrawal.processedAmount && (
                                                        <p className="text-xs text-gray-400">
                                                            Processed: ${parseFloat(withdrawal.processedAmount).toFixed(2)}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/admin/payouts/${withdrawal.id}`);
                                                        }}
                                                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditClick(withdrawal);
                                                        }}
                                                        className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm text-gray-400">
                                                <div>
                                                    <span className="text-gray-500">User:</span> {withdrawal.userId?.slice(0, 12)}...
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">IBAN:</span> {withdrawal.iban?.replace(/(.{4})/g, "$1 ").trim().slice(0, 25)}...
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Account:</span> {withdrawal.accountName}
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Date:</span> {new Date(withdrawal.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Empty State */}
                            {(searchQuery ? filteredWithdrawals : withdrawals?.items || []).length === 0 && (
                                <div className="p-12 text-center">
                                    <div className="text-6xl mb-4 opacity-50">📭</div>
                                    <p className="text-gray-400 text-lg mb-2">
                                        {searchQuery ? "No withdrawals found" : "No withdrawal requests"}
                                    </p>
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="text-blue-400 hover:text-blue-300 text-sm"
                                        >
                                            Clear search
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Pagination */}
                            {withdrawals?.totalPages > 1 && (
                                <div className="px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-700 bg-[#1a1a1a]">
                                    <div className="text-sm text-gray-400">
                                        Page {paginate.page} of {withdrawals.totalPages} ({withdrawals.total} total)
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                setPaginate({
                                                    ...paginate,
                                                    page: Math.max(1, paginate.page - 1),
                                                })
                                            }
                                            disabled={paginate.page === 1}
                                            className="flex items-center gap-2 px-4 py-2 bg-[#27292C] border border-gray-600 rounded-lg hover:bg-[#313131] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <FaChevronLeft />
                                            <span className="hidden sm:inline">Previous</span>
                                        </button>
                                        <button
                                            onClick={() =>
                                                setPaginate({
                                                    ...paginate,
                                                    page: Math.min(
                                                        withdrawals.totalPages,
                                                        paginate.page + 1
                                                    ),
                                                })
                                            }
                                            disabled={paginate.page >= withdrawals.totalPages}
                                            className="flex items-center gap-2 px-4 py-2 bg-[#27292C] border border-gray-600 rounded-lg hover:bg-[#313131] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <span className="hidden sm:inline">Next</span>
                                            <FaChevronRight />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Audit Logs Tab */}
                    {currentTab === "audit" && (
                        <div className="bg-[#27292C] rounded-lg border border-gray-700 overflow-hidden shadow-xl">
                            <div className="p-4 md:p-6">
                                <div className="space-y-4">
                                    {auditLogs?.items?.map((log) => (
                                        <div
                                            key={log.id}
                                            className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-blue-500 hover:bg-[#212121] transition-colors"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-sm font-semibold text-white">
                                                            {log.action.replace(/_/g, " ")}
                                                        </span>
                                                        <span className="text-xs text-gray-400">
                                                            {log.entityType.replace(/_/g, " ")}
                                                        </span>
                                                    </div>
                                                    {log.description && (
                                                        <p className="text-sm text-gray-300 mb-1">
                                                            {log.description}
                                                        </p>
                                                    )}
                                                    {log.previousValue && log.newValue && (
                                                        <div className="text-xs text-gray-400 mt-1">
                                                            <span className="text-gray-500">Changed:</span>{" "}
                                                            {JSON.stringify(log.previousValue)} → {JSON.stringify(log.newValue)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-400 text-right">
                                                    {new Date(log.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {auditLogs?.items?.length === 0 && (
                                    <div className="p-12 text-center">
                                        <div className="text-6xl mb-4 opacity-50">📋</div>
                                        <p className="text-gray-400 text-lg">No audit logs found</p>
                                    </div>
                                )}

                                {/* Pagination */}
                                {auditLogs?.totalPages > 1 && (
                                    <div className="mt-6 pt-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <div className="text-sm text-gray-400">
                                            Page {paginate.page} of {auditLogs.totalPages}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    setPaginate({
                                                        ...paginate,
                                                        page: Math.max(1, paginate.page - 1),
                                                    })
                                                }
                                                disabled={paginate.page === 1}
                                                className="flex items-center gap-2 px-4 py-2 bg-[#27292C] border border-gray-600 rounded-lg hover:bg-[#313131] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <FaChevronLeft />
                                                <span className="hidden sm:inline">Previous</span>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setPaginate({
                                                        ...paginate,
                                                        page: Math.min(
                                                            auditLogs.totalPages,
                                                            paginate.page + 1
                                                        ),
                                                    })
                                                }
                                                disabled={paginate.page >= auditLogs.totalPages}
                                                className="flex items-center gap-2 px-4 py-2 bg-[#27292C] border border-gray-600 rounded-lg hover:bg-[#313131] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <span className="hidden sm:inline">Next</span>
                                                <FaChevronRight />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {confirmationModal.isOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#27292C] rounded-lg p-6 w-full max-w-md border border-gray-700 shadow-2xl"
                        >
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {confirmationModal.title}
                                </h3>
                                <p className="text-gray-300">
                                    {confirmationModal.message}
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() =>
                                        setConfirmationModal({
                                            isOpen: false,
                                            title: "",
                                            message: "",
                                            onConfirm: null,
                                        })
                                    }
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirmationModal.onConfirm) {
                                            confirmationModal.onConfirm();
                                        }
                                    }}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    Confirm
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditModalOpen && selectedWithdrawal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#27292C] rounded-lg p-6 w-full max-w-md border border-gray-700 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-6">Edit Withdrawal</h2>

                            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Status
                                    </label>
                                    <select
                                        value={editForm.status}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                status: e.target.value,
                                            })
                                        }
                                        className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        {selectedWithdrawal.status === "PENDING" && (
                                            <>
                                                <option value="PENDING">Pending</option>
                                                <option value="APPROVED">Approved</option>
                                                <option value="REJECTED">Rejected</option>
                                            </>
                                        )}
                                        {selectedWithdrawal.status === "APPROVED" && (
                                            <>
                                                <option value="APPROVED">Approved</option>
                                                <option value="PROCESSED">Processed</option>
                                            </>
                                        )}
                                        {(selectedWithdrawal.status === "REJECTED" ||
                                            selectedWithdrawal.status === "PROCESSED") && (
                                            <option value={selectedWithdrawal.status}>
                                                {selectedWithdrawal.status}
                                            </option>
                                        )}
                                    </select>
                                    {selectedWithdrawal.status === "PENDING" && editForm.status === "APPROVED" && (
                                        <p className="text-xs text-yellow-400 mt-1">
                                            This will deduct ${selectedWithdrawal.amount} from user's balance
                                        </p>
                                    )}
                                    {selectedWithdrawal.status === "PENDING" && editForm.status === "REJECTED" && (
                                        <p className="text-xs text-yellow-400 mt-1">
                                            This will release the reserved balance back to user
                                        </p>
                                    )}
                                </div>

                                {selectedWithdrawal.status === "PENDING" && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">
                                            Amount ($)
                                        </label>
                                        <input
                                            type="number"
                                            value={editForm.amount}
                                            onChange={(e) =>
                                                setEditForm({
                                                    ...editForm,
                                                    amount: e.target.value,
                                                })
                                            }
                                            min="50"
                                            max="50000"
                                            step="0.01"
                                            className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">
                                            Minimum: $50 | Maximum: $50,000
                                        </p>
                                        {editForm.amount && parseFloat(editForm.amount) !== selectedWithdrawal.amount && (
                                            <p className="text-xs text-yellow-400 mt-1">
                                                Amount will change from ${selectedWithdrawal.amount} to ${editForm.amount}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Processed Amount
                                    </label>
                                    <input
                                        type="number"
                                        value={editForm.processedAmount}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                processedAmount: e.target.value,
                                            })
                                        }
                                        min="0"
                                        step="0.01"
                                        className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Admin Notes
                                    </label>
                                    <textarea
                                        value={editForm.adminNotes}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                adminNotes: e.target.value,
                                            })
                                        }
                                        rows={4}
                                        className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6 mt-6 border-t border-gray-700">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    disabled={isUpdating}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUpdating ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Payouts;
