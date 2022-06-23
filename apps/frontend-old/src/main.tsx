import "./app/fonts";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import theme from "@theme";
import App from "./app/App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<BrowserRouter>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</BrowserRouter>
);
