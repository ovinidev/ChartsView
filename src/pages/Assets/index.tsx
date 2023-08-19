import { Flex, useDisclosure } from "@chakra-ui/react";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Header } from "@components/Header";

export default function Assets() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex h="100vh" w="100%">
			<Header />

			<NavigationDrawer />
		</Flex>
	);
}
