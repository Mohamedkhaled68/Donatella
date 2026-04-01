import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../../store/userTokenStore";
import { baseUrl } from "../../utils/baseUrl";

const useGetIndividuals = () => {
	const token = useAuthStore((state) => state.authToken);
	return useMutation({
		mutationKey: ["explore", "individuals"],
		mutationFn: async ([category, searchKey]) => {
			const response = await axios.get(
				`${baseUrl}/individuals?paginate[page]=1&paginate[limit]=15&filter[individualCategory]=${category}&filter[searchKey]=${searchKey}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);

			return response.data.data;
		},
		onSuccess: () => {},
		onError: (error) => {
			console.error("Mutation failed:", error);
		},
	});
};

export default useGetIndividuals;
