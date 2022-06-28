import { StyleConfig } from "@chakra-ui/theme-tools";

export const Textarea: StyleConfig = {
	variants: {
		filled: {
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
			},
		},
	},
};
