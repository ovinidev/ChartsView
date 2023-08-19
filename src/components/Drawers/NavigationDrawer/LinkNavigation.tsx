import { Flex, FlexProps } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

interface LinkNavigationProps extends FlexProps {
	href: string;
	name: string;
}

export const LinkNavigation = ({
	href,
	name,
	...rest
}: LinkNavigationProps) => {
	const { pathname } = useLocation();

	const isActive = pathname === href;

	return (
		<Flex
			fontSize="26"
			color={isActive ? "gray.100" : "gray.200"}
			fontWeight={isActive ? 600 : 400}
			px="0.8rem"
			zIndex={1}
			{...rest}
		>
			<Link to={href}>{name}</Link>
		</Flex>
	);
};
