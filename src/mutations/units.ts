import { UNITS } from "@constants/entities";
import { Unit } from "@interfaces/units";
import { useUnits } from "@queries/units";
import { queryClient } from "@services/queryClient";
import { useMutation } from "@tanstack/react-query";

export interface UnitProps {
	name: string;
}

export const useCreateUnit = () => {
	return useMutation(
		async (data: UnitProps) => {
			return {
				id: Math.random(),
				name: data.name,
			};
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData([UNITS], (prevData: any) => [
					...prevData,
					data,
				]);
			},
		},
	);
};

interface UseUpdateUnitProps {
	unitData: Unit;
}

export const useUpdateUnit = ({ unitData }: UseUpdateUnitProps) => {
	const { data: units } = useUnits({ name: "" });

	return useMutation(
		async (data: Unit) => {
			return {
				...unitData,
				name: data.name ? data.name : unitData.name,
			};
		},
		{
			onSuccess: (data) => {
				const unitsToEditIndex = units?.findIndex(
					(unit) => unit.id === unitData.id,
				);

				if (units && unitsToEditIndex !== undefined) {
					units[unitsToEditIndex] = data;

					queryClient.setQueryData([UNITS], () => units);
				}
			},
		},
	);
};

export const useDeleteUnit = () => {
	const { data: units } = useUnits({ name: "" });

	return useMutation(async (data: Unit) => data, {
		onSuccess: (data) => {
			const unitsNotBeDelete = units?.filter((unit) => unit.id !== data.id);

			queryClient.setQueryData([UNITS], () => unitsNotBeDelete);
		},
	});
};
