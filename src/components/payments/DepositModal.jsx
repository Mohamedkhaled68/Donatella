import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCreateDeposit from "../../hooks/payments/useCreateDeposit";
import toast from "react-hot-toast";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";

const DepositModal = ({ isOpen, onClose }) => {
    const { userStatus } = useUserStore((state) => state);
    const navigate = useNavigate();
    const { mutateAsync: createDeposit, isPending } = useCreateDeposit();
    const [formData, setFormData] = useState({
        amount: "",
        paymentMethod: "VISA", // Default to credit card (VISA/MASTERCARD share same entityId)
        email: userStatus?.verifiedEmail || "",
        givenName: "",
        surname: "",
        street: "",
        city: "",
        state: "",
        country: "SA",
        postcode: "",
        currency: "SAR",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data before submitting
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        if (!formData.email || !formData.email.includes('@')) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (!formData.givenName || !formData.surname) {
            toast.error("Please enter your full name");
            return;
        }

        if (!formData.street || !formData.city || !formData.state || !formData.postcode) {
            toast.error("Please complete all billing address fields");
            return;
        }

        try {
            const response = await createDeposit({
                ...formData,
                amount: parseFloat(formData.amount),
            });

            if (response?.status && response?.data?.id) {
                const checkoutId = response.data.id;
                
                // Store payment method in localStorage for callback page
                localStorage.setItem(`paymentMethod_${checkoutId}`, formData.paymentMethod);
                
                // Redirect to payment iframe - use backend URL
                // Extract base URL from baseUrl (remove /api/v1)
                const backendBaseUrl = baseUrl.replace('/api/v1', '');
                const iframeUrl = `${backendBaseUrl}/api/v1/payments/iframe/${checkoutId}`;
                const paymentWindow = window.open(
                    iframeUrl,
                    "_blank",
                    "width=800,height=600,scrollbars=yes"
                );

                if (!paymentWindow) {
                    toast.error("Please allow popups to proceed with payment");
                    return;
                }

                // Monitor if payment window is closed
                const checkClosed = setInterval(() => {
                    if (paymentWindow.closed) {
                        clearInterval(checkClosed);
                        // Navigate to callback page to check status
                        navigate(`/payments/callback/${checkoutId}?status=pending`);
                    }
                }, 1000);

                toast.success("Redirecting to payment...");
                onClose();
            } else {
                toast.error(response?.message || "Failed to create deposit");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 
                                error?.message || 
                                "Failed to create deposit. Please try again.";
            toast.error(errorMessage);
            console.error("Deposit error:", error);
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
                        <h2 className="text-2xl font-bold">Deposit Funds</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Amount (SAR)
                            </label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                min="1"
                                step="0.01"
                                required
                                className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                placeholder="Enter amount"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Email
                            </label>
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
                                <label className="block text-sm font-medium mb-2">
                                    First Name
                                </label>
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
                                <label className="block text-sm font-medium mb-2">
                                    Last Name
                                </label>
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
                            <label className="block text-sm font-medium mb-2">
                                Street Address
                            </label>
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
                                <label className="block text-sm font-medium mb-2">
                                    City
                                </label>
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
                                <label className="block text-sm font-medium mb-2">
                                    State
                                </label>
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
                                <label className="block text-sm font-medium mb-2">
                                    Postal Code
                                </label>
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
                                <label className="block text-sm font-medium mb-2">
                                    Country
                                </label>
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
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex-1 bg-blue-primary hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition disabled:opacity-50"
                            >
                                {isPending ? "Processing..." : "Continue to Payment"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DepositModal;
