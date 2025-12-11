import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Loading } from "../../components";
import useAdminGetWithdrawal from "../../hooks/admin/useAdminGetWithdrawal";
import { useAdminUpdateWithdrawal } from "../../hooks/admin/useAdminWithdrawals";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const PayoutDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: withdrawal, isLoading, refetch } = useAdminGetWithdrawal(id);
    const { mutateAsync: updateWithdrawal, isPending: isUpdating } = useAdminUpdateWithdrawal();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

    React.useEffect(() => {
        if (withdrawal) {
            setEditForm({
                status: withdrawal.status,
                amount: withdrawal.amount || "",
                processedAmount: withdrawal.processedAmount || withdrawal.amount,
                adminNotes: withdrawal.adminNotes || "",
            });
        }
    }, [withdrawal]);

    const handleUpdate = async () => {
        if (!withdrawal) return;

        // Validate status transition
        const currentStatus = withdrawal.status;
        const newStatus = editForm.status;

        if (newStatus && newStatus !== currentStatus) {
            // Validate transitions
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

        // Validate amount if being changed
        if (editForm.amount && parseFloat(editForm.amount) !== withdrawal.amount) {
            const newAmount = parseFloat(editForm.amount);
            if (newAmount < 50 || newAmount > 50000) {
                toast.error("Amount must be between $50 and $50,000");
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
            const amountToCheck = editForm.amount ? parseFloat(editForm.amount) : withdrawal.amount;
            if (processedAmount > amountToCheck) {
                toast.error("Processed amount cannot exceed requested amount");
                return;
            }
        }

        // Show confirmation modal for critical actions
        if (newStatus === "APPROVED" && currentStatus === "PENDING") {
            setConfirmationModal({
                isOpen: true,
                title: "Approve Withdrawal",
                message: `This will deduct $${withdrawal.amount} from the user's balance. Are you sure you want to continue?`,
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
                message: `This will release the reserved balance of $${withdrawal.amount} back to the user. Are you sure you want to continue?`,
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
        if (!withdrawal) return;

        try {
            const updateData = {};
            if (editForm.status !== withdrawal.status) {
                updateData.status = editForm.status;
            }
            // Only include amount if it actually changed (compare as numbers)
            const currentAmount = parseFloat(withdrawal.amount) || 0;
            const newAmount = editForm.amount ? parseFloat(editForm.amount) : null;
            if (newAmount !== null && Math.abs(newAmount - currentAmount) > 0.01) {
                updateData.amount = newAmount;
            }
            if (parseFloat(editForm.processedAmount) !== (withdrawal.processedAmount || withdrawal.amount)) {
                updateData.processedAmount = parseFloat(editForm.processedAmount);
            }
            if (editForm.adminNotes !== (withdrawal.adminNotes || "")) {
                updateData.adminNotes = editForm.adminNotes;
            }

            await updateWithdrawal({
                id: withdrawal.id,
                data: updateData,
            });

            toast.success("Withdrawal updated successfully");
            setIsEditModalOpen(false);
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    if (!withdrawal) {
        return (
            <div className="flex min-h-screen bg-[#121417] text-white">
                <AdminSidebar />
                <div className="flex-1 p-8">
                    <div className="container mx-auto">
                        <p>Withdrawal not found</p>
                    </div>
                </div>
            </div>
        );
    }

    const user = withdrawal.user || {};

    return (
        <div className="flex min-h-screen bg-[#121417] text-white">
            <AdminSidebar />
            <div className="flex-1 p-8">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/admin/payouts")}
                                className="text-gray-400 hover:text-white"
                            >
                                ← Back
                            </button>
                            <h1 className="text-3xl font-bold">Payout Details</h1>
                        </div>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="px-4 py-2 bg-blue-primary hover:bg-blue-600 text-white rounded-lg transition"
                        >
                            Edit
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-[#27292C] rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">Status</h2>
                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                                        withdrawal.status
                                    )}`}
                                >
                                    {withdrawal.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <p className="text-sm text-gray-400">Requested Amount</p>
                                    <p className="text-2xl font-bold">
                                        ${parseFloat(withdrawal.amount || 0).toFixed(2)}
                                    </p>
                                </div>
                                {withdrawal.processedAmount && (
                                    <div>
                                        <p className="text-sm text-gray-400">Processed Amount</p>
                                        <p className="text-2xl font-bold">
                                            ${parseFloat(withdrawal.processedAmount || 0).toFixed(2)}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {withdrawal.status === "PENDING" && (
                                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                                    <p className="text-sm text-yellow-400">
                                        Balance Reserved: ${parseFloat(withdrawal.amount || 0).toFixed(2)}
                                    </p>
                                    <p className="text-xs text-yellow-300 mt-1">
                                        This amount is reserved and will be deducted when approved, or released if rejected.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* User Information */}
                        <div className="bg-[#27292C] rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">User Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Name</p>
                                    <p className="text-lg font-medium">
                                        {user.fullName || user.name || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="text-lg font-medium">{user.email || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Role</p>
                                    <p className="text-lg font-medium">{user.role || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Current Balance</p>
                                    <p className="text-lg font-medium">
                                        ${parseFloat(user.balance || 0).toFixed(2)}
                                    </p>
                                </div>
                                {user.location && (
                                    <div>
                                        <p className="text-sm text-gray-400">Location</p>
                                        <p className="text-lg font-medium">{user.location}</p>
                                    </div>
                                )}
                                {user.role === "INDIVIDUAL" && user.category && (
                                    <div>
                                        <p className="text-sm text-gray-400">Category</p>
                                        <p className="text-lg font-medium">{user.category || "N/A"}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm text-gray-400">User ID</p>
                                    <p className="text-lg font-mono text-sm">{user.id || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Account Status</p>
                                    <p className="text-lg font-medium">
                                        {user.isBlocked ? (
                                            <span className="text-red-400">Blocked</span>
                                        ) : (
                                            <span className="text-green-400">Active</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bank Information */}
                        <div className="bg-[#27292C] rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Bank Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-400">Account Holder Name</p>
                                    <p className="text-lg font-medium">{withdrawal.accountName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">IBAN</p>
                                    <p className="text-lg font-mono">{withdrawal.iban}</p>
                                </div>
                            </div>
                        </div>

                        {/* Request Details */}
                        <div className="bg-[#27292C] rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Request Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-400">Request Date</p>
                                    <p className="text-lg font-medium">
                                        {new Date(withdrawal.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                {withdrawal.reservedAt && (
                                    <div>
                                        <p className="text-sm text-gray-400">Reserved Date</p>
                                        <p className="text-lg font-medium">
                                            {new Date(withdrawal.reservedAt).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                                {withdrawal.approvedAt && (
                                    <div>
                                        <p className="text-sm text-gray-400">Approved Date</p>
                                        <p className="text-lg font-medium">
                                            {new Date(withdrawal.approvedAt).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                                {withdrawal.approvedBy && (
                                    <div>
                                        <p className="text-sm text-gray-400">Approved By</p>
                                        <p className="text-lg font-medium font-mono text-sm">
                                            {withdrawal.approvedBy}
                                        </p>
                                    </div>
                                )}
                                {withdrawal.rejectedAt && (
                                    <div>
                                        <p className="text-sm text-gray-400">Rejected Date</p>
                                        <p className="text-lg font-medium">
                                            {new Date(withdrawal.rejectedAt).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                                {withdrawal.rejectedBy && (
                                    <div>
                                        <p className="text-sm text-gray-400">Rejected By</p>
                                        <p className="text-lg font-medium font-mono text-sm">
                                            {withdrawal.rejectedBy}
                                        </p>
                                    </div>
                                )}
                                {withdrawal.processedAt && (
                                    <div>
                                        <p className="text-sm text-gray-400">Processed Date</p>
                                        <p className="text-lg font-medium">
                                            {new Date(withdrawal.processedAt).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                                {withdrawal.processedBy && (
                                    <div>
                                        <p className="text-sm text-gray-400">Processed By</p>
                                        <p className="text-lg font-medium font-mono text-sm">
                                            {withdrawal.processedBy}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Admin Notes */}
                        {withdrawal.adminNotes && (
                            <div className="bg-[#27292C] rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4">Admin Notes</h2>
                                <p className="text-gray-300 whitespace-pre-wrap">
                                    {withdrawal.adminNotes}
                                </p>
                            </div>
                        )}
                    </div>
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
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#27292C] rounded-lg p-6 w-full max-w-md"
                        >
                            <h2 className="text-2xl font-bold mb-4">Edit Withdrawal</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
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
                                        className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white"
                                        disabled={withdrawal.status === "REJECTED" || withdrawal.status === "PROCESSED"}
                                    >
                                        {withdrawal.status === "PENDING" && (
                                            <>
                                                <option value="PENDING">Pending</option>
                                                <option value="APPROVED">Approved</option>
                                                <option value="REJECTED">Rejected</option>
                                            </>
                                        )}
                                        {withdrawal.status === "APPROVED" && (
                                            <>
                                                <option value="APPROVED">Approved</option>
                                                <option value="PROCESSED">Processed</option>
                                            </>
                                        )}
                                        {(withdrawal.status === "REJECTED" || withdrawal.status === "PROCESSED") && (
                                            <option value={withdrawal.status}>
                                                {withdrawal.status}
                                            </option>
                                        )}
                                    </select>
                                </div>

                                {withdrawal.status === "PENDING" && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
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
                                            className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">
                                            Minimum: $50 | Maximum: $50,000
                                        </p>
                                        {editForm.amount && parseFloat(editForm.amount) !== withdrawal.amount && (
                                            <p className="text-xs text-yellow-400 mt-1">
                                                Amount will change from ${withdrawal.amount} to ${editForm.amount}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium mb-2">
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
                                        className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
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
                                        className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white"
                                    />
                                </div>

                                {withdrawal.status === "PENDING" && editForm.status === "APPROVED" && (
                                    <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-3 text-sm text-yellow-400">
                                        Warning: Approving this request will deduct ${withdrawal.amount} from the user's balance.
                                    </div>
                                )}
                                {withdrawal.status === "PENDING" && editForm.status === "REJECTED" && (
                                    <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-3 text-sm text-blue-400">
                                        Note: Rejecting this request will release the reserved balance back to the user.
                                    </div>
                                )}
                                {withdrawal.status === "APPROVED" && editForm.status === "PROCESSED" && (
                                    <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3 text-sm text-green-400">
                                        Note: Balance has already been deducted. This will mark the withdrawal as completed.
                                    </div>
                                )}

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        disabled={isUpdating}
                                        className="flex-1 bg-blue-primary hover:bg-blue-600 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                                    >
                                        {isUpdating ? "Updating..." : "Update"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PayoutDetail;
