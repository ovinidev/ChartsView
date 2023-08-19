import { getAssetById, getAssets } from "@api/assets";
import { ASSETS } from "@constants/entities";
import { STALE_TIME } from "@constants/staleTime";
import { useQuery } from "@tanstack/react-query";

export const useAssets = () => {
	return useQuery(
		[ASSETS],
		async () => {
			const data = await getAssets();

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};

export const useAssetById = (id: string) => {
	return useQuery(
		[ASSETS],
		async () => {
			const data = await getAssetById(id);

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};
