import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

const useGetNotifications = (page = 1, limit = 15) => {
    const token = useAuthStore((state) => state.authToken);

    return useQuery({
        queryKey: ["notifications", page, limit],
        queryFn: async () => {
            const url = `${baseUrl}/notifications?paginate[page]=${page}&paginate[limit]=${limit}`;
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.data;
        },
        staleTime: 1000 * 30, // Cache for 30 seconds
        retry: 1,
    });
};

export default useGetNotifications;

