import { Flex, Heading, Image, Link as ChakraLink } from "@chakra-ui/react";

export default function NotFound() {
	return (
		<Flex
			direction="column"
			justify="center"
			align="center"
			h="100vh"
			bg="dark.90"
		>
			<title>404</title>

			<Image src="/404.svg" alt="404" h="20rem" mb="4rem" />

			<Heading color="light.30" fontSize="1.6rem">
				Página não encontrada, para voltar clique
				<ChakraLink color="primary" href="/">
					{""} aqui
				</ChakraLink>
			</Heading>
		</Flex>
	);
}
