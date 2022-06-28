import { theme } from "@chakra-ui/react";

const gray = {
	...theme.colors.gray,
	700: "#232b38",
	600: "#2d3848",
	500: "#414e62",
	400: "#536279",
	300: "#63748c",
	200: "#8c97a6",
};

export const colors = {
	border: gray[500],
	text: gray[100],
	accent: theme.colors.purple[600],
	gray,
};
