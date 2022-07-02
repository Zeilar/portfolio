import { Container, Flex } from "@chakra-ui/react";

export default function Footer() {
	return (
		<Flex as="footer" bgColor="gray.900">
			<Container maxW="container.xl" py="5rem">
				Hello there
			</Container>
		</Flex>
	);
}
