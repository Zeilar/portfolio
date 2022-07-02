import { Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import UnderlineHeader from "../components/UnderlineHeader";

export default function ServerError() {
	return (
		<Container maxW="container.xl">
			<Head>
				<title>Angelin | 500 Server Error</title>
			</Head>
			<UnderlineHeader label="Server Error" />
			<Text color="gray.200">Something went wrong.</Text>
		</Container>
	);
}
