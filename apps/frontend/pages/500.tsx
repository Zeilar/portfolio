import { Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import UnderlineHeader from "../components/UnderlineHeader";

export default function ServerError() {
	return (
		<Container maxW="container.xl">
			<Head>
				<title>Angelin | Server Error</title>
				<meta property="og:title" content="Something went wrong" />
				<meta property="og:url" content="https://angelin.dev" />
				<meta
					property="og:description"
					content="The server could not respond to your request, I apologize for the inconvenience."
				/>
				<meta property="og:site_name" content="Angelin" />
			</Head>
			<UnderlineHeader label="Server Error" />
			<Text color="gray.200">Something went wrong!</Text>
		</Container>
	);
}
