/* eslint-disable @typescript-eslint/no-explicit-any */
import { WORKORDERS } from "@constants/entities";
import { WorkOrder } from "@interfaces/workorders";
import { useWorkOrders } from "@queries/workorders";
import { queryClient } from "@services/queryClient";
import { useMutation } from "@tanstack/react-query";

export interface WorkOrdersProps {
	title: string;
	description: string;
	status: string;
}

export const useCreateWorkOrders = () => {
	return useMutation(
		async (data: WorkOrdersProps) => {
			return {
				id: Math.random(),
				title: data.title,
				description: data.description,
				status: data.status,
			};
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData([WORKORDERS], (prevData: any) => [
					...prevData,
					data,
				]);
			},
		},
	);
};

interface UseUpdateWorkOrdersProps {
	workOrderData: WorkOrder;
}

export const useUpdateWorkOrders = ({
	workOrderData,
}: UseUpdateWorkOrdersProps) => {
	const { data: workOrders } = useWorkOrders({ title: "" });

	return useMutation(
		async (data: WorkOrder) => {
			return {
				...workOrderData,
				title: data.title ? data.title : workOrderData.title,
				description: data.description
					? data.description
					: workOrderData.description,
				email: data.status ? data.status : workOrderData.status,
			};
		},
		{
			onSuccess: (data) => {
				const workOrderToEditIndex = workOrders?.findIndex(
					(workOrder) => workOrder.id === workOrderData.id,
				);

				if (workOrders && workOrderToEditIndex !== undefined) {
					workOrders[workOrderToEditIndex] = data;

					queryClient.setQueryData([WORKORDERS], () => workOrders);
				}
			},
		},
	);
};

export const useDeleteWorkOrders = () => {
	const { data: workOrders } = useWorkOrders({ title: "" });

	return useMutation(async (data: WorkOrder) => data, {
		onSuccess: (data) => {
			const workOrdersNotBeDelete = workOrders?.filter(
				(workOrder) => workOrder.id !== data.id,
			);

			queryClient.setQueryData([WORKORDERS], () => workOrdersNotBeDelete);
		},
	});
};
