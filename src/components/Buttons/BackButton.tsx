import { Flex, FlexProps, Icon, IconButton, Text } from "@chakra-ui/react";
import { useSidebar } from "@contexts/useSidebar";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface BackButtonProps extends FlexProps {}

export const BackButton = ({ ...rest }: BackButtonProps) => {
	const { isMobile } = useSidebar();
	const navigate = useNavigate();

	if (isMobile) {
		return (
			<Flex
				align="center"
				gap="1"
				m="1rem 0 0 1rem"
				cursor="pointer"
				onClick={() => navigate(-1)}
				{...rest}
			>
				<IconButton
					display="flex"
					variant="unstyled"
					aria-label="back button"
					icon={<Icon fontSize="38" as={IoIosArrowBack} />}
				/>
				<Text fontSize="26">Voltar</Text>
			</Flex>
		);
	}

	return null;
};
