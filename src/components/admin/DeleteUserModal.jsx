import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const DeleteUserModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 z-[50000] flex justify-center items-center"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#27292C] rounded-lg p-6 max-w-md w-full mx-4"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Delete User
                    </h2>
                    <p className="text-white/70 mb-6">
                        Are you sure you want to delete this user? This action
                        cannot be undone.
                    </p>
                    <div className="flex space-x-4">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DeleteUserModal;
