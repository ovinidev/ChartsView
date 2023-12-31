import { Flex, FlexProps } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

interface HeaderLinkProps extends FlexProps {
	href: string;
	name: string;
}

export const HeaderLink = ({ href, name, ...rest }: HeaderLinkProps) => {
	const { pathname } = useLocation();

	const isActive = pathname === href;

	return (
		<Flex
			fontSize="20"
			color={isActive ? "gray.100" : "gray.200"}
			fontWeight={isActive ? 600 : 400}
			borderBottom={isActive ? "2px solid #FEFEFE" : "none"}
			px="0.8rem"
			zIndex={1}
			{...rest}
		>
			<Link to={href}>{name}</Link>
		</Flex>
	);
};
