import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";

export const useGetEnabledCategories = (lang = "en") => {
    return useQuery({
        queryKey: ["categories", "enabled", lang],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/categories?lang=${lang}`);
            return response.data.data;
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });
};


