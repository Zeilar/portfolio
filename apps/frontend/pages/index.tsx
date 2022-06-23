import { Box, Button, Container, Flex, Text, Link } from "@chakra-ui/react";
import avatar from "../assets/images/avatar.jpg";
import NextImage from "next/image";
import NextLink from "next/link";

export default function Index() {
	return (
		<Container display="flex" maxW="container.xl" alignItems="center" mt="8rem">
			<Box>
				<Text fontSize="6xl" lineHeight={1.25}>
					Idea in&#44;
					<br />
					Application out&#46;
				</Text>
				<Box as="hr" w="10rem" h={1} bgColor="accent" my={10} rounded="full" />
				<Text color="gray.400" lineHeight="7">
					Hi&#44; I&apos;m Philip&#44; a web developer from Sweden&#46;
					<br />
					Professional nerd who loves to builds cool things&#46;
				</Text>

				<NextLink passHref href="/projects">
					<Button as={Link} mt={10}>
						Explore Projects
					</Button>
				</NextLink>
			</Box>
			<Flex display="inline-flex" rounded="100%" overflow="hidden" borderWidth={5} borderColor="accent" mx="auto">
				<NextImage src={avatar} />
			</Flex>
		</Container>
	);
}
