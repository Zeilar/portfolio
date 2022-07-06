import { Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import UnderlineHeader from "../components/UnderlineHeader";

export default function NotFound() {
	return (
		<Container maxW="container.xl">
			<Head>
				<title>Angelin | 404 Server Error</title>
				<meta property="og:title" content="404 Not Found" />
				<meta property="og:url" content="https://angelin.dev" />
				<meta property="og:description" content="The resource you were looking for could not be found." />
				<meta property="og:site_name" content="Angelin" />
			</Head>
			<UnderlineHeader label="404 Not Found" />
			<Text color="gray.200">The resource you were looking for could not be found.</Text>
		</Container>
	);
}
