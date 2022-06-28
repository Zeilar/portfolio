import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, NextScript, Main } from "next/document";
import theme from "@theme";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
