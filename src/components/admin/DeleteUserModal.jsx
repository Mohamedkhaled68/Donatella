import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "../../hooks/useI18n";

const DeleteUserModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
	const { t } = useI18n();

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
					<h2 className="text-2xl font-bold text-white mb-4">{t("admin.deleteUser.title")}</h2>
					<p className="text-white/70 mb-6">{t("admin.deleteUser.message")}</p>
					<div className="flex space-x-4">
						<button
							onClick={onClose}
							disabled={isLoading}
							className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{t("admin.deleteUser.cancel")}
						</button>
						<button
							onClick={onConfirm}
							disabled={isLoading}
							className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? t("admin.deleteUser.deleting") : t("admin.deleteUser.delete")}
						</button>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default DeleteUserModal;
