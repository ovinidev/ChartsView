import { Skeleton, SkeletonProps, Stack } from "@chakra-ui/react";

interface UnitDetailsSkeletonProps extends SkeletonProps {
	isLoading: boolean;
}

export const UnitDetailsSkeleton = ({
	isLoading,
}: UnitDetailsSkeletonProps) => {
	return (
		<Stack spacing="2" w={{ base: "100%", "4xl": "25rem" }} p="2rem">
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
		</Stack>
	);
};
