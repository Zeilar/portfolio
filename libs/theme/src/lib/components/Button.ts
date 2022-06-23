import { StyleConfig } from "@chakra-ui/theme-tools";

export const Button: StyleConfig = {
	baseStyle: {
		rounded: "base",
		fontWeight: 500,
	},
	variants: {
		solid: {
			bgColor: "accent",
			py: 7,
			px: 8,
			_hover: {
				bgColor: "purple.500",
			},
			_active: {
				bgColor: "purple.700",
			},
		},
	},
};
