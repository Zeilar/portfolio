import { StyleConfig } from "@chakra-ui/theme-tools";
import { colors } from "../colors";

export const Input: StyleConfig = {
	variants: {
		outline: {
			field: {
				_placeholder: {
					userSelect: "none",
				},
				rounded: "base",
				_hover: {
					borderColor: "border",
				},
				_focusVisible: {
					borderColor: "blue.500",
					bgColor: "blackAlpha.100",
					boxShadow: `0 0 0 1px ${colors.accent}`,
				},
			},
		},
		flushed: {
			field: {
				_placeholder: {
					userSelect: "none",
				},
				_focusVisible: {
					borderColor: "blue.500",
					boxShadow: `0 1px 0 0 ${colors.accent}`,
				},
			},
		},
	},
};
