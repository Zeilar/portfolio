import "../fonts";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import theme from "@theme";
import Navbar from "../components/Navbar";
import PolygonScatter from "../components/PolygonScatter";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="theme-color" content="#000000" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<link rel="manifest" href="/site.webmanifest" />
				<title>Angelin</title>
			</Head>
			<ChakraProvider theme={theme}>
				<PolygonScatter position="left" />
				<PolygonScatter position="right" />
				<Navbar />
				<Component {...pageProps} />
				<Footer />
			</ChakraProvider>
		</>
	);
}
