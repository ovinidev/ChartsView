import { Flex, HStack, Icon, IconButton, Image } from "@chakra-ui/react";
import { HeaderLink } from "./HeaderLink";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@contexts/useSidebar";
import { AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "@contexts/useAuth";
import { BiLogOutCircle } from "react-icons/bi";
import logo from "@assets/logo.png";

export const Header = () => {
	const { isDesktop, onOpen } = useSidebar();
	const { signOut } = useAuth();
	const navigate = useNavigate();

	return (
		<Flex
			bg="primary"
			h="4.75rem"
			w="100%"
			justify="space-between"
			align="center"
			px={{ base: "1rem", "4xl": "3rem" }}
		>
			<Image
				src={logo}
				alt="logo"
				cursor="pointer"
				onClick={() => navigate("/")}
				h="3rem"
			/>

			{isDesktop ? (
				<HStack spacing="2" align="center">
					<HeaderLink href="/" name="Início" />
					<HeaderLink href="/maquinas" name="Máquinas" />
					<HeaderLink href="/usuarios" name="Usuários" />
					<HeaderLink href="/empresas" name="Empresas" />
					<HeaderLink href="/unidades" name="Unidades" />
					<HeaderLink href="/servicos" name="Serviços" />
				</HStack>
			) : (
				<IconButton
					onClick={onOpen}
					display="flex"
					variant="unstyled"
					aria-label="Menu"
					icon={<Icon color="gray.100" fontSize="32" as={AiOutlineMenu} />}
				/>
			)}

			{isDesktop && (
				<IconButton
					variant="unstyled"
					display="flex"
					onClick={signOut}
					aria-label="logout"
					icon={<Icon color="gray.100" fontSize="36" as={BiLogOutCircle} />}
				/>
			)}
		</Flex>
	);
};
