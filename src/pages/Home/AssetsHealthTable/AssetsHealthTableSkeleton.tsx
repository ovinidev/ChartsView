import { Flex, Skeleton, SkeletonProps, Stack } from "@chakra-ui/react";

interface AssetsHealthTableSkeletonProps extends SkeletonProps {
	isLoading: boolean;
}

export const AssetsHealthTableSkeleton = ({
	isLoading,
}: AssetsHealthTableSkeletonProps) => {
	return (
		<Flex p="2rem" direction="column">
			<Flex gap="2">
				<Flex>
					<Skeleton isLoaded={!isLoading} w="15rem" />
				</Flex>
				<Stack spacing="2" w="20rem">
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

			<Skeleton
				mt="1rem"
				isLoaded={!isLoading}
				p={{ base: "1rem", "4xl": "1.5rem" }}
			/>
		</Flex>
	);
};
