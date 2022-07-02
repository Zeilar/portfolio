import { extendTheme } from "@chakra-ui/react";
import * as components from "./components";
import { colors } from "./colors";
import { config } from "./config";
import { fonts } from "./fonts";
import { shadows } from "./shadows";
import { styles } from "./styles";
import { sizes } from "./sizes";
// import { withDefaults } from "./withDefaults";
// import { breakpoints } from "./breakpoints";
// import { textStyles } from "./textStyles";
// import { radii } from "./radii";

export default extendTheme(
	{
		config,
		colors,
		shadows,
		fonts,
		components: {
			...components,
			FormError: {
				color: "blue",
				feedbackText: {
					color: "blue",
				},
				feedback: {
					color: "blue",
				},
				errorText: {
					color: "blue",
				},
				text: {
					color: "blue",
				},
				error: {
					color: "blue",
				},
			},
		},
		styles,
		sizes,
		// breakpoints,
		// textStyles,
		// radii,
	}
	// textStyles,
	// ...withDefaults
);
