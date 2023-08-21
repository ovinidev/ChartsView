import { Skeleton, SkeletonProps, Stack } from "@chakra-ui/react";

interface WorkOrderDetailsSkeletonProps extends SkeletonProps {
	isLoading: boolean;
}

export const WorkOrderDetailsSkeleton = ({
	isLoading,
}: WorkOrderDetailsSkeletonProps) => {
	return (
		<Stack
			w={{ base: "100%", "4xl": "25rem" }}
			p={{ base: "1.5rem", "2xl": "2rem" }}
		>
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
		</Stack>
	);
};
