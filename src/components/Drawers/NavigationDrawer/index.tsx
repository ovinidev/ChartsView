import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Flex,
	Stack,
	Text,
	IconButton,
	Icon,
	Image,
} from "@chakra-ui/react";
import { useSidebar } from "@contexts/useSidebar";
import { LinkNavigation } from "./LinkNavigation";
import { useAuth } from "@contexts/useAuth";
import { BiLogOut } from "react-icons/bi";
import logo from "@assets/logo.png";

export const NavigationDrawer = () => {
	const { isOpen, onClose } = useSidebar();
	const { signOut } = useAuth();

	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
			<DrawerOverlay />
			<DrawerContent bg="linear-gradient(225deg, rgb(30, 58, 138) 0%, rgb(23, 37, 84) 100%)">
				<DrawerCloseButton />
				<DrawerHeader>
					<Flex align="center" justify="center" mt="2rem">
						<Image src={logo} alt="logo" h="5rem" />
					</Flex>
				</DrawerHeader>

				<DrawerBody>
					<Stack mt="8rem" w="100%" align="center">
						<LinkNavigation href="/" name="Início" />
						<LinkNavigation href="/maquinas" name="Máquinas" />
						<LinkNavigation href="/usuarios" name="Usuários" />
						<LinkNavigation href="/empresas" name="Empresas" />
						<LinkNavigation href="/unidades" name="Unidades" />
						<LinkNavigation href="/servicos" name="Serviços" />
					</Stack>
				</DrawerBody>

				<DrawerFooter
					cursor="pointer"
					display="flex"
					justifyContent="center"
					onClick={signOut}
				>
					<Flex gap="2">
						<IconButton
							display="flex"
							variant="unstyled"
							aria-label="logout"
							icon={<Icon fontSize="32" color="gray.50" as={BiLogOut} />}
						/>
						<Text
							cursor="pointer"
							fontWeight={600}
							fontSize="26"
							color="gray.50"
							pb="5rem"
						>
							Logout
						</Text>
					</Flex>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
