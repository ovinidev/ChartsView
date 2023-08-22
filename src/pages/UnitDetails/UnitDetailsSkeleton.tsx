import { Flex, Skeleton, SkeletonProps, Stack } from "@chakra-ui/react";

interface UnitDetailsSkeletonProps extends SkeletonProps {
	isLoading: boolean;
}

export const UnitDetailsSkeleton = ({
	isLoading,
}: UnitDetailsSkeletonProps) => {
	return (
		<Flex
			mt="2rem"
			justify="center"
			gap="3"
			direction={{ base: "column", "4xl": "row" }}
		>
			<Stack spacing="3" w={{ base: "100%", "4xl": "45rem" }}>
				<Flex direction="column" bg="#FFF" p="2rem">
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

					<Flex gap="4" w="100%" mt="1rem">
						<Skeleton
							isLoaded={!isLoading}
							p={{ base: "1rem", "4xl": "3rem 6rem" }}
						/>
						<Skeleton
							isLoaded={!isLoading}
							p={{ base: "1rem", "4xl": "3rem 6rem" }}
						/>
					</Flex>
				</Flex>

				<Flex direction="column" bg="#FFF" p="2rem">
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
				</Flex>
			</Stack>

			<Stack
				w={{ base: "100%", "4xl": "30rem" }}
				p="1.5rem"
				bg="#FFF"
				fontSize="32"
				justify="flex-start"
			>
				<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
				<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
				<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
				<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
				<Skeleton isLoaded={!isLoading} p={{ base: "1rem", "4xl": "1.5rem" }} />
			</Stack>
		</Flex>
	);
};
