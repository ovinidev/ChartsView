import { getWorkOrderById, getWorkOrders } from "@api/workorders";
import { WORKORDERS } from "@constants/entities";
import { STALE_TIME } from "@constants/staleTime";
import { useQuery } from "@tanstack/react-query";

export const useWorkOrders = () => {
	return useQuery(
		[WORKORDERS],
		async () => {
			const data = await getWorkOrders();

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};

export const useWorkOrderById = (id: string) => {
	return useQuery(
		[WORKORDERS],
		async () => {
			const data = await getWorkOrderById(id);

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};
