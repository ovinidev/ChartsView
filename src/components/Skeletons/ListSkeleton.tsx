import { Skeleton, SkeletonProps, Stack } from "@chakra-ui/react";

interface ListSkeletonProps extends SkeletonProps {
	isLoading: boolean;
}

export const ListSkeleton = ({ isLoading }: ListSkeletonProps) => {
	return (
		<Stack alignItems="center">
			<Skeleton
				isLoaded={!isLoading}
				w="97%"
				p={{ base: "1rem", "4xl": "1.5rem" }}
			/>
			<Skeleton
				isLoaded={!isLoading}
				w="97%"
				p={{ base: "1rem", "4xl": "1.5rem" }}
			/>
			<Skeleton
				isLoaded={!isLoading}
				w="97%"
				p={{ base: "1rem", "4xl": "1.5rem" }}
			/>
			<Skeleton
				isLoaded={!isLoading}
				w="97%"
				p={{ base: "1rem", "4xl": "1.5rem" }}
			/>
			<Skeleton
				isLoaded={!isLoading}
				w="97%"
				p={{ base: "1rem", "4xl": "1.5rem" }}
			/>
			<Skeleton
				isLoaded={!isLoading}
				w="97%"
				p={{ base: "1rem", "4xl": "1.5rem" }}
			/>
			<Skeleton
				isLoaded={!isLoading}
				w="97%"
				p={{ base: "1rem", "4xl": "1.5rem" }}
			/>
			<Skeleton
				isLoaded={!isLoading}
				w="97%"
				p={{ base: "1rem", "4xl": "1.5rem" }}
			/>
		</Stack>
	);
};
