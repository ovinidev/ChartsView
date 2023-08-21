import { Icon, IconButton, IconButtonProps } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface PaginationButtonProps extends IconButtonProps {
	iconName: IconType;
}

export const PaginationButton = ({
	iconName,
	...rest
}: PaginationButtonProps) => {
	return (
		<IconButton
			variant="unstyled"
			display="flex"
			icon={<Icon as={iconName} color="black.200" h="2rem" w="2rem" />}
			transition="all .5s ease"
			_hover={{ filter: "brightness(0.7)" }}
			{...rest}
		/>
	);
};
