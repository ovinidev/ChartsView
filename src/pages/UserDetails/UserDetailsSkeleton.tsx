import { Flex, Skeleton, SkeletonProps, Stack } from "@chakra-ui/react";

interface UserDetailsSkeletonProps extends SkeletonProps {
	isLoading: boolean;
}

export const UserDetailsSkeleton = ({
	isLoading,
}: UserDetailsSkeletonProps) => {
	return (
		<Stack spacing="8" p={{ base: "1.5rem", "2xl": "2rem" }}>
			<Flex direction={{ base: "column", "2xl": "row" }}>
				<Skeleton isLoaded={!isLoading} borderRadius="50%" h="8rem" w="8rem" />

				<Stack
					spacing="4"
					m={{ base: "1rem 0 0", "2xl": "0 0 0 2rem" }}
					color="gray.800"
					w={{ base: "100%", "4xl": "25rem" }}
				>
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

			<Stack w={{ base: "100%", "4xl": "20rem" }}>
				<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
				<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
				<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
				<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
				<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			</Stack>
		</Stack>
	);
};
