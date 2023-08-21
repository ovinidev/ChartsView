import { getUnitById, getUnits } from "@api/units";
import { UNITS } from "@constants/entities";
import { STALE_TIME } from "@constants/staleTime";
import { useQuery } from "@tanstack/react-query";

interface UseUnitsProps {
	name: string;
}

export const useUnits = ({ name }: UseUnitsProps) => {
	return useQuery(
		[UNITS],
		async () => {
			const data = await getUnits();

			return data;
		},
		{
			staleTime: STALE_TIME,
			select: (item) =>
				item.filter((unit) => {
					if (name.length === 0) return unit;
					return unit.name
						.toLocaleLowerCase()
						.includes(name.toLocaleLowerCase());
				}),
		},
	);
};

export const useUnitById = (id: string) => {
	return useQuery(
		[UNITS, { id }],
		async () => {
			const data = await getUnitById(id);

			return data;
		},
		{
			staleTime: STALE_TIME,
		},
	);
};
