import { getWorkOrderById, getWorkOrders } from "@api/workorders";
import { WORKORDERS } from "@constants/entities";
import { STALE_TIME } from "@constants/staleTime";
import { useQuery } from "@tanstack/react-query";

interface UseWorkOrdersProps {
	title: string;
}

export const useWorkOrders = ({ title }: UseWorkOrdersProps) => {
	return useQuery(
		[WORKORDERS],
		async () => {
			const data = await getWorkOrders();

			return data;
		},
		{
			staleTime: STALE_TIME,
			select: (item) =>
				item.filter((workOrder) => {
					if (title.length === 0) return workOrder;
					return workOrder.title
						.toLocaleLowerCase()
						.startsWith(title.toLocaleLowerCase());
				}),
		},
	);
};

export const useWorkOrderById = (id: string) => {
	return useQuery(
		[WORKORDERS, { id }],
		async () => {
			const data = await getWorkOrderById(id);

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};
