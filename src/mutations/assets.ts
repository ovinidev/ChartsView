/* eslint-disable @typescript-eslint/no-explicit-any */
import { ASSETS } from "@constants/entities";
import { Asset } from "@interfaces/assets";
import { useAssets } from "@queries/assets";
import { queryClient } from "@services/queryClient";
import { useMutation } from "@tanstack/react-query";

export interface AssetProps {
	name: string;
	status: string;
	healthscore: number;
}

export const useCreateAsset = () => {
	return useMutation(
		async (data: AssetProps) => {
			return {
				id: Math.random(),
				name: data.name,
				status: data.status,
				healthscore: data.healthscore,
			};
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData([ASSETS], (prevData: any) => [
					...prevData,
					data,
				]);
			},
		},
	);
};

interface UseUpdateAssetProps {
	assetData: Asset;
}

export const useUpdateAsset = ({ assetData }: UseUpdateAssetProps) => {
	const { data: assets } = useAssets({ name: "" });

	return useMutation(
		async (data: Asset) => {
			return {
				...assetData,
				name: data.name ? data.name : assetData.name,
				status: data.status ? data.status : assetData.status,
				healthscore: data.healthscore
					? data.healthscore
					: assetData.healthscore,
			};
		},
		{
			onSuccess: (data) => {
				const assetToEditIndex = assets?.findIndex(
					(asset) => asset.id === assetData.id,
				);

				if (assets && assetToEditIndex !== undefined) {
					assets[assetToEditIndex] = data;

					queryClient.setQueryData([ASSETS], () => assets);
				}
			},
		},
	);
};

export const useDeleteAsset = () => {
	const { data: assets } = useAssets({ name: "" });

	return useMutation(async (data: Asset) => data, {
		onSuccess: (data) => {
			const assetsNotBeDelete = assets?.filter((asset) => asset.id !== data.id);

			queryClient.setQueryData([ASSETS], () => assetsNotBeDelete);
		},
	});
};
