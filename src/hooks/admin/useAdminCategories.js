import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";

export const useAdminGetCategories = () => {
    const token = useAuthStore((state) => state.authToken);

    return useQuery({
        queryKey: ["admin", "categories"],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/admin/categories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },
        enabled: !!token,
    });
};

export const useAdminCreateCategory = () => {
    const token = useAuthStore((state) => state.authToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["admin", "categories", "create"],
        mutationFn: async (data) => {
            const response = await axios.post(
                `${baseUrl}/admin/categories`,
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
            queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const useAdminUpdateCategory = () => {
    const token = useAuthStore((state) => state.authToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["admin", "categories", "update"],
        mutationFn: async ({ id, data }) => {
            const response = await axios.put(
                `${baseUrl}/admin/categories/${id}`,
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
            queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const useAdminUpdateCategoryStatus = () => {
    const token = useAuthStore((state) => state.authToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["admin", "categories", "update-status"],
        mutationFn: async ({ name, isEnabled }) => {
            const response = await axios.patch(
                `${baseUrl}/admin/categories/${name}`,
                { isEnabled },
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
            queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const useAdminDeleteCategory = () => {
    const token = useAuthStore((state) => state.authToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["admin", "categories", "delete"],
        mutationFn: async (id) => {
            const response = await axios.delete(
                `${baseUrl}/admin/categories/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

