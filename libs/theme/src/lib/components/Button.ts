import { StyleConfig } from "@chakra-ui/theme-tools";

const solid = {
	bgColor: "accent",
	py: 7,
	px: 8,
	_hover: {
		bgColor: "purple.500",
	},
	_active: {
		bgColor: "purple.700",
	},
};

export const Button: StyleConfig = {
	baseStyle: {
		rounded: "base",
		fontWeight: 500,
	},
	variants: {
		solid,
		secondary: {
			...solid,
			borderWidth: 1,
			bgColor: "gray.600",
			borderColor: "gray.500",
			py: 7,
			px: 8,
			_hover: {
				bgColor: "gray.500",
			},
			_active: {
				bgColor: "gray.700",
			},
		},
	},
};
