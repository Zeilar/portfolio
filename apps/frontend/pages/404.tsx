import { Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import UnderlineHeader from "../components/UnderlineHeader";

export default function NotFound() {
	return (
		<Container maxW="container.xl">
			<Head>
				<title>Angelin | 404 Server Error</title>
			</Head>
			<UnderlineHeader label="Not Found" />
			<Text color="gray.200">The resource you were looking for could not be found.</Text>
		</Container>
	);
}
