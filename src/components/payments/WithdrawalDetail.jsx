import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useGetWithdrawalHistory from "../../hooks/payments/useGetWithdrawalHistory";
import { Loading } from "../";

const WithdrawalDetail = ({ withdrawal, isOpen, onClose }) => {
    const { data: history, isLoading } = useGetWithdrawalHistory(
        isOpen ? withdrawal?.id : null
    );

    const getActionLabel = (action) => {
        switch (action) {
            case "UPDATE_WITHDRAWAL_STATUS":
                return "Status Changed";
            case "UPDATE_WITHDRAWAL_AMOUNT":
                return "Amount Changed";
            case "UPDATE_PROCESSED_AMOUNT":
                return "Processed Amount Updated";
            case "ADD_ADMIN_NOTES":
                return "Admin Notes Added";
            case "PROCESS_WITHDRAWAL":
                return "Withdrawal Processed";
            case "REJECT_WITHDRAWAL":
                return "Withdrawal Rejected";
            default:
                return action;
        }
    };

    const formatChange = (action, previousValue, newValue) => {
        if (action === "UPDATE_WITHDRAWAL_AMOUNT") {
            const prevAmount = previousValue?.amount 
                ? (typeof previousValue.amount === 'number' 
                    ? previousValue.amount 
                    : parseFloat(previousValue.amount) || 0)
                : 0;
            const newAmount = newValue?.amount 
                ? (typeof newValue.amount === 'number' 
                    ? newValue.amount 
                    : parseFloat(newValue.amount) || 0)
                : 0;
            return `$${prevAmount.toFixed(2)} → $${newAmount.toFixed(2)}`;
        }
        if (action === "UPDATE_WITHDRAWAL_STATUS") {
            return `${previousValue?.status || "N/A"} → ${newValue?.status || "N/A"}`;
        }
        if (action === "UPDATE_PROCESSED_AMOUNT") {
            const processedAmt = newValue?.processedAmount 
                ? (typeof newValue.processedAmount === 'number' 
                    ? newValue.processedAmount 
                    : parseFloat(newValue.processedAmount) || 0)
                : 0;
            return `$${processedAmt.toFixed(2)}`;
        }
        if (action === "ADD_ADMIN_NOTES") {
            return newValue?.adminNotes || "Notes added";
        }
        return "Updated";
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-[#27292C] rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-white"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Withdrawal Details</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Withdrawal Info */}
                    <div className="space-y-4 mb-6">
                        <div className="bg-[#1a1a1a] rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Amount</p>
                                    <p className="text-xl font-bold">
                                        ${parseFloat(withdrawal.amount || 0).toFixed(2)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Status</p>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            withdrawal.status === "PROCESSED"
                                                ? "bg-green-500/20 text-green-400 border border-green-500/50"
                                                : withdrawal.status === "APPROVED"
                                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                                                : withdrawal.status === "REJECTED"
                                                ? "bg-red-500/20 text-red-400 border border-red-500/50"
                                                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                                        }`}
                                    >
                                        {withdrawal.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">IBAN</p>
                                    <p className="text-sm font-mono">
                                        {withdrawal.iban
                                            ?.replace(/(.{4})/g, "$1 ")
                                            .trim()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Account Name</p>
                                    <p className="text-sm">{withdrawal.accountName}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Transaction History</h3>
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <Loading />
                            </div>
                        ) : history && history.length > 0 ? (
                            <div className="space-y-3">
                                {history.map((entry, index) => (
                                    <div
                                        key={entry.id}
                                        className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-blue-500"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm">
                                                    {getActionLabel(entry.action)}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {formatChange(
                                                        entry.action,
                                                        entry.previousValue,
                                                        entry.newValue
                                                    )}
                                                </p>
                                                {entry.description && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {entry.description}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400">
                                                    {new Date(entry.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                No transaction history available
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default WithdrawalDetail;
