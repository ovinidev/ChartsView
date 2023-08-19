import { Flex } from "@chakra-ui/react";
import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";

export default function WorkOrders() {
	return (
		<Flex h="100vh" w="100%">
			<Header />

			<NavigationDrawer />
		</Flex>
	);
}
