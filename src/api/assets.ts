import { Asset } from "@interfaces/assets";
import { axiosInstance } from "./axiosInstance";
import { ASSETS } from "@constants/entities";

export const getAssets = async () => {
	const { data } = await axiosInstance.get<Asset[]>(ASSETS);

	return data;
};

export const getAssetById = async (id: string) => {
	const { data } = await axiosInstance.get<Asset>(`${ASSETS}/${id}`);

	return data;
};
