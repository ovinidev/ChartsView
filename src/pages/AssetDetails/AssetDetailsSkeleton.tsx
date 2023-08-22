import { Flex, Skeleton, SkeletonProps, Stack } from "@chakra-ui/react";

interface AssetDetailsSkeletonProps extends SkeletonProps {
	isLoading: boolean;
}

export const AssetDetailsSkeleton = ({
	isLoading,
}: AssetDetailsSkeletonProps) => {
	return (
		<Stack
			align="center"
			spacing="8"
			p={{ base: "1.5rem", "2xl": "2rem" }}
			w="100%"
		>
			<Flex
				direction={{ base: "column", "4xl": "row" }}
				gap="8"
				align="flex-start"
				justify="center"
				w="100%"
			>
				<Skeleton
					isLoaded={!isLoading}
					w={{ base: "100%", "4xl": "20rem" }}
					h="20rem"
				/>

				<Stack w={{ base: "100%", "4xl": "35rem" }}>
					<Skeleton
						isLoaded={!isLoading}
						p={{ base: "1rem", "4xl": "1.5rem" }}
					/>
					<Skeleton
						isLoaded={!isLoading}
						p={{ base: "1rem", "4xl": "1.5rem" }}
					/>
					<Skeleton
						isLoaded={!isLoading}
						p={{ base: "1rem", "4xl": "1.5rem" }}
					/>
					<Skeleton
						isLoaded={!isLoading}
						p={{ base: "1rem", "4xl": "1.5rem" }}
					/>
					<Skeleton
						isLoaded={!isLoading}
						p={{ base: "1rem", "4xl": "1.5rem" }}
					/>
				</Stack>
			</Flex>
		</Stack>
	);
};
