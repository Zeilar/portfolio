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
		"primary-link": {
			...solid,
			"> .chakra-icon": {
				opacity: 0,
				w: 0,
				h: 0,
				transition: "0.25s ease",
			},
			_hover: {
				"> .chakra-icon": {
					ml: 2,
					opacity: 1,
					w: "1em",
					h: "1em",
				},
			},
		},
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
