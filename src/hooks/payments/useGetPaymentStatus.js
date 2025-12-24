import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const useGetPaymentStatus = (checkoutId, paymentMethod = "MASTERCARD", options = {}) => {
    return useQuery({
        queryKey: ["payments", "status", checkoutId, paymentMethod],
        queryFn: async () => {
            if (!checkoutId) {
                throw new Error("Checkout ID is required");
            }

            const params = new URLSearchParams();
            if (paymentMethod) {
                params.append("paymentMethod", paymentMethod);
            }

            const response = await axios.get(
                `${baseUrl}/payments/status/${checkoutId}?${params.toString()}`
            );

            return response.data.data;
        },
        enabled: !!checkoutId && (options.enabled !== false),
        refetchInterval: options.refetchInterval || (options.autoPoll ? 3000 : false),
        retry: options.retry !== undefined ? options.retry : 3,
        retryDelay: options.retryDelay || 1000,
        ...options,
    });
};

export default useGetPaymentStatus;



