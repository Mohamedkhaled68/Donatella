import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useGetPaymentStatus from "../../hooks/payments/useGetPaymentStatus";
import useGetBalance from "../../hooks/payments/useGetBalance";
import useGetPaymentHistory from "../../hooks/payments/useGetPaymentHistory";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Footer } from "../../components";

const PaymentCallback = () => {
    const { checkoutId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const initialStatus = searchParams.get("status");
    const paymentMethod = localStorage.getItem(`paymentMethod_${checkoutId}`) || "MASTERCARD";
    
    const [paymentStatus, setPaymentStatus] = useState(initialStatus || "pending");
    const [polling, setPolling] = useState(initialStatus === "pending" || !initialStatus);
    
    const { mutateAsync: getBalance } = useGetBalance();
    const { refetch: refetchPaymentHistory } = useGetPaymentHistory({});
    
    const { data: statusData, isLoading, error } = useGetPaymentStatus(
        checkoutId,
        paymentMethod,
        {
            enabled: polling && !!checkoutId,
            autoPoll: polling,
            refetchInterval: polling ? 3000 : false,
        }
    );

    // Handle status updates from payment status data
    useEffect(() => {
        if (statusData?.result) {
            const result = statusData.result;
            const resultCode = result.code;
            
            // Validate that payment was actually submitted
            // If no result code, payment hasn't been submitted yet
            if (!resultCode) {
                console.log("Payment not yet submitted - no result code");
                return;
            }
            
            let newStatus = "pending";
            
            // Only mark as success if result code starts with '000' AND payment details exist
            // Result codes starting with '100.3' or '100.4' are rejections/failures
            if (resultCode.startsWith("000")) {
                // Additional validation: ensure payment was actually processed
                const paymentType = result.paymentType;
                const amount = result.amount;
                
                if (paymentType && amount) {
                    newStatus = "success";
                    setPolling(false);
                } else {
                    console.warn("Payment has success code but missing payment details");
                    newStatus = "pending";
                }
            } else if (resultCode.startsWith("100.3") || resultCode.startsWith("100.4") || resultCode.startsWith("100.5")) {
                // 100.3xx, 100.4xx, 100.5xx are rejection codes (failures)
                newStatus = "error";
                setPolling(false);
            } else if (resultCode.startsWith("100") || resultCode.startsWith("200")) {
                // Other 100.x codes and 200.x codes are pending
                newStatus = "pending";
            } else {
                newStatus = "error";
                setPolling(false);
            }
            
            if (newStatus !== paymentStatus) {
                setPaymentStatus(newStatus);
            }
        }
    }, [statusData, paymentStatus]);

    // Handle success status
    useEffect(() => {
        if (paymentStatus === "success") {
            const handleSuccess = async () => {
                try {
                    // Refresh balance and payment history
                    await getBalance();
                    await refetchPaymentHistory();
                    queryClient.invalidateQueries({ queryKey: ["payments"] });
                    
                    toast.success("Payment successful! Your balance has been updated.");
                    
                    // Redirect after 3 seconds
                    setTimeout(() => {
                        navigate("/payments", { replace: true });
                    }, 3000);
                } catch (error) {
                    console.error("Error refreshing data:", error);
                }
            };
            handleSuccess();
        }
    }, [paymentStatus, getBalance, refetchPaymentHistory, queryClient, navigate]);

    // Handle error status
    useEffect(() => {
        if (paymentStatus === "error") {
            toast.error("Payment failed. Please try again.");
            
            // Redirect after 3 seconds
            setTimeout(() => {
                navigate("/payments", { replace: true });
            }, 3000);
        }
    }, [paymentStatus, navigate]);

    useEffect(() => {
        // Clean up localStorage
        if (checkoutId) {
            localStorage.removeItem(`paymentMethod_${checkoutId}`);
        }
    }, [checkoutId]);

    const getStatusIcon = () => {
        switch (paymentStatus) {
            case "success":
                return (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center"
                    >
                        <svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </motion.div>
                );
            case "error":
                return (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center"
                    >
                        <svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </motion.div>
                );
            default:
                return (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full"
                    />
                );
        }
    };

    const getStatusMessage = () => {
        switch (paymentStatus) {
            case "success":
                return {
                    title: "Payment Successful!",
                    message: "Your deposit has been processed successfully. Redirecting to payments page...",
                };
            case "error":
                return {
                    title: "Payment Failed",
                    message: "There was an error processing your payment. Please try again. Redirecting to payments page...",
                };
            default:
                return {
                    title: "Processing Payment",
                    message: "Please wait while we verify your payment status...",
                };
        }
    };

    const statusInfo = getStatusMessage();

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-[#121417] text-white p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#27292C] rounded-lg p-8 max-w-md w-full text-center space-y-6"
                >
                    <div className="flex justify-center">{getStatusIcon()}</div>
                    
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">{statusInfo.title}</h2>
                        <p className="text-gray-400">{statusInfo.message}</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-sm text-red-400">
                            {error.message || "An error occurred while checking payment status"}
                        </div>
                    )}

                    {polling && paymentStatus === "pending" && (
                        <div className="text-sm text-gray-400">
                            Checking payment status...
                        </div>
                    )}

                    {paymentStatus !== "pending" && (
                        <button
                            onClick={() => navigate("/payments", { replace: true })}
                            className="w-full bg-blue-primary hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition font-semibold"
                        >
                            Go to Payments
                        </button>
                    )}
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentCallback;

