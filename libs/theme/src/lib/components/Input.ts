import { StyleConfig } from "@chakra-ui/theme-tools";

export const Input: StyleConfig = {
	variants: {
		filled: {
			field: {
				bgColor: "gray.600",
				borderColor: "border",
				rounded: "base",
				_placeholder: {
					userSelect: "none",
				},
				_hover: {
					borderColor: "border",
				},
				_focusVisible: {
					borderColor: "accent",
					bgColor: "gray.600",
				},
			},
		},
	},
};
