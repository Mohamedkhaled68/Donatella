import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

const useAdminUsers = (paginate = { page: 1, limit: 20 }, filters = {}) => {
    const token = useAuthStore((state) => state.authToken);

    return useQuery({
        queryKey: ["admin", "users", paginate, filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            
            // Add pagination as nested query params
            params.append("paginate[page]", paginate.page?.toString() || "1");
            params.append("paginate[limit]", paginate.limit?.toString() || "20");
            
            // Add filter as nested query params
            if (filters.searchKey) {
                params.append("filter[searchKey]", filters.searchKey);
            }
            if (filters.role) {
                params.append("filter[role]", filters.role);
            }
            if (filters.individualCategory) {
                params.append("filter[individualCategory]", filters.individualCategory);
            }
            if (filters.isBlocked !== undefined) {
                params.append("filter[isBlocked]", filters.isBlocked.toString());
            }
            if (filters.onboardingCompleted !== undefined) {
                params.append("filter[onboardingCompleted]", filters.onboardingCompleted.toString());
            }

            const response = await axios.get(
                `${baseUrl}/admin/users?${params.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        },
        enabled: !!token,
    });
};

export const useAdminGetUser = (userId) => {
    const token = useAuthStore((state) => state.authToken);

    return useQuery({
        queryKey: ["admin", "users", userId],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },
        enabled: !!token && !!userId,
    });
};

export const useAdminUpdateUser = () => {
    const token = useAuthStore((state) => state.authToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["admin", "users", "update"],
        mutationFn: async ({ userId, data }) => {
            const response = await axios.patch(
                `${baseUrl}/admin/users/${userId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
        },
    });
};

export const useAdminDeleteUser = () => {
    const token = useAuthStore((state) => state.authToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["admin", "users", "delete"],
        mutationFn: async (userId) => {
            const response = await axios.delete(`${baseUrl}/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
        },
    });
};

export const useAdminCreateUser = () => {
    const token = useAuthStore((state) => state.authToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["admin", "users", "create"],
        mutationFn: async (data) => {
            const response = await axios.post(
                `${baseUrl}/admin/users`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
        },
    });
};

export default useAdminUsers;

