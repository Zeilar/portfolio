import "../fonts";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import theme from "@theme";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Welcome to frontend!</title>
			</Head>
			<ChakraProvider theme={theme}>
				<Navbar />
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	);
}
