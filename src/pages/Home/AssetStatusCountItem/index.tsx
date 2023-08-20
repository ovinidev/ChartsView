import { Center, Stack, Text } from "@chakra-ui/react";

interface AssetStatusCountItemProps {
	title: string;
	statusCount?: number;
}

export const AssetStatusCountItem = ({
	title,
	statusCount,
}: AssetStatusCountItemProps) => {
	return (
		<Center
			as="section"
			h={{ base: "18rem", "7xl": "20rem", "9xl": "23.125rem" }}
			w={{ base: "18rem", "7xl": "20rem", "9xl": "23.125rem" }}
			borderRadius="10px"
			bg="primary"
		>
			<Stack transition="all 0.5s ease" align="center">
				<Text color="gray.100" fontWeight={700} fontSize="32">
					{title}: {statusCount}
				</Text>
			</Stack>
		</Center>
	);
};
