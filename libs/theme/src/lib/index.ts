import { extendTheme } from "@chakra-ui/react";
import * as components from "./components";
import { colors } from "./colors";
import { config } from "./config";
import { fonts } from "./fonts";
import { shadows } from "./shadows";
import { styles } from "./styles";
import { sizes } from "./sizes";
import { breakpoints } from "./breakpoints";

const theme = extendTheme({
	config,
	colors,
	shadows,
	fonts,
	components: {
		...components, // This needs to be spread into a new object, no idea why
	},
	styles,
	sizes,
	breakpoints,
});

export default theme;
