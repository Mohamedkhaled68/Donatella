import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import useAuthStore from "../../store/userTokenStore";

export const useGetCurrentUser = () => {
    const token = useAuthStore((state) => state.authToken);

    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await axios.get(`${baseUrl}/auth`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.data;
        },
    });
};

export default useGetCurrentUser;
