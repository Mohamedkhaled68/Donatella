import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import useCreateWithdrawal from "../../hooks/payments/useCreateWithdrawal";
import useGetBalance from "../../hooks/payments/useGetBalance";
import { useI18n } from "../../hooks/useI18n";

const WithdrawalModal = ({ isOpen, onClose, onSuccess }) => {
	const { t } = useI18n();
	const { mutateAsync: createWithdrawal, isPending } = useCreateWithdrawal();
	const { mutateAsync: getBalance } = useGetBalance();
	const [balance, setBalance] = useState(0);
	const [formData, setFormData] = useState({
		amount: "",
		iban: "",
		accountName: "",
	});

	const fetchBalance = async () => {
		try {
			const balanceData = await getBalance();
			// Use availableBalance if provided, otherwise fallback to balance
			setBalance(balanceData?.availableBalance ?? balanceData?.balance ?? 0);
		} catch (error) {
			console.error("Failed to fetch balance:", error);
		}
	};

	useEffect(() => {
		if (isOpen) {
			fetchBalance();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, fetchBalance]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const amount = parseFloat(formData.amount);
		const MIN_AMOUNT = 50;
		const MAX_AMOUNT = 50000;

		if (!amount || amount <= 0) {
			toast.error(t("payments.pleaseEnterValidAmount"));
			return;
		}

		if (amount < MIN_AMOUNT) {
			toast.error(t("payments.minimumWithdrawalAmount"));
			return;
		}

		if (amount > MAX_AMOUNT) {
			toast.error(t("payments.maximumWithdrawalAmount"));
			return;
		}

		if (amount > balance) {
			toast.error(t("payments.insufficientBalance"));
			return;
		}

		if (!formData.accountName.trim()) {
			toast.error(t("payments.pleaseEnterAccountName"));
			return;
		}

		try {
			await createWithdrawal({
				amount,
				iban: formData.iban.replace(/\s/g, "").toUpperCase(),
				accountName: formData.accountName,
			});

			toast.success(t("payments.withdrawalSubmittedSuccessfully"));
			onSuccess?.();
			onClose();
			setFormData({ amount: "", iban: "", accountName: "" });
		} catch (error) {
			toast.error(error?.message || t("payments.failedToCreateWithdrawal"));
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const modalContent = (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						className="bg-[#27292C] rounded-lg w-full max-w-md text-white flex flex-col max-h-[90vh]"
					>
						<div className="flex justify-between items-center p-6 pb-4 flex-shrink-0">
							<h2 className="text-2xl font-bold">{t("payments.requestWithdrawal")}</h2>
							<button
								onClick={onClose}
								className="text-gray-400 hover:text-white"
							>
								✕
							</button>
						</div>

						<div className="overflow-y-auto px-6 flex-1">
							<div className="mb-4 space-y-2">
								<div className="p-3 bg-[#1a1a1a] rounded-lg">
									<p className="text-sm text-gray-400">{t("payments.availableBalance")}</p>
									<p className="text-2xl font-bold">${balance.toFixed(2)}</p>
								</div>
								<div className="text-xs text-gray-400 px-1">{t("payments.minimumMaximum")}</div>
							</div>

							<form
								onSubmit={handleSubmit}
								className="space-y-4 pb-4"
							>
								<div>
									<label className="block text-sm font-medium mb-2">{t("payments.amountDollars")}</label>
									<input
										type="number"
										name="amount"
										value={formData.amount}
										onChange={handleChange}
										min="50"
										step="0.01"
										max={Math.min(balance, 50000)}
										required
										className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
										placeholder={t("payments.enterAmountRange")}
									/>
									{formData.amount && parseFloat(formData.amount) > balance && (
										<p className="text-red-400 text-xs mt-1">{t("payments.amountExceedsBalance")}</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">{t("payments.iban")}</label>
									<input
										type="text"
										name="iban"
										value={formData.iban}
										onChange={handleChange}
										required
										className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 uppercase"
										placeholder="SA1234567890123456789012"
										maxLength={34}
									/>
									<p className="text-xs text-gray-400 mt-1">{t("payments.enterBankIban")}</p>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">{t("payments.accountHolderName")}</label>
									<input
										type="text"
										name="accountName"
										value={formData.accountName}
										onChange={handleChange}
										required
										className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
										placeholder={t("payments.enterAccountHolderName")}
									/>
								</div>

								<div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-3 text-sm text-yellow-400">
									<p>{t("payments.withdrawalReviewWarning")}</p>
								</div>

								<div className="flex gap-4 pt-4">
									<button
										type="button"
										onClick={onClose}
										className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition"
									>
										{t("payments.cancel")}
									</button>
									<button
										type="submit"
										disabled={isPending || parseFloat(formData.amount) > balance}
										className="flex-1 bg-blue-primary hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition disabled:opacity-50"
									>
										{isPending ? t("payments.submitting") : t("payments.submitRequest")}
									</button>
								</div>
							</form>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);

	return createPortal(modalContent, document.body);
};

export default WithdrawalModal;
