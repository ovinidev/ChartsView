import { getAssetById, getAssets } from "@api/assets";
import { ASSETS } from "@constants/entities";
import { STALE_TIME } from "@constants/staleTime";
import { useQuery } from "@tanstack/react-query";

interface UseAssetsProps {
	name: string;
}

export const useAssets = ({ name }: UseAssetsProps) => {
	return useQuery(
		[ASSETS],
		async () => {
			const data = await getAssets();

			return data;
		},
		{
			staleTime: STALE_TIME,
			select: (item) =>
				item.filter((asset) => {
					if (name.length === 0) return asset;
					return asset.name
						.toLocaleLowerCase()
						.startsWith(name.toLocaleLowerCase());
				}),
		},
	);
};

export const useAssetById = (id: string) => {
	return useQuery(
		[ASSETS, { id }],
		async () => {
			const data = await getAssetById(id);

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};
