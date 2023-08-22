import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface InfoCardProps {
	title: string;
	count?: number;
	icon: IconType;
}

export const InfoCard = ({ title, count, icon }: InfoCardProps) => {
	return (
		<Flex
			color="#FFF"
			borderRadius="8px"
			bg="primary"
			w="14rem"
			p="0.5rem 1rem"
			position="relative"
			justify="flex-end"
		>
			<Icon
				fontSize="5rem"
				as={icon}
				position="absolute"
				bottom="-9px"
				left={0}
				color="#728cd3"
			/>

			<Flex direction="column" align="center">
				<Text fontWeight={500}>{title}</Text>
				<Heading fontSize="56">{count}</Heading>
			</Flex>
		</Flex>
	);
};
