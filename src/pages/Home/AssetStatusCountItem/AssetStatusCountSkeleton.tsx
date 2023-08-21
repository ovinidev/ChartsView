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
				h={{ base: "9rem", "7xl": "10rem" }}
				w={{ base: "16rem", "7xl": "17rem" }}
				borderRadius="10px"
			/>
			<Skeleton
				isLoaded={!isLoading}
				h={{ base: "9rem", "7xl": "10rem" }}
				w={{ base: "16rem", "7xl": "17rem" }}
				borderRadius="10px"
			/>
			<Skeleton
				isLoaded={!isLoading}
				h={{ base: "9rem", "7xl": "10rem" }}
				w={{ base: "16rem", "7xl": "17rem" }}
				borderRadius="10px"
			/>
		</AssetsStatusContainer>
	);
};
