import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import useCreateDeposit from "../../hooks/payments/useCreateDeposit";
import { useI18n } from "../../hooks/useI18n";
import { useUserStore } from "../../store/userStore";

const DepositModal = ({ isOpen, onClose }) => {
	const { t } = useI18n();
	const { userStatus } = useUserStore((state) => state);
	const { mutateAsync: createDeposit, isPending } = useCreateDeposit();
	const [formData, setFormData] = useState({
		amount: "",
		paymentMethod: "MASTERCARD",
		email: userStatus?.verifiedEmail || "",
		givenName: "",
		surname: "",
		street: "",
		city: "",
		state: "",
		country: "SA",
		postcode: "",
		currency: "USD",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.amount || parseFloat(formData.amount) <= 0) {
			toast.error(t("payments.pleaseEnterValidAmount"));
			return;
		}

		try {
			const response = await createDeposit({
				...formData,
				amount: parseFloat(formData.amount),
			});

			if (response?.status && response?.data?.id) {
				// Redirect to payment iframe
				const iframeUrl = `${window.location.origin}/api/v1/payments/iframe/${response.data.id}`;
				window.open(iframeUrl, "_blank", "width=800,height=600");
				toast.success(t("payments.redirectingToPayment"));
				onClose();
			} else {
				toast.error(response?.message || t("payments.failedToCreateDeposit"));
			}
		} catch (error) {
			toast.error(error?.message || t("payments.failedToCreateDeposit"));
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
							<h2 className="text-2xl font-bold">{t("payments.depositFunds")}</h2>
							<button
								onClick={onClose}
								className="text-gray-400 hover:text-white"
							>
								✕
							</button>
						</div>

						<div className="overflow-y-auto px-6 flex-1">
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
										min="1"
										step="0.01"
										required
										className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
										placeholder={t("payments.enterAmount")}
									/>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">{t("payments.paymentMethod")}</label>
									<select
										name="paymentMethod"
										value={formData.paymentMethod}
										onChange={handleChange}
										required
										className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
									>
										<option value="MASTERCARD">Mastercard</option>
										<option value="VISA">Visa</option>
										<option value="MADA">MADA</option>
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">{t("payments.email")}</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
										className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium mb-2">{t("payments.firstName")}</label>
										<input
											type="text"
											name="givenName"
											value={formData.givenName}
											onChange={handleChange}
											required
											className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-2">{t("payments.lastName")}</label>
										<input
											type="text"
											name="surname"
											value={formData.surname}
											onChange={handleChange}
											required
											className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">{t("payments.streetAddress")}</label>
									<input
										type="text"
										name="street"
										value={formData.street}
										onChange={handleChange}
										required
										className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium mb-2">{t("payments.city")}</label>
										<input
											type="text"
											name="city"
											value={formData.city}
											onChange={handleChange}
											required
											className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-2">{t("payments.state")}</label>
										<input
											type="text"
											name="state"
											value={formData.state}
											onChange={handleChange}
											required
											className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium mb-2">{t("payments.postalCode")}</label>
										<input
											type="text"
											name="postcode"
											value={formData.postcode}
											onChange={handleChange}
											required
											className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-2">{t("payments.country")}</label>
										<input
											type="text"
											name="country"
											value={formData.country}
											onChange={handleChange}
											required
											className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
										/>
									</div>
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
										disabled={isPending}
										className="flex-1 bg-blue-primary hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition disabled:opacity-50"
									>
										{isPending ? t("payments.processing") : t("payments.continueToPayment")}
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

export default DepositModal;
