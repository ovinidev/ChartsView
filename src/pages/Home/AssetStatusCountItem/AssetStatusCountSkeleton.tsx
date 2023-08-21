import { Skeleton } from "@chakra-ui/react";
import { AssetsStatusContainer } from "../AssetsStatusContainer";

interface AssetStatusCountSkeletonProps {
	isLoading: boolean;
}

export const AssetStatusCountSkeleton = ({
	isLoading,
}: AssetStatusCountSkeletonProps) => {
	return (
		<AssetsStatusContainer>
			<Skeleton
				isLoaded={!isLoading}
				h={{ base: "18rem", "7xl": "20rem" }}
				w={{ base: "18rem", "7xl": "20rem" }}
				borderRadius="10px"
			/>
			<Skeleton
				isLoaded={!isLoading}
				h={{ base: "18rem", "7xl": "20rem" }}
				w={{ base: "18rem", "7xl": "20rem" }}
				borderRadius="10px"
			/>
			<Skeleton
				isLoaded={!isLoading}
				h={{ base: "18rem", "7xl": "20rem" }}
				w={{ base: "18rem", "7xl": "20rem" }}
				borderRadius="10px"
			/>
		</AssetsStatusContainer>
	);
};
