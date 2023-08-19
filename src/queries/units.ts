import { getUnitById, getUnits } from "@api/units";
import { UNITS } from "@constants/entities";
import { STALE_TIME } from "@constants/staleTime";
import { useQuery } from "@tanstack/react-query";

export const useUnits = () => {
	return useQuery(
		[UNITS],
		async () => {
			const data = await getUnits();

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};

export const useUnitById = (id: string) => {
	return useQuery(
		[UNITS],
		async () => {
			const data = await getUnitById(id);

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};
