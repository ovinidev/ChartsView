import { axiosInstance } from "./axiosInstance";
import { WORKORDERS } from "@constants/entities";
import { WorkOrder } from "@interfaces/workorders";

export const getWorkOrders = async () => {
	const { data } = await axiosInstance.get<WorkOrder[]>(WORKORDERS);

	return data;
};

export const getWorkOrderById = async (id: string) => {
	const { data } = await axiosInstance.get<WorkOrder>(`${WORKORDERS}/${id}`);

	return data;
};
