import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCreateWithdrawal from "../../hooks/payments/useCreateWithdrawal";
import useGetBalance from "../../hooks/payments/useGetBalance";
import toast from "react-hot-toast";

const WithdrawalModal = ({ isOpen, onClose, onSuccess }) => {
    const { mutateAsync: createWithdrawal, isPending } = useCreateWithdrawal();
    const { mutateAsync: getBalance } = useGetBalance();
    const [balance, setBalance] = useState(0);
    const [formData, setFormData] = useState({
        amount: "",
        iban: "",
        accountName: "",
    });

    useEffect(() => {
        if (isOpen) {
            fetchBalance();
        }
    }, [isOpen]);

    const fetchBalance = async () => {
        try {
            const balanceData = await getBalance();
            // Use availableBalance if provided, otherwise fallback to balance
            setBalance(balanceData?.availableBalance ?? balanceData?.balance ?? 0);
        } catch (error) {
            console.error("Failed to fetch balance:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const amount = parseFloat(formData.amount);
        const MIN_AMOUNT = 50;
        const MAX_AMOUNT = 50000;

        if (!amount || amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        if (amount < MIN_AMOUNT) {
            toast.error(`Minimum withdrawal amount is $${MIN_AMOUNT}`);
            return;
        }

        if (amount > MAX_AMOUNT) {
            toast.error(`Maximum withdrawal amount is $${MAX_AMOUNT}`);
            return;
        }

        if (amount > balance) {
            toast.error("Insufficient available balance");
            return;
        }

        if (!formData.accountName.trim()) {
            toast.error("Please enter account name");
            return;
        }

        try {
            await createWithdrawal({
                amount,
                iban: formData.iban.replace(/\s/g, "").toUpperCase(),
                accountName: formData.accountName,
            });

            toast.success("Withdrawal request submitted successfully");
            onSuccess?.();
            onClose();
            setFormData({ amount: "", iban: "", accountName: "" });
        } catch (error) {
            toast.error(error?.message || "Failed to create withdrawal request");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-[#27292C] rounded-lg p-6 w-full max-w-md text-white"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Request Withdrawal</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="mb-4 space-y-2">
                        <div className="p-3 bg-[#1a1a1a] rounded-lg">
                            <p className="text-sm text-gray-400">Available Balance</p>
                            <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
                        </div>
                        <div className="text-xs text-gray-400 px-1">
                            Minimum: $50 | Maximum: $50,000
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Amount ($)
                            </label>
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
                                placeholder="Enter amount ($50 - $50,000)"
                            />
                            {formData.amount && parseFloat(formData.amount) > balance && (
                                <p className="text-red-400 text-xs mt-1">
                                    Amount exceeds available balance
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                IBAN
                            </label>
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
                            <p className="text-xs text-gray-400 mt-1">
                                Enter your bank account IBAN
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Account Holder Name
                            </label>
                            <input
                                type="text"
                                name="accountName"
                                value={formData.accountName}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                placeholder="Enter account holder name"
                            />
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-3 text-sm text-yellow-400">
                            <p>
                                Your withdrawal request will be reviewed by our admin team.
                                Processing typically takes 1-3 business days.
                            </p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending || parseFloat(formData.amount) > balance}
                                className="flex-1 bg-blue-primary hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition disabled:opacity-50"
                            >
                                {isPending ? "Submitting..." : "Submit Request"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default WithdrawalModal;
